import type { NextConfig } from "next";

// Content-Security-Policy. The iframe allow-list must match the live portfolio
// projects (frame-src) so the previewer can embed them.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Next needs inline scripts for hydration; 'unsafe-eval' kept for safety with
  // animation libs. (No nonce pipeline on a static export.)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src 'self' https://pueblos-magicos-arquitectura.vercel.app https://expo-turismo-sostenible-2026.vercel.app https://llano-grande.vercel.app",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
];

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
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
