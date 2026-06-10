"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ecuadorNichos } from "@/data/ecuador-stats";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";

export function Industrias() {
  return (
    <section className="bg-[#F5F4F1] border-y border-border px-6 py-20 md:py-28 lg:px-10">
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
              className="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent mb-3"
            >
              Soluciones por industria
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-tighter text-foreground max-w-lg"
            >
              Cada negocio tiene{" "}
              <span className="text-accent">sus propios huecos.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-[15px] leading-relaxed max-w-md text-muted"
            >
              No plantillas genéricas. El sistema exacto que tu operación
              necesita para que los números dejen de ser negativos.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex-shrink-0">
            <Link
              href="/por-que-takya"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              Ver análisis completo
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
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-border border border-border rounded-2xl overflow-hidden bg-white"
        >
          {ecuadorNichos.map((n, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col p-4 md:p-5 hover:bg-card transition-colors duration-200"
            >
              {/* Icon + name */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{n.icon}</span>
                <span className="text-sm font-semibold text-foreground">{n.name}</span>
              </div>

              {/* Problem */}
              <p className="text-[11px] leading-snug mb-3 flex-1 text-red-500">
                {n.problem}
              </p>

              {/* Divider */}
              <div className="h-px mb-3 bg-border" />

              {/* Result */}
              <p className="text-[11px] font-semibold leading-snug text-accent">
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
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-px"
          >
            Cuéntanos de tu negocio →
          </a>
          <p className="text-[11px] font-mono text-muted-foreground">
            Datos verificados · GEM 2024–2026 · INEC · Bain & Co
          </p>
        </motion.div>

      </div>
    </section>
  );
}
