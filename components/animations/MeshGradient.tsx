interface MeshGradientProps {
  className?: string;
  /** Use the more saturated palette for CTA sections. */
  dark?: boolean;
}

/**
 * Organic, slowly-drifting blobs — a subtle premium backdrop. Driven by a CSS
 * keyframe animation so it runs on the compositor (off the main thread), which
 * keeps Total Blocking Time low. Decorative, so hidden from assistive tech.
 */
export function MeshGradient({ className, dark = false }: MeshGradientProps) {
  const blobs = dark
    ? ["rgba(0,113,227,0.32)", "rgba(52,199,89,0.24)", "rgba(0,119,237,0.28)"]
    : ["rgba(0,113,227,0.10)", "rgba(52,199,89,0.08)", "rgba(0,119,237,0.07)"];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {blobs.map((color, i) => (
        <div
          key={i}
          className="animate-drift absolute h-[40rem] w-[40rem] rounded-full blur-[96px]"
          style={{
            background: color,
            top: `${i * 18 - 10}%`,
            left: `${i * 26 - 5}%`,
            animationDuration: `${18 + i * 4}s`,
            animationDelay: `${i * -4}s`,
          }}
        />
      ))}
    </div>
  );
}
