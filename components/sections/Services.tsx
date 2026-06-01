"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Browsers, Robot, Wrench, Check } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";

const ICONS = { Browsers, Robot, Wrench };

/* ── Perpetual micro-visuals, one per service ── */

/**
 * "Visual builder" that cycles Estructura → Diseño → Publicado every 2.5s,
 * so it reads as a finished site being assembled — not a loading skeleton.
 */
function BuilderVisual() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="relative h-[104px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {phase === 0 && (
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase text-gray-400">Estructura</p>
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-3/4 rounded border border-dashed border-gray-300 bg-gray-200" />
                  <div className="h-8 w-full rounded border border-dashed border-gray-300 bg-gray-100" />
                  <div className="h-4 w-full rounded border border-dashed border-gray-300 bg-gray-100" />
                  <div className="h-4 w-full rounded border border-dashed border-gray-300 bg-gray-100" />
                </div>
              </div>
            )}

            {phase === 1 && (
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase text-accent">Diseño</p>
                <div className="flex flex-col gap-1">
                  <div className="relative h-3 w-3/4 rounded bg-accent">
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-accent-light" />
                  </div>
                  <div className="h-8 w-full rounded border border-blue-100 bg-gradient-to-br from-blue-50 to-white" />
                  <div className="h-4 w-full rounded border border-gray-200 bg-white shadow-sm" />
                  <div className="h-4 w-full rounded border border-gray-200 bg-white shadow-sm" />
                </div>
              </div>
            )}

            {phase === 2 && (
              <div className="relative">
                <p className="mb-2 text-[9px] font-semibold uppercase text-green-600">Publicado</p>
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-3/4 rounded bg-accent" />
                  <div className="h-8 w-full rounded border border-blue-100 bg-gradient-to-br from-blue-50 to-white" />
                  <div className="h-4 w-full rounded border border-gray-200 bg-white shadow-sm" />
                  <div className="h-4 w-full rounded border border-gray-200 bg-white shadow-sm" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded bg-green-500/10">
                  <Check size={32} weight="bold" className="text-green-600" />
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded bg-gray-100 px-1 text-[7px] text-gray-500">
                  nixo-studio-next.vercel.app
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* phase indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`h-1.5 rounded-full ${i === phase ? "bg-accent" : "bg-gray-200"}`}
            animate={{ width: i === phase ? 16 : 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-foreground/5 px-3 py-2 text-xs text-muted">
        ¿Tienen disponibilidad?
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-accent px-3 py-2 text-xs text-white">
        ¡Sí! Te escribo ahora
        <span className="animate-blink ml-0.5 inline-block">▍</span>
      </div>
    </div>
  );
}

function StatusVisual() {
  return (
    <div className="flex items-center gap-6">
      {["Online", "Backups", "SSL"].map((label, i) => (
        <div key={label} className="flex items-center gap-2 text-xs text-muted">
          <span
            className="animate-pulsedot h-2.5 w-2.5 rounded-full bg-accent"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          {label}
        </div>
      ))}
    </div>
  );
}

const VISUALS = [BuilderVisual, ChatVisual, StatusVisual];
const SPANS = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-3"];

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <SectionHeading
        eyebrow="Qué hacemos"
        title="Todo lo que un negocio necesita para vender online"
        subtitle="Desde la primera página hasta automatizar las ventas con IA. Nos encargamos de lo técnico para que el negocio se enfoque en crecer."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon as keyof typeof ICONS];
          const Visual = VISUALS[i];
          return (
            <motion.div key={service.title} variants={fadeUp} className={SPANS[i]}>
              <Card className="flex h-full flex-col gap-5 p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-muted">{service.description}</p>

                <Visual />

                <ul className="mt-auto flex flex-col gap-2 pt-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check size={16} weight="bold" className="shrink-0 text-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
