"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

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

type ColKey = "wix" | "freelancer" | "agencia" | "vekto";

const COLS = [
  { key: "wix", label: "Tú solo (Wix/WordPress)" },
  { key: "freelancer", label: "Freelancer random" },
  { key: "agencia", label: "Agencia grande" },
] as const;

// Order places Vekto in the visual center; no competitor brand names.
const TABS: { key: ColKey; short: string }[] = [
  { key: "wix", short: "Tú solo" },
  { key: "freelancer", short: "Freelancer" },
  { key: "vekto", short: "Vekto" },
  { key: "agencia", short: "Agencia grande" },
];

function VektoCell({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm font-medium text-[#1d1d1f]">
      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-[#0071e3]" />
      <span>{text}</span>
    </div>
  );
}

export function Comparison() {
  const [active, setActive] = useState<ColKey>("vekto");

  return (
    <section className="bg-white px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="La decisión inteligente"
          title="¿Por qué Vekto?"
          subtitle="Compara honestamente tus opciones. Sin marketing inflado."
        />

        {/* Desktop (>=768px): classic 5-column table */}
        <div className="mt-14 hidden overflow-hidden rounded-3xl border border-[#e5e5e7] md:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr]">
            <div className="bg-[#f5f5f7] p-4" />
            {COLS.map((c) => (
              <div key={c.key} className="bg-[#f5f5f7] p-4 text-sm font-semibold text-[#515154]">
                {c.label}
              </div>
            ))}
            <div className="bg-[#0071e3] p-4 text-sm font-bold text-white">Vekto</div>

            {COMPARACION.map((row, i) => (
              <div key={row.criterio} className="contents">
                <div className={`p-4 text-sm font-semibold text-[#1d1d1f] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>
                  {row.criterio}
                </div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.wix}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.freelancer}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.agencia}</div>
                <div className="border-l border-[#0071e3]/20 bg-[#0071e3]/[0.06] p-4">
                  <VektoCell text={row.vekto} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile (<768px): tabs — pick a column, compare it across all rows */}
        <div className="mt-12 md:hidden">
          <div className="mb-5 grid grid-cols-4 gap-2">
            {TABS.map((t) => {
              const isActive = active === t.key;
              const isVekto = t.key === "vekto";
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  style={
                    isActive && isVekto
                      ? { backgroundColor: "#0052CC", boxShadow: "0 2px 8px rgba(0,82,204,0.35)" }
                      : undefined
                  }
                  className={cn(
                    "flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold leading-tight transition-colors",
                    isActive
                      ? isVekto
                        ? "text-white"
                        : "bg-white text-[#1d1d1f] shadow-sm"
                      : "bg-[#F3F4F6] text-[#6B7280]",
                  )}
                >
                  {isVekto && <Sparkle size={11} weight="fill" className="shrink-0" />}
                  {t.short}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3"
            >
              {COMPARACION.map((row) => (
                <div
                  key={row.criterio}
                  className={`rounded-2xl border p-4 ${
                    active === "vekto" ? "border-[#0071e3]/30 bg-[#0071e3]/[0.06]" : "border-[#e5e5e7] bg-white"
                  }`}
                >
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#a1a1a6]">
                    {row.criterio}
                  </p>
                  {active === "vekto" ? (
                    <VektoCell text={row.vekto} />
                  ) : (
                    <p className="text-sm text-[#515154]">{row[active]}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Why not Wix / WordPress — centered, max 680px */}
        <div className="mx-auto mt-16 max-w-[680px] rounded-3xl border border-[#e5e5e7] bg-[#f5f5f7] p-8 md:p-10">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-[#1d1d1f]">
            ¿Por qué no hacerlo tú mismo?
          </h3>
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-[#515154]">
            <p>
              <span className="font-semibold text-[#1d1d1f]">Plataformas de arrastrar y soltar:</span>{" "}
              pagas suscripción mensual para siempre. El código que generan es pesado, Google las
              penaliza en velocidad y cuando cancelas, pierdes todo lo que construiste.
            </p>
            <p>
              <span className="font-semibold text-[#1d1d1f]">Gestores de contenido tradicionales:</span>{" "}
              necesitan mantenimiento constante, actualizaciones, plugins de seguridad y alguien
              técnico que los gestione. Son la causa del 40% de los sitios hackeados en internet.
            </p>
            <p>
              <span className="font-semibold text-[#1d1d1f]">Vekto</span> usa tecnología moderna —
              la misma de Nike, TikTok y OpenAI. Tu web es tuya, no depende de ninguna plataforma,
              carga en menos de 1 segundo y nadie te cobra suscripción mensual para que siga
              funcionando.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
