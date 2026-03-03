import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      // Add your S3 / CDN domain here when you set up file uploads
    ],
  },
};

export default nextConfig;
