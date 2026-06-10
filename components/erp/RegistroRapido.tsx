'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/erp/ui/Input'
import {
  createVentaRapida, createGastoRapido, createNotaRapida, undoRegistro,
  getClientesConHistorial,
  type RegistroItem, type ResumenSemana, type AlertaPendiente,
  type ClienteSugerencia, type UltimoGasto,
} from '@/app/actions/registrar'
import { usd } from '@/lib/types'

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIAS_GASTO = [
  { value: 'herramientas',       label: '🛠️  Herramientas y software' },
  { value: 'publicidad',         label: '📣  Publicidad y marketing' },
  { value: 'servicios_externos', label: '👤  Servicios externos' },
  { value: 'infraestructura',    label: '🌐  Infraestructura' },
  { value: 'operacion',          label: '⚙️   Operación' },
  { value: 'impuestos',          label: '🏦  Impuestos y obligaciones' },
  { value: 'otro',               label: '📦  Otro' },
]
const METODOS_PAGO = ['Transferencia', 'Efectivo', 'Tarjeta', 'Stripe', 'MercadoPago']
const METODOS_PAGO_ICONS: Record<string, string> = {
  Transferencia: '🏦', Efectivo: '💵', Tarjeta: '💳', Stripe: '🌐', MercadoPago: '📱',
}
const SUGERENCIAS_VENTA = [
  { label: 'Plan Inicio',   descripcion: 'Plan Inicio · Web 5 secciones',         monto: 149 },
  { label: 'Plan Escala',   descripcion: 'Plan Escala · Web 10 secciones + blog',  monto: 299 },
  { label: 'Plan Dominio',  descripcion: 'Plan Dominio · Web completa + CRM',      monto: 349 },
  { label: 'Mantenimiento', descripcion: 'Mantenimiento mensual',                   monto: 49  },
]
const DIAS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const MESES_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function today() { return new Date().toISOString().slice(0, 10) }

function headerHoy() {
  const d = new Date()
  return `Hoy — ${DIAS_ES[d.getDay()]} ${d.getDate()} de ${MESES_ES[d.getMonth()]}`
}

// ─── Sheet (bottom sheet on mobile, centered modal on desktop) ───────────────

