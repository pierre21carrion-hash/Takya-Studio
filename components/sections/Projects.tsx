"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ArrowSquareOut, Star } from "@phosphor-icons/react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/animations";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(217, 119, 6, 0.2)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export function Projects() {
  const [selected, setSelected] = useState(PORTFOLIO_PROJECTS[0]); // Pueblos Mágicos por defecto
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-gradient-to-b from-background via-[#0f0f0f] to-background px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos en desarrollo"
          subtitle="Trabajando actualmente en experiencias digitales innovadoras."
          align="left"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left — selectable project cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-1"
          >
            {PORTFOLIO_PROJECTS.map((project) => {
              const active = selected.id === project.id;
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => setSelected(project)}
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                  aria-pressed={active}
                  className={`w-full rounded-2xl border-2 p-6 text-left transition-colors ${
                    active
                      ? "border-accent bg-card shadow-lg shadow-[color:var(--shadow-accent)]"
                      : "border-border bg-transparent hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {project.featured && (
                        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-light px-3 py-1 text-xs font-bold text-white">
                          <Star size={12} weight="fill" /> Proyecto principal
                        </span>
                      )}
                      <h3 className="mb-1 text-lg font-bold text-foreground">{project.title}</h3>
                      <p className="line-clamp-2 text-sm text-muted">{project.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: hovered === project.id ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="ml-4 flex h-5 w-5 items-center justify-center text-accent"
                    >
                      <ArrowRight size={20} weight="bold" />
                    </motion.div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/20 bg-accent-muted px-2 py-1 text-xs text-accent-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{project.status}</span>
                    <ArrowSquareOut size={16} className="text-accent/50" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right — live preview */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-[color:var(--shadow-accent)]">
                  <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-accent/10 to-accent-light/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </motion.div>

                  <div className="flex flex-1 flex-col justify-between p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
                        {selected.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted">{selected.description}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 grid grid-cols-3 gap-4 pb-8"
                    >
                      {[
                        { label: "Estado", value: selected.status },
                        { label: "Categoría", value: selected.tags[0] },
                        { label: "Tags", value: String(selected.tags.length) },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-accent/20 bg-accent-muted p-4"
                        >
                          <p className="mb-1 text-xs text-muted-foreground">{stat.label}</p>
                          <p className="font-bold text-accent-light">{stat.value}</p>
                        </div>
                      ))}
                    </motion.div>

                    <motion.a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-accent-light px-6 py-4 font-bold text-white transition-shadow hover:shadow-lg hover:shadow-[color:var(--shadow-accent)]"
                    >
                      Ver proyecto en vivo <ArrowSquareOut size={20} weight="bold" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="mb-6 text-muted">
            ¿Interesado en trabajar juntos? Hay más proyectos en el pipeline.
          </p>
          <Button
            href={whatsappUrl("Hola Pierre, me interesa conversar sobre tus proyectos")}
            external
            size="lg"
          >
            Hablemos sobre colaboraciones <ArrowRight size={18} weight="bold" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
