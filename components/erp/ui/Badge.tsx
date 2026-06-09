interface BadgeProps {
  variant?: 'green' | 'blue' | 'violet' | 'amber' | 'red' | 'neutral'
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const variants = {
  green:   { bg: 'var(--g-dim)',           color: 'var(--g)' },
  blue:    { bg: 'var(--b-dim)',           color: 'var(--b)' },
  violet:  { bg: 'var(--v-dim)',           color: 'var(--v)' },
  amber:   { bg: 'var(--a-dim)',           color: 'var(--a)' },
  red:     { bg: 'var(--r-dim)',           color: 'var(--r)' },
  neutral: { bg: 'rgba(28,23,20,.07)',     color: 'var(--text3)' },
}

export function Badge({ variant = 'neutral', children, style, className }: BadgeProps) {
  const v = variants[variant]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs font-semibold ${className ?? ''}`}
      style={{ background: v.bg, color: v.color, ...style }}
    >
      {children}
    </span>
  )
}
