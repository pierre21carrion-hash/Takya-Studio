'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'

interface ToastMsg {
  id: number
  msg: string
  icon: string
}

interface ToastCtx {
  toast: (msg: string, icon?: string) => void
}

const Ctx = createContext<ToastCtx>({ toast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([])

  const toast = useCallback((msg: string, icon = '✓') => {
    const id = Date.now()
    setItems((prev) => [...prev, { id, msg, icon }])
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-[999] pointer-events-none">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg"
            style={{
              background: '#1B2A4A',
              color: '#fff',
              fontFamily: 'var(--font-ui)',
              minWidth: 200,
            }}
          >
            <span>{t.icon}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() {
  return useContext(Ctx)
}
