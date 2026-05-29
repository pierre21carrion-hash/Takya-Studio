"use client";

import { Lightning, CurrencyDollar, Robot, Translate } from "@phosphor-icons/react";

const ITEMS = [
  { Icon: Lightning, label: "Entrega en 5 días" },
  { Icon: CurrencyDollar, label: "Desde $149 USD" },
  { Icon: Robot, label: "Automatización con IA" },
  { Icon: Translate, label: "100% en español" },
];

/** Seamless infinite marquee — the track is duplicated and shifted -50%. */
export function MarqueeText() {
  return (
    <div className="relative flex overflow-hidden border-y border-border/70 py-4">
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {[...ITEMS, ...ITEMS].map(({ Icon, label }, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted">
            <Icon size={18} weight="duotone" className="text-accent" />
            {label}
          </span>
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
        {[...ITEMS, ...ITEMS].map(({ Icon, label }, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted">
            <Icon size={18} weight="duotone" className="text-accent" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
