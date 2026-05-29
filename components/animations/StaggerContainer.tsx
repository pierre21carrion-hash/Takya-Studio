"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Orchestrates a waterfall reveal — pair with <StaggerItem> children. */
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
