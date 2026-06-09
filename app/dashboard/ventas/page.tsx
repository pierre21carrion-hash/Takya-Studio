import { Suspense } from 'react'
import { getVentas } from '@/app/actions/ventas'
import { getUsers } from '@/app/actions/usuarios'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'
import { VentasClient } from './client'

export default function VentasPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <VentasContent />
    </Suspense>
  )
}

async function VentasContent() {
  const [ventas, users] = await Promise.all([getVentas(), getUsers()])
  return <VentasClient ventas={ventas} users={users} />
}
