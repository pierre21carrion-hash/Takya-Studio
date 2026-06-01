"use client";

import { motion, type Variants } from "framer-motion";
import { ChatCircle, PencilSimple, Wrench, Rocket } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/utils";

const steps = [
  { number: "01", title: "Hablamos", duration: "30 min", icon: ChatCircle },
  { number: "02", title: "Diseñamos", duration: "Días 1–2", icon: PencilSimple },
  { number: "03", title: "Ajustamos", duration: "Días 3–4", icon: Wrench },
  { number: "04", title: "Publicamos", duration: "Día 5", icon: Rocket },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const circleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
  hover: { scale: 1.12, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function Process() {
  return (
    <section id="proceso" className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
            El Proceso
          </span>
          <h2 className="text-4xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-5xl">
            Una web lista en <em className="not-italic text-[#0071e3]">5 días</em>
          </h2>
        </div>

        {/* Compact horizontal timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connector (desktop) — grey track + gradient fill drawn by Framer */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 overflow-hidden rounded-full bg-[#d6e4f7] md:block">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#0071e3] to-[#34c759]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          {/* 2×2 on mobile, 4-up on desktop */}
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-0">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={circleVariants}
                  whileHover="hover"
                  className="group flex flex-col items-center text-center"
                >
                  {/* Circle + faint background number */}
                  <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-6xl font-bold text-[#0071e3]/10 md:text-7xl">
                      {step.number}
                    </span>
                    <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-[#0071e3] bg-white shadow-lg shadow-[#0071e3]/10 transition-colors group-hover:border-[#34c759]">
                      <Icon
                        size={24}
                        weight="bold"
                        className="text-[#0071e3] transition-colors group-hover:text-[#34c759]"
                      />
                    </div>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-[#1d1d1f] md:text-base">{step.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#0071e3] md:text-sm">
                    {step.duration}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href={whatsappUrl("Hola Pierre y José, quiero empezar mi proyecto")}
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
