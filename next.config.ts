import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: process.platform === "win32" ? undefined : "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    }
    return null;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
