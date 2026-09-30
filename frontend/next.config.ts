import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["18.183.128.98:3000", "18.183.128.98", "localhost:3000"],
  async rewrites() {
    const backendUrl = process.env.INTERNAL_API_URL || "http://backend:8000/api";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
