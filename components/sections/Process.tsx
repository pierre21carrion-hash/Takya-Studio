"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatCircle, PencilSimple, Wrench, RocketLaunch, ArrowRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";

const ICONS = { ChatCircle, PencilSimple, Wrench, RocketLaunch };

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger draws the connecting line as the section scrolls in.
  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(line, { scaleX: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 65%", end: "center 55%", scrub: 0.6 },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-10"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #f0f7ff 0%, #ffffff 60%)" }}
    >
      <div
        className="grain pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mb-16 md:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 block text-sm font-semibold uppercase tracking-widest text-accent"
          >
            De 0 a online
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-5xl font-bold leading-[0.95] tracking-tighter text-foreground md:text-7xl lg:text-8xl"
          >
            Tu web lista en <em className="italic text-accent">5 días</em>,
            <br className="hidden md:block" /> en 4 pasos.
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) — gradient blue → green, drawn by GSAP */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-0.5 overflow-hidden rounded-full bg-[#e5e5e7] md:block"
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-left rounded-full"
              style={{
                background: "linear-gradient(90deg, #0071e3 0%, #34c759 100%)",
                transform: "scaleX(0)",
              }}
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6"
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = ICONS[step.icon as keyof typeof ICONS];
              return (
                <motion.div key={step.number} variants={fadeUp}>
                  {/* Icon node sitting on the line */}
                  <div className="mb-6 flex md:block">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#0071e3]/10 text-accent ring-8 ring-[color:var(--background)]">
                      <Icon size={28} weight="duotone" />
                    </div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative overflow-hidden rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-xl hover:shadow-black/[0.06]"
                  >
                    <span className="pointer-events-none absolute right-5 top-2 select-none text-6xl font-bold text-[#0071e3] opacity-[0.08]">
                      0{step.number}
                    </span>
                    <span className="relative inline-block rounded-full bg-[#0071e3]/10 px-3 py-1 text-xs font-semibold text-accent">
                      {step.duration}
                    </span>
                    <h3 className="relative mt-4 text-xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA + elegant divider */}
        <div className="mt-16 flex flex-col items-center gap-12">
          <a
            href={whatsappUrl("Hola Pierre, quiero empezar")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-5 text-lg font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-lg hover:shadow-[color:var(--shadow-accent)]"
          >
            Empezar ahora — es gratis <ArrowRight size={20} weight="bold" />
          </a>
          <div
            className="h-px w-full max-w-2xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,113,227,0) 0%, rgba(0,113,227,0.6) 35%, rgba(52,199,89,0.6) 65%, rgba(52,199,89,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
