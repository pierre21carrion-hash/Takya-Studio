// app/por-que-takya/page.tsx
// Datos desde: data/ecuador-stats.ts

import type { Metadata } from "next";
import Link from "next/link";
import {
  ecuadorStats,
  ecuadorCauses,
  ecuadorEvidence,
  ecuadorNichos,
} from "@/data/ecuador-stats";

export const metadata: Metadata = {
  title: "¿Por qué Takya? — El problema real de los negocios en Ecuador",
  description:
    "Datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas específicas que necesita cada industria para no cerrar.",
  openGraph: {
    title: "¿Por qué Takya? — El problema real de los negocios en Ecuador",
    description:
      "Datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas específicas que necesita cada industria para no cerrar.",
    url: "https://nixo-studio-next.vercel.app/por-que-takya",
    siteName: "Takya",
    locale: "es_EC",
    type: "website",
  },
};

export default function PorQueTakya() {
  return (
    <main className="bg-[#F5F4F1] min-h-screen font-['Geist',_system-ui,_sans-serif]">

      {/* NAV BACK */}
      <div className="border-b border-[#E0DED9] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-[#6A6760] hover:text-[#181714] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver a Takya
          </Link>
          <span className="text-[#E0DED9]">|</span>
          <span className="text-sm text-[#9B9893] font-mono">Ecuador en datos verificados</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* HERO */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-4">
          Por qué existe Takya · 9 argumentos verificados
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-[1.04] tracking-[-0.025em] text-[#181714] max-w-3xl mb-5">
          Ecuador emprende más que nadie.{" "}
          <span className="border-b-[3px] border-[#C8F04A]">Y cierra más que nadie también.</span>
        </h1>
        <p className="text-lg text-[#6A6760] leading-relaxed max-w-2xl mb-12">
          No es falta de talento. No es falta de clientes. Los negocios cierran
          por huecos de gestión que operan en silencio — sin registros, sin
          visibilidad, sin control. Aquí están los datos.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#E0DED9] border border-[#E0DED9] rounded-xl overflow-hidden mb-12 bg-white">
          {ecuadorStats.map((s, i) => (
            <div key={i} className="p-5">
              <span
                className={`block text-3xl font-semibold tracking-[-0.025em] leading-none mb-2 ${s.color}`}
              >
                {s.value}
              </span>
              <p className="text-xs text-[#6A6760] leading-[1.5] mb-2">{s.label}</p>
              <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-[#F5F4F1] border border-[#E0DED9] rounded px-1.5 py-0.5">
                {s.source}
              </span>
            </div>
          ))}
        </div>

        {/* CAUSES */}
        <span className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-3">
          Por qué cierran — datos verificados
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-6">
          No es falta de talento.{" "}
          <span style={{ borderBottom: "2px solid #C8F04A" }}>
            Es falta de herramientas que cubran los huecos.
          </span>
        </h2>
        <div className="grid md:grid-cols-3 border border-[#E0DED9] rounded-xl overflow-hidden bg-white divide-y md:divide-y-0 divide-x divide-[#E0DED9] mb-2">
          {ecuadorCauses.map((c, i) => (
            <div key={i} className="p-6">
              <span
                className="block text-4xl font-semibold tracking-[-0.025em] leading-none mb-3"
                style={{ color: c.color }}
              >
                {c.pct}
              </span>
              <div className="text-sm font-semibold mb-2">{c.title}</div>
              <p className="text-xs text-[#6A6760] leading-relaxed mb-3">{c.desc}</p>
              <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-[#F5F4F1] border border-[#E0DED9] rounded px-1.5 py-0.5">
                {c.source}
              </span>
            </div>
          ))}
        </div>

        {/* EVIDENCE */}
        <div className="bg-[#EDECE9] border border-[#E0DED9] rounded-xl p-6 mb-12 mt-1">
          <span className="block text-[11px] font-medium tracking-[0.07em] uppercase text-[#9B9893] mb-4">
            Evidencia adicional verificada
          </span>
          <div className="divide-y divide-[#E0DED9]">
            {ecuadorEvidence.map((e, i) => (
              <div key={i} className="flex items-start gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E0DED9] flex items-center justify-center text-base flex-shrink-0">
                  {e.icon}
                </div>
                <div>
                  <p className="text-sm text-[#181714] font-medium leading-snug mb-1">{e.claim}</p>
                  <span className="text-[11px] font-mono text-[#9B9893]">{e.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NICHOS */}
        <span className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-3">
          Soluciones por industria
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-2">
          Cada negocio tiene sus propios huecos.{" "}
          <span style={{ borderBottom: "2px solid #C8F04A" }}>
            Construimos la herramienta exacta.
          </span>
        </h2>
        <p className="text-base text-[#6A6760] leading-relaxed mb-8 max-w-lg">
          No plantillas. No soluciones genéricas. El sistema que tu operación
          necesita para que los números dejen de ser negativos.
        </p>
        <div className="grid md:grid-cols-2 gap-px bg-[#E0DED9] border border-[#E0DED9] rounded-xl overflow-hidden mb-10">
          {ecuadorNichos.map((n, i) => (
            <div key={i} className="bg-white p-5 flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
              <div>
                <div className="text-sm font-semibold mb-1">{n.name}</div>
                <p className="text-xs text-[#D43C3C] leading-snug mb-2">{n.problem}</p>
                <p className="text-xs text-[#1A9960] font-medium leading-snug">{n.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL BRIDGE */}
        <div className="bg-[#181714] rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-white leading-snug mb-4">
            Takya no reemplaza personas.{" "}
            <span style={{ color: "#C8F04A" }}>Cubre los huecos que hacen cerrar negocios.</span>
          </h3>
          <p
            className="text-[15px] leading-relaxed max-w-2xl mb-6"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            El dueño de un restaurante puede cocinar mejor que nadie — y aun así
            cerrar porque los pedidos se pierden en papel. La dueña de un salón
            puede ser la mejor estilista del barrio — y terminar el mes en negativo
            por las citas que nunca llegaron.{" "}
            <strong style={{ color: "#C8F04A" }}>
              No les falta talento. Les falta el sistema que sostenga lo que ya hacen bien.
            </strong>
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-[#C8F04A] text-[#181714] text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#b8e038] transition-colors"
          >
            Cuéntanos de tu negocio →
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-[#9B9893] leading-relaxed">
          Todos los datos presentados en esta página son verificados con fuentes
          primarias: GEM Ecuador (UEES / ESPAE-ESPOL / UTPL), INEC (Registro
          Estadístico de Empresas 2024, ENEMDU 2025), CEPAL/ECLAC, Bain & Company
          (Harvard Business Review), CONCANACO-Servytur, INIAP, MSP Ecuador, AAA
          Finanzas Corporativas, y Uniandes Episteme. Los datos de antes/después
          por nicho corresponden a estimaciones basadas en casos reales de clientes
          Takya.
        </p>

      </div>
    </main>
  );
}
