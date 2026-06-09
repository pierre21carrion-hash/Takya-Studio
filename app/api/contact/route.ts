import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { nombre, email, whatsapp, negocio } = await request.json() as {
    nombre: string;
    email: string;
    whatsapp: string;
    negocio: string;
  };

  const { error } = await resend.emails.send({
    from: "Takya · Formulario <onboarding@resend.dev>",
    to: ["takya.studio@gmail.com"],
    replyTo: email,
    subject: `Nuevo cliente desde Takya — ${nombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f0f4fb;border-radius:16px">
        <h2 style="margin:0 0 4px;font-size:22px;color:#1d1d1f">Nuevo lead desde Takya</h2>
        <p style="margin:0 0 24px;font-size:13px;color:#6e6e73">Formulario de contacto · ${new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" })}</p>

        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:13px;color:#6e6e73;width:120px">Nombre</td>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:15px;font-weight:600;color:#1d1d1f">${nombre}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:13px;color:#6e6e73">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:15px;color:#0071e3"><a href="mailto:${email}" style="color:#0071e3">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:13px;color:#6e6e73">WhatsApp</td>
            <td style="padding:10px 0;border-bottom:1px solid #d6e4f7;font-size:15px;color:#1d1d1f">${whatsapp}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:13px;color:#6e6e73">Negocio</td>
            <td style="padding:10px 0;font-size:15px;color:#1d1d1f">${negocio}</td>
          </tr>
        </table>

        <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(nombre)}%2C%20vi%20tu%20mensaje%20en%20Takya%20y%20quiero%20ayudarte"
           style="display:inline-block;margin-top:24px;background:#0071e3;color:#fff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:14px;font-weight:600">
          Responder por WhatsApp →
        </a>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
