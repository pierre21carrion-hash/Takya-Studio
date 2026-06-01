"use client";

import { motion } from "framer-motion";
import { DeviceMobile } from "@phosphor-icons/react";

const STATS = [
  { val: "98", lbl: "PageSpeed", color: "#34c759" },
  { val: "5d", lbl: "Entrega", color: "#0071e3" },
  { val: "$149", lbl: "Desde", color: "#ff9f0a" },
  { val: "24/7", lbl: "Soporte", color: "#1d1d1f" },
];

const MOBILE_CARDS = [
  { accent: "#0071e3", w1: "78%", w2: "52%" },
  { accent: "#34c759", w1: "65%", w2: "48%" },
  { accent: "#ff9f0a", w1: "72%", w2: "40%" },
];

export function HeroDeviceShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-full select-none items-end gap-4"
    >
      {/* ── LAPTOP ── */}
      <div className="flex flex-1 flex-col items-center">
        {/* Lid / screen */}
        <div
          className="w-full rounded-b-sm rounded-t-xl border border-black/[0.10] p-[6px] shadow-2xl shadow-black/20"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {/* Inner bezel + browser */}
          <div className="overflow-hidden rounded-[8px] border border-black/30 bg-white">
            {/* Browser chrome */}
            <div
              className="flex items-center gap-1.5 border-b border-black/[0.08] px-3 py-2"
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28ca42" }} />
              <span className="mx-2 flex-1 rounded border border-black/[0.07] bg-white px-2 py-0.5 text-[9px] text-gray-400">
                vekto.co
              </span>
            </div>

            {/* Site hero */}
            <div className="relative overflow-hidden px-4 py-4" style={{ backgroundColor: "#050505" }}>
              {/* Flat color glow blobs — no blur (TBT) */}
              <div className="pointer-events-none absolute right-8 top-2 h-20 w-20 rounded-full bg-accent/15" />
              <div className="pointer-events-none absolute bottom-0 right-1/3 h-14 w-14 rounded-full bg-accent-success/10" />

              <p className="relative z-10 mb-1 text-[8px] font-semibold tracking-wide text-accent">
                Agencia digital · Ecuador
              </p>
              <h2 className="relative z-10 mb-2 text-[15px] font-bold leading-tight text-white">
                Tu negocio,
                <br />
                online en 5 días
              </h2>
              <p className="relative z-10 mb-3 text-[8px] text-white/40">
                Diseño profesional para PYMES de Latinoamérica
              </p>
              <div className="relative z-10 flex gap-2">
                <span className="rounded-full bg-accent px-3 py-1.5 text-[8px] font-medium text-white">
                  Comenzar →
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1.5 text-[8px] text-white/50">
                  Ver portafolio
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] bg-white">
              {STATS.map((s) => (
                <div key={s.lbl} className="py-2.5 text-center">
                  <div className="text-[14px] font-bold leading-none" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="mt-1 text-[7px] text-gray-400">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="flex w-full flex-col items-center">
          <div
            className="h-[5px] w-[92%] rounded-b-sm"
            style={{ background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)" }}
          />
          <div
            className="h-[12px] w-full rounded-b-xl border border-black/[0.08]"
            style={{ background: "linear-gradient(to bottom, #d0d0d0, #b8b8b8)" }}
          />
          <div className="mt-[4px] h-[1px] w-[28%] rounded-full bg-black/10" />
        </div>
      </div>

      {/* ── MOBILE ── same visual height as the laptop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-[17px] w-[88px] flex-shrink-0"
      >
        {/* Phone body */}
        <div
          className="rounded-[18px] border-[2.5px] p-[4px] shadow-2xl shadow-black/25"
          style={{ borderColor: "#2a2a2a", backgroundColor: "#1a1a1a" }}
        >
          {/* Screen */}
          <div className="overflow-hidden rounded-[14px] bg-white">
            {/* Front camera */}
            <div className="flex h-[10px] items-center justify-center" style={{ backgroundColor: "#050505" }}>
              <div
                className="h-[6px] w-[6px] rounded-full border"
                style={{ backgroundColor: "#2a2a2a", borderColor: "#333333" }}
              />
            </div>

            {/* Mobile hero */}
            <div className="px-2 pb-2.5 pt-2" style={{ backgroundColor: "#050505" }}>
              <p className="mb-0.5 text-[5px] font-semibold tracking-wide text-accent">Agencia digital</p>
              <div className="mb-1.5 text-[8px] font-bold leading-tight text-white">
                Tu negocio
                <br />
                en 5 días
              </div>
              <span className="inline-block rounded-full bg-accent px-2 py-1 text-[6px] font-medium text-white">
                Empezar →
              </span>
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col gap-[4px] bg-card p-1.5">
              {MOBILE_CARDS.map((c, i) => (
                <div key={i} className="rounded-[6px] border border-black/[0.06] bg-white px-2 py-1.5">
                  <div className="mb-1.5 h-[2.5px] rounded-full" style={{ background: c.accent, width: c.w1 }} />
                  <div className="h-[2px] rounded-full bg-black/[0.08]" style={{ width: c.w2 }} />
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div className="flex h-[10px] items-center justify-center bg-card">
              <div className="h-[3px] w-7 rounded-full bg-black/20" />
            </div>
          </div>
        </div>

        {/* Side buttons (absolute — don't affect flow) */}
        <div className="relative">
          <div
            className="absolute -left-[3px] top-[-60px] h-[14px] w-[3px] rounded-l-sm"
            style={{ backgroundColor: "#2a2a2a" }}
          />
          <div
            className="absolute -left-[3px] top-[-40px] h-[20px] w-[3px] rounded-l-sm"
            style={{ backgroundColor: "#2a2a2a" }}
          />
          <div
            className="absolute -right-[3px] top-[-50px] h-[24px] w-[3px] rounded-r-sm"
            style={{ backgroundColor: "#2a2a2a" }}
          />
        </div>
      </motion.div>

      {/* Badge +98 PageSpeed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-2 left-6 flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-3 py-2 shadow-xl shadow-black/[0.08]"
      >
        <span className="text-[15px] font-bold leading-none text-accent">+98</span>
        <span className="text-[11px] font-medium text-gray-600">PageSpeed</span>
      </motion.div>

      {/* Badge 100% responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 right-0 flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-3 py-2 shadow-xl shadow-black/[0.08]"
      >
        <DeviceMobile size={14} weight="duotone" className="text-gray-700" />
        <span className="text-[11px] font-medium text-gray-700">100% responsive</span>
      </motion.div>
    </motion.div>
  );
}
