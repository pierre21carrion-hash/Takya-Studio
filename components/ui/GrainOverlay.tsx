/** Fixed, ultra-subtle film grain over the whole page. Decorative + inert. */
export function GrainOverlay() {
  return (
    <div
      className="grain pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-multiply"
      aria-hidden="true"
    />
  );
}
