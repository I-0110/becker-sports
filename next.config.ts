import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Wikipedia
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // Common image hosts
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // Add more as needed
    ],
  },
};

export default nextConfig;
