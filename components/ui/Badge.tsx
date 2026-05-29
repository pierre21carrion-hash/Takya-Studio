import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  /** Subtle pulsing dot — used for the "Más popular" pricing flag. */
  pulse?: boolean;
}

export function Badge({ children, className, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-muted px-3 py-1 text-xs font-medium text-accent-dark",
        className,
      )}
    >
      {pulse && <span className="animate-pulsedot h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
