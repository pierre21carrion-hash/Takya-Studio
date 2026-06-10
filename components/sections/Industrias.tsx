"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ecuadorNichos } from "@/data/ecuador-stats";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";

export function Industrias() {
  return (
    <section className="bg-[#181714] px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
              style={{ color: "rgba(200,240,74,0.7)" }}
            >
              Soluciones por industria
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-tighter text-white max-w-lg"
            >
              Cada negocio tiene{" "}
              <span style={{ color: "#C8F04A" }}>sus propios huecos.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-[15px] leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              No plantillas genéricas. El sistema exacto que tu operación
              necesita para que los números dejen de ser negativos.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex-shrink-0">
            <Link
              href="/por-que-takya"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Ver el análisis completo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}
        >
          {ecuadorNichos.map((n, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col p-4 md:p-5 transition-colors duration-200"
              style={{ background: "#181714" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#1f1e1a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#181714";
              }}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">{n.icon}</span>
                <span className="text-sm font-semibold text-white">{n.name}</span>
              </div>

              {/* Problem */}
              <p
                className="text-[11px] leading-snug mb-3 flex-1"
                style={{ color: "rgba(255,100,80,0.8)" }}
              >
                {n.problem}
              </p>

              {/* Divider */}
              <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Result */}
              <p
                className="text-[11px] font-medium leading-snug"
                style={{ color: "#C8F04A" }}
              >
                {n.result}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://wa.me/593963608530?text=Hola+Pierre%2C+quiero+mi+web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#C8F04A] px-6 py-3 text-sm font-bold text-[#181714] transition-all hover:bg-[#d4f55e] hover:shadow-[0_0_24px_rgba(200,240,74,0.25)]"
          >
            Cuéntanos de tu negocio →
          </a>
          <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            Datos verificados · GEM 2024–2026 · INEC · Bain & Co
          </p>
        </motion.div>

      </div>
    </section>
  );
}
