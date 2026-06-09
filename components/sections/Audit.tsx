"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

export function Audit() {
  const { t } = useLang();
  const a = t.audit;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 px-8 py-16 md:px-16 md:py-20">
        <MeshGradient dark />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.2em] text-accent-light"
          >
            {a.badge}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tighter text-white md:text-5xl"
          >
            {a.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-zinc-400">
            {a.description}
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
          >
            {a.items.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-center gap-2.5 text-sm text-zinc-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Check size={12} weight="bold" className="text-accent-light" />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={whatsappUrl("Hola Pierre, quiero una auditoría gratuita de mi web")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
            >
              {a.cta} <ArrowRight size={18} weight="bold" />
            </a>
            <p className="mt-4 text-sm text-zinc-500">{a.disclaimer}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
