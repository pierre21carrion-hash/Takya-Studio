"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, Globe, Code, Star } from "@phosphor-icons/react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/animations";

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export function Projects() {
  const [selected, setSelected] = useState(PORTFOLIO_PROJECTS[0]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset the preview whenever the selected project changes.
  useEffect(() => {
    setIframeLoaded(false);
    setIframeKey((k) => k + 1);
  }, [selected.id]);

  return (
    <section className="bg-[#f5f5f7] px-4 py-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
            Portafolio
          </span>
          <h2 className="mb-4 text-5xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-6xl">
            Proyectos en los que
            <br />
            <em className="not-italic text-[#0071e3]">estoy trabajando.</em>
          </h2>
          <p className="max-w-xl text-lg text-[#515154]">
            Experiencias digitales ambiciosas en desarrollo activo para clientes en Ecuador y
            Latinoamérica.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* LEFT: project list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 lg:col-span-2"
          >
            {PORTFOLIO_PROJECTS.map((project) => {
              const isSelected = selected.id === project.id;
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  variants={fadeUp}
                  onClick={() => setSelected(project)}
                  whileHover={{ x: isSelected ? 0 : 4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  aria-pressed={isSelected}
                  className={`w-full rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-[#0071e3]/30 bg-white shadow-lg shadow-[#0071e3]/10"
                      : "border-[#e5e5e7] bg-white/60 hover:border-[#0071e3]/20 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {project.featured && (
                        <div className="mb-2 flex items-center gap-1.5">
                          <Star size={12} weight="fill" className="text-[#0071e3]" />
                          <span className="text-xs font-bold uppercase tracking-wide text-[#0071e3]">
                            Proyecto Principal
                          </span>
                        </div>
                      )}
                      <h3
                        className={`mb-1 text-base font-bold leading-tight ${
                          isSelected ? "text-[#1d1d1f]" : "text-[#515154]"
                        }`}
                      >
                        {project.shortTitle}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isSelected ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ArrowRight
                        size={18}
                        weight="bold"
                        className={isSelected ? "text-[#0071e3]" : "text-[#a1a1a6]"}
                      />
                    </motion.div>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e5e5e7] bg-[#f5f5f7] px-2 py-0.5 text-xs text-[#515154]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mini stats (expand when selected) */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="mt-4 grid grid-cols-3 gap-2 border-t border-[#e5e5e7] pt-4"
                    >
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-xs font-bold text-[#0071e3]">{stat.value}</p>
                          <p className="text-[10px] leading-tight text-[#a1a1a6]">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: live iframe preview */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="overflow-hidden rounded-3xl border border-[#e5e5e7] bg-white shadow-2xl shadow-black/5"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-[#e5e5e7] bg-[#f5f5f7] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="mx-3 flex-1">
                    <div className="flex items-center gap-2 rounded-lg border border-[#e5e5e7] bg-white px-3 py-1.5">
                      <Globe size={12} className="flex-shrink-0 text-[#a1a1a6]" />
                      <span className="truncate font-mono text-xs text-[#515154]">
                        {selected.url.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${selected.shortTitle} en una pestaña nueva`}
                    className="rounded-lg p-1.5 transition-colors hover:bg-[#e5e5e7]"
                  >
                    <ArrowUpRight size={14} className="text-[#515154]" />
                  </a>
                </div>

                {/* iframe */}
                <div className="relative w-full" style={{ height: "480px" }}>
                  {!iframeLoaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#f5f5f7]">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-8 w-8 rounded-full border-2 border-[#e5e5e7] border-t-[#0071e3]"
                      />
                      <p className="text-sm text-[#a1a1a6]">Cargando {selected.shortTitle}…</p>
                    </div>
                  )}
                  <iframe
                    key={iframeKey}
                    ref={iframeRef}
                    src={selected.url}
                    title={selected.title}
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                    className={`h-full w-full border-0 transition-opacity duration-500 ${
                      iframeLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: "scale(0.75)",
                      transformOrigin: "top left",
                      width: "133.33%",
                      height: "133.33%",
                    }}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>

                {/* Info bar */}
                <div className="border-t border-[#e5e5e7] bg-[#f5f5f7] px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-[#1d1d1f]">{selected.title}</h3>
                      <p className="mt-0.5 text-xs text-[#a1a1a6]">
                        {selected.client} · {selected.year}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#34c759]/20 bg-[#34c759]/10 px-3 py-1.5 text-xs font-semibold text-[#34c759]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34c759]" />
                        {selected.status}
                      </span>
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0077ed]"
                      >
                        Abrir <ArrowUpRight size={12} weight="bold" />
                      </a>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-4 flex items-center gap-2">
                    <Code size={12} className="text-[#a1a1a6]" />
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#e5e5e7] bg-white px-2 py-0.5 text-xs text-[#515154]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#e5e5e7] bg-white p-8 sm:flex-row"
        >
          <div>
            <h3 className="mb-1 text-xl font-bold text-[#1d1d1f]">¿Quieres un proyecto así?</h3>
            <p className="text-sm text-[#515154]">
              Cuéntame tu idea — la primera conversación es gratis.
            </p>
          </div>
          <a
            href="https://wa.me/593978775471?text=Hola%20Pierre,%20vi%20tus%20proyectos%20y%20me%20interesa%20trabajar%20contigo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0077ed] hover:shadow-lg hover:shadow-[#0071e3]/25"
          >
            Empezar un proyecto →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
