"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds the cursor-following spotlight + hairline highlight. */
  spotlight?: boolean;
}

/**
 * Surface card with an optional spotlight that tracks the cursor — a soft
 * radial highlight plus a brightening border, no neon glow.
 */
export function Card({ children, className, spotlight = true }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={spotlight ? handleMove : undefined}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border bg-card",
        className,
      )}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, var(--accent-muted), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
