import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getVentas } from '@/app/actions/ventas'
import { getGastos } from '@/app/actions/gastos'
import { KpiPageSkeleton } from '@/components/erp/skeletons/PageSkeleton'
import { ContabilidadClient } from './client'

export default async function ContabilidadPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('users')
    .select('rol')
    .eq('id', user!.id)
    .single()

  if (!['ceo', 'contabilidad'].includes(profile?.rol)) redirect('/dashboard')

  return (
    <Suspense fallback={<KpiPageSkeleton />}>
      <ContabilidadContent />
    </Suspense>
  )
}

async function ContabilidadContent() {
  const [ventas, gastos] = await Promise.all([getVentas(), getGastos()])
  return <ContabilidadClient ventas={ventas} gastos={gastos} />
}
