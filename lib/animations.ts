import type { Variants, Transition } from "framer-motion";

/* Cinematic easing — entrances ease-out, exits ease-in (Emil Kowalski). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_EXPO = [0.16, 0.1, 0.3, 1] as const;

export const SPRING: Transition = { type: "spring", stiffness: 100, damping: 20 };
export const SOFT_SPRING: Transition = { type: "spring", stiffness: 80, damping: 18 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/** Shared viewport config so reveals fire once, slightly before fully on-screen. */
export const inViewOnce = { once: true, margin: "-80px" } as const;
