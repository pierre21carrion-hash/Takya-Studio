'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export const COLORES_CAT: Record<string, string> = {
  'Marketing Digital':  '#2C6EDB',
  'Herramientas':       '#6D3FCC',
  'Operaciones':        '#D4820A',
  'Salarios':           '#1B2A4A',
  'IA & APIs':          '#0891B2',
  'Hosting & Dominios': '#059669',
  'Impuestos SRI':      '#DC2626',
  'Otro':               '#B0A89F',
}

export interface CatItem {
  name: string
  value: number
  color: string
}

function usdFmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(0)}`
}

function pct(value: number, total: number) {
  if (!total) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

function TooltipContent({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as CatItem
  return (
    <div style={{ background: '#1B2A4A', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 16px rgba(27,42,74,.25)' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,.75)', marginBottom: 4 }}>{d.name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: d.color }}>{usdFmt(d.value)}</div>
    </div>
  )
}

export function DonutGastos({ data, total }: { data: CatItem[]; total: number }) {
  const sorted = [...data].sort((a, b) => b.value - a.value)

  return (
    <div className="flex gap-4">
      <div style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sorted}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {sorted.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<TooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#1C1714', letterSpacing: '-0.02em' }}>
            {usdFmt(total)}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#7A6F68', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Total
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center" style={{ gap: 8, flex: 1, minWidth: 0 }}>
        {sorted.map((item) => (
          <div key={item.name} className="flex items-center gap-2 min-w-0">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            <span className="truncate" style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#3D3530', flex: 1, minWidth: 0 }}>
              {item.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: '#1C1714', flexShrink: 0 }}>
              {usdFmt(item.value)}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#B0A89F', flexShrink: 0, minWidth: 28, textAlign: 'right' }}>
              {pct(item.value, total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
