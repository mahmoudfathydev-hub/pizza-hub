import { v2 as cloudinary } from "cloudinary";

// Validate environment variables - Fixed: Throw error instead of just logging
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  const errorMessage =
    "Missing Cloudinary environment variables. Please check your .env.local file.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
