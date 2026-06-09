"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { useLang } from "@/lib/LanguageContext";
import { calcTranslations } from "@/lib/i18n";
import { Calculator } from "./Calculator";

export function CalculadoraContent() {
  const { lang } = useLang();
  const c = calcTranslations[lang];

  return (
    <div className="bg-white px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline"
        >
          <ArrowLeft size={16} weight="bold" /> {c.backLink}
        </Link>

        <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
          {c.eyebrow}
        </span>
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-5xl">
          {c.title}
        </h1>
        <p className="mb-12 text-lg text-[#515154]">{c.subtitle}</p>

        <Calculator />
      </div>
    </div>
  );
}
