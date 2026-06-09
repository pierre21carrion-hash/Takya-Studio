'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer,
} from 'recharts'

function usdShort(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${Math.abs(v).toFixed(0)}`
}

function TooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const value = payload[0].value as number
  return (
    <div style={{ background: '#1B2A4A', borderRadius: 10, padding: '12px 16px', boxShadow: '0 8px 24px rgba(27,42,74,.30)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.45)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.10em' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: value >= 0 ? '#00C27A' : '#C5302A' }}>
        {value >= 0 ? '+' : '-'}{usdShort(value)}
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 4 }}>
        Utilidad neta
      </div>
    </div>
  )
}

interface BarData {
  mes: string
  utilidad: number
}

export function BarChartUtilidad({ data }: { data: BarData[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={28}>
        <CartesianGrid stroke="#EBE7DD" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="mes"
          tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#B0A89F' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#B0A89F' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={usdShort}
          width={40}
        />
        <Tooltip content={<TooltipContent />} cursor={{ fill: 'rgba(28,23,20,.04)' }} />
        <Bar dataKey="utilidad" radius={[4, 4, 0, 0]}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.utilidad >= 0 ? '#00C27A' : '#C5302A'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
