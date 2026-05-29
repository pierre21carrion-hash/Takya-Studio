"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  /** Opens an external link in a new tab (used for WhatsApp). */
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Magnetic button: the element eases toward the cursor on hover and springs
 * back on leave. Tactile press feedback via scale. Animates transform only.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external = false,
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
    variant === "primary"
      ? "bg-accent text-white shadow-[0_8px_24px_var(--shadow-accent)] hover:bg-accent-dark"
      : "border border-border bg-card text-foreground hover:border-accent/40 hover:text-accent-dark",
    className,
  );

  const motionProps = {
    ref,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.97 },
    className: styles,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </motion.button>
  );
}
