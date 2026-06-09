import { Suspense } from 'react'
import { getProyectosExtendidos, getTareas } from '@/app/actions/proyectos'
import { getUsers } from '@/app/actions/usuarios'
import { ProyectosClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function ProyectosPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProyectosContent />
    </Suspense>
  )
}

async function ProyectosContent() {
  const [proyectos, tareas, users] = await Promise.all([
    getProyectosExtendidos(),
    getTareas(),
    getUsers(),
  ])
  return <ProyectosClient proyectos={proyectos} tareas={tareas} users={users} />
}
