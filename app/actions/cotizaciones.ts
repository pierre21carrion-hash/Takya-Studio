'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getCotizaciones() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cotizaciones')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function crearCotizacion(formData: FormData) {
  const supabase = await createClient()

  const cliente = formData.get('cliente') as string
  const negocio = formData.get('negocio') as string
  const plan = formData.get('plan') as string
  const monto = parseFloat(formData.get('monto') as string)

  if (!cliente || !monto) return { error: 'Completa cliente y monto' }

  const contenido_html = generarHTMLCotizacion({ cliente, negocio, plan, monto })

  const { data, error } = await supabase.from('cotizaciones').insert({
    cliente, negocio, plan, monto, estado: 'borrador', contenido_html,
  }).select().single()

  if (error) return { error: error.message }

  revalidatePath('/dashboard/cotizaciones')
  return { success: true, id: data.id }
}

export async function actualizarEstadoCotizacion(id: string, estado: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('cotizaciones')
    .update({ estado })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/cotizaciones')
  return { success: true }
}

export async function crearContrato(cotizacionId: string, cliente: string) {
  const supabase = await createClient()
  const contenido_html = generarHTMLContrato({ cliente, fecha: new Date().toLocaleDateString('es-EC') })

  const { error } = await supabase.from('contratos').insert({
    cotizacion_id: cotizacionId, cliente, contenido_html, firmado: false,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/contratos')
  return { success: true }
}

export async function getContratos() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

function generarHTMLCotizacion({ cliente, negocio, plan, monto }: {
  cliente: string; negocio: string; plan: string; monto: number
}) {
  const subtotal = monto / 1.12
  const iva = monto * 0.12 / 1.12
  const fecha = new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
  return `
<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:40px;color:#111">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;padding-bottom:20px;border-bottom:3px solid #00C27A">
    <div>
      <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-.02em">NIXO STUDIO</h1>
      <p style="margin:4px 0 0;color:#666;font-size:13px">Quito, Ecuador · nixo.studio</p>
    </div>
    <div style="text-align:right">
      <div style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.1em">Cotización</div>
      <div style="font-size:22px;font-weight:800;color:#00C27A">COT-${Date.now().toString().slice(-5)}</div>
      <div style="font-size:12px;color:#666">${fecha}</div>
    </div>
  </div>
  <div style="margin-bottom:24px;padding:16px;background:#f8f8f8;border-radius:8px">
    <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.08em">Para</p>
    <h2 style="margin:0;font-size:18px;font-weight:700">${cliente}</h2>
    ${negocio ? `<p style="margin:2px 0 0;color:#666;font-size:13px">${negocio}</p>` : ''}
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    <thead>
      <tr style="background:#f0f0f0">
        <th style="padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#666">Servicio</th>
        <th style="padding:10px 14px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#666">Monto</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #eee">
          <div style="font-weight:600">${plan}</div>
          <div style="font-size:12px;color:#666">Desarrollo web + estrategia digital</div>
        </td>
        <td style="padding:12px 14px;text-align:right;border-bottom:1px solid #eee;font-weight:600">$${subtotal.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-left:auto;max-width:260px">
    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#666"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#666"><span>IVA 12%</span><span>$${iva.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:16px;font-weight:800;border-top:2px solid #00C27A;margin-top:6px;color:#00C27A"><span>TOTAL</span><span>$${monto.toFixed(2)}</span></div>
  </div>
  <div style="margin-top:32px;padding:16px;border:1px solid #e0e0e0;border-radius:8px;font-size:12px;color:#666">
    <p style="font-weight:600;color:#111;margin:0 0 8px">Términos y condiciones:</p>
    <ul style="margin:0;padding-left:16px">
      <li>Validez de cotización: 15 días calendario</li>
      <li>Anticipo 50% para inicio de proyecto</li>
      <li>Entrega en 15-20 días hábiles</li>
      <li>Incluye 1 mes de soporte post-entrega</li>
    </ul>
  </div>
</div>`
}

function generarHTMLContrato({ cliente, fecha }: { cliente: string; fecha: string }) {
  return `
<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:40px;color:#111">
  <h1 style="text-align:center;font-size:22px;font-weight:800;margin-bottom:8px">CONTRATO DE SERVICIOS DIGITALES</h1>
  <p style="text-align:center;color:#666;font-size:13px;margin-bottom:32px">Nixo Studio · ${fecha}</p>
  <p><strong>PARTES CONTRATANTES:</strong><br>
  <strong>PRESTADOR:</strong> Nixo Studio, con domicilio en Quito, Ecuador.<br>
  <strong>CLIENTE:</strong> ${cliente}</p>
  <p style="margin-top:20px"><strong>OBJETO DEL CONTRATO:</strong><br>
  El PRESTADOR se compromete a desarrollar los servicios digitales detallados en la cotización aprobada.</p>
  <p style="margin-top:20px"><strong>FORMA DE PAGO:</strong><br>
  50% anticipo al firmar este contrato. 50% restante a la entrega del proyecto.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:60px">
    <div style="text-align:center"><div style="border-top:2px solid #111;padding-top:8px;font-size:12px;color:#666">Firma PRESTADOR<br>Nixo Studio</div></div>
    <div style="text-align:center"><div style="border-top:2px solid #111;padding-top:8px;font-size:12px;color:#666">Firma CLIENTE<br>${cliente}</div></div>
  </div>
</div>`
}
