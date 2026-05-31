interface MeshGradientProps {
  className?: string;
  /** Use the more saturated palette for CTA sections. */
  dark?: boolean;
}

/**
 * A single soft drifting glow per instance (2 total across the page). Uses a
 * radial-gradient background instead of a CSS `blur()` filter — same soft look,
 * a fraction of the GPU compositing cost. Decorative, hidden from a11y.
 */
export function MeshGradient({ className, dark = false }: MeshGradientProps) {
  const color = dark ? "rgba(0,113,227,0.30)" : "rgba(0,113,227,0.12)";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="animate-drift absolute h-[44rem] w-[44rem] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          top: "-12%",
          left: "-8%",
        }}
      />
    </div>
  );
}
