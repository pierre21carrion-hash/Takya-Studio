import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "Calculadora de precio — Takya",
  description:
    "Responde 4 preguntas y obtén un estimado del precio de una web con Takya. Sin compromiso.",
};

export default function CalculadoraPage() {
  return (
    <div className="bg-white px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline"
        >
          <ArrowLeft size={16} weight="bold" /> Volver a Takya
        </Link>

        <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
          Calculadora
        </span>
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-5xl">
          ¿Cuánto cuesta una web?
        </h1>
        <p className="mb-12 text-lg text-[#515154]">
          Responde 4 preguntas rápidas y le damos un estimado al instante.
        </p>

        <Calculator />
      </div>
    </div>
  );
}
