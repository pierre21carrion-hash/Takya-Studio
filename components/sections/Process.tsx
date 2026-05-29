"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChatCircle, PencilSimple, Wrench, RocketLaunch } from "@phosphor-icons/react";
import { PROCESS_STEPS } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

const ICONS = { ChatCircle, PencilSimple, Wrench, RocketLaunch };

interface StepContent {
  number: string;
  title: string;
  description: string;
  duration: string;
}

function Content({ step }: { step: StepContent }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-7xl font-bold text-[#0071e3]/10">{step.number}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0071e3]">
          {step.duration}
        </span>
      </div>
      <h3 className="mb-3 text-2xl font-bold text-[#1d1d1f]">{step.title}</h3>
      <p className="text-base leading-relaxed text-[#515154]">{step.description}</p>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  // The colored line fills from 0 → full as the timeline scrolls through center.
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proceso" className="bg-white px-4 py-32 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-24">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
            El Proceso
          </span>
          <h2 className="text-5xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-6xl">
            Tu web lista en
            <br />
            <em className="not-italic text-[#0071e3]">5 días</em>, paso a paso
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical track + scroll-driven fill */}
          <div className="absolute bottom-0 left-8 top-0 w-1 -translate-x-1/2 rounded-full bg-[#e5e5e7] md:left-1/2 md:w-1.5">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-[#0071e3] to-[#34c759]"
            />
          </div>

          {/* Steps */}
          <div className="space-y-20 md:space-y-28">
            {PROCESS_STEPS.map((s, index) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              const leftSide = index % 2 === 0;
              const step: StepContent = {
                number: `0${s.number}`,
                title: s.title,
                description: s.description,
                duration: s.duration,
              };

              return (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, x: leftSide ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className={`flex items-center gap-8 md:gap-16 ${leftSide ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Desktop: left half */}
                  <div className="hidden w-1/2 justify-end pr-12 md:flex">
                    {leftSide && <Content step={step} />}
                  </div>

                  {/* Center dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 + 0.2 }}
                    className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-[#0071e3] bg-white shadow-lg shadow-[#0071e3]/20"
                  >
                    <Icon size={24} weight="bold" className="text-[#0071e3]" />
                  </motion.div>

                  {/* Desktop: right half */}
                  <div className="hidden w-1/2 pl-12 md:flex">
                    {!leftSide && <Content step={step} />}
                  </div>

                  {/* Mobile: content beside the dot */}
                  <div className="md:hidden">
                    <Content step={step} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 text-center"
        >
          <p className="mb-8 text-lg text-[#515154]">
            ¿Listo para empezar? La consulta inicial es completamente gratis.
          </p>
          <a
            href={whatsappUrl("Hola Pierre, quiero empezar mi proyecto")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0077ed] hover:shadow-lg hover:shadow-[#0071e3]/25"
          >
            Empezar ahora — es gratis →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
