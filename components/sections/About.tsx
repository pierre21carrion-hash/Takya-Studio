"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Lightning, Heart, Users, Globe } from "@phosphor-icons/react";

const pillars = [
  { icon: Lightning, title: "Velocidad", description: "Entregamos en días, no meses" },
  { icon: Heart, title: "Calidad", description: "Código limpio, diseño premium" },
  { icon: Users, title: "Transparencia", description: "Sin costos ocultos, jamás" },
  { icon: Globe, title: "En español", description: "Comunicación directa y clara" },
];

const stats = [
  { value: "50+", label: "Proyectos completados" },
  { value: "98+", label: "PageSpeed promedio" },
  { value: "5", label: "Días entrega estándar" },
  { value: "99.9%", label: "Uptime garantizado" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function About() {
  return (
    <section className="bg-white px-4 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]"
          >
            Quiénes Somos
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-5xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-6xl"
          >
            Somos <em className="not-italic text-[#0071e3]">José y Pierre</em>
          </motion.h2>
          <motion.p variants={itemVariants} className="max-w-2xl text-xl text-[#515154]">
            Fundadores de Nixo Studio
          </motion.p>
        </motion.div>

        {/* Photo + content */}
        <div className="mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-3xl border border-[#e5e5e7] shadow-2xl shadow-black/5"
          >
            <Image
              src="/founders.jpg"
              alt="José Chugchilán y Pierre Carrion — fundadores de Nixo Studio"
              width={1280}
              height={720}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-auto w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#515154]">
              José Chugchilán y Pierre Carrion son los fundadores de Nixo Studio, una agencia
              digital dedicada a crear soluciones web de alta calidad para negocios en
              Latinoamérica.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#515154]">
              Con experiencia en diseño, desarrollo y automatización con IA, creemos que cada
              negocio merece una presencia digital profesional, rápida y accesible. Nuestra misión
              es democratizar el acceso a webs premium sin sacrificar calidad.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              variants={itemVariants}
              className="border-l-4 border-[#0071e3] py-4 pl-6 text-xl italic text-[#1d1d1f]"
            >
              “No creemos en contratos eternos ni en precios injustos. Creemos en transparencia,
              velocidad y resultados.”
            </motion.blockquote>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#e5e5e7] bg-[#f5f5f7] p-4">
                  <p className="text-2xl font-bold text-[#0071e3]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[#6e6e73]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-4"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="rounded-2xl border border-[#e5e5e7] bg-[#f5f5f7] p-6 text-center"
              >
                <Icon size={32} weight="duotone" className="mx-auto mb-4 text-[#0071e3]" />
                <h3 className="mb-2 text-lg font-bold text-[#1d1d1f]">{pillar.title}</h3>
                <p className="text-sm text-[#515154]">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-[#e5e5e7] pt-16 text-center"
        >
          <p className="mb-8 text-lg text-[#515154]">
            Trabajamos desde Quito, Ecuador para negocios de toda Latinoamérica.
          </p>
          <a
            href="https://wa.me/593978775471?text=Hola%20Jos%C3%A9%20y%20Pierre,%20vi%20que%20sois%20los%20fundadores%20y%20me%20interesa%20trabajar%20con%20Nixo%20Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0077ed] hover:shadow-lg hover:shadow-[#0071e3]/25"
          >
            Empezar un proyecto →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
