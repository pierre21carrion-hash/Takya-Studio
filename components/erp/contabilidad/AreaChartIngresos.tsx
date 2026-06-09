'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface MesData {
  mes: string
  ingresos: number
  gastos: number
  utilidad: number
}

function usdShort(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${v.toFixed(0)}`
}

function TooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: '#1B2A4A',
        borderRadius: 10,
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(27,42,74,.30)',
        minWidth: 150,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'rgba(255,255,255,.45)',
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
        }}
      >
        {label}
      </div>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-1.5">
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: entry.color,
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,.65)' }}>
            {entry.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              color: entry.color,
              marginLeft: 'auto',
            }}
          >
            {usdShort(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function AreaChartIngresos({ data }: { data: MesData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="gradIng" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#00C27A" stopOpacity={0.20} />
            <stop offset="95%" stopColor="#00C27A" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradGas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#C5302A" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#C5302A" stopOpacity={0.02} />
          </linearGradient>
        </defs>

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
          width={44}
        />

        <Tooltip content={<TooltipContent />} cursor={{ stroke: '#EBE7DD', strokeWidth: 1 }} />

        <Area
          type="monotone"
          dataKey="ingresos"
          name="Ingresos"
          stroke="#00C27A"
          strokeWidth={2}
          fill="url(#gradIng)"
          dot={false}
          activeDot={{ r: 4, fill: '#00C27A', strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="gastos"
          name="Gastos"
          stroke="#C5302A"
          strokeWidth={2}
          fill="url(#gradGas)"
          dot={false}
          activeDot={{ r: 4, fill: '#C5302A', strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="utilidad"
          name="Utilidad"
          stroke="#2C6EDB"
          strokeWidth={2}
          strokeDasharray="5 5"
          fill="none"
          dot={false}
          activeDot={{ r: 4, fill: '#2C6EDB', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
