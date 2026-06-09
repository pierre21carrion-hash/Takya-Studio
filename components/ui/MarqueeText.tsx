"use client";

import { Lightning, CurrencyDollar, Robot, Translate } from "@phosphor-icons/react";
import { useLang } from "@/lib/LanguageContext";

const ICONS = [Lightning, CurrencyDollar, Robot, Translate];

/** Seamless infinite marquee — the track is duplicated and shifted -50%. */
export function MarqueeText() {
  const { t } = useLang();
  const items = t.marquee.map((label, i) => ({ Icon: ICONS[i % ICONS.length], label }));
  const doubled = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden border-y border-border/70 py-4">
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {doubled.map(({ Icon, label }, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted">
            <Icon size={18} weight="duotone" className="text-accent" />
            {label}
          </span>
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
        {doubled.map(({ Icon, label }, i) => (
          <span key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted">
            <Icon size={18} weight="duotone" className="text-accent" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
