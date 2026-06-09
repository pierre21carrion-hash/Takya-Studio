import { initials } from '@/lib/types'

interface AvatarProps {
  nombre: string
  color: string
  size?: number
}

export function Avatar({ nombre, color, size = 22 }: AvatarProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `${color}28`,
        color: color,
        fontFamily: 'var(--font-ui)',
        fontSize: Math.round(size * 0.41),
      }}
      title={nombre}
    >
      {initials(nombre)}
    </div>
  )
}
