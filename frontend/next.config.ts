import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.29.220",
    "192.168.29.220:3000",
    "10.37.133.200",
    "10.37.133.200:3000",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