function Sheet({ open, onClose, title, icon, iconColor, children, footer }: {
  open: boolean; onClose: () => void; title: string
  icon?: string; iconColor?: string
  children: React.ReactNode; footer?: React.ReactNode
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center"
      style={{
        background: 'rgba(0,0,0,.55)',
        overflowY: 'auto',
        alignItems: 'flex-start',
        padding: '72px 1rem 1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full md:max-w-[480px] md:mx-4 rounded-2xl md:shadow-2xl flex flex-col"
        style={{ background: 'var(--card)', margin: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: iconColor ? `${iconColor}18` : 'var(--card2)', color: iconColor ?? 'var(--text)' }}
              >
                {icon}
              </div>
            )}
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-none transition-colors text-lg leading-none"
            style={{ background: 'var(--card2)', color: 'var(--text3)' }}
          >✕</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── UndoToast ───────────────────────────────────────────────────────────────

interface UndoState { id: string; tipo: 'venta' | 'gasto' | 'nota'; label: string; countdown: number }

function UndoToastBar({ state, onUndo }: { state: UndoState; onUndo: () => void }) {
  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 rounded-xl px-4 py-3 shadow-2xl"
      style={{ background: '#1B2A4A', color: '#fff', minWidth: 260, maxWidth: 400, fontFamily: 'var(--font-ui)' }}
    >
      <span className="text-sm font-semibold flex-1 truncate">✅ {state.label}</span>
      <button
        onClick={onUndo}
        className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg cursor-pointer border-none"
        style={{ background: 'rgba(0,194,122,.2)', color: '#00C27A' }}
      >
        Deshacer ({state.countdown}s)
      </button>
    </div>
  )
}

// ─── Autocomplete input for Cliente ──────────────────────────────────────────

function ClienteInput({ value, onChange, onSelect }: {
  value: string
  onChange: (v: string) => void
  onSelect: (s: ClienteSugerencia) => void
}) {
  const [sugerencias, setSugerencias] = useState<ClienteSugerencia[]>([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length < 2) { setSugerencias([]); setOpen(false); return }
    const t = setTimeout(async () => {
      const r = await getClientesConHistorial(value)
      setSugerencias(r)
      setOpen(r.length > 0)
    }, 280)
    return () => clearTimeout(t)
  }, [value])

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative">
      <Input
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => sugerencias.length > 0 && setOpen(true)}
        placeholder="Andrés Espinoza"
        autoComplete="off"
        tabIndex={1}
        required
      />
      {open && sugerencias.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 rounded-xl border overflow-hidden z-10 mt-1"
          style={{ background: 'var(--card)', borderColor: 'var(--border)', boxShadow: '0 8px 24px rgba(0,0,0,.12)' }}
        >
          {sugerencias.map(s => (
            <button
              key={s.cliente}
              type="button"
              className="w-full text-left px-3.5 py-2.5 flex flex-col gap-0.5 cursor-pointer border-none transition-colors"
              style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--card2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { onSelect(s); setOpen(false) }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{s.cliente}</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text3)' }}>
                última compra: {s.ultimoServicio} · {usd(s.ultimoMonto)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  registrosHoy: { items: RegistroItem[]; balanceDia: number }
  resumenSemana: ResumenSemana
  alertas: AlertaPendiente | null
  ultimoGasto: UltimoGasto | null
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RegistroRapido({ registrosHoy, resumenSemana, alertas, ultimoGasto }: Props) {
  const router = useRouter()
  type ModalType = 'venta' | 'gasto' | 'nota' | null
  const [modal, setModal] = useState<ModalType>(null)
  const [items, setItems] = useState<RegistroItem[]>(registrosHoy.items)
  const [balance, setBalance] = useState(registrosHoy.balanceDia)
  const [undo, setUndo] = useState<UndoState | null>(null)

  // Undo countdown
  useEffect(() => {
    if (!undo) return
    if (undo.countdown <= 0) { setUndo(null); return }
    const t = setTimeout(() => setUndo(prev => prev ? { ...prev, countdown: prev.countdown - 1 } : null), 1000)
    return () => clearTimeout(t)
  }, [undo])

  function startUndo(id: string, tipo: UndoState['tipo'], label: string) {
    setUndo({ id, tipo, label, countdown: 5 })
  }

  async function handleUndo() {
    if (!undo) return
    const { id, tipo } = undo
    setUndo(null)
    setItems(prev => prev.filter(i => i.id !== id))
    if (tipo === 'venta') {
      const item = items.find(i => i.id === id)
      if (item?.monto && item.estado === 'pagado') setBalance(prev => prev - item.monto!)
    }
    if (tipo === 'gasto') {
      const item = items.find(i => i.id === id)
      if (item?.monto) setBalance(prev => prev + item.monto!)
    }
    await undoRegistro(id, tipo)
    router.refresh()
  }

  // ── Venta form state ──────────────────────────────────────────────────────
  const [vCliente, setVCliente] = useState('')
  const [vDesc, setVDesc] = useState('')
  const [vMonto, setVMonto] = useState('')
  const [vMontoErr, setVMontoErr] = useState(false)
  const [vFecha, setVFecha] = useState(today())
  const [vEstado, setVEstado] = useState<'pagado' | 'pendiente'>('pagado')
  const [vMetodo, setVMetodo] = useState('Transferencia')
  const [vNotasOpen, setVNotasOpen] = useState(false)
  const [vLoadng, setVLoading] = useState(false)
  const [vDone, setVDone] = useState(false)
  const [vChip, setVChip] = useState<string | null>(null)

  function resetVenta() {
    setVCliente(''); setVDesc(''); setVMonto(''); setVMontoErr(false)
    setVFecha(today()); setVEstado('pagado'); setVMetodo('Transferencia')
    setVNotasOpen(false); setVChip(null); setVDone(false)
  }

  async function handleVenta(e: React.FormEvent) {
    e.preventDefault()
    const monto = parseFloat(vMonto)
    if (!monto || monto <= 0) { setVMontoErr(true); return }
    // Flash "✓ Registrado" before closing
    setVDone(true)
    await new Promise(r => setTimeout(r, 500))
    setVDone(false)
    setVLoading(true)
    const tempId = `tmp_${Date.now()}`
    const hora = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    const optimistic: RegistroItem = {
      id: tempId, tipo: 'venta', label: [vDesc, vCliente].filter(Boolean).join(' · '),
      monto, estado: vEstado, hora, created_at: new Date().toISOString(),
    }
    setItems(prev => [optimistic, ...prev])
    if (vEstado === 'pagado') setBalance(prev => prev + monto)
    setModal(null)
    resetVenta()

    const result = await createVentaRapida({
      cliente: vCliente, descripcion: vDesc, monto,
      fecha: vFecha, estado: vEstado, metodo_pago: vMetodo,
    })
    setVLoading(false)

    if ('error' in result) {
      setItems(prev => prev.filter(i => i.id !== tempId))
      if (vEstado === 'pagado') setBalance(prev => prev - monto)
      // re-populate form and reopen
      setVCliente(vCliente); setVDesc(vDesc); setVMonto(String(monto)); setModal('venta')
      return
    }
    setItems(prev => prev.map(i => i.id === tempId ? { ...i, id: result.id! } : i))
    startUndo(result.id!, 'venta', `Venta de ${usd(monto)} registrada`)
  }

  // ── Gasto form state ──────────────────────────────────────────────────────
  const [gConcepto, setGConcepto] = useState('')
  const [gCategoria, setGCategoria] = useState('herramientas')
  const [gMonto, setGMonto] = useState('')
  const [gMontoErr, setGMontoErr] = useState(false)
  const [gFecha, setGFecha] = useState(today())
  const [gProveedor, setGProveedor] = useState('')
  const [gNotasOpen, setGNotasOpen] = useState(false)
  const [gLoading, setGLoading] = useState(false)

  function resetGasto() {
    setGConcepto(''); setGCategoria('herramientas'); setGMonto('')
    setGMontoErr(false); setGFecha(today()); setGProveedor(''); setGNotasOpen(false)
  }

  function repetirUltimoGasto() {
    if (!ultimoGasto) return
    setGConcepto(ultimoGasto.descripcion)
    setGCategoria(ultimoGasto.categoria)
    setGMonto(String(ultimoGasto.monto))
    setGProveedor(ultimoGasto.proveedor)
    setGFecha(today())
  }

  async function handleGasto(e: React.FormEvent) {
    e.preventDefault()
    const monto = parseFloat(gMonto)
    if (!monto || monto <= 0) { setGMontoErr(true); return }
    setGLoading(true)
    const tempId = `tmp_${Date.now()}`
    const hora = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    const catLabel = CATEGORIAS_GASTO.find(c => c.value === gCategoria)?.label.replace(/^[^\s]+\s+/, '') ?? gCategoria
    const optimistic: RegistroItem = {
      id: tempId, tipo: 'gasto', label: [gConcepto, catLabel].join(' · '),
      monto, hora, created_at: new Date().toISOString(),
    }
    setItems(prev => [optimistic, ...prev])
    setBalance(prev => prev - monto)
    setModal(null)
    resetGasto()

    const result = await createGastoRapido({
      concepto: gConcepto, categoria: gCategoria, monto,
      fecha: gFecha, proveedor: gProveedor || undefined,
    })
    setGLoading(false)

    if ('error' in result) {
      setItems(prev => prev.filter(i => i.id !== tempId))
      setBalance(prev => prev + monto)
      setGConcepto(gConcepto); setGMonto(String(monto)); setModal('gasto')
      return
    }
    setItems(prev => prev.map(i => i.id === tempId ? { ...i, id: result.id! } : i))
    startUndo(result.id!, 'gasto', `Gasto de ${usd(monto)} registrado`)
  }

  // ── Nota form state ───────────────────────────────────────────────────────
  const [nTexto, setNTexto] = useState('')
  const [nFecha, setNFecha] = useState(today())
  const [nLoading, setNLoading] = useState(false)

  async function handleNota(e: React.FormEvent) {
    e.preventDefault()
    if (!nTexto.trim()) return
    setNLoading(true)
    const tempId = `tmp_${Date.now()}`
    const hora = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    setItems(prev => [{ id: tempId, tipo: 'nota', label: nTexto, hora, created_at: new Date().toISOString() }, ...prev])
    setModal(null)
    setNTexto(''); setNFecha(today())

    const result = await createNotaRapida({ texto: nTexto, fecha: nFecha })
    setNLoading(false)

    if ('error' in result) {
      setItems(prev => prev.filter(i => i.id !== tempId))
      setNTexto(nTexto); setModal('nota')
      return
    }
    setItems(prev => prev.map(i => i.id === tempId ? { ...i, id: result.id! } : i))
    startUndo(result.id!, 'nota', 'Nota guardada')
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const visibleItems = items.slice(0, 10)
  const balancePositivo = balance >= 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* ZONA 1 — Alerta */}
      {alertas && alertas.count > 0 && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm"
          style={{ background: 'rgba(234,179,8,.08)', border: '1px solid rgba(234,179,8,.25)', borderLeftWidth: 4, borderLeftColor: '#CA8A04' }}
        >
          <span className="flex-shrink-0">⚠️</span>
          <span style={{ color: '#92400E' }}>
            <strong>{alertas.count} venta{alertas.count > 1 ? 's' : ''}</strong> pendiente{alertas.count > 1 ? 's' : ''} de cobro hace más de 5 días
          </span>
          <Link href="/dashboard/ventas?filtro=pendientes" className="ml-auto flex-shrink-0 font-semibold text-xs" style={{ color: '#CA8A04' }}>
            Ver →
          </Link>
        </div>
      )}

      {/* ZONA 2 — Resumen semana */}
      <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: 'var(--text2)' }}>
        <span style={{ fontFamily: 'var(--font-ui)' }}>Esta semana:</span>
        <span className="font-semibold" style={{ color: '#00C27A' }}>↑ {usd(resumenSemana.ventas)} ventas</span>
        <span style={{ color: 'var(--text3)' }}>·</span>
        <span className="font-semibold" style={{ color: '#DC2626' }}>↓ {usd(resumenSemana.gastos)} gastos</span>
        <span style={{ color: 'var(--text3)' }}>·</span>
        <span className="font-bold" style={{ color: resumenSemana.neto >= 0 ? 'var(--text)' : '#DC2626' }}>
          {resumenSemana.neto < 0 && '⚠️ '}= {resumenSemana.neto >= 0 ? '+' : ''}{usd(resumenSemana.neto)} neto
        </span>
      </div>

      {/* ZONA 3 — Botones de acción */}
      <div className="flex flex-col md:flex-row gap-3 mb-10">
        <button
          onClick={() => setModal('venta')}
          className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl font-bold cursor-pointer border-none transition-all hover:-translate-y-0.5"
          style={{
            background: '#2563EB', color: '#fff', minHeight: 56,
            boxShadow: '0 4px 16px rgba(37,99,235,.30)', fontSize: 15,
            fontFamily: 'var(--font-ui)',
          }}
        >
          <span style={{ fontSize: 18 }}>➕</span> Nueva Venta
        </button>
        <button
          onClick={() => setModal('gasto')}
          className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl font-bold cursor-pointer border-none transition-all hover:-translate-y-0.5"
          style={{
            background: 'rgba(220,38,38,.1)', color: '#DC2626',
            border: '1px solid rgba(220,38,38,.2)', minHeight: 56,
            fontSize: 15, fontFamily: 'var(--font-ui)',
          }}
        >
          <span style={{ fontSize: 18 }}>➖</span> Nuevo Gasto
        </button>
        <button
          onClick={() => setModal('nota')}
          className="md:flex-none flex items-center justify-center gap-2 rounded-2xl font-semibold cursor-pointer border-none transition-all hover:-translate-y-0.5"
          style={{
            background: 'transparent', color: 'var(--text2)',
            border: '1px solid var(--border2)', minHeight: 48,
            padding: '0 24px', fontSize: 13, fontFamily: 'var(--font-ui)',
          }}
        >
          📝 Nota
        </button>
      </div>

      {/* ZONA 4 — Registro del día */}
      <div>
        <div className="font-bold text-base mb-4" style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>
          {headerHoy()}
        </div>

        {visibleItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-14 text-center rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="text-sm" style={{ color: 'var(--text3)' }}>Aún no hay movimientos hoy.</div>
            <div className="flex gap-2">
              <Button size="sm" variant="blue" onClick={() => setModal('venta')}>➕ Nueva Venta</Button>
              <Button size="sm" variant="red" onClick={() => setModal('gasto')}>➖ Nuevo Gasto</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            {visibleItems.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors"
                style={{
                  borderBottom: i < visibleItems.length - 1 ? '1px solid var(--border)' : 'none',
                  background: 'transparent',
                }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-6 text-center font-bold text-sm" style={{
                  color: item.tipo === 'venta' ? '#00C27A' : item.tipo === 'gasto' ? '#DC2626' : 'var(--text3)',
                }}>
                  {item.tipo === 'venta' ? '↑' : item.tipo === 'gasto' ? '↓' : '📝'}
                </div>

                {/* Monto */}
                {item.monto != null && (
                  <div className="flex-shrink-0 font-mono font-bold text-sm w-16 text-right" style={{
                    color: item.tipo === 'venta' ? '#00C27A' : '#DC2626',
                  }}>
                    {usd(item.monto)}
                  </div>
                )}
                {item.tipo === 'nota' && <div className="flex-shrink-0 w-16" />}

                {/* Label */}
                <div className="flex-1 text-sm truncate" style={{ color: 'var(--text2)' }}>
                  {item.tipo === 'nota' ? <em>"{item.label}"</em> : item.label}
                </div>

                {/* Estado + Hora */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  {item.tipo === 'venta' && item.estado && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{
                      background: item.estado === 'pagado' ? 'rgba(0,194,122,.12)' : 'rgba(234,179,8,.12)',
                      color: item.estado === 'pagado' ? '#00C27A' : '#CA8A04',
                    }}>
                      {item.estado === 'pagado' ? '✅' : '⏳'}
                    </span>
                  )}
                  <span className="font-mono text-xs" style={{ color: 'var(--text4)' }}>{item.hora}</span>
                </div>
              </div>
            ))}

            {/* Balance */}
            <div
              className="flex items-center justify-between px-4 py-3 border-t"
              style={{ background: 'var(--card2)', borderColor: 'var(--border)' }}
            >
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text3)' }}>Balance del día</span>
              <span className="font-black font-mono text-base" style={{ color: balancePositivo ? '#00C27A' : '#DC2626' }}>
                {balancePositivo ? '+' : ''}{usd(balance)}
              </span>
            </div>
          </div>
        )}

        {items.length > 10 && (
          <Link href="/dashboard/ventas" className="block text-center mt-3 text-xs font-mono" style={{ color: 'var(--text3)' }}>
            Ver todo el historial →
          </Link>
        )}
      </div>

      {/* ── MODAL: NUEVA VENTA ─────────────────────────────────────────────── */}
      <Sheet
        open={modal === 'venta'}
        onClose={() => { setModal(null); resetVenta() }}
        title="Nueva Venta"
        icon="↑"
        iconColor="#16a34a"
        footer={
          <button
            type="submit"
            form="form-venta"
            disabled={vLoadng || vDone}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-bold cursor-pointer border-none transition-all"
            style={{
              minHeight: 48, background: vDone ? '#16a34a' : 'var(--g)', color: '#fff',
              fontSize: 15, fontFamily: 'var(--font-ui)',
              boxShadow: '0 4px 14px rgba(0,194,122,.35)',
              opacity: vLoadng && !vDone ? 0.7 : 1,
            }}
          >
            {vDone ? '✓ Registrado' : vLoadng ? '...' : 'Registrar venta →'}
          </button>
        }
      >
        <form id="form-venta" onSubmit={handleVenta} className="flex flex-col gap-3">

          {/* Cliente */}
          <Field label="Cliente *">
            <ClienteInput
              value={vCliente}
              onChange={setVCliente}
              onSelect={s => { setVCliente(s.cliente); if (!vDesc) setVDesc(s.ultimoServicio) }}
            />
          </Field>

          {/* Descripción + chips */}
          <div className="flex flex-col gap-2">
            <Field label="Descripción del servicio *">
              <Input
                value={vDesc}
                onChange={e => { setVDesc(e.target.value); setVChip(null) }}
                placeholder="Plan Escala · Web 10 secciones + blog"
                tabIndex={2}
                required
              />
            </Field>
            <div className="flex flex-wrap gap-1.5">
              {SUGERENCIAS_VENTA.map(s => {
                const sel = vChip === s.label
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => { setVDesc(s.descripcion); setVMonto(String(s.monto)); setVChip(s.label); setVMontoErr(false) }}
                    className="px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer border transition-all"
                    style={{
                      background: sel ? 'rgba(37,99,235,.1)' : 'var(--card2)',
                      borderColor: sel ? '#2563EB' : 'var(--border)',
                      color: sel ? '#2563EB' : 'var(--text3)',
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    {s.label} · ${s.monto}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Monto */}
          <Field label="Monto *">
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-semibold"
                style={{ color: 'var(--text3)', fontSize: 16 }}
              >$</span>
              <input
                value={vMonto}
                onChange={e => { setVMonto(e.target.value); setVMontoErr(false); setVChip(null) }}
                onBlur={() => { if (!vMonto || parseFloat(vMonto) <= 0) setVMontoErr(true) }}
                onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.form?.requestSubmit() }}
                type="number" inputMode="decimal" min="0" step="0.01"
                placeholder="0.00"
                tabIndex={3}
                className="w-full bg-[var(--card)] border rounded-xl outline-none transition-all focus:shadow-[0_0_0_3px_var(--g-dim)] placeholder:text-[var(--text4)]"
                style={{
                  paddingLeft: 28, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  fontSize: 22, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  borderColor: vMontoErr ? '#DC2626' : vMonto && parseFloat(vMonto) > 0 ? '#16a34a' : 'var(--border2)',
                  color: 'var(--text)',
                }}
              />
            </div>
            {vMontoErr && <p className="text-xs mt-0.5" style={{ color: '#DC2626' }}>Ingresa un monto mayor a $0</p>}
          </Field>

          {/* Separador */}
          <div style={{ borderTop: '1px solid var(--border)', margin: '2px 0' }} />

          {/* Fecha + Estado */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha">
              <Input type="date" value={vFecha} onChange={e => setVFecha(e.target.value)} max={today()} tabIndex={4} />
            </Field>
            <Field label="Estado">
              <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border2)' }}>
                {(['pagado', 'pendiente'] as const).map(s => (
                  <button
                    key={s} type="button"
                    className="flex-1 py-2.5 text-xs font-bold cursor-pointer border-none transition-all"
                    style={{
                      background: vEstado === s
                        ? s === 'pagado' ? 'rgba(22,163,74,.15)' : 'rgba(202,138,4,.12)'
                        : 'var(--card)',
                      color: vEstado === s
                        ? s === 'pagado' ? '#16a34a' : '#92400E'
                        : 'var(--text3)',
                      fontFamily: 'var(--font-ui)',
                    }}
                    onClick={() => setVEstado(s)}
                  >
                    {s === 'pagado' ? '✓ Pagado' : '⏳ Pendiente'}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* Método de pago */}
          {vEstado === 'pagado' && (
            <Field label="Método de pago">
              <Select value={vMetodo} onChange={e => setVMetodo(e.target.value)} tabIndex={5}>
                {METODOS_PAGO.map(m => (
                  <option key={m} value={m}>{METODOS_PAGO_ICONS[m]} {m}</option>
                ))}
              </Select>
            </Field>
          )}

          {/* Nota opcional */}
          {!vNotasOpen ? (
            <button type="button" onClick={() => setVNotasOpen(true)}
              className="text-left text-xs cursor-pointer border-none bg-transparent"
              style={{ color: 'var(--text3)', fontFamily: 'var(--font-ui)' }}>
              ＋ Añadir nota
            </button>
          ) : (
            <Field label="Notas opcionales">
              <Textarea
                placeholder="Ej: Cliente pidió factura, paga en 2 partes..."
                rows={2}
                style={{ borderStyle: 'dashed' }}
              />
            </Field>
          )}

        </form>
      </Sheet>

      {/* ── MODAL: NUEVO GASTO ──────────────────────────────────────────────── */}
      <Sheet open={modal === 'gasto'} onClose={() => { setModal(null); resetGasto() }} title="Nuevo Gasto">
        <form onSubmit={handleGasto} className="flex flex-col gap-3">
          {ultimoGasto && (
            <button type="button" onClick={repetirUltimoGasto}
              className="text-left text-xs px-3 py-2 rounded-lg cursor-pointer border"
              style={{ background: 'var(--card2)', borderColor: 'var(--border)', color: 'var(--text3)', fontFamily: 'var(--font-ui)' }}>
              🔁 Repetir gasto anterior — {ultimoGasto.descripcion} · {usd(ultimoGasto.monto)}
            </button>
          )}

          <Field label="Concepto *">
            <Input value={gConcepto} onChange={e => setGConcepto(e.target.value)}
              placeholder="Vercel Pro, Dominio cliente, Publicidad Instagram"
              tabIndex={1} required />
          </Field>

          <Field label="Categoría *">
            <Select value={gCategoria} onChange={e => setGCategoria(e.target.value)} tabIndex={2}>
              {CATEGORIAS_GASTO.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </Field>

          <Field label="Monto *">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono" style={{ color: 'var(--text3)' }}>$</span>
              <Input
                value={gMonto}
                onChange={e => { setGMonto(e.target.value); setGMontoErr(false) }}
                onBlur={() => { if (!gMonto || parseFloat(gMonto) <= 0) setGMontoErr(true) }}
                onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.form?.requestSubmit() }}
                type="number" inputMode="decimal" min="0" step="0.01"
                placeholder="49" className="pl-8"
                style={{ borderColor: gMontoErr ? '#DC2626' : undefined }}
                tabIndex={3}
              />
            </div>
            {gMontoErr && <p className="text-xs" style={{ color: '#DC2626' }}>Ingresa un monto mayor a $0</p>}
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha">
              <Input type="date" value={gFecha} onChange={e => setGFecha(e.target.value)} tabIndex={4} />
            </Field>
            <Field label="Proveedor">
              <Input value={gProveedor} onChange={e => setGProveedor(e.target.value)}
                placeholder="Vercel, Google, SRI" tabIndex={5} />
            </Field>
          </div>

          {!gNotasOpen ? (
            <button type="button" onClick={() => setGNotasOpen(true)}
              className="text-left text-xs cursor-pointer border-none bg-transparent"
              style={{ color: 'var(--text3)', fontFamily: 'var(--font-ui)' }}>
              ＋ Añadir nota
            </button>
          ) : (
            <Field label="Notas opcionales">
              <Textarea placeholder="Referencia, factura, detalles..." rows={2} />
            </Field>
          )}

          <Button type="submit" loading={gLoading} variant="red" className="mt-1 w-full" style={{ minHeight: 48 }}>
            Registrar gasto →
          </Button>
        </form>
      </Sheet>

      {/* ── MODAL: NOTA RÁPIDA ──────────────────────────────────────────────── */}
      <Sheet open={modal === 'nota'} onClose={() => { setModal(null); setNTexto(''); setNFecha(today()) }} title="Nota rápida">
        <form onSubmit={handleNota} className="flex flex-col gap-3">
          <Field label="Nota *">
            <Textarea
              value={nTexto} onChange={e => setNTexto(e.target.value)}
              placeholder="Cliente X interesado en plan Dominio · llamar el jueves"
              rows={4} autoFocus required
            />
          </Field>
          <Field label="Fecha">
            <Input type="date" value={nFecha} onChange={e => setNFecha(e.target.value)} />
          </Field>
          <Button type="submit" loading={nLoading} variant="navy" className="mt-1 w-full" style={{ minHeight: 48 }}>
            Guardar nota →
          </Button>
        </form>
      </Sheet>

      {/* ── UNDO TOAST ─────────────────────────────────────────────────────── */}
      {undo && <UndoToastBar state={undo} onUndo={handleUndo} />}
    </div>
  )
}
