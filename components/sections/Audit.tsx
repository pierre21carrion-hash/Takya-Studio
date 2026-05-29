"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { AUDIT_ITEMS } from "@/lib/constants";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";

export function Audit() {
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
            Gratis · Sin compromiso
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold leading-[1.05] tracking-tighter text-white md:text-5xl"
          >
            Auditoría gratuita de tu web actual
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-zinc-400">
            Revisamos tu sitio y te decimos exactamente qué mejorar para vender más. Sin tecnicismos.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
          >
            {AUDIT_ITEMS.map((item) => (
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
              Solicitar mi auditoría gratis <ArrowRight size={18} weight="bold" />
            </a>
            <p className="mt-4 text-sm text-zinc-500">
              Respuesta en menos de 24h · Gratis · Sin presión
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
