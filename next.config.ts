import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to allow 'npm start'
  trailingSlash: true,
  images: {
    // unoptimized: true, // Only needed for static export
  },
};

export default nextConfig;
