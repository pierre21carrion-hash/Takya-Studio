import type { Variants, Transition } from "framer-motion";

/* Cinematic easing — kept for components that import it directly. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_EXPO = [0.16, 0.1, 0.3, 1] as const;
/* Standard ease for reveals — snappier, less "heavy" entrance feel. */
export const EASE_STANDARD = [0.25, 0.1, 0.25, 1] as const;

export const SPRING: Transition = { type: "spring", stiffness: 100, damping: 20 };
export const SOFT_SPRING: Transition = { type: "spring", stiffness: 80, damping: 18 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_STANDARD } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_STANDARD } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/** Shared viewport config so reveals fire once, slightly before fully on-screen. */
export const inViewOnce = { once: true, margin: "-80px" } as const;
