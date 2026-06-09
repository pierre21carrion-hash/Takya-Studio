'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearFactura, actualizarEstadoFactura } from '@/app/actions/facturacion'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select } from '@/components/erp/ui/Input'
import { Modal } from '@/components/erp/ui/Modal'
import { useToast } from '@/components/erp/ui/Toast'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { usd, usd2, IVA_ECUADOR, fmt, type Factura, type DetalleFactura } from '@/lib/types'

const ESTADO_CFG: Record<string, { label: string; bg: string; color: string }> = {
  borrador:  { label: 'Borrador',  bg: 'rgba(120,113,108,.12)', color: '#7A6F68' },
  emitida:   { label: 'Emitida',   bg: 'rgba(37,99,235,.12)',   color: '#2563EB' },
  pagada:    { label: 'Pagada',    bg: 'rgba(0,194,122,.12)',   color: '#00C27A' },
  anulada:   { label: 'Anulada',   bg: 'rgba(220,38,38,.12)',   color: '#DC2626' },
}

const NEXT_ESTADO: Record<string, string> = {
  borrador: 'emitida', emitida: 'pagada', pagada: 'pagada',
}

interface Props { facturas: Factura[] }

export function FacturacionClient({ facturas }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<DetalleFactura[]>([
    { descripcion: '', cantidad: 1, precio_unitario: 0, subtotal: 0 },
  ])
  const [iva_pct, setIvaPct] = useState(0)
  const [ir_pct, setIrPct] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0)
  const ivaCalc = subtotal * IVA_ECUADOR
  const total = subtotal + ivaCalc
  const retIva = total * (iva_pct / 100)
  const retIr = subtotal * (ir_pct / 100)
  const neto = total - retIva - retIr

  function updateItem(idx: number, field: keyof DetalleFactura, val: string | number) {
    setItems((prev) => prev.map((item, i) => {
      if (i !== idx) return item
      const updated = { ...item, [field]: val }
      updated.subtotal = updated.cantidad * updated.precio_unitario
      return updated
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set('detalle', JSON.stringify(items))
    fd.set('retencion_iva_pct', String(iva_pct))
    fd.set('retencion_ir_pct', String(ir_pct))
    const result = await crearFactura(fd)
    setLoading(false)
    if (result?.error) { toast(result.error, '⚠'); return }
    toast('Factura creada', '✓')
    setOpen(false)
    setItems([{ descripcion: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }])
    router.refresh()
  }

  async function handleAvanzarEstado(f: Factura) {
    const next = NEXT_ESTADO[f.estado]
    if (!next || next === f.estado) return
    await actualizarEstadoFactura(f.id, next)
    toast(`Factura → ${ESTADO_CFG[next].label}`, '✓')
    router.refresh()
  }

  async function handleAnular(id: string) {
    if (!confirm('¿Anular esta factura? No se puede deshacer.')) return
    await actualizarEstadoFactura(id, 'anulada')
    toast('Factura anulada', '✓')
    router.refresh()
  }

  const totalFacturado = facturas.filter(f => f.estado === 'pagada').reduce((s, f) => s + f.total, 0)
  const pendientes = facturas.filter(f => f.estado === 'emitida').length

  return (
    <div>
      <PageHeader
        title="Facturación SRI"
        subtitle={`${facturas.length} facturas · ${usd(totalFacturado)} cobrados · IVA 15% Ecuador`}
        actions={<Button size="sm" onClick={() => setOpen(true)}>+ Nueva factura</Button>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total cobrado',    value: usd(totalFacturado), color: '#00C27A' },
          { label: 'Emitidas',         value: String(pendientes),  color: '#2563EB' },
          { label: 'Total facturas',   value: String(facturas.length), color: '#7A6F68' },
          { label: 'Anuladas',         value: String(facturas.filter(f => f.estado === 'anulada').length), color: '#DC2626' },
        ].map(k => (
          <div key={k.label} className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)', borderTopWidth: 3, borderTopColor: k.color }}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>{k.label}</div>
            <div className="font-black text-2xl font-mono" style={{ color: 'var(--text)' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Lista */}
      {facturas.length === 0 ? (
        <div className="rounded-2xl border flex flex-col items-center justify-center py-20 text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="text-4xl mb-4">🧾</div>
          <div className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>Sin facturas aún</div>
          <div className="text-sm mb-5" style={{ color: 'var(--text3)' }}>Crea tu primera factura para empezar</div>
          <Button size="sm" onClick={() => setOpen(true)}>+ Nueva factura</Button>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--card2)' }}>
                  {['Número', 'Fecha', 'Cliente / RUC', 'Total', 'Estado', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facturas.map(f => {
                  const est = ESTADO_CFG[f.estado]
                  return (
                    <tr key={f.id} className="border-b transition-colors hover:bg-[var(--card2)]" style={{ borderColor: 'var(--border)' }}>
                      <td className="px-4 py-3 font-mono text-sm font-bold" style={{ color: 'var(--text)' }}>{f.numero_secuencial}</td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text3)' }}>{fmt(f.fecha_emision)}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{f.razon_social}</div>
                        <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>{f.ruc_cliente}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-sm" style={{ color: 'var(--g)' }}>{usd2(f.total)}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: est.bg, color: est.color }}>
                          {est.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {f.estado !== 'pagada' && f.estado !== 'anulada' && (
                            <Button size="xs" variant="ghost" onClick={() => handleAvanzarEstado(f)}>
                              {f.estado === 'borrador' ? 'Emitir' : 'Marcar pagada'}
                            </Button>
                          )}
                          {f.estado !== 'anulada' && f.estado !== 'pagada' && (
                            <Button size="xs" variant="red" onClick={() => handleAnular(f.id)}>Anular</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal nueva factura */}
      <Modal open={open} onClose={() => setOpen(false)} title="Nueva Factura" maxWidth={680}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="RUC Cliente *"><Input name="ruc_cliente" placeholder="1792548032001" required /></Field>
            <Field label="Razón Social *"><Input name="razon_social" placeholder="Empresa S.A." required /></Field>
          </div>
          <Field label="Dirección"><Input name="direccion_cliente" placeholder="Quito, Pichincha" /></Field>

          {/* Detalle de ítems */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>Detalle de servicios</div>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_80px_100px_100px_32px] gap-2 mb-2 items-end">
                <Field label={idx === 0 ? 'Descripción' : ''}>
                  <Input placeholder="Servicio de diseño web" value={item.descripcion}
                    onChange={e => updateItem(idx, 'descripcion', e.target.value)} />
                </Field>
                <Field label={idx === 0 ? 'Cant.' : ''}>
                  <Input type="number" min="1" value={item.cantidad}
                    onChange={e => updateItem(idx, 'cantidad', parseFloat(e.target.value) || 1)} />
                </Field>
                <Field label={idx === 0 ? 'P. Unit.' : ''}>
                  <Input type="number" min="0" step="0.01" value={item.precio_unitario || ''}
                    onChange={e => updateItem(idx, 'precio_unitario', parseFloat(e.target.value) || 0)} />
                </Field>
                <Field label={idx === 0 ? 'Subtotal' : ''}>
                  <Input value={usd2(item.subtotal)} readOnly style={{ background: 'var(--card2)', cursor: 'default' }} />
                </Field>
                <button type="button" onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}
                  className="self-end mb-0.5 text-[var(--text3)] hover:text-[var(--r)] font-mono text-lg leading-none cursor-pointer border-none bg-transparent">×</button>
              </div>
            ))}
            <button type="button"
              onClick={() => setItems(prev => [...prev, { descripcion: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }])}
              className="text-xs font-semibold cursor-pointer border-none bg-transparent"
              style={{ color: 'var(--g)' }}>+ Agregar ítem</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Retención IVA (%)">
              <Select value={String(iva_pct)} onChange={e => setIvaPct(parseFloat(e.target.value))}>
                <option value="0">Sin retención</option>
                <option value="30">30% — Bienes</option>
                <option value="70">70% — Servicios mixtos</option>
                <option value="100">100% — Servicios puros</option>
              </Select>
            </Field>
            <Field label="Retención IR (%)">
              <Select value={String(ir_pct)} onChange={e => setIrPct(parseFloat(e.target.value))}>
                <option value="0">Sin retención</option>
                <option value="1">1% — Bienes/transferencias</option>
                <option value="2">2% — Servicios</option>
                <option value="8">8% — Honorarios</option>
              </Select>
            </Field>
          </div>

          <Field label="Método de pago">
            <Select name="metodo_pago">
              <option value="transferencia">Transferencia bancaria</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="stripe">Stripe</option>
            </Select>
          </Field>

          {/* Resumen fiscal */}
          <div className="rounded-xl p-4" style={{ background: 'var(--card2)', border: '1px solid var(--border)' }}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>Resumen fiscal · IVA 15% Ecuador</div>
            {[
              { label: 'Subtotal s/IVA', val: usd2(subtotal) },
              { label: `IVA 15%`, val: usd2(ivaCalc), color: '#D4820A' },
              { label: 'Total factura', val: usd2(total), bold: true },
              ...(iva_pct > 0 ? [{ label: `Ret. IVA ${iva_pct}%`, val: `-${usd2(retIva)}`, color: '#DC2626' }] : []),
              ...(ir_pct > 0 ? [{ label: `Ret. IR ${ir_pct}%`, val: `-${usd2(retIr)}`, color: '#DC2626' }] : []),
              ...(iva_pct > 0 || ir_pct > 0 ? [{ label: 'Valor neto a recibir', val: usd2(neto), bold: true, color: '#00C27A' }] : []),
            ].map(row => (
              <div key={row.label} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>{row.label}</span>
                <span className={`font-mono text-xs ${row.bold ? 'font-black' : 'font-semibold'}`}
                  style={{ color: row.color ?? 'var(--text)' }}>{row.val}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <Button type="submit" loading={loading} className="flex-1">Crear factura</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
