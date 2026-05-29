"use client";

import { motion } from "framer-motion";

interface MeshGradientProps {
  className?: string;
  /** Use the darker emerald palette for CTA sections on dark backgrounds. */
  dark?: boolean;
}

/**
 * Organic, slowly-drifting blobs — a subtle premium backdrop. Animates only
 * transform/opacity (GPU). Decorative, so hidden from assistive tech.
 */
export function MeshGradient({ className, dark = false }: MeshGradientProps) {
  const blobs = dark
    ? ["rgba(16,185,129,0.35)", "rgba(5,150,105,0.25)", "rgba(4,120,87,0.30)"]
    : ["rgba(16,185,129,0.18)", "rgba(5,150,105,0.12)", "rgba(167,243,208,0.20)"];

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
