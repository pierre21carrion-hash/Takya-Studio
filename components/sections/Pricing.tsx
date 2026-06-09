"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, X, Star } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { PLANS } from "@/lib/constants";
import { fadeUp, staggerContainer, inViewOnce } from "@/lib/animations";
import { cn, whatsappUrl, formatPrice } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

interface TranslatedPlan {
  name: string;
  description: string;
  features: { text: string; included: boolean }[];
  cta: string;
}

function PriceCard({ plan, tPlan, popularBadge }: {
  plan: typeof PLANS[number];
  tPlan: TranslatedPlan;
  popularBadge: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "relative flex flex-col rounded-[2rem] border p-8 [transform-style:preserve-3d]",
        plan.popular
          ? "border-accent/40 bg-card shadow-[0_24px_60px_var(--shadow-accent)] lg:-translate-y-4 lg:scale-[1.04]"
          : "border-border bg-card shadow-[0_8px_32px_var(--shadow-color)]",
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge pulse className="border-accent/30 bg-accent text-white">
            <Star size={12} weight="fill" /> {popularBadge}
          </Badge>
        </div>
      )}

      <h3 className="text-lg font-semibold tracking-tight">{tPlan.name}</h3>
      <p className="mt-1 text-sm text-muted">{tPlan.description}</p>

      <div className="mt-6 flex items-end gap-1">
        <span className="text-5xl font-bold tracking-tighter">{formatPrice(plan.price)}</span>
        <span className="mb-1.5 text-sm text-muted-foreground">USD</span>
      </div>

      <a
        href={whatsappUrl(plan.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
          plan.popular
            ? "bg-accent text-white hover:bg-accent-dark"
            : "border border-border text-foreground hover:border-accent/40 hover:text-accent-dark",
        )}
      >
        {tPlan.cta}
      </a>

      <ul className="mt-8 flex flex-col gap-3">
        {tPlan.features.map((feat) => (
          <li
            key={feat.text}
            className={cn(
              "flex items-center gap-2.5 text-sm",
              feat.included ? "text-foreground/80" : "text-muted-foreground line-through",
            )}
          >
            {feat.included ? (
              <Check size={16} weight="bold" className="shrink-0 text-accent" />
            ) : (
              <X size={16} weight="bold" className="shrink-0 text-muted-foreground" />
            )}
            {feat.text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Pricing() {
  const { t } = useLang();
  const pr = t.pricing;

  return (
    <section id="precios" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <SectionHeading
        align="center"
        eyebrow={pr.eyebrow}
        title={pr.title}
        subtitle={pr.subtitle}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
      >
        {PLANS.map((plan, i) => (
          <PriceCard
            key={plan.name}
            plan={plan}
            tPlan={pr.plans[i]}
            popularBadge={pr.popularBadge}
          />
        ))}
      </motion.div>

      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
        {pr.disclaimer1}
        <br />
        {pr.disclaimer2}
      </p>

      <p className="mt-4 text-center text-sm text-muted">
        {pr.notSure}{" "}
        <a
          href={whatsappUrl("Hola Pierre, necesito ayuda para elegir un plan")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-dark underline-offset-4 hover:underline"
        >
          {pr.consultLink}
        </a>
      </p>

      <p className="mt-3 text-center text-sm">
        <Link
          href="/calculadora"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {pr.calcLink}
        </Link>
      </p>
    </section>
  );
}
