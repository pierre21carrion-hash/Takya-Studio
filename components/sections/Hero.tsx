"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { TextScramble } from "@/components/animations/TextScramble";
import { staggerContainer, fadeUp } from "@/lib/animations";
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
    <section className="relative overflow-hidden bg-[#0f172a]">
      {/* Layer 1 — video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
        style={{ zIndex: 0 }}
      >
        <source src="/takya-video-fondo.mp4" type="video/mp4" />
      </video>

      {/* Layer 2 — overlay degradado: opaco a la izquierda, transparente a la derecha */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.88) 40%, rgba(15,23,42,0.2) 65%, rgba(15,23,42,0.0) 100%)",
        }}
      />

      {/* Layer 3 — contenido */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero content — min-h-screen para que el video sea visible */}
        <div className="flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-32 md:pt-40 lg:px-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-[680px]"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  <Lightning size={14} weight="fill" /> {h.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-5xl font-bold leading-[0.98] tracking-tighter text-white md:text-7xl"
              >
                {h.h1Pre}{" "}
                <span className="text-accent">
                  <TextScramble text={h.h1Scramble} />
                </span>{" "}
                {h.h1Post}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[55ch] text-lg leading-relaxed text-slate-300"
              >
                {h.p}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href={whatsappUrl("Hola Pierre, quiero mi web")}
                  external
                  size="lg"
                  ariaLabel={h.cta}
                >
                  {h.cta} <ArrowRight size={18} weight="bold" />
                </Button>
                <Button href="#precios" variant="ghost" size="lg">
                  {h.ctaSecondary}
                </Button>
              </motion.div>

              <motion.ul variants={staggerContainer} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {h.badges.map((badge) => (
                  <motion.li
                    key={badge}
                    variants={fadeUp}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle size={18} weight="fill" className="text-accent" />
                    {badge}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
