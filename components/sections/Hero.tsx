"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lightning } from "@phosphor-icons/react";
import { TextScramble } from "@/components/animations/TextScramble";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";


export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">

      {/* ── Background video layer ── */}
      <video
        ref={videoRef}
        src="/takya-video-fondo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* ── Gradient overlay: left = dark (readable), right = semi-transparent (video shows through) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(100deg, rgba(0,8,20,0.60) 0%, rgba(0,8,20,0.35) 55%, rgba(0,8,20,0.10) 100%)",
        }}
      />

      {/* ── Subtle accent glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[680px] w-[680px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,113,227,0.18) 0%, transparent 70%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center pt-28 pb-16 md:pt-36 md:pb-20 min-h-screen">

          {/* ── LEFT: Main copy ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-[640px]"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.07em] uppercase text-accent">
                <Lightning size={13} weight="fill" />
                {h.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-bold leading-[0.94] tracking-tighter text-white"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}
            >
              {h.h1Pre}{" "}
              <span className="text-accent">
                <TextScramble text={h.h1Scramble} />
              </span>
              <br />
              <span className="text-white">{h.h1Post}</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[50ch] text-[1.05rem] leading-relaxed text-white/70"
            >
              {h.p}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl("Hola Pierre, quiero mi web")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-px"
              >
                {h.cta}
                <ArrowRight size={16} weight="bold" />
              </a>
              <a
                href="#precios"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/10"
              >
                {h.ctaSecondary}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.ul variants={staggerContainer} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {h.badges.map((badge) => (
                <motion.li
                  key={badge}
                  variants={fadeUp}
                  className="flex items-center gap-2 text-[13px] text-white/60"
                >
                  <CheckCircle size={15} weight="fill" className="text-accent" />
                  {badge}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
