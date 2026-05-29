import { SITE_CONFIG } from "./constants";

/** Merge class names, dropping falsy values. Lightweight `cn` (no clsx dep). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Build a wa.me deep link with a pre-filled, URL-encoded message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Format a USD price without trailing decimals. */
export function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}
