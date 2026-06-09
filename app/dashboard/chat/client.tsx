'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { initials, ROLES, type Role } from '@/lib/types'

const CANALES = [
  { id: 'general', label: '# general' },
  { id: 'proyectos', label: '# proyectos' },
  { id: 'ventas', label: '# ventas' },
  { id: 'marketing', label: '# marketing' },
]

interface Props {
  profile: any
  mensajes: any[]
  users: any[]
}

export function ChatClient({ profile, mensajes: initialMensajes, users }: Props) {
  const [canal, setCanal] = useState('general')
  const [mensajes, setMensajes] = useState<any[]>(initialMensajes)
  const [texto, setTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  useEffect(() => {
    async function loadMensajes() {
      const { data } = await supabase
        .from('mensajes_chat')
        .select('*, usuario:users(nombre, color)')
        .eq('canal', canal)
        .order('created_at', { ascending: true })
        .limit(100)
      setMensajes(data ?? [])
    }
    loadMensajes()
  }, [canal])

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${canal}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_chat', filter: `canal=eq.${canal}` },
        async (payload) => {
          const { data } = await supabase.from('mensajes_chat').select('*, usuario:users(nombre, color)').eq('id', payload.new.id).single()
          if (data) setMensajes((prev) => [...prev, data])
        })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [canal])

  async function sendMessage() {
    const content = texto.trim()
    if (!content) return
    setTexto('')
    setLoading(true)
    await supabase.from('mensajes_chat').insert({ user_id: profile.id, contenido: content, canal })
    setLoading(false)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-0 rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}>
      <div className="w-48 flex-shrink-0 flex flex-col border-r" style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}>
        <div className="px-3 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text4)' }}>Canales</div>
        </div>
        <div className="flex-1 p-2">
          {CANALES.map((c) => (
            <button key={c.id} onClick={() => setCanal(c.id)} className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium mb-0.5 transition-all cursor-pointer" style={{ color: canal === c.id ? 'var(--g)' : 'var(--text3)', background: canal === c.id ? 'var(--g-dim)' : 'transparent' }}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="p-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2 px-2" style={{ color: 'var(--text4)' }}>Online</div>
          {[profile, ...users].slice(0, 5).map((u: any) => (
            <div key={u.id} className="flex items-center gap-2 px-2 py-1.5">
              <div className="relative">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${u.color}22`, color: u.color }}>{initials(u.nombre)}</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border" style={{ background: 'var(--g)', borderColor: 'var(--panel)' }} />
              </div>
              <span className="text-[11px] truncate" style={{ color: 'var(--text3)' }}>{u.nombre.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{CANALES.find((c) => c.id === canal)?.label}</div>
            <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>Canal de comunicación del equipo</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {mensajes.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">◫</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text2)' }}>Sin mensajes aún</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text3)' }}>Sé el primero en escribir algo</div>
            </div>
          ) : mensajes.map((m: any, i: number) => {
            const isMine = m.user_id === profile.id
            const prevSameUser = i > 0 && mensajes[i - 1].user_id === m.user_id
            const u = m.usuario
            return (
              <div key={m.id} className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isMine && !prevSameUser && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mb-1" style={{ background: `${u?.color}22`, color: u?.color }}>
                    {u ? initials(u.nombre) : '?'}
                  </div>
                )}
                {!isMine && prevSameUser && <div className="w-7 flex-shrink-0" />}
                <div className={`flex flex-col gap-0.5 max-w-[70%] ${isMine ? 'items-end' : 'items-start'}`}>
                  {!prevSameUser && !isMine && <span className="font-mono text-[10px] px-1" style={{ color: 'var(--text3)' }}>{u?.nombre}</span>}
                  <div className={`chat-bubble ${isMine ? 'mine' : 'other'}`}>{m.contenido}</div>
                  <span className="font-mono text-[9px] px-1" style={{ color: 'var(--text4)' }}>
                    {new Date(m.created_at).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex gap-2">
            <div className="w-8 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${profile.color}22`, color: profile.color }}>
              {initials(profile.nombre)}
            </div>
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Mensaje en ${CANALES.find((c) => c.id === canal)?.label}...`}
              className="flex-1 rounded-xl border px-3.5 py-2.5 text-sm outline-none"
              style={{ background: 'var(--card)', borderColor: 'var(--border2)', color: 'var(--text)' }}
            />
            <button onClick={sendMessage} disabled={!texto.trim() || loading} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40" style={{ background: 'var(--g)' }}>
              →
            </button>
          </div>
          <div className="font-mono text-[10px] mt-1.5 px-10" style={{ color: 'var(--text4)' }}>Enter para enviar · Shift+Enter para salto de línea</div>
        </div>
      </div>
    </div>
  )
}
