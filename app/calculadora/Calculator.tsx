"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { Counter } from "@/components/ui/Counter";
import { whatsappUrl } from "@/lib/utils";

const PREGUNTAS = [
  {
    id: "tipo",
    pregunta: "¿Qué tipo de negocio tiene?",
    opciones: ["Emprendimiento personal", "Empresa / Startup", "E-commerce", "Profesional independiente"],
    multiple: false,
  },
  {
    id: "secciones",
    pregunta: "¿Cuántas secciones necesita?",
    opciones: ["1-5 secciones (básico)", "6-10 secciones (intermedio)", "10+ secciones o blog"],
    multiple: false,
  },
  {
    id: "extras",
    pregunta: "¿Qué extras necesita?",
    opciones: ["Tienda online", "Automatizaciones WhatsApp", "Blog", "Ninguno"],
    multiple: true,
  },
  {
    id: "urgencia",
    pregunta: "¿Cuándo necesita la web?",
    opciones: ["Esta semana", "Este mes", "Sin prisa"],
    multiple: false,
  },
] as const;

interface Answers {
  tipo?: string;
  secciones?: string;
  extras: string[];
  urgencia?: string;
}

function computePrice(a: Answers): { precio: number; plan: string } {
  let precio = 149;
  if (a.secciones === "6-10 secciones (intermedio)") precio = 299;
  if (a.secciones === "10+ secciones o blog") precio = 499;
  if (a.extras.includes("Tienda online")) precio += 150;
  if (a.extras.includes("Automatizaciones WhatsApp")) precio += 100;
  if (a.extras.includes("Blog")) precio += 50;
  if (a.urgencia === "Esta semana") precio += 50;
  const plan =
    a.secciones === "10+ secciones o blog"
      ? "Dominio"
      : a.secciones === "6-10 secciones (intermedio)"
        ? "Escala"
        : "Inicio";
  return { precio, plan };
}

export function Calculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ extras: [] });

  const total = PREGUNTAS.length;
  const done = step >= total;
  const q = done ? null : PREGUNTAS[step];

  const selectSingle = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }) as Answers);
    setStep((s) => s + 1);
  };

  const toggleExtra = (value: string) => {
    setAnswers((a) => ({
      ...a,
      extras: a.extras.includes(value) ? a.extras.filter((x) => x !== value) : [...a.extras, value],
    }));
  };

  const isSelected = (op: string) =>
    q?.multiple ? answers.extras.includes(op) : answers[q?.id as "tipo" | "secciones" | "urgencia"] === op;

  const { precio, plan } = computePrice(answers);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[#d6e4f7]">
        <motion.div
          className="h-full rounded-full bg-[#0071e3]"
          animate={{ width: `${(Math.min(step, total) / total) * 100}%` }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done && q ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-1 text-sm text-[#6e6e73]">
              Paso {step + 1} de {total}
            </p>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">
              {q.pregunta}
            </h2>
            {q.id === "extras" && (
              <p className="mb-6 text-sm font-medium text-[#0071e3]">
                El chatbot con IA ya viene incluido en todos los planes.
              </p>
            )}
            {q.id !== "extras" && <div className="mb-6" />}

            <div className="flex flex-col gap-3">
              {q.opciones.map((op) => {
                const selected = isSelected(op);
                return (
                  <button
                    key={op}
                    type="button"
                    onClick={() => (q.multiple ? toggleExtra(op) : selectSingle(q.id, op))}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left text-[15px] transition-colors ${
                      selected
                        ? "border-[#0071e3] bg-[#0071e3]/[0.06] text-[#1d1d1f]"
                        : "border-[#d6e4f7] bg-white text-[#515154] hover:border-[#0071e3]/40"
                    }`}
                  >
                    {op}
                    {q.multiple && (
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          selected ? "border-[#0071e3] bg-[#0071e3] text-white" : "border-[#d2d2d7]"
                        }`}
                      >
                        {selected && <Check size={12} weight="bold" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f]"
                >
                  <ArrowLeft size={16} /> Atrás
                </button>
              ) : (
                <span />
              )}
              {q.multiple && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]"
                >
                  Continuar <ArrowRight size={16} weight="bold" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl border border-[#d6e4f7] bg-white p-8 text-center md:p-12"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0071e3]">El estimado</p>
            <div className="my-4 text-6xl font-bold tracking-tighter text-[#1d1d1f] md:text-7xl">
              $<Counter value={precio} />
            </div>
            <p className="text-[#515154]">
              Plan recomendado: <span className="font-semibold text-[#1d1d1f]">{plan}</span>
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[#6e6e73]">
              Estimado referencial. El precio final lo confirmamos en una conversación gratuita, sin
              compromiso.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  `Hola, usé la calculadora de Takya. Mi estimado es $${precio} (plan ${plan}). Quiero empezar.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#0077ed]"
              >
                Empezar con este plan <ArrowRight size={16} weight="bold" />
              </a>
              <Link
                href="/#precios"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6e4f7] px-7 py-3.5 font-semibold text-[#1d1d1f] transition-colors hover:border-[#0071e3]/40"
              >
                Ver planes completos
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(0);
                setAnswers({ extras: [] });
              }}
              className="mt-6 text-sm text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              Empezar de nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
