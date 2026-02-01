import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Define the type for the form data file
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
  try {
    // Add timeout to the entire request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    clearTimeout(timeoutId);

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Server-side file validation
    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB (matching client-side limit)
    const ALLOWED_MIME_TYPES = [
      "image/jpeg",
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
            "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        },
        { status: 400 },
      );
    }

    // Convert the file to a format Cloudinary can handle (Buffer or Base64)
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    // Upload to Cloudinary with timeout
    const uploadController = new AbortController();
    const uploadTimeoutId = setTimeout(() => uploadController.abort(), 30000); // 30 second timeout for upload

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: pathName,
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
        timeout: 30000, // Cloudinary SDK timeout
      },
    );

    clearTimeout(uploadTimeoutId);

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          { error: "Upload timed out. Please try again." },
          { status: 408 },
        );
      }
      return NextResponse.json(
        { error: "Failed to upload image: " + error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
