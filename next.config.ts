import type { NextConfig } from "next";
import crypto from "crypto";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
    loader: "default",
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Enable cache components for Next.js 16
  cacheComponents: true,
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Use webpack instead of turbopack to avoid memory issues
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.externals.push("_http_common");
    }

    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: "all",
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module: any) {
              return (
                module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier())
              );
            },
            name(module: any) {
              const hash = crypto.createHash("sha1");
              hash.update(module.identifier());
              return hash.digest("hex").substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: "shared",
            priority: 10,
            enforce: true,
            chunks: (module: any) =>
              module.resource && /node_modules[/\\]/.test(module.resource),
          },
        },
      };
    }

    return config;
  },
  turbopack: {},
  // Enable compression
  compress: true,
  // Power by headers
  poweredByHeader: false,
};

export default nextConfig;
