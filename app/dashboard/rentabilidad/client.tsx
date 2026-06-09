'use client'

import { useMemo } from 'react'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { usd, monthKey } from '@/lib/types'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts'

const TARIFA_HORA = 25 // USD/hora por defecto

interface Props {
  proyectos: any[]
  ventas: any[]
  gastos: any[]
  horas: any[]
  users: any[]
}

export function RentabilidadClient({ proyectos, ventas, gastos, horas, users }: Props) {
  // ─── Por cliente ────────────────────────────────────────────────────────────
  const porCliente = useMemo(() => {
    const map: Record<string, { ingresos: number; costo: number; proyectos: number }> = {}
    ventas.forEach((v: any) => {
      if (!map[v.cliente]) map[v.cliente] = { ingresos: 0, costo: 0, proyectos: 0 }
      if (v.estado === 'pagado') map[v.cliente].ingresos += v.monto
      else if (v.estado === 'anticipo') map[v.cliente].ingresos += v.monto * 0.5
    })
    proyectos.forEach((p: any) => {
      if (!map[p.cliente]) map[p.cliente] = { ingresos: 0, costo: 0, proyectos: 0 }
      map[p.cliente].proyectos++
      const horasProyecto = horas
        .filter((h: any) => h.proyecto_id === p.id)
        .reduce((s: number, h: any) => s + h.horas, 0)
      map[p.cliente].costo += horasProyecto * TARIFA_HORA
    })
    return Object.entries(map)
      .map(([cliente, d]) => ({
        cliente,
        ingresos: d.ingresos,
        costo: d.costo,
        margen: d.ingresos > 0 ? Math.round((1 - d.costo / d.ingresos) * 100) : 0,
        proyectos: d.proyectos,
        ltv: d.ingresos,
      }))
      .sort((a, b) => b.ingresos - a.ingresos)
      .slice(0, 10)
  }, [proyectos, ventas, horas])

  // ─── Por mes ─────────────────────────────────────────────────────────────────
  const porMes = useMemo(() => {
    const map: Record<string, { ingresos: number; costos: number }> = {}
    ventas.forEach((v: any) => {
      const m = monthKey(v.fecha)
      if (!m) return
      if (!map[m]) map[m] = { ingresos: 0, costos: 0 }
      if (v.estado === 'pagado') map[m].ingresos += v.monto
    })
    gastos.forEach((g: any) => {
      const m = monthKey(g.fecha)
      if (!m) return
      if (!map[m]) map[m] = { ingresos: 0, costos: 0 }
      map[m].costos += g.monto
    })
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([mes, d]) => ({ mes, ...d, utilidad: d.ingresos - d.costos }))
  }, [ventas, gastos])

  // ─── KPIs globales ───────────────────────────────────────────────────────────
  const totalIngresos = ventas
    .filter((v: any) => v.estado === 'pagado')
    .reduce((s: number, v: any) => s + v.monto, 0)
  const totalGastos = gastos.reduce((s: number, g: any) => s + g.monto, 0)
  const totalHoras = horas.reduce((s: number, h: any) => s + h.horas, 0)
  const costoEquipo = users.reduce((s: number, u: any) => s + (u.salario || 0), 0)
  const margenGlobal = totalIngresos > 0 ? Math.round((1 - totalGastos / totalIngresos) * 100) : 0

  const clientesBajoMargen = porCliente.filter(c => c.ingresos > 0 && c.margen < 40)

  return (
    <div>
      <PageHeader
        title="Análisis de Rentabilidad"
        subtitle={`Tarifa interna: $${TARIFA_HORA}/hora · ${totalHoras}h registradas en total`}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Ingresos cobrados',  value: usd(totalIngresos), color: '#00C27A' },
          { label: 'Gastos totales',     value: usd(totalGastos),   color: '#DC2626' },
          { label: 'Margen global',      value: `${margenGlobal}%`, color: margenGlobal >= 40 ? '#00C27A' : '#D4820A' },
          { label: 'Costo equipo/mes',   value: usd(costoEquipo),   color: '#7C3AED' },
        ].map(k => (
          <div key={k.label} className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)', borderTopWidth: 3, borderTopColor: k.color }}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>{k.label}</div>
            <div className="font-black text-2xl font-mono" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Alerta bajo margen */}
      {clientesBajoMargen.length > 0 && (
        <div className="rounded-xl p-4 mb-6 flex items-start gap-3"
          style={{ background: 'rgba(212,130,10,.08)', border: '1px solid rgba(212,130,10,.25)', borderLeftWidth: 4, borderLeftColor: '#D4820A' }}>
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <div className="font-bold text-sm mb-1" style={{ color: '#D4820A' }}>
              {clientesBajoMargen.length} cliente{clientesBajoMargen.length > 1 ? 's' : ''} con margen &lt; 40%
            </div>
            <div className="text-xs" style={{ color: 'var(--text2)' }}>
              {clientesBajoMargen.map(c => c.cliente).join(', ')} — considera revisar tarifas o reducir tiempo de entrega.
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Top clientes */}
        <div className="rounded-2xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-bold text-base mb-4" style={{ color: 'var(--text)' }}>Top 10 clientes por ingresos</div>
          {porCliente.length === 0 ? (
            <div className="text-sm text-center py-10" style={{ color: 'var(--text3)' }}>Sin datos aún</div>
          ) : (
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={porCliente} layout="vertical" margin={{ left: 0, right: 24 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'var(--font-mono)', fill: 'var(--text3)' }} tickFormatter={v => `$${v}`} />
                  <YAxis type="category" dataKey="cliente" width={100} tick={{ fontSize: 10, fontFamily: 'var(--font-mono)', fill: 'var(--text3)' }} />
                  <Tooltip formatter={(v: unknown) => usd(Number(v))} contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11 }} />
                  <Bar dataKey="ingresos" radius={[0, 4, 4, 0]}>
                    {porCliente.map((c, i) => (
                      <Cell key={i} fill={c.margen >= 40 ? '#00C27A' : c.margen >= 20 ? '#D97706' : '#DC2626'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Ingresos vs costos por mes */}
        <div className="rounded-2xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-bold text-base mb-4" style={{ color: 'var(--text)' }}>Ingresos vs Gastos (últimos 6 meses)</div>
          {porMes.length === 0 ? (
            <div className="text-sm text-center py-10" style={{ color: 'var(--text3)' }}>Sin datos aún</div>
          ) : (
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={porMes} margin={{ left: 0, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10, fontFamily: 'var(--font-mono)', fill: 'var(--text3)' }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'var(--font-mono)', fill: 'var(--text3)' }} tickFormatter={v => `$${v}`} />
                  <Tooltip formatter={(v: unknown) => usd(Number(v))} contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                  <Line type="monotone" dataKey="ingresos" stroke="#00C27A" strokeWidth={2} dot={{ fill: '#00C27A', r: 3 }} name="Ingresos" />
                  <Line type="monotone" dataKey="costos" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#DC2626', r: 3 }} name="Gastos" />
                  <Line type="monotone" dataKey="utilidad" stroke="#2563EB" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Utilidad" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Tabla detallada por cliente */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="px-5 py-3 border-b font-bold text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
          Detalle por cliente
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--card2)', borderBottom: '1px solid var(--border)' }}>
                {['Cliente', 'LTV / Ingresos', 'Costo estimado', 'Margen', 'Proyectos'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {porCliente.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text3)' }}>Sin datos de clientes aún</td></tr>
              ) : porCliente.map(c => (
                <tr key={c.cliente} className="border-b hover:bg-[var(--card2)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-semibold text-sm" style={{ color: 'var(--text)' }}>{c.cliente}</td>
                  <td className="px-4 py-3 font-mono font-bold text-sm" style={{ color: '#00C27A' }}>{usd(c.ltv)}</td>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--text2)' }}>{usd(c.costo)}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        background: c.margen >= 40 ? 'rgba(0,194,122,.12)' : c.margen >= 20 ? 'rgba(212,130,10,.12)' : 'rgba(220,38,38,.12)',
                        color: c.margen >= 40 ? '#00C27A' : c.margen >= 20 ? '#D4820A' : '#DC2626',
                      }}>
                      {c.margen}%
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--text3)' }}>{c.proyectos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
