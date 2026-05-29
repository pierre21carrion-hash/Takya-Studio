"use client";

import { motion } from "framer-motion";
import { Browsers, Robot, Wrench, Check } from "@phosphor-icons/react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";

const ICONS = { Browsers, Robot, Wrench };

/* ── Perpetual micro-visuals, one per service ── */

function BrowserVisual() {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <div className="mb-2 h-2 w-2/3 rounded-full bg-accent/30" />
      <div className="mb-3 h-2 w-1/2 rounded-full bg-foreground/10" />
      <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/5">
        <div className="animate-loadbar h-full w-1/3 rounded-full bg-accent" />
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

const VISUALS = [BrowserVisual, ChatVisual, StatusVisual];
const SPANS = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-3"];

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <SectionHeading
        eyebrow="Qué hacemos"
        title="Todo lo que tu negocio necesita para vender online"
        subtitle="Desde tu primera página hasta automatizar tus ventas con IA. Nos encargamos de lo técnico para que tú te enfoques en crecer."
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
