"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { TextScramble } from "@/components/animations/TextScramble";
import { fadeUp, staggerContainer, EASE_STANDARD } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

const stagger = staggerContainer;

const slideIn: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_STANDARD, delay: 0.3 } },
};

const STATS = [
  { value: "98+", label: "PageSpeed Score", color: "#C8F04A" },
  { value: "5d",  label: "Entrega promedio", color: "#C8F04A" },
  { value: "$149", label: "Desde USD", color: "#C8F04A" },
  { value: "50+", label: "Proyectos", color: "#C8F04A" },
];

export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#181714]">

      {/* Video background — only right half visible via clip */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline preload="auto"
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
        style={{ zIndex: 0 }}
      >
        <source src="/takya-video-fondo.mp4" type="video/mp4" />
      </video>

      {/* Gradient: full cover on left, fades on right */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(105deg, #181714 0%, #181714 45%, rgba(24,23,20,0.85) 62%, rgba(24,23,20,0.3) 100%)",
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ zIndex: 2, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Content */}
      <div className="relative flex min-h-screen items-center" style={{ zIndex: 3 }}>
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center pt-28 pb-16 md:pt-36 md:pb-20">

            {/* ── LEFT: Main copy ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-[640px]"
            >
              {/* Eyebrow badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8F04A] animate-pulsedot" />
                  {h.badge}
                </span>
              </motion.div>

              {/* Headline — very large, tracking-tighter */}
              <motion.h1
                variants={fadeUp}
                className="mt-6 font-bold leading-[0.93] tracking-tighter text-white"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                {h.h1Pre}{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "#C8F04A" }}
                >
                  <TextScramble text={h.h1Scramble} />
                  {/* Underline accent */}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "#C8F04A", opacity: 0.5 }}
                  />
                </span>
                <br />
                <span className="text-white/90">{h.h1Post}</span>
              </motion.h1>

              {/* Body */}
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[50ch] text-[1.05rem] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {h.p}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl("Hola Pierre, quiero mi web")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C8F04A] px-6 py-3 text-sm font-bold text-[#181714] transition-all duration-200 hover:bg-[#d4f55e] hover:shadow-[0_0_24px_rgba(200,240,74,0.35)]"
                >
                  {h.cta}
                  <ArrowRight size={16} weight="bold" />
                </a>
                <a
                  href="#precios"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  {h.ctaSecondary}
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.ul variants={stagger} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {h.badges.map((badge) => (
                  <motion.li
                    key={badge}
                    variants={fadeUp}
                    className="flex items-center gap-2 text-[13px]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <CheckCircle size={15} weight="fill" style={{ color: "#C8F04A" }} />
                    {badge}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* ── RIGHT: Stats panel ── */}
            <motion.div
              variants={slideIn}
              initial="hidden"
              animate="visible"
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 flex flex-col gap-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span
                    className="text-4xl font-bold tracking-tighter leading-none"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {s.label}
                  </span>
                </div>
              ))}

              {/* Process mini-steps */}
              <div
                className="col-span-2 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Proceso · 5 días
                </p>
                <div className="flex items-center gap-0">
                  {["Hablamos", "Diseñamos", "Ajustamos", "Publicamos"].map((step, i) => (
                    <div key={i} className="flex items-center gap-0 flex-1">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ background: i === 3 ? "#C8F04A" : "rgba(255,255,255,0.08)", color: i === 3 ? "#181714" : "rgba(255,255,255,0.5)" }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-[10px] text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {step}
                        </span>
                      </div>
                      {i < 3 && (
                        <div className="h-px w-full mb-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecuador note */}
              <div
                className="col-span-2 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(200,240,74,0.05)",
                  border: "1px solid rgba(200,240,74,0.15)",
                }}
              >
                <span className="text-lg">🇪🇨</span>
                <p className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Desde Quito para toda LATAM.<br />
                  <span style={{ color: "rgba(200,240,74,0.8)" }}>100% en español · José & Pierre</span>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
