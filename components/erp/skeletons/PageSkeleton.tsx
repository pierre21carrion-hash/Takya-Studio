const P = { background: '#EBE7DD' } as const

function Bone({ w, h, className = '' }: { w: number | string; h: number; className?: string }) {
  return (
    <div
      className={`rounded animate-pulse ${className}`}
      style={{ ...P, width: w, height: h }}
    />
  )
}

export function PageSkeleton() {
  return (
    <div>
      <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
        <div className="flex flex-col gap-2">
          <Bone w={160} h={28} />
          <Bone w={220} h={12} />
        </div>
        <Bone w={112} h={32} className="rounded-lg" />
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div
          className="px-5 py-3 border-b flex items-center gap-6"
          style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
        >
          {[100, 80, 120, 56, 56].map((w, i) => (
            <Bone key={i} w={w} h={10} />
          ))}
        </div>

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="px-5 py-3.5 border-b flex items-center gap-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <Bone w={32} h={32} className="rounded-lg flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Bone w={140} h={12} />
              <Bone w={96} h={10} />
            </div>
            <Bone w={72} h={22} className="rounded-md ml-auto" />
            <Bone w={56} h={22} className="rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function KpiPageSkeleton() {
  return (
    <div>
      <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
        <div className="flex flex-col gap-2">
          <Bone w={160} h={28} />
          <Bone w={220} h={12} />
        </div>
        <Bone w={112} h={32} className="rounded-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 min-h-[100px]"
            style={{ background: 'var(--card)', borderColor: 'var(--border)', borderTopWidth: 2, borderTopColor: 'var(--border)' }}
          >
            <Bone w={96} h={10} className="mb-3" />
            <Bone w={112} h={32} className="mb-2" />
            <Bone w={80} h={10} />
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="px-5 py-3.5 border-b flex items-center gap-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex flex-col gap-2 flex-1">
              <Bone w={140} h={12} />
              <Bone w={96} h={10} />
            </div>
            <Bone w={72} h={22} className="rounded-md" />
            <Bone w={80} h={12} />
          </div>
        ))}
      </div>
    </div>
  )
}
