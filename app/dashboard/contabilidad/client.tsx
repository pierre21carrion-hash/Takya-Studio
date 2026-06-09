'use client'

import { useState, useMemo } from 'react'
import { crearGasto } from '@/app/actions/gastos'
import { Button } from '@/components/erp/ui/Button'
import { Input, Select } from '@/components/erp/ui/Input'
import { KpiCard } from '@/components/erp/ui/Card'
import { useToast } from '@/components/erp/ui/Toast'
import { usd, curMonth, monthKey } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { PeriodSelector, type Period } from '@/components/erp/contabilidad/PeriodSelector'
import { AreaChartIngresos, type MesData } from '@/components/erp/contabilidad/AreaChartIngresos'
import { DonutGastos, COLORES_CAT, type CatItem } from '@/components/erp/contabilidad/DonutGastos'
import { BarChartUtilidad } from '@/components/erp/contabilidad/BarChartUtilidad'
import { MetricasTendencia } from '@/components/erp/contabilidad/MetricasTendencia'
import { PageHeader } from '@/components/erp/layout/PageHeader'

const CATEGORIAS = ['Marketing Digital', 'Herramientas', 'Hosting & Dominios', 'IA & APIs', 'Impuestos SRI', 'Otro']

function keyToLabel(key: string) {
  try {
    const d = new Date(key + '-01')
    return d.toLocaleDateString('es-EC', { month: 'short' })
      .replace('.', '').replace(/^./, (c) => c.toUpperCase())
  } catch {
    return key
  }
}

interface Props {
  ventas: any[]
  gastos: any[]
}

