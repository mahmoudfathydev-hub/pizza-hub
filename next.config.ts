import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    loader: "default",
  },
  // Add trailing slash handling for better i18n support
  trailingSlash: false,
  // Handle asset prefix for proper image loading
  assetPrefix: "",
  // Configure Server Actions body size limit for image uploads
  experimental: {
    serverActions: {
      bodySizeLimit: 10 * 1024 * 1024, // 10MB limit for image uploads
    },
  },
};

export default nextConfig;
