"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds the cursor-following spotlight + hairline highlight. */
  spotlight?: boolean;
}

/**
 * Surface card with an optional spotlight that tracks the cursor. The cursor
 * position lives in motion values + a motion template, so moving the mouse
 * updates the gradient WITHOUT triggering a React re-render. Visibility is
 * handled purely by CSS group-hover.
 */
export function Card({ children, className, spotlight = true }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, var(--accent-muted), transparent 60%)`;

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={spotlight ? handleMove : undefined}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border bg-card",
        className,
      )}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
