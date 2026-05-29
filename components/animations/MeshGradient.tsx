"use client";

import { motion } from "framer-motion";

interface MeshGradientProps {
  className?: string;
  /** Use the more saturated amber palette for CTA sections. */
  dark?: boolean;
}

/**
 * Organic, slowly-drifting blobs — a subtle premium backdrop. Animates only
 * transform/opacity (GPU). Decorative, so hidden from assistive tech.
 */
export function MeshGradient({ className, dark = false }: MeshGradientProps) {
  const blobs = dark
    ? ["rgba(249,115,22,0.30)", "rgba(217,119,6,0.28)", "rgba(180,83,9,0.26)"]
    : ["rgba(217,119,6,0.20)", "rgba(249,115,22,0.14)", "rgba(180,83,9,0.16)"];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {blobs.map((color, i) => (
        <motion.div
          key={i}
          className="absolute h-[40rem] w-[40rem] rounded-full blur-[120px]"
          style={{ background: color, top: `${i * 18 - 10}%`, left: `${i * 26 - 5}%` }}
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
