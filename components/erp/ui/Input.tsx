import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

const base = `w-full bg-[var(--card)] border border-[var(--border2)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] font-head outline-none transition-all focus:border-[var(--g)] focus:shadow-[0_0_0_3px_var(--g-dim)] placeholder:text-[var(--text4)]`

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ''}`} />
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${base} cursor-pointer ${props.className ?? ''}`}
      style={{ background: 'var(--card)', ...props.style }}>
      {children}
    </select>
  )
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} resize-vertical min-h-[70px] ${props.className ?? ''}`} />
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>
      {children}
    </label>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  )
}
