"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { TextScramble } from "@/components/animations/TextScramble";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { TRUST_BADGES, SITE_CONFIG } from "@/lib/constants";
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
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="glass animate-floaty rounded-[2rem] p-3 shadow-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 rounded-md bg-foreground/5 px-3 py-1 text-xs text-muted-foreground">
                {SITE_CONFIG.url.replace("https://", "")}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-card to-card p-6">
              <div className="mb-4 h-2.5 w-1/2 rounded-full bg-accent/30" />
              <div className="mb-2 h-2 w-3/4 rounded-full bg-foreground/10" />
              <div className="mb-6 h-2 w-2/3 rounded-full bg-foreground/10" />
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 h-6 w-6 rounded-lg bg-accent/20" />
                    <div className="h-1.5 w-full rounded-full bg-foreground/10" />
                  </div>
                ))}
              </div>
              {/* loading shimmer bar */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-foreground/5">
                <div className="animate-loadbar h-full w-1/3 rounded-full bg-accent" />
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
