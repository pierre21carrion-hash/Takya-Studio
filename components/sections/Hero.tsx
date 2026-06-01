"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { HeroDeviceShowcase } from "@/components/hero/HeroDeviceShowcase";
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
            Web profesional lista en{" "}
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

        {/* Right — responsive device showcase (laptop + mobile) */}
        <div className="relative flex items-center justify-center" style={{ overflow: "visible" }}>
          <HeroDeviceShowcase />
        </div>
      </div>

      <MarqueeText />
    </section>
  );
}
