import { t, pageHeader } from '@/lib/styles'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div
      className="flex items-end justify-between flex-wrap gap-3"
      style={pageHeader}
    >
      <div>
        <h1 style={t.h1}>{title}</h1>
        {subtitle && (
          <p style={{ ...t.mono, marginTop: 6 }}>{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
