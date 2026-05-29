"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChatCircle, PencilSimple, Wrench, RocketLaunch, ArrowRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PROCESS_STEPS } from "@/lib/constants";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";

const ICONS = { ChatCircle, PencilSimple, Wrench, RocketLaunch };

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24 });

  return (
    <section id="proceso" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <SectionHeading
        eyebrow="De 0 a online"
        title="Tu web lista en 5 días, en 4 pasos simples"
        subtitle="Un proceso transparente y sin fricción. Tú apruebas cada etapa; nosotros ejecutamos con precisión."
      />

      <div ref={ref} className="relative mt-16">
        {/* Connecting line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[34px] md:h-px md:w-auto md:bottom-auto">
          <motion.div
            className="absolute left-0 top-0 origin-top bg-accent md:origin-left"
            style={{
              scaleY: progress,
              scaleX: progress,
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6"
        >
          {PROCESS_STEPS.map((step) => {
            const Icon = ICONS[step.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative flex gap-5 md:flex-col md:gap-0"
              >
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent bg-background text-accent">
                  <Icon size={18} weight="duotone" />
                </div>
                <div className="md:mt-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-4xl font-bold leading-none text-foreground/10">
                      0{step.number}
                    </span>
                    <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent-dark">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-14 flex justify-center">
        <Button href={whatsappUrl("Hola Pierre, quiero empezar")} external size="lg">
          Empezar ahora — es gratis <ArrowRight size={18} weight="bold" />
        </Button>
      </div>
    </section>
  );
}
