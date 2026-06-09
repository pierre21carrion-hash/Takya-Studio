import { notFound } from 'next/navigation'
import { getProyectoPorToken } from '@/app/actions/proyectos'
import { ETAPAS_PROYECTO, ETAPA_LABELS, ETAPA_COLORES, fmt, type EtapaProyecto } from '@/lib/types'

const ETAPA_PCT: Record<EtapaProyecto, number> = {
  descubrimiento: 10, diseño: 30, desarrollo: 60, revision: 85, publicado: 100,
}

export default async function PortalPage({ params }: { params: { token: string } }) {
  const proyecto = await getProyectoPorToken(params.token)
  if (!proyecto) notFound()

  const etapa: EtapaProyecto = (proyecto.etapa_actual as EtapaProyecto) ?? 'descubrimiento'
  const etapaIdx = ETAPAS_PROYECTO.indexOf(etapa)
  const color = ETAPA_COLORES[etapa]
  const pct = proyecto.porcentaje ?? ETAPA_PCT[etapa]

  return (
    <div className="min-h-screen" style={{ background: '#0F0F0F', fontFamily: 'var(--font-mono, monospace)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: '#00C27A', color: '#fff' }}>
              N
            </div>
            <span className="font-bold text-sm" style={{ color: 'rgba(255,255,255,.7)' }}>nixo studio</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.4)' }}>
            Portal del cliente
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Título */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,.3)' }}>Tu proyecto</p>
          <h1 className="text-3xl font-black mb-1" style={{ color: '#fff' }}>{proyecto.cliente}</h1>
          {proyecto.plan && (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,.4)' }}>{proyecto.plan}</p>
          )}
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,.6)' }}>Progreso general</span>
            <span className="text-2xl font-black" style={{ color }}>{pct}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-6" style={{ background: 'rgba(255,255,255,.08)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1">
            {ETAPAS_PROYECTO.map((e, i) => (
              <div key={e} className="flex items-center gap-1 flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-black"
                    style={{
                      background: i <= etapaIdx ? color : 'rgba(255,255,255,.06)',
                      borderColor: i <= etapaIdx ? color : 'rgba(255,255,255,.12)',
                      color: i <= etapaIdx ? '#fff' : 'rgba(255,255,255,.2)',
                    }}>
                    {i < etapaIdx ? '✓' : i === etapaIdx ? '●' : ''}
                  </div>
                  <span className="text-[9px] text-center leading-tight"
                    style={{ color: i <= etapaIdx ? color : 'rgba(255,255,255,.25)' }}>
                    {ETAPA_LABELS[e].slice(0, 5)}
                  </span>
                </div>
                {i < ETAPAS_PROYECTO.length - 1 && (
                  <div className="h-px flex-1 mb-4"
                    style={{ background: i < etapaIdx ? color : 'rgba(255,255,255,.1)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Etapa actual</p>
            <p className="font-bold text-sm" style={{ color }}>
              {ETAPA_LABELS[etapa]}
            </p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Estado</p>
            <p className="font-bold text-sm capitalize" style={{ color: proyecto.estado === 'completado' ? '#00C27A' : 'rgba(255,255,255,.7)' }}>
              {proyecto.estado}
            </p>
          </div>
          {proyecto.fecha_entrega_prometida && (
            <div className="rounded-xl p-4 col-span-2" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Fecha de entrega estimada</p>
              <p className="font-bold text-sm" style={{ color: 'rgba(255,255,255,.7)' }}>
                {fmt(proyecto.fecha_entrega_prometida)}
              </p>
            </div>
          )}
        </div>

        {/* Notas del equipo */}
        {proyecto.notas_cliente && (
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(0,194,122,.05)', border: '1px solid rgba(0,194,122,.15)' }}>
            <p className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: '#00C27A' }}>Mensaje del equipo</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.7)' }}>{proyecto.notas_cliente}</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,.2)' }}>
            ¿Tienes alguna duda? Escríbenos y con gusto te ayudamos.
          </p>
        </div>
      </div>
    </div>
  )
}
