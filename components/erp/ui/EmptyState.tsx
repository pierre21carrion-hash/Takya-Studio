'use client'

interface EmptyStateProps {
  title: string
  description?: string
  ctaLabel?: string
  onCta?: () => void
}

export function EmptyState({ title, description, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center rounded-xl border"
      style={{ background: 'var(--card)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
    >
      <svg
        width="64" height="64" viewBox="0 0 64 64" fill="none"
        className="mb-5 opacity-30"
      >
        <path
          d="M10 20c0-2.2 1.8-4 4-4h20l6 8h10c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4V20z"
          stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        <path d="M32 36v8M28 40h8" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <h3
        className="mb-2 leading-tight"
        style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}
      >
        {title}
      </h3>

      {description && (
        <p className="mb-6 max-w-[260px]" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text3)' }}>
          {description}
        </p>
      )}

      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="px-5 py-2 text-sm font-semibold rounded-lg text-white cursor-pointer"
          style={{ background: 'var(--g)', fontFamily: 'var(--font-ui)', transition: 'all .15s' }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
