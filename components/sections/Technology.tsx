"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { TECH_STACK } from "@/lib/constants";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";

export function Technology() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {t.technology.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex flex-col gap-2">
              <span className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={Number.isInteger(stat.value) ? 0 : 1}
                />
              </span>
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <div className="mt-20 text-center">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t.technology.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TECH_STACK.map((tech, i) => (
              <span
                key={tech}
                className="animate-floaty rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground/70"
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${5 + (i % 3)}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
