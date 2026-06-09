import { type ButtonHTMLAttributes } from 'react'

type Variant = 'green' | 'ghost' | 'red' | 'blue' | 'navy'
type Size = 'xs' | 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  green: 'bg-[var(--g)] text-white shadow-[0_2px_8px_var(--g-glow)] hover:brightness-110 hover:-translate-y-px hover:shadow-[0_6px_20px_var(--g-glow)]',
  ghost: 'bg-transparent border border-[var(--border2)] text-[var(--text2)] hover:bg-[var(--card2)]',
  red:   'bg-[var(--r-dim)] border border-[rgba(220,38,38,.20)] text-[var(--r)] hover:bg-[rgba(220,38,38,.18)]',
  blue:  'bg-[var(--b-dim)] border border-[rgba(37,99,235,.20)] text-[var(--b)] hover:bg-[rgba(37,99,235,.18)]',
  navy:  'bg-[var(--navy)] text-white shadow-[0_2px_8px_rgba(27,42,74,.25)] hover:bg-[#243660] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(27,42,74,.30)]',
}

const sizes: Record<Size, string> = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-[13px] rounded-[8px]',
  md: 'px-6 py-3.5 text-[15px] rounded-[10px]',
}

export function Button({ variant = 'green', size = 'md', loading, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-bold cursor-pointer border-none transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'var(--font-ui)', ...props.style }}
    >
      {loading ? '...' : children}
    </button>
  )
}