export function ContabilidadClient({ ventas, gastos }: Props) {
  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState<Period>('6 meses')
  const { toast } = useToast()
  const router = useRouter()

  const mes = curMonth()
  const vtasMes = ventas.filter((v: any) => monthKey(v.fecha) === mes)
  const gastMes = gastos.filter((g: any) => monthKey(g.fecha) === mes)

  const ing = vtasMes.reduce((s: number, v: any) =>
    s + (v.estado === 'pagado' ? v.monto : v.estado === 'anticipo' ? v.monto * 0.5 : 0), 0)
  const gas    = gastMes.reduce((s: number, g: any) => s + g.monto, 0)
  const util   = ing - gas
  const margin = ing > 0 ? (util / ing) * 100 : 0

  const cxc = ventas.filter((v: any) => v.estado !== 'pagado')
    .reduce((s: number, v: any) => s + (v.estado === 'anticipo' ? v.monto * 0.5 : v.monto), 0)
  const pendientes = ventas.filter((v: any) => v.estado !== 'pagado').length

  const planes: Record<string, number> = {}
  vtasMes.forEach((v: any) => { planes[v.plan] = (planes[v.plan] || 0) + v.monto })

  const cats: Record<string, number> = {}
  gastMes.forEach((g: any) => { cats[g.categoria] = (cats[g.categoria] || 0) + g.monto })

  const movs = [
    ...vtasMes.filter((v: any) => v.estado === 'pagado').map((v: any) => ({
      fecha: v.fecha, concepto: `${v.cliente} — ${v.plan}`, tipo: 'E' as const, monto: v.monto,
    })),
    ...gastMes.map((g: any) => ({
      fecha: g.fecha, concepto: g.descripcion, tipo: 'S' as const, monto: g.monto,
    })),
  ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

  const allChartData: MesData[] = useMemo(() => {
    const ingMap: Record<string, number> = {}
    const gasMap: Record<string, number> = {}

    ventas.forEach((v: any) => {
      if (v.estado === 'pagado') {
        const key = v.fecha?.slice(0, 7)
        if (key) ingMap[key] = (ingMap[key] || 0) + v.monto
      }
    })
    gastos.forEach((g: any) => {
      const key = g.fecha?.slice(0, 7)
      if (key) gasMap[key] = (gasMap[key] || 0) + g.monto
    })

    const allKeys = new Set([...Object.keys(ingMap), ...Object.keys(gasMap)])
    if (allKeys.size === 0) return []

    return Array.from(allKeys).sort().map((key) => {
      const i = ingMap[key] || 0
      const g = gasMap[key] || 0
      return { mes: keyToLabel(key), ingresos: i, gastos: g, utilidad: i - g }
    })
  }, [ventas, gastos])

  const chartData = useMemo((): MesData[] => {
    switch (period) {
      case 'Este mes':  return allChartData.slice(-1)
      case '3 meses':   return allChartData.slice(-3)
      case '6 meses':   return allChartData.slice(-6)
      case 'Este año':  return allChartData
      default:          return allChartData
    }
  }, [period, allChartData])

  const donutData: CatItem[] = useMemo(() => {
    const entries = Object.entries(cats)
    if (entries.length > 0) {
      return entries.map(([name, value]) => ({
        name, value, color: COLORES_CAT[name] ?? '#B0A89F',
      }))
    }
    return []
  }, [cats])

  const donutTotal = donutData.reduce((s, d) => s + d.value, 0)

  const ticketPromedio = vtasMes.length > 0 ? ing / vtasMes.length : 0
  const diasTranscurridos = new Date().getDate()
  const proyeccionMes = diasTranscurridos > 0 ? (ing / diasTranscurridos) * 30 : 0

  function exportCSV() {
    const rows = [['Fecha', 'Cliente', 'Plan', 'Monto', 'Estado', 'Responsable']]
    ventas.forEach((v: any) => rows.push([v.fecha, v.cliente, v.plan, v.monto, v.estado, v.responsable?.nombre ?? '—']))
    const csv = rows.map((r) => r.map((x) => `"${x}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv)
    a.download = `takya-ventas-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    toast('CSV exportado', '↓')
  }

  async function handleGasto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const result = await crearGasto(fd)
    setLoading(false)
    if (result?.error) toast(result.error, '⚠')
    else {
      toast('Gasto registrado', '✓')
      ;(e.target as HTMLFormElement).reset()
      router.refresh()
    }
  }

  const fmt = (d: string) => d?.split('-').reverse().join('/') ?? '—'

  return (
    <div>
      <PageHeader
        title="Contabilidad"
        subtitle="P&L · Flujo de Caja · Análisis financiero en tiempo real"
        actions={
          <Button variant="ghost" size="sm" onClick={exportCSV}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1 10.5h11"/>
            </svg>
            Exportar CSV
          </Button>
        }
      />

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 20, marginBottom: 32 }}>
        <KpiCard
          label="Ingresos mes"
          accent="#00C27A"
          value={usd(ing)}
          trend={vtasMes.length > 0
            ? { label: `${vtasMes.length} ventas este mes`, positive: true }
            : { label: 'Sin ventas aún', neutral: true }}
          detail={gas > 0 ? `${usd(gas)} en gastos` : undefined}
        />
        <KpiCard
          label="Gastos mes"
          accent="#C5302A"
          value={usd(gas)}
          trend={gastMes.length > 0
            ? { label: `${gastMes.length} registros`, positive: false }
            : { label: 'Sin gastos aún', neutral: true }}
          detail={gastMes.length > 0 ? `${Object.keys(cats).length} categorías` : undefined}
        />
        <KpiCard
          label="Utilidad neta"
          accent="#2C6EDB"
          value={usd(util)}
          trend={margin > 50
            ? { label: `${margin.toFixed(0)}% de margen`, positive: true }
            : margin > 0
            ? { label: `${margin.toFixed(0)}% de margen`, neutral: true }
            : { label: '—', neutral: true }}
          detail={ing > 0 ? `Ingresos - gastos del mes` : undefined}
        />
        <KpiCard
          label="Por cobrar"
          accent="#D4820A"
          value={usd(cxc)}
          trend={pendientes > 0
            ? { label: `${pendientes} facturas pendientes`, positive: false }
            : { label: 'Todo cobrado', positive: true }}
          detail="Anticipos + pendientes"
        />
      </div>

      {/* GRÁFICA ÁREA */}
      <div
        className="rounded-[14px] border"
        style={{ background: '#ffffff', borderColor: 'rgba(28,23,20,.14)', padding: '24px 28px', marginBottom: 20, boxShadow: '0 2px 8px rgba(28,23,20,.06)' }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap" style={{ marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
              Ingresos vs Gastos
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A6F68', marginTop: 4 }}>
              Histórico real · {allChartData.length} mes{allChartData.length !== 1 ? 'es' : ''} con datos
            </p>
          </div>
          <PeriodSelector active={period} onChange={setPeriod} />
        </div>

        {chartData.length >= 1 ? (
          <>
            <AreaChartIngresos data={chartData} />
            <div className="flex items-center justify-center" style={{ gap: 24, marginTop: 16 }}>
              {[
                { color: '#00C27A', label: 'Ingresos' },
                { color: '#C5302A', label: 'Gastos' },
                { color: '#2C6EDB', label: 'Utilidad', dashed: true },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span style={{ width: l.dashed ? 16 : 8, height: 2, background: l.dashed ? `repeating-linear-gradient(90deg,${l.color} 0,${l.color} 4px,transparent 4px,transparent 7px)` : l.color, borderRadius: l.dashed ? 0 : 99, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A6F68' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center" style={{ height: 280, gap: 12 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#D8D2C8" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="3,28 10,18 17,22 30,8"/>
              <path d="M24 8h6v6"/>
            </svg>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#7A6F68' }}>Sin datos históricos aún</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B0A89F' }}>Registra ventas y gastos para ver la gráfica</div>
          </div>
        )}
      </div>

      {/* DONUT + BARRAS */}
      <div className="grid md:grid-cols-2" style={{ gap: 20, marginBottom: 20 }}>
        <div className="rounded-[14px] border" style={{ background: '#ffffff', borderColor: 'rgba(28,23,20,.14)', padding: '24px', boxShadow: '0 2px 8px rgba(28,23,20,.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
            Distribución de Gastos
          </h2>
          {donutData.length > 0 ? (
            <DonutGastos data={donutData} total={donutTotal} />
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#D8D2C8" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 12 }}>
                <circle cx="18" cy="18" r="14"/>
                <path d="M18 4v14l10 5"/>
              </svg>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#7A6F68' }}>Sin gastos registrados</div>
            </div>
          )}
        </div>

        <div className="rounded-[14px] border" style={{ background: '#ffffff', borderColor: 'rgba(28,23,20,.14)', padding: '24px', boxShadow: '0 2px 8px rgba(28,23,20,.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
            Utilidad Neta por Mes
          </h2>
          {allChartData.length >= 1 ? (
            <BarChartUtilidad data={allChartData.map((d) => ({ mes: d.mes, utilidad: d.utilidad }))} />
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ height: 220 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#B0A89F' }}>Sin datos históricos</div>
            </div>
          )}
        </div>
      </div>

      {/* MÉTRICAS TENDENCIA */}
      <MetricasTendencia
        ticketPromedio={ticketPromedio}
        proyeccionMes={proyeccionMes}
        margenOperativo={margin}
        tendenciaTicket={vtasMes.length > 0 ? 'up' : 'neutral'}
      />

      {/* TABLAS DETALLE */}
      <div className="grid md:grid-cols-2" style={{ gap: 20 }}>
        <div>
          {/* P&L */}
          <div className="rounded-[12px] border overflow-hidden" style={{ background: '#ffffff', borderColor: 'rgba(28,23,20,.14)', marginBottom: 20 }}>
            <div style={{ background: '#F0EDE5', padding: '12px 16px', borderBottom: '1px solid rgba(28,23,20,.10)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A6F68' }}>
                Estado de Resultados · Mes actual
              </span>
            </div>
            <div className="flex justify-between items-center" style={{ padding: '10px 16px', background: 'rgba(0,194,122,.04)', borderBottom: '1px solid rgba(28,23,20,.06)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B2A4A' }}>Ingresos</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#00C27A' }}>{usd(ing)}</span>
            </div>
            {Object.entries(planes).map(([p, v]) => (
              <div key={p} className="flex justify-between items-center" style={{ padding: '9px 24px', borderBottom: '1px solid rgba(28,23,20,.06)' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#3D3530' }}>{p}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#00C27A' }}>{usd(v as number)}</span>
              </div>
            ))}
            {Object.keys(planes).length === 0 && (
              <div style={{ padding: '9px 24px', borderBottom: '1px solid rgba(28,23,20,.06)', fontFamily: 'var(--font-ui)', fontSize: 12, color: '#B0A89F' }}>Sin ventas este mes</div>
            )}
            <div className="flex justify-between items-center" style={{ padding: '10px 16px', background: 'rgba(197,48,42,.04)', borderBottom: '1px solid rgba(28,23,20,.06)', marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1B2A4A' }}>Gastos</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#C5302A' }}>-{usd(gas)}</span>
            </div>
            {Object.entries(cats).map(([c, v]) => (
              <div key={c} className="flex justify-between items-center" style={{ padding: '9px 24px', borderBottom: '1px solid rgba(28,23,20,.06)' }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORES_CAT[c] ?? '#B0A89F', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#3D3530' }}>{c}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#C5302A' }}>-{usd(v as number)}</span>
              </div>
            ))}
            {Object.keys(cats).length === 0 && (
              <div style={{ padding: '9px 24px', borderBottom: '1px solid rgba(28,23,20,.06)', fontFamily: 'var(--font-ui)', fontSize: 12, color: '#B0A89F' }}>Sin gastos este mes</div>
            )}
            <div className="flex justify-between items-center" style={{ padding: '14px 16px', background: '#1B2A4A' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: '#fff' }}>UTILIDAD NETA</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: util >= 0 ? '#00C27A' : '#C5302A' }}>
                {util >= 0 ? '' : '-'}{usd(Math.abs(util))}
              </span>
            </div>
          </div>

          {/* Registrar gasto */}
          <div className="rounded-[12px] border" style={{ background: '#F0EDE5', borderColor: 'rgba(28,23,20,.12)', padding: '20px 24px' }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              Registrar Gasto
            </h3>
            <form onSubmit={handleGasto}>
              <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 12 }}>
                <Input name="descripcion" placeholder="Descripción" required className="col-span-2" />
                <Input name="monto" type="number" step="0.01" placeholder="Monto $" required />
                <Select name="categoria">
                  {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <Button type="submit" variant="green" loading={loading} className="w-full" style={{ height: 44 }}>
                + Registrar gasto
              </Button>
            </form>
          </div>
        </div>

        {/* Flujo de caja */}
        <div>
          <div className="rounded-[12px] border overflow-hidden" style={{ background: '#ffffff', borderColor: 'rgba(28,23,20,.14)' }}>
            <div style={{ background: '#F0EDE5', padding: '12px 16px', borderBottom: '1px solid rgba(28,23,20,.10)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A6F68' }}>
                Flujo de Caja · Movimientos recientes
              </span>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(28,23,20,.08)' }}>
                  {['Fecha', 'Concepto', 'Tipo', 'Monto'].map((h) => (
                    <th key={h} className="text-left" style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#B0A89F' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movs.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '24px', textAlign: 'center', fontFamily: 'var(--font-ui)', fontSize: 13, color: '#B0A89F' }}>
                      Sin movimientos — registra ventas o gastos
                    </td>
                  </tr>
                ) : (
                  movs.slice(0, 20).map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(28,23,20,.06)' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A6F68', whiteSpace: 'nowrap' }}>{fmt(m.fecha)}</td>
                      <td style={{ padding: '10px 14px', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-ui)', fontSize: 13, color: '#3D3530' }}>{m.concepto}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: m.tipo === 'E' ? 'rgba(0,194,122,.12)' : 'rgba(197,48,42,.10)', color: m.tipo === 'E' ? '#00C27A' : '#C5302A', whiteSpace: 'nowrap' }}>
                          {m.tipo === 'E' ? '↑ Entrada' : '↓ Salida'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: m.tipo === 'E' ? '#00C27A' : '#C5302A', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {m.tipo === 'E' ? '+' : '-'}{usd(m.monto)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
