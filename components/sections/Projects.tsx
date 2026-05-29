"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";

const PREVIEWS = [
  { name: "Restaurante", tone: "from-accent/15" },
  { name: "Consultora", tone: "from-emerald-200/40" },
  { name: "Tienda online", tone: "from-accent/10" },
];

export function Projects() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <motion.h2
          variants={fadeUp}
          className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl"
        >
          Webs que realmente venden
        </motion.h2>
        <motion.a
          variants={fadeUp}
          href={whatsappUrl("Hola Pierre, quiero ver una demo de cómo quedaría mi web")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark underline-offset-4 hover:underline"
        >
          Solicita una demo gratuita <ArrowUpRight size={16} weight="bold" />
        </motion.a>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
      >
        {PREVIEWS.map((p) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`group flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br ${p.tone} via-card to-card p-6`}
          >
            <div className="mb-auto flex flex-wrap gap-2">
              <span className="h-2.5 w-16 rounded-full bg-foreground/10" />
              <span className="h-2.5 w-10 rounded-full bg-accent/30" />
            </div>
            <span className="text-sm font-medium text-muted">{p.name}</span>
            <span className="text-lg font-semibold tracking-tight">Tu próxima web</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
