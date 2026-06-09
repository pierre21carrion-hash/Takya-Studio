"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

type ColKey = "wix" | "freelancer" | "agencia" | "vekto";

function TakyaCell({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm font-medium text-[#1d1d1f]">
      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-[#0071e3]" />
      <span>{text}</span>
    </div>
  );
}

export function Comparison() {
  const [active, setActive] = useState<ColKey>("vekto");
  const { t } = useLang();
  const cmp = t.comparison;

  return (
    <section className="bg-white px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow={cmp.eyebrow}
          title={cmp.title}
          subtitle={cmp.subtitle}
        />

        {/* Desktop (>=768px): classic 5-column table */}
        <div className="mt-14 hidden overflow-hidden rounded-3xl border border-[#d6e4f7] md:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1.1fr]">
            <div className="bg-[#f0f4fb] p-4" />
            {cmp.cols.map((c) => (
              <div key={c.key} className="bg-[#f0f4fb] p-4 text-sm font-semibold text-[#515154]">
                {c.label}
              </div>
            ))}
            <div className="bg-[#0071e3] p-4 text-sm font-bold text-white">Takya</div>

            {cmp.rows.map((row, i) => (
              <div key={row.criterio} className="contents">
                <div className={`p-4 text-sm font-semibold text-[#1d1d1f] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>
                  {row.criterio}
                </div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.wix}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.freelancer}</div>
                <div className={`p-4 text-sm text-[#6e6e73] ${i % 2 ? "bg-[#fafafa]" : "bg-white"}`}>{row.agencia}</div>
                <div className="border-l border-[#0071e3]/20 bg-[#0071e3]/[0.06] p-4">
                  <TakyaCell text={row.vekto} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile (<768px): tabs */}
        <div className="mt-12 md:hidden">
          <div className="mb-5 grid grid-cols-4 gap-2">
            {cmp.tabs.map((tab) => {
              const isActive = active === tab.key;
              const isTakya = tab.key === "vekto";
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  aria-pressed={isActive}
                  style={
                    isActive && isTakya
                      ? { backgroundColor: "#0052CC", boxShadow: "0 2px 8px rgba(0,82,204,0.35)" }
                      : undefined
                  }
                  className={cn(
                    "flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold leading-tight transition-colors",
                    isActive
                      ? isTakya
                        ? "text-white"
                        : "bg-white text-[#1d1d1f] shadow-sm"
                      : "bg-[#eaf0f9] text-[#6B7280]",
                  )}
                >
                  {isTakya && <Sparkle size={11} weight="fill" className="shrink-0" />}
                  {tab.short}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3"
            >
              {cmp.rows.map((row) => (
                <div
                  key={row.criterio}
                  className={`rounded-2xl border p-4 ${
                    active === "vekto" ? "border-[#0071e3]/30 bg-[#0071e3]/[0.06]" : "border-[#d6e4f7] bg-white"
                  }`}
                >
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#a1a1a6]">
                    {row.criterio}
                  </p>
                  {active === "vekto" ? (
                    <TakyaCell text={row.vekto} />
                  ) : (
                    <p className="text-sm text-[#515154]">{row[active]}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* "Why not do it yourself" */}
        <div className="mx-auto mt-16 max-w-[680px] rounded-3xl border border-[#d6e4f7] bg-[#f0f4fb] p-8 md:p-10">
          <h3 className="mb-6 text-2xl font-bold tracking-tight text-[#1d1d1f]">
            {cmp.whyNotTitle}
          </h3>
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-[#515154]">
            {cmp.whyNotBody.map((item) => (
              <p key={item.lead}>
                <span className="font-semibold text-[#1d1d1f]">{item.lead}</span>{" "}
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
