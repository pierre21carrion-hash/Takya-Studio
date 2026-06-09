"use client";

import { motion } from "framer-motion";
import {
  Browsers,
  Globe,
  Wrench,
  Check,
  MapPin,
  WhatsappLogo,
  Calendar,
  ChatCircle,
  UsersThree,
} from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";

const HEADER_ICONS = { Browsers, Globe, Wrench };
const CHANNEL_ICONS = [MapPin, WhatsappLogo, Calendar, ChatCircle, UsersThree];

function Glow({ color = "var(--accent-muted)", className = "" }: { color?: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-64 w-64 rounded-full ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}

function WebPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-success/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
        <span className="ml-2 flex-1 rounded-md bg-background px-2.5 py-1 text-center font-mono text-[10px] text-muted-foreground">
          tu-marca.com
        </span>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-tight text-foreground">Marca</span>
          <div className="flex gap-2">
            {[18, 14, 14, 10].map((w, i) => (
              <span key={i} className="h-1.5 rounded-full bg-foreground/15" style={{ width: w }} />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-accent/10 via-card to-card p-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent">Premium</span>
          <div className="mt-2 h-2.5 w-3/4 rounded-full bg-foreground/80" />
          <div className="mt-1.5 h-2.5 w-1/2 rounded-full bg-foreground/80" />
          <div className="mt-3 flex gap-2">
            <span className="h-5 w-16 rounded-full bg-accent" />
            <span className="h-5 w-14 rounded-full border border-border" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-2">
              <span className="block h-4 w-4 rounded-md bg-accent/20" />
              <span className="mt-1.5 block h-1 w-full rounded-full bg-foreground/10" />
              <span className="mt-1 block h-1 w-2/3 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { t } = useLang();
  const [s1, s2, s3] = t.services.items;
  const Icon1 = HEADER_ICONS[s1.icon as keyof typeof HEADER_ICONS];
  const Icon2 = HEADER_ICONS[s2.icon as keyof typeof HEADER_ICONS];
  const Icon3 = HEADER_ICONS[s3.icon as keyof typeof HEADER_ICONS];

  return (
    <section id="servicios" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <SectionHeading
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-14 flex flex-col gap-5"
      >
        {/* ── Featured service (01) ── */}
        <motion.article
          variants={fadeUp}
          className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/[0.04] md:p-10 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12"
        >
          <Glow className="-left-24 -top-24 h-72 w-72" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-[color:var(--shadow-accent)]">
                <Icon1 size={24} weight="duotone" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.services.serviceBadge(1)}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{s1.title}</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{s1.description}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {s1.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <WebPreview />
          </div>
        </motion.article>

        {/* ── Services 02 & 03 ── */}
        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2">
          {/* Service 02 */}
          <motion.article
            variants={fadeUp}
            className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] md:p-8"
          >
            <Glow className="-right-20 -top-20 h-56 w-56" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-muted text-accent">
                  <Icon2 size={24} weight="duotone" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.services.serviceBadge(2)}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">{s2.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s2.description}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {s2.features.map((f, i) => {
                  const ChIcon = CHANNEL_ICONS[i] ?? Check;
                  return (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
                        <ChIcon size={14} weight="bold" />
                      </span>
                      {f}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.article>

          {/* Service 03 */}
          <motion.article
            variants={fadeUp}
            className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] md:p-8"
          >
            <Glow
              color="color-mix(in srgb, var(--accent-success) 14%, transparent)"
              className="-right-20 -top-20 h-56 w-56"
            />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-success/15 text-accent-success">
                    <Icon3 size={24} weight="duotone" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t.services.serviceBadge(3)}
                  </span>
                </div>
                <span className="rounded-full bg-accent-success px-3 py-1 text-sm font-bold text-white">
                  $49/mes
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">{s3.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s3.description}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {s3.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-accent-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
}
