import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { uploadRateLimit } from "@/lib/rate-limit";
import { securityHeaders, sanitizeFileName } from "@/lib/security";

// Define the type for the form data file
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

// Enhanced file validation with magic number checking
const validateFileContent = async (file: File): Promise<boolean> => {
  const buffer = await file.slice(0, 12).arrayBuffer();
  const view = new Uint8Array(buffer);

  // Check magic numbers for common image formats
  const signatures = {
    "image/jpeg": [0xff, 0xd8, 0xff],
    "image/jfif": [0xff, 0xd8, 0xff], // JFIF uses same signature as JPEG
    "image/png": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    "image/gif": [0x47, 0x49, 0x46, 0x38],
    "image/webp": [0x52, 0x49, 0x46, 0x46],
  };

  const signature = signatures[file.type as keyof typeof signatures];
  if (!signature) return false;

  return signature.every((byte, index) => view[index] === byte);
};

export async function POST(request: Request) {
  try {
    // Rate limiting based on IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const rateLimitResult = uploadRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many upload requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimitResult.resetTime),
          },
        },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        {
          status: 400,
          headers: securityHeaders,
        },
      );
    }

    // Sanitize path name to prevent directory traversal
    const sanitizedPathName = sanitizeFileName(pathName || "uploads");

    // Enhanced server-side file validation
    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
    const ALLOWED_MIME_TYPES = [
      "image/jpeg",
      "image/jfif", // Added JFIF support
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 8MB.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, JFIF, PNG, GIF, and WebP are allowed.",
        },
        { status: 400 },
      );
    }

    // Enhanced validation: Check file content (magic numbers)
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 },
      );
    }

    const isValidContent = await validateFileContent(file);
    if (!isValidContent) {
      return NextResponse.json(
        { error: "File content does not match its extension" },
        { status: 400 },
      );
    }

    // Check if Cloudinary is configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          error:
            "Image upload service not configured. Please contact administrator.",
        },
        { status: 500 },
      );
    }

    // Convert file to base64 for Cloudinary
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    // Upload to Cloudinary with additional security options
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: sanitizedPathName, // Use sanitized path name
        resource_type: "auto",
        transformation: [
          { width: 800, height: 600, crop: "limit", quality: "auto" },
        ],
        // Add security options
        overwrite: true,
        invalidate: true,
        // Prevent malicious uploads
        allowed_formats: ["jpg", "jpeg", "jfif", "png", "gif", "webp"],
        // Additional security settings
        use_filename: true,
        unique_filename: true,
      },
    );

    return NextResponse.json(
      {
        success: true,
        url: uploadResponse.secure_url,
      },
      {
        headers: securityHeaders, // Add security headers to response
      },
    );
  } catch (error: unknown) {
    console.error("Upload error:", error);

    let errorMessage = "Failed to upload image";
    if (error instanceof Error) {
      errorMessage = `Upload failed: ${error.message}`;
    }

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
        headers: securityHeaders, // Add security headers to error response
      },
    );
  }
}
