"use client";

import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";

interface Row {
  criterio: string;
  wix: string;
  freelancer: string;
  agencia: string;
  vekto: string;
}

const COMPARACION: Row[] = [
  {
    criterio: "Tiempo hasta tener tu web",
    wix: "Semanas aprendiendo",
    freelancer: "2-6 semanas (sin garantía)",
    agencia: "2-4 meses",
    vekto: "5 días garantizados",
  },
  {
    criterio: "Precio real",
    wix: "$200-800/año (plantillas + plugins + dominio + SSL)",
    freelancer: "$300-2,000 (varía sin contrato)",
    agencia: "$2,000-15,000",
    vekto: "Desde $149. Sin sorpresas.",
  },
  {
    criterio: "Calidad del resultado",
    wix: "Plantilla genérica, lenta, difícil de posicionar",
    freelancer: "Depende del freelancer (lotería)",
    agencia: "Premium pero impersonal",
    vekto: "Código limpio, PageSpeed 95+, diseño a medida",
  },
  {
    criterio: "Soporte después",
    wix: "Tutoriales de YouTube",
    freelancer: "Desaparece tras entregar",
    agencia: "Ticket de soporte con SLA de días",
    vekto: "WhatsApp directo. Respuesta en 1h.",
  },
  {
    criterio: "SEO y velocidad",
    wix: "Limitado. Wix genera código pesado",
    freelancer: "Opcional y extra",
    agencia: "Incluido pero genérico",
    vekto: "SEO técnico + PageSpeed 95+ incluido",
  },
  {
    criterio: "¿Hablan tu idioma?",
    wix: "Soporte en inglés",
    freelancer: "Depende",
    agencia: "Formal y con intermediarios",
    vekto: "100% español. José y Pierre directamente.",
  },
];

const COLS = [
  { key: "wix", label: "Tú solo (Wix/WordPress)" },
  { key: "freelancer", label: "Freelancer random" },
  { key: "agencia", label: "Agencia grande" },
] as const;

function VektoCell({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm font-medium text-[#1d1d1f]">
      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-[#0071e3]" />
      <span>{text}</span>
    </div>
  );
}

export function Comparison() {
  return (
    <section className="bg-white px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="La decisión inteligente"
          title="¿Por qué Vekto?"
          subtitle="Compara honestamente tus opciones. Sin marketing inflado."
        />

        {/* Desktop table */}
        <div className="mt-14 hidden overflow-hidden rounded-3xl border border-[#e5e5e7] lg:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr]">
            {/* Header */}
            <div className="bg-[#f5f5f7] p-4" />
            {COLS.map((c) => (
              <div key={c.key} className="bg-[#f5f5f7] p-4 text-sm font-semibold text-[#515154]">
                {c.label}
              </div>
            ))}
            <div className="bg-[#0071e3] p-4 text-sm font-bold text-white">Vekto</div>

            {/* Rows */}
            {COMPARACION.map((row, i) => (
              <div key={row.criterio} className="contents">
                <div className={`p-4 text-sm font-semibold text-[#1d1d1f] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>
                  {row.criterio}
                </div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.wix}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.freelancer}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.agencia}</div>
                <div className="bg-[#0071e3]/[0.06] p-4">
                  <VektoCell text={row.vekto} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: one card per criterio */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-12 flex flex-col gap-4 lg:hidden"
        >
          {COMPARACION.map((row) => (
            <motion.div
              key={row.criterio}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-[#e5e5e7]"
            >
              <p className="bg-[#f5f5f7] px-4 py-3 text-sm font-semibold text-[#1d1d1f]">{row.criterio}</p>
              <dl className="divide-y divide-[#e5e5e7]">
                {COLS.map((c) => (
                  <div key={c.key} className="flex flex-col gap-0.5 px-4 py-2.5">
                    <dt className="text-xs font-medium text-[#a1a1a6]">{c.label}</dt>
                    <dd className="text-sm text-[#6e6e73]">{row[c.key]}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5 bg-[#0071e3]/[0.06] px-4 py-2.5">
                  <dt className="text-xs font-bold text-[#0071e3]">Vekto</dt>
                  <dd>
                    <VektoCell text={row.vekto} />
                  </dd>
                </div>
              </dl>
            </motion.div>
          ))}
        </motion.div>

        {/* Why not Wix / WordPress */}
        <div className="mt-16 rounded-3xl border border-[#e5e5e7] bg-[#f5f5f7] p-8 md:p-10">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Por qué no Wix ni WordPress
          </h3>
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-[#515154]">
            <p>
              <span className="font-semibold text-[#1d1d1f]">Wix:</span> pagas suscripción mensual
              para siempre. El código que genera es pesado y Google lo penaliza en velocidad. Cuando
              cancelas, pierdes todo.
            </p>
            <p>
              <span className="font-semibold text-[#1d1d1f]">WordPress:</span> necesita
              mantenimiento constante, actualizaciones, plugins de seguridad y alguien que lo
              gestione. El 40% de los sitios hackeados en internet son WordPress.
            </p>
            <p>
              <span className="font-semibold text-[#1d1d1f]">Vekto</span> usa Next.js — la
              tecnología de Nike, TikTok y OpenAI. Tu web es tuya, no depende de ninguna plataforma,
              carga en menos de 1 segundo y nadie te cobra suscripción mensual para que siga
              funcionando.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
