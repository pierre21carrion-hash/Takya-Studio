import { Suspense } from 'react'
import { getFacturas } from '@/app/actions/facturacion'
import { FacturacionClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function FacturacionPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <FacturacionContent />
    </Suspense>
  )
}

async function FacturacionContent() {
  const facturas = await getFacturas()
  return <FacturacionClient facturas={facturas} />
}
