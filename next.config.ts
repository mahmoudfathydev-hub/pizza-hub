import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    loader: 'default',
    domains: ['localhost'],
  },
  // Add trailing slash handling for better i18n support
  trailingSlash: false,
  // Handle asset prefix for proper image loading
  assetPrefix: '',
};

export default nextConfig;