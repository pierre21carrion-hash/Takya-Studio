import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drop console.* calls from the production bundle (SWC/Turbopack-safe).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Tree-shake big barrel packages so we only ship the icons/exports actually
  // used — cuts JS parse/execute (the main Total Blocking Time driver).
  experimental: {
    optimizePackageImports: ["framer-motion", "@phosphor-icons/react"],
  },
};

export default nextConfig;
