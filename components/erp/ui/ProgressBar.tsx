interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
}

export function ProgressBar({ value, max = 100, showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 overflow-hidden"
        style={{ height: 4, borderRadius: 2, background: '#EBE7DD' }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: '#00C27A',
            borderRadius: 2,
            transition: 'width .4s ease',
          }}
        />
      </div>
      {showLabel && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', flexShrink: 0 }}>
          {pct}%
        </span>
      )}
    </div>
  )
}
