// components/landing/EcuadorSection.tsx
// Datos centralizados en: data/ecuador-stats.ts — edita ahí, no aquí

import Link from "next/link";
import { ecuadorStats } from "@/data/ecuador-stats";

export default function EcuadorSection() {
  return (
    <section className="w-full bg-[#F5F4F1] border-y border-[#E0DED9] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-4">
          Ecuador en datos verificados · GEM 2024–2025 · INEC 2024 · CEPAL
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-[#181714] max-w-2xl mb-4">
          Ecuador emprende más que nadie en LATAM.{" "}
          <span className="border-b-[3px] border-[#C8F04A]">
            Y cierra más que nadie también.
          </span>
        </h2>

        <p className="text-base text-[#6A6760] leading-relaxed max-w-xl mb-10">
          En 2024 cerraron más de 100,000 empresas. No por falta de clientes. No
          por falta de ganas. Sino porque administrar un negocio solo — sin
          herramientas, sin sistema, sin margen de error — es una carrera que el
          tiempo siempre termina ganando.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#E0DED9] border border-[#E0DED9] rounded-xl overflow-hidden mb-8 bg-white">
          {ecuadorStats.map((s, i) => (
            <div key={i} className="p-5">
              <span className={`block text-3xl font-semibold tracking-[-0.02em] leading-none mb-2 ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs text-[#6A6760] leading-[1.5] mb-2">{s.label}</p>
              <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-[#F5F4F1] border border-[#E0DED9] rounded px-1.5 py-0.5">
                {s.source}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/por-que-takya"
            className="inline-flex items-center gap-2 bg-[#181714] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#2a2a26] transition-colors"
          >
            Ver el análisis completo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className="text-xs text-[#9B9893]">
            Datos verificados · GEM 2024–2026 · INEC · CEPAL · Bain & Company
          </p>
        </div>

      </div>
    </section>
  );
}
