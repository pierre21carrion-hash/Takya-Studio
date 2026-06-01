"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { TextScramble } from "@/components/animations/TextScramble";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { TRUST_BADGES } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <MeshGradient />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-10">
        {/* Left — copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-3 py-1 text-xs font-medium text-accent-dark">
              <Lightning size={14} weight="fill" /> Webs premium en 5 días · LATAM
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-bold leading-[0.98] tracking-tighter text-foreground md:text-7xl"
          >
            Tu web profesional lista en{" "}
            <span className="text-accent">
              <TextScramble text="5 días" />
            </span>{" "}
            desde $149
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[55ch] text-lg leading-relaxed text-muted"
          >
            Diseño web premium y automatización con IA para negocios de Latinoamérica.
            Sin contratos eternos, sin complicaciones técnicas — 100% en español.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={whatsappUrl("Hola Pierre, quiero mi web")}
              external
              size="lg"
              ariaLabel="Empezar por WhatsApp"
            >
              Empezar mi proyecto <ArrowRight size={18} weight="bold" />
            </Button>
            <Button href="#precios" variant="secondary" size="lg">
              Ver planes y precios
            </Button>
          </motion.div>

          <motion.ul variants={staggerContainer} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_BADGES.map((badge) => (
              <motion.li
                key={badge}
                variants={fadeUp}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <CheckCircle size={18} weight="fill" className="text-accent" />
                {badge}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — abstract browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="glass animate-floaty rounded-[2rem] p-3 shadow-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 rounded-md bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">
                pueblos-magicos-arquitectura.vercel.app
              </span>
            </div>

            {/* Static mini-site preview — Pueblos Mágicos (no skeletons) */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
              {/* simulated navbar */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[9px] font-bold text-emerald-800">Pueblos Mágicos</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-[40px] rounded-full bg-sky-500" />
                  <span className="h-1 w-[20px] rounded-full bg-sky-500" />
                  <span className="h-1 w-[30px] rounded-full bg-sky-500" />
                </div>
              </div>

              {/* simulated hero banner */}
              <div className="mx-3 flex h-16 flex-col justify-end rounded-lg bg-gradient-to-br from-emerald-800 to-emerald-600 p-3">
                <p className="text-xs font-bold leading-tight text-white">
                  Pueblos Mágicos del Ecuador
                </p>
                <p className="text-[8px] leading-tight text-white opacity-80">
                  Explora los 21 destinos · Ministerio de Turismo
                </p>
              </div>

              {/* simulated content cards */}
              <div className="grid grid-cols-3 gap-2 p-3">
                {[
                  { bg: "bg-emerald-100", dot: "bg-emerald-500" },
                  { bg: "bg-amber-100", dot: "bg-amber-500" },
                  { bg: "bg-sky-100", dot: "bg-sky-500" },
                ].map((c, i) => (
                  <div key={i} className={`rounded-lg ${c.bg} p-2`}>
                    <span className={`mb-2 block h-2 w-2 rounded-full ${c.dot}`} />
                    <span className="mb-1 block h-1.5 w-full rounded bg-gray-300" />
                    <span className="block h-1.5 w-2/3 rounded bg-gray-300" />
                  </div>
                ))}
              </div>

              {/* PageSpeed trust bar — solid, static (not a loader) */}
              <div className="mx-3 mb-3 h-1 overflow-hidden rounded-full bg-foreground/5">
                <div className="h-full w-[98%] rounded-full bg-accent" />
              </div>
            </div>
          </div>

          <div className="glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 text-sm font-medium">
            <span className="text-accent">+98</span> PageSpeed
          </div>
        </motion.div>
      </div>

      <MarqueeText />
    </section>
  );
}
