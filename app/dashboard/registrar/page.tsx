import { Suspense } from 'react'
import { getRegistrosHoy, getResumenSemana, getAlertasPendientes, getUltimoGasto } from '@/app/actions/registrar'
import { RegistroRapido } from '@/components/erp/RegistroRapido'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function RegistrarPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RegistrarContent />
    </Suspense>
  )
}

async function RegistrarContent() {
  const [registrosHoy, resumenSemana, alertas, ultimoGasto] = await Promise.all([
    getRegistrosHoy(),
    getResumenSemana(),
    getAlertasPendientes(),
    getUltimoGasto(),
  ])
  return (
    <RegistroRapido
      registrosHoy={registrosHoy}
      resumenSemana={resumenSemana}
      alertas={alertas}
      ultimoGasto={ultimoGasto}
    />
  )
}
