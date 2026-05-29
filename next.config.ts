import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drop console.* calls from the production bundle (SWC/Turbopack-safe).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
