"use client";

import { motion } from "framer-motion";
import { Lightning, Diamond, Handshake, Globe, MapPin } from "@phosphor-icons/react";
import { PILLARS, SITE_CONFIG } from "@/lib/constants";
import { fadeUp, fadeIn, staggerContainer, inViewOnce } from "@/lib/animations";

const ICONS = { Lightning, Diamond, Handshake, Globe };

export function About() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — story */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          <motion.span
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.2em] text-accent"
          >
            Quién está detrás
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl"
          >
            Hecho por un emprendedor, para emprendedores
          </motion.h2>
          <motion.blockquote
            variants={fadeUp}
            className="mt-6 border-l-2 border-accent pl-5 font-mono text-lg italic leading-relaxed text-foreground/80"
          >
            “Cansado de ver negocios increíbles con webs que no les hacían justicia, creé Nixo
            Studio: calidad de agencia premium, sin la espera ni el precio de una.”
          </motion.blockquote>
          <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-muted">
            Soy {SITE_CONFIG.founder}, {SITE_CONFIG.role.toLowerCase()}. Trabajo directamente con
            cada cliente — sin intermediarios, sin plantillas genéricas, sin sorpresas en la
            factura.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted"
          >
            <MapPin size={16} weight="duotone" className="text-accent" />
            Desde {SITE_CONFIG.location} — para toda Latinoamérica
          </motion.div>
        </motion.div>

        {/* Right — pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-2 gap-4"
        >
          {PILLARS.map((pillar) => {
            const Icon = ICONS[pillar.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={pillar.title}
                variants={fadeIn}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
