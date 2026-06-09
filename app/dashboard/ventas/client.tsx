'use client'

import { useState, useMemo } from 'react'
import { crearVenta } from '@/app/actions/ventas'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select } from '@/components/erp/ui/Input'
import { useToast } from '@/components/erp/ui/Toast'
import { usd, usd2, curMonth, monthKey, initials } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/erp/layout/PageHeader'

const PLANES = [
  { nombre: 'Plan Inicio',   monto: 149 },
  { nombre: 'Plan Escala',   monto: 249 },
  { nombre: 'Plan Dominio',  monto: 449 },
  { nombre: 'Personalizado', monto: 0   },
]

const ORÍGENES = ['Google Ads', 'Meta Ads', 'Referido', 'LinkedIn', 'Orgánico', 'Otro']

function clientColor(name: string) {
  const p = ['#00C27A', '#2563EB', '#7C3AED', '#D97706', '#0891B2', '#059669', '#D946EF']
  const h = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return p[h % p.length]
}

interface Props {
  ventas: any[]
  users: any[]
}

export function VentasClient({ ventas, users }: Props) {
  const [planActivo, setPlanActivo]   = useState('Plan Inicio')
  const [monto, setMonto]             = useState(149)
  const [mantenimiento, setManten]    = useState(false)
  const [loading, setLoading]         = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const today = new Date().toISOString().slice(0, 10)

  const subtotal = monto / 1.12
  const iva      = monto - subtotal
  const total    = monto

  const mes = curMonth()
  const vtasMes  = ventas.filter((v: any) => monthKey(v.fecha) === mes)
  const ingMes   = vtasMes.filter((v: any) => v.estado === 'pagado')
    .reduce((s: number, v: any) => s + v.monto, 0)
  const nPagadas  = vtasMes.filter((v: any) => v.estado === 'pagado').length
  const nPendient = vtasMes.filter((v: any) => v.estado === 'pendiente').length
  const nAnticipo = vtasMes.filter((v: any) => v.estado === 'anticipo').length

  function handlePlanChange(nombre: string) {
    const p = PLANES.find((x) => x.nombre === nombre)
    setPlanActivo(nombre)
    if (p && p.monto > 0) setMonto(p.monto)
    else if (p?.monto === 0) setMonto(0)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set('monto', String(monto))
    const result = await crearVenta(fd)
    setLoading(false)
    if (result?.error) toast(result.error, '⚠')
    else {
      toast(`Venta ${usd(monto)} registrada`, '✓')
      ;(e.target as HTMLFormElement).reset()
      setPlanActivo('Plan Inicio')
      setMonto(149)
      setManten(false)
      router.refresh()
    }
  }

  const fmt = (d: string) => d?.split('-').reverse().join('/') ?? '—'

  return (
    <div>
      <PageHeader
        title="Ventas"
        subtitle={vtasMes.length > 0
          ? `${vtasMes.length} venta${vtasMes.length > 1 ? 's' : ''} este mes · ${usd(ingMes)} en ingresos`
          : 'Sin ventas registradas este mes'}
        actions={<div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const rows = [['Fecha', 'Cliente', 'Plan', 'Monto', 'Estado', 'Responsable', 'Origen']]
                ventas.forEach((v: any) => rows.push([v.fecha, v.cliente, v.plan, v.monto, v.estado, v.responsable?.nombre ?? '—', v.origen ?? '—']))
                const csv = rows.map((r) => r.map((x) => `"${x}"`).join(',')).join('\n')
                const a = document.createElement('a')
                a.href = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv)
                a.download = `takya-ventas-${new Date().toISOString().slice(0, 10)}.csv`
                a.click()
                toast('CSV exportado', '↓')
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1 10.5h11"/>
              </svg>
              Exportar CSV
            </Button>
          </div>}
      />

      {/* ─── KPI ROW ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 14, marginBottom: 28 }}>
        {[
          { label: 'TOTAL MES',   value: usd(ingMes),      accent: '#00C27A' },
          { label: 'PAGADAS',     value: String(nPagadas),  accent: '#00C27A' },
          { label: 'PENDIENTES',  value: String(nPendient), accent: '#D4820A' },
          { label: 'ANTICIPO',    value: String(nAnticipo), accent: '#2C6EDB' },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-[10px] border"
            style={{
              background: '#ffffff',
              borderColor: 'rgba(28,23,20,.14)',
              borderTopColor: k.accent,
              borderTopWidth: 3,
              padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(28,23,20,.05)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A6F68', marginBottom: 8 }}>
              {k.label}
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700, color: '#1C1714', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* ─── 2-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div className="grid md:grid-cols-[3fr_2fr]" style={{ gap: 20, alignItems: 'start' }}>

        {/* ── FORM NUEVA VENTA ── */}
        <div
          className="rounded-[14px] border"
          style={{
            background: '#ffffff',
            borderColor: 'rgba(28,23,20,.14)',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(28,23,20,.06)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
            Nueva venta
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="plan" value={planActivo} />

            <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
              <Field label="Cliente *">
                <Input name="cliente" placeholder="Valeria Morocho" required style={{ height: 44 }} />
              </Field>
              <Field label="Negocio">
                <Input name="negocio" placeholder="Pastelería Dulce" style={{ height: 44 }} />
              </Field>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
              <Field label="Plan *">
                <Select
                  value={planActivo}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  style={{ height: 44 }}
                >
                  {PLANES.map((p) => (
                    <option key={p.nombre} value={p.nombre}>
                      {p.monto > 0 ? `${p.nombre} — $${p.monto}` : p.nombre}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Monto USD *">
                <Input
                  name="monto"
                  type="number"
                  min="1"
                  step="0.01"
                  value={monto || ''}
                  onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                  required
                  style={{ height: 44 }}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
              <Field label="Fecha *">
                <Input name="fecha" type="date" defaultValue={today} style={{ height: 44 }} />
              </Field>
              <Field label="Estado de cobro *">
                <Select name="estado" style={{ height: 44 }}>
                  <option value="pagado">Pagado ✓</option>
                  <option value="anticipo">Anticipo 50%</option>
                  <option value="pendiente">Pendiente</option>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
              <Field label="Responsable">
                <Select name="responsable_id" style={{ height: 44 }}>
                  <option value="">Sin asignar</option>
                  {users.map((u: any) => (
                    <option key={u.id} value={u.id}>{u.nombre}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Canal de origen">
                <Select name="origen" style={{ height: 44 }}>
                  {ORÍGENES.map((o) => <option key={o}>{o}</option>)}
                </Select>
              </Field>
            </div>

            {/* Toggle mantenimiento */}
            <label
              className="flex items-center justify-between cursor-pointer rounded-[10px] border"
              style={{ padding: '14px 16px', background: '#F0EDE5', borderColor: 'rgba(28,23,20,.12)', marginBottom: 16 }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#1C1714' }}>
                  Incluir mantenimiento mensual
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A6F68', marginTop: 2 }}>
                  Recurrente · <span style={{ color: '#00C27A', fontWeight: 600 }}>+$49/mes</span>
                </div>
              </div>
              <div
                onClick={() => setManten(!mantenimiento)}
                style={{
                  width: 44, height: 24, borderRadius: 999,
                  background: mantenimiento ? '#00C27A' : '#D8D2C8',
                  position: 'relative', transition: 'background .15s ease', flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute', top: 3,
                  left: mantenimiento ? 23 : 3,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#fff', boxShadow: '0 1px 4px rgba(28,23,20,.20)',
                  transition: 'left .15s ease',
                }} />
                <input type="checkbox" name="mantenimiento" checked={mantenimiento} onChange={() => setManten(!mantenimiento)} className="sr-only" />
              </div>
            </label>

            {/* Fiscal breakdown */}
            {monto > 0 && (
              <div
                className="rounded-[8px]"
                style={{ background: '#F0EDE5', border: '1px solid rgba(28,23,20,.10)', padding: '12px 16px', marginBottom: 20 }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A6F68', marginBottom: 10 }}>
                  Cálculo fiscal · Ecuador IVA 12%
                </div>
                {[
                  { label: 'Subtotal s/IVA', value: usd2(subtotal), color: '#3D3530' },
                  { label: 'IVA 12%',         value: usd2(iva),      color: '#D4820A' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between" style={{ borderBottom: '1px solid rgba(28,23,20,.08)', paddingBottom: 6, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#7A6F68' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: row.color }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between" style={{ paddingTop: 2 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#1C1714' }}>Total a cobrar</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#00C27A' }}>{usd2(total)}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="green"
              loading={loading}
              className="w-full"
              style={{ height: 52, fontSize: 16, borderRadius: 10 }}
            >
              ✓ Registrar venta
            </Button>
          </form>
        </div>

        {/* ── HISTORIAL ── */}
        <div
          className="rounded-[14px] border"
          style={{
            background: '#ffffff',
            borderColor: 'rgba(28,23,20,.14)',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(28,23,20,.06)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
            Últimas ventas
          </h2>

          {ventas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D8D2C8" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
                <polyline points="4,30 12,19 20,23 34,7"/>
                <path d="M28 7h6v6"/>
                <circle cx="12" cy="19" r="2" fill="#D8D2C8" stroke="none"/>
                <circle cx="20" cy="23" r="2" fill="#D8D2C8" stroke="none"/>
              </svg>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: '#3D3530', marginBottom: 6 }}>
                Sin ventas registradas
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#B0A89F', textAlign: 'center' }}>
                Completa el formulario para registrar tu primera venta
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight: 520 }}>
              {ventas.slice(0, 20).map((v: any) => {
                const c = clientColor(v.cliente)
                const estadoStyle = v.estado === 'pagado'
                  ? { bg: 'rgba(0,194,122,.12)',  color: '#00C27A' }
                  : v.estado === 'anticipo'
                  ? { bg: 'rgba(212,130,10,.12)',  color: '#D4820A' }
                  : { bg: 'rgba(197,48,42,.12)',    color: '#C5302A' }

                return (
                  <div
                    key={v.id}
                    style={{ padding: '14px 0', borderBottom: '1px solid #EBE7DD' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center flex-shrink-0 font-bold"
                        style={{ width: 34, height: 34, borderRadius: '50%', background: `${c}20`, color: c, fontFamily: 'var(--font-ui)', fontSize: 12 }}
                      >
                        {initials(v.cliente)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#1C1714' }}>
                            {v.cliente}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#00C27A', flexShrink: 0 }}>
                            {usd(v.monto)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: 'rgba(28,23,20,.07)', color: '#3D3530' }}>
                            {v.plan}
                          </span>
                          {v.origen && (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#B0A89F' }}>
                              {v.origen}
                            </span>
                          )}
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#B0A89F', marginLeft: 'auto' }}>
                            {fmt(v.fecha)}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: estadoStyle.bg, color: estadoStyle.color }}>
                            {v.estado}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
