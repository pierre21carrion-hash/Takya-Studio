'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { guardarEstimado } from '@/app/actions/rentabilidad'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select } from '@/components/erp/ui/Input'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { useToast } from '@/components/erp/ui/Toast'
import { usd, fmt, type Estimado } from '@/lib/types'

interface Resultado {
  plan: string
  precio_base: number
  extras: { nombre: string; precio: number }[]
  total: number
  tiempo: string
  entregables: string[]
  mensaje_whatsapp: string
}

interface Props { historial: Estimado[] }

const EXTRAS_CONFIG = [
  { key: 'blog',            label: '📝 Blog integrado',          precio: 80  },
  { key: 'ecommerce',       label: '🛒 E-commerce',              precio: 250 },
  { key: 'animaciones',     label: '✨ Animaciones avanzadas',   precio: 120 },
  { key: 'crm',             label: '📊 CRM básico',              precio: 180 },
  { key: 'google_business', label: '📍 Google Business',         precio: 60  },
  { key: 'citas',           label: '📅 Sistema de citas',        precio: 150 },
]

export function EstimadorClient({ historial }: Props) {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form')
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const [form, setForm] = useState({
    cliente: '',
    tipo_negocio: '',
    secciones: '5',
    blog: false,
    ecommerce: false,
    animaciones: false,
    crm: false,
    google_business: false,
    citas: false,
    plazo: '15 días',
  })

  function calcularEstimado(): Resultado {
    const secs = parseInt(form.secciones)

    // Plan selection
    let plan: string
    let precio_base: number
    let entregables: string[]

    if (secs > 10 || form.ecommerce || form.crm) {
      plan = 'Plan Dominio'
      precio_base = 349
      entregables = [
        'Diseño premium a medida',
        'Secciones ilimitadas',
        'SEO avanzado + sitemap',
        'Google Analytics + Tag Manager',
        'Velocidad y Core Web Vitals optimizados',
        'Dominio .com 1 año',
        'Hosting SSD premium 1 año',
        'SSL gratuito',
        'Mantenimiento 1 mes incluido',
      ]
    } else if (secs > 5 || form.blog || form.animaciones || form.google_business || form.citas) {
      plan = 'Plan Escala'
      precio_base = 299
      entregables = [
        'Diseño profesional',
        `Hasta ${secs} secciones`,
        'SEO básico',
        'Formularios avanzados',
        'Google Analytics',
        'Dominio .com 1 año',
        'Hosting SSD 1 año',
        'SSL gratuito',
      ]
    } else {
      plan = 'Plan Inicio'
      precio_base = 149
      entregables = [
        'Diseño personalizado',
        'Hasta 5 secciones',
        'Formulario de contacto',
        'Dominio .com 1 año',
        'Hosting 1 año',
        'SSL gratuito',
      ]
    }

    // Extras seleccionados
    const extras: { nombre: string; precio: number }[] = EXTRAS_CONFIG
      .filter(e => form[e.key as keyof typeof form])
      .map(e => ({ nombre: e.label.replace(/^.{2}\s/, ''), precio: e.precio }))

    const total = precio_base + extras.reduce((s, e) => s + e.precio, 0)

    // Tiempo estimado
    const baseDias = plan === 'Plan Inicio' ? 10 : plan === 'Plan Escala' ? 15 : 20
    const extraDias = extras.length * 2
    const tiempo = `${baseDias + extraDias} días hábiles`

    // Mensaje WhatsApp
    const extrasTexto = extras.length > 0
      ? `\n\nFuncionalidades incluidas:\n${extras.map(e => `• ${e.nombre}`).join('\n')}`
      : ''

    const mensaje_whatsapp =
`Hola ${form.cliente} 👋, te escribimos de Nixo Studio.

Analizamos tu requerimiento para *${form.tipo_negocio}* y te preparamos esta propuesta:

✅ *${plan}*
💰 Inversión total: *${usd(total)}*
⏱ Entrega estimada: *${tiempo}*${extrasTexto}

Incluye: ${entregables.slice(0, 3).join(', ')} y más.

¿Te parece bien si coordinamos una llamada para afinar los detalles? 🚀`

    return { plan, precio_base, extras, total, tiempo, entregables, mensaje_whatsapp }
  }

  async function handleGenerar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.cliente || !form.tipo_negocio) {
      toast('Completa cliente y tipo de negocio', '⚠')
      return
    }
    setStep('loading')
    await new Promise(r => setTimeout(r, 500))

    const res = calcularEstimado()
    setResultado(res)
    setStep('result')

    await guardarEstimado({
      cliente: form.cliente,
      tipo_negocio: form.tipo_negocio,
      respuestas: { ...form },
      resultado: res as unknown as Record<string, unknown>,
      plan_recomendado: res.plan,
      precio_base: res.precio_base,
      tiempo_estimado: res.tiempo,
    })
    router.refresh()
  }

  function handleCopiarWA() {
    if (!resultado) return
    navigator.clipboard.writeText(resultado.mensaje_whatsapp)
    toast('Mensaje copiado', '✓')
  }

  return (
    <div>
      <PageHeader
        title="Estimador de proyectos"
        subtitle="Selecciona las opciones del cliente y genera precio, plan y mensaje automáticamente"
      />

      <div className="grid md:grid-cols-[1fr_380px] gap-5 items-start">
        {/* Left — form or result */}
        <div>
          {step === 'form' && (
            <div className="rounded-2xl border p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <form onSubmit={handleGenerar} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nombre del cliente *">
                    <Input value={form.cliente} onChange={e => setForm(p => ({ ...p, cliente: e.target.value }))} placeholder="Pastelería Dulce" required />
                  </Field>
                  <Field label="Tipo de negocio *">
                    <Input value={form.tipo_negocio} onChange={e => setForm(p => ({ ...p, tipo_negocio: e.target.value }))} placeholder="Pastelería / Restaurante" required />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Secciones del sitio">
                    <Select value={form.secciones} onChange={e => setForm(p => ({ ...p, secciones: e.target.value }))}>
                      {['3', '4', '5', '6', '7', '8', '10', '12+'].map(v => <option key={v} value={v}>{v} secciones</option>)}
                    </Select>
                  </Field>
                  <Field label="Plazo deseado">
                    <Select value={form.plazo} onChange={e => setForm(p => ({ ...p, plazo: e.target.value }))}>
                      {['7 días', '10 días', '15 días', '20 días', '30 días', 'Sin urgencia'].map(v => <option key={v}>{v}</option>)}
                    </Select>
                  </Field>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
                    Funcionalidades adicionales
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {EXTRAS_CONFIG.map(({ key, label, precio }) => (
                      <label key={key}
                        className="flex items-center gap-2.5 rounded-lg border p-3 cursor-pointer transition-all"
                        style={{
                          background: form[key as keyof typeof form] ? 'var(--g-dim)' : 'var(--card2)',
                          borderColor: form[key as keyof typeof form] ? 'var(--g)' : 'var(--border)',
                        }}>
                        <input type="checkbox" checked={!!form[key as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))}
                          className="w-4 h-4 accent-[var(--g)]" />
                        <div>
                          <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</div>
                          <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>+{usd(precio)}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full mt-2">
                  ◈ Generar estimado
                </Button>
              </form>
            </div>
          )}

          {step === 'loading' && (
            <div className="rounded-2xl border flex flex-col items-center justify-center py-20" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl text-white font-black mb-4 animate-pulse" style={{ background: 'var(--g)' }}>◈</div>
              <div className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>Calculando estimado...</div>
              <div className="text-sm" style={{ color: 'var(--text3)' }}>Generando propuesta personalizada</div>
            </div>
          )}

          {step === 'result' && resultado && (
            <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="px-6 pt-5 pb-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--g-dim)' }}>
                <div>
                  <div className="font-black text-xl" style={{ color: 'var(--text)' }}>{resultado.plan}</div>
                  <div className="text-sm" style={{ color: 'var(--text3)' }}>Para {form.cliente} · {form.tipo_negocio}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-3xl font-mono" style={{ color: 'var(--g)' }}>{usd(resultado.total)}</div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>{resultado.tiempo}</div>
                </div>
              </div>
              <div className="p-6">
                {resultado.extras.length > 0 && (
                  <div className="mb-4">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>Extras incluidos</div>
                    <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex justify-between text-xs font-mono px-3 py-1.5" style={{ background: 'var(--card2)', color: 'var(--text3)' }}>
                        <span>Plan base</span><span>{usd(resultado.precio_base)}</span>
                      </div>
                      {resultado.extras.map(ex => (
                        <div key={ex.nombre} className="flex justify-between text-sm px-3 py-2 border-t" style={{ borderColor: 'var(--border)' }}>
                          <span style={{ color: 'var(--text2)' }}>{ex.nombre}</span>
                          <span className="font-mono font-semibold" style={{ color: 'var(--text)' }}>+{usd(ex.precio)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold px-3 py-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--g-dim)', color: 'var(--g)' }}>
                        <span>Total</span><span className="font-mono">{usd(resultado.total)}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>Entregables</div>
                  {resultado.entregables.map(e => (
                    <div key={e} className="flex items-center gap-2 text-sm py-1" style={{ color: 'var(--text2)' }}>
                      <span style={{ color: 'var(--g)' }}>✓</span> {e}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--card2)', border: '1px solid var(--border)' }}>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>Mensaje para WhatsApp</div>
                  <div className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text2)' }}>{resultado.mensaje_whatsapp}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCopiarWA} className="flex-1">📋 Copiar mensaje WA</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setStep('form'); setResultado(null) }}>Nuevo estimado</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right — historial */}
        <div className="rounded-2xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>Historial de estimados</div>
          {historial.length === 0 ? (
            <div className="text-sm text-center py-8" style={{ color: 'var(--text3)' }}>Sin estimados aún</div>
          ) : historial.map(est => (
            <div key={est.id} className="rounded-xl border p-3 mb-2" style={{ background: 'var(--card2)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{est.cliente}</div>
                  <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>{est.tipo_negocio}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-sm font-bold" style={{ color: 'var(--g)' }}>{usd(est.precio_base)}</div>
                  <div className="font-mono text-[9px]" style={{ color: 'var(--text3)' }}>{fmt(est.created_at.slice(0, 10))}</div>
                </div>
              </div>
              <div className="font-mono text-[9px] px-2 py-0.5 rounded-full inline-block mt-1.5"
                style={{ background: 'var(--g-dim)', color: 'var(--g)' }}>{est.plan_recomendado}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
