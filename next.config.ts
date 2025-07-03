import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**', // allow all images under /photos/
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: 'https',
        hostname: 'backend.machmakers.co.uk',
        pathname: '/**', // allow all images under /photos/
      },
    ],
  },
};

export default nextConfig;
