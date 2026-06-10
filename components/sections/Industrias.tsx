"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";

interface Metric {
  value: string;
  label: string;
  pct: number;
  color: "accent" | "success" | "warning";
}

interface Industry {
  icon: string;
  name: string;
  problem: string;
  metrics: Metric[];
}

const INDUSTRIES: Industry[] = [
  {
    icon: "🍽",
    name: "Restaurantes",
    problem: "Pedidos en papel, errores en cocina, el dueño no sabe por qué pierde al final del mes",
    metrics: [
      { value: "−62%", label: "errores en pedidos", pct: 62, color: "accent" },
      { value: "−8 min", label: "de espera por mesa", pct: 53, color: "accent" },
      { value: "+19%", label: "rotación de mesas", pct: 19, color: "success" },
    ],
  },
  {
    icon: "💇",
    name: "Salones & Spas",
    problem: "Agenda en WhatsApp, no-shows invisibles, horas perdidas que nadie recupera",
    metrics: [
      { value: "−71%", label: "no-shows", pct: 71, color: "accent" },
      { value: "+2.4h", label: "recuperadas por semana", pct: 48, color: "success" },
      { value: "+34%", label: "reservas online", pct: 34, color: "success" },
    ],
  },
  {
    icon: "🛍",
    name: "Tiendas",
    problem: "Inventario en cuaderno, ventas de productos agotados, sin canal online",
    metrics: [
      { value: "−89%", label: "ventas fallidas", pct: 89, color: "accent" },
      { value: "+41%", label: "ticket promedio", pct: 41, color: "success" },
      { value: "3 sem", label: "ROI promedio", pct: 100, color: "warning" },
    ],
  },
  {
    icon: "🏥",
    name: "Clínicas",
    problem: "Historiales en papel, pacientes que no regresan, cobros que se pierden",
    metrics: [
      { value: "−58%", label: "tiempo por consulta", pct: 58, color: "accent" },
      { value: "+47%", label: "retorno de pacientes", pct: 47, color: "success" },
      { value: "0", label: "dobles reservas", pct: 100, color: "success" },
    ],
  },
  {
    icon: "🏗",
    name: "Constructoras",
    problem: "Cero visibilidad de obra, sobrecostos invisibles, cliente que llama todo el día",
    metrics: [
      { value: "−31%", label: "sobrecosto de obra", pct: 31, color: "accent" },
      { value: "−100%", label: "llamadas del cliente", pct: 100, color: "accent" },
      { value: "+2", label: "proyectos en paralelo", pct: 40, color: "success" },
    ],
  },
  {
    icon: "📚",
    name: "Academias",
    problem: "Cobros manuales, deserción silenciosa, mensualidades que nunca llegan",
    metrics: [
      { value: "−54%", label: "deserción", pct: 54, color: "accent" },
      { value: "+$620", label: "cobros recuperados/mes", pct: 62, color: "success" },
      { value: "+28%", label: "inscripciones online", pct: 28, color: "success" },
    ],
  },
  {
    icon: "🚚",
    name: "Transporte",
    problem: "Sin rastreo de flota, rutas ineficientes, cliente que llama sin respuesta",
    metrics: [
      { value: "−22%", label: "consumo combustible", pct: 22, color: "accent" },
      { value: "−84%", label: "llamadas recibidas", pct: 84, color: "accent" },
      { value: "+3", label: "servicios/unidad/día", pct: 60, color: "success" },
    ],
  },
  {
    icon: "🌱",
    name: "Agronegocios",
    problem: "100% ventas a intermediarios, sin canal directo, sin trazabilidad",
    metrics: [
      { value: "+210%", label: "margen por kg", pct: 70, color: "success" },
      { value: "8", label: "compradores directos en 60 días", pct: 80, color: "success" },
      { value: "$0", label: "en publicidad", pct: 100, color: "warning" },
    ],
  },
];

const BAR_COLORS = {
  accent:  "var(--accent)",
  success: "var(--accent-success)",
  warning: "#f59e0b",
} as const;

const KPI_COLORS = {
  accent:  "text-accent",
  success: "text-[#34c759]",
  warning: "text-[#f59e0b]",
} as const;

export function Industrias() {
  const [active, setActive] = useState(0);
  const industry = INDUSTRIES[active];

  return (
    <section className="bg-card border-y border-border px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <motion.p variants={fadeUp} className="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent mb-3">
              Soluciones por industria
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-tighter text-foreground max-w-lg">
              Cada negocio tiene{" "}
              <span className="text-accent">sus propios huecos.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-[15px] leading-relaxed max-w-md text-muted">
              Selecciona tu sector y ve los resultados exactos que entregamos.
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

        {/* Interactive panel */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-3 items-start">

          {/* Sector selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.name}
                onClick={() => setActive(i)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 flex-shrink-0 lg:flex-shrink"
                style={{
                  background: i === active ? "var(--foreground)" : "var(--background)",
                  border: `1px solid ${i === active ? "var(--foreground)" : "var(--border)"}`,
                  color: i === active ? "#fff" : "var(--muted)",
                }}
              >
                <span className="text-lg">{ind.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{ind.name}</span>
              </button>
            ))}
          </div>

          {/* Active sector detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-2xl border border-border bg-white p-6 md:p-8"
            >
              {/* Problem */}
              <div className="flex items-start gap-3 mb-8">
                <span className="text-3xl">{industry.icon}</span>
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">El problema</p>
                  <p className="text-[15px] text-red-500 leading-snug">{industry.problem}</p>
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {industry.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-1 ${KPI_COLORS[m.color]}`}>
                      {m.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Metric bars */}
              <div className="space-y-4">
                <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                  Impacto medido
                </p>
                {industry.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-muted">{m.label}</span>
                      <span className="text-xs font-semibold" style={{ color: BAR_COLORS[m.color] }}>
                        {m.value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: BAR_COLORS[m.color] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
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
        </div>

      </div>
    </section>
  );
}
