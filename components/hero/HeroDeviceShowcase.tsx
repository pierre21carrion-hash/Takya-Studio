"use client";

import { motion } from "framer-motion";
import { DeviceMobile } from "@phosphor-icons/react";

/** Stats shown in the desktop mock — colors kept in style (no className hex). */
const STATS = [
  { val: "98", lbl: "PageSpeed", color: "#34c759" },
  { val: "5d", lbl: "Entrega", color: "#0071e3" },
  { val: "$149", lbl: "Desde", color: "#ff9f0a" },
  { val: "24/7", lbl: "Soporte", color: "#1d1d1f" },
];

const MOBILE_CARDS = [
  { accent: "#0071e3", w1: "75%", w2: "55%" },
  { accent: "#34c759", w1: "65%", w2: "45%" },
  { accent: "#ff9f0a", w1: "55%", w2: "70%" },
];

export function HeroDeviceShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex select-none items-end gap-3"
    >
      {/* DESKTOP MOCKUP */}
      <div className="flex-1 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl shadow-black/[0.06]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-card px-3 py-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28ca42" }} />
          <span className="mx-2 flex-1 rounded-md border border-black/[0.06] bg-white px-2 py-0.5 text-[9px] text-gray-400">
            vekto.co
          </span>
        </div>

        {/* Site hero */}
        <div className="relative overflow-hidden px-3 py-3" style={{ backgroundColor: "#0a0a0a" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-0 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute bottom-0 right-1/4 h-16 w-16 rounded-full bg-accent-success/15 blur-xl" />
          </div>
          <p className="relative z-10 mb-1 text-[8px] font-medium text-accent">Agencia digital · Ecuador</p>
          <h2 className="relative z-10 mb-2 text-[13px] font-bold leading-tight text-white">
            Tu negocio,
            <br />
            online en 5 días
          </h2>
          <p className="relative z-10 mb-2.5 text-[7px] text-white/50">
            Diseño profesional para PYMES de Latinoamérica
          </p>
          <div className="relative z-10 flex gap-2">
            <span className="rounded-full bg-accent px-2.5 py-1 text-[7px] text-white">Comenzar →</span>
            <span className="rounded-full border border-white/20 px-2.5 py-1 text-[7px] text-white/60">
              Ver portafolio
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 divide-x divide-black/[0.06]">
          {STATS.map((s) => (
            <div key={s.lbl} className="px-2 py-2 text-center">
              <div className="text-[13px] font-semibold leading-none" style={{ color: s.color }}>
                {s.val}
              </div>
              <div className="mt-0.5 text-[7px] text-gray-400">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE MOCKUP — raised */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 w-[68px] flex-shrink-0 overflow-hidden rounded-[14px] border-[1.5px] border-black/[0.12] bg-white shadow-xl shadow-black/[0.08]"
      >
        {/* Notch */}
        <div className="flex justify-center bg-card pb-1 pt-1.5">
          <div className="h-1 w-5 rounded-full bg-black/10" />
        </div>

        {/* Screen */}
        <div className="p-2" style={{ backgroundColor: "#0a0a0a" }}>
          <div className="mb-1.5 text-[5.5px] font-bold leading-tight text-white">
            Tu negocio
            <br />
            online en 5d
          </div>
          <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-[5px] text-white">Empezar →</span>
        </div>

        <div className="flex flex-col gap-1 p-1.5">
          {MOBILE_CARDS.map((c, i) => (
            <div key={i} className="rounded-[4px] bg-card p-1.5">
              <div className="mb-1 h-[2px] rounded-full" style={{ background: c.accent, width: c.w1 }} />
              <div className="h-[1.5px] rounded-full bg-black/10" style={{ width: c.w2 }} />
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-1.5">
          <div className="h-[3px] w-6 rounded-full bg-black/15" />
        </div>
      </motion.div>

      {/* Floating PageSpeed badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-4 left-4 flex items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white px-3 py-1.5 shadow-lg shadow-black/[0.06]"
      >
        <span className="text-sm font-bold text-accent">+98</span>
        <span className="text-[11px] font-medium text-gray-600">PageSpeed</span>
      </motion.div>

      {/* Floating responsive badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-3 right-0 flex items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white px-3 py-1.5 shadow-lg shadow-black/[0.06]"
      >
        <DeviceMobile size={13} weight="duotone" className="text-gray-700" />
        <span className="text-[11px] font-medium text-gray-700">100% responsive</span>
      </motion.div>
    </motion.div>
  );
}
