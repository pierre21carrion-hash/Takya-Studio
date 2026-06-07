"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lightbulb, WhatsappLogo } from "@phosphor-icons/react";
import { Counter } from "@/components/ui/Counter";

/* ── Tipos ── */
type Objetivo = "conseguir-clientes" | "vender-online" | "agendar-citas" | "mostrar-trabajo";
type Negocio = "emprendimiento" | "empresa" | "profesional" | "ecommerce";
type Local = "si" | "no";
type Contenido = "si" | "parcial" | "no";
type Extra = "gmb" | "citas" | "analytics" | "landing" | "blog" | "auditoria";
type Mantenimiento = "si" | "no";
type Urgencia = "semana" | "mes" | "sinprisa";

interface State {
  objetivo: Objetivo | "";
  negocio: Negocio | "";
  local: Local | "";
  contenido: Contenido | "";
  extras: Extra[];
  mantenimiento: Mantenimiento | "";
  urgencia: Urgencia | "";
}

const INITIAL: State = {
  objetivo: "",
  negocio: "",
  local: "",
  contenido: "",
  extras: [],
  mantenimiento: "",
  urgencia: "",
};

type RadioKey = "objetivo" | "negocio" | "local" | "contenido" | "mantenimiento" | "urgencia";

interface Option {
  value: string;
  label: string;
  subtext?: string;
  badge?: string;
}

type Step =
  | { key: RadioKey; type: "radio"; title: string; subtitle?: string; options: Option[] }
  | { key: "extras"; type: "checkbox"; title: string; subtitle?: string; options: Option[] };

const STEPS: Step[] = [
  {
    key: "objetivo",
    type: "radio",
    title: "¿Qué quiere lograr con la web?",
    options: [
      { value: "conseguir-clientes", label: "Conseguir más clientes", subtext: "Generar llamadas, mensajes o consultas desde la web" },
      { value: "vender-online", label: "Vender productos online", subtext: "Tienda con carrito, pagos y catálogo" },
      { value: "agendar-citas", label: "Que los clientes agenden citas", subtext: "Médicos, salones, tutores, coaches" },
      { value: "mostrar-trabajo", label: "Mostrar mi trabajo / portafolio", subtext: "Imagen profesional y credibilidad" },
    ],
  },
  {
    key: "negocio",
    type: "radio",
    title: "¿Qué tipo de negocio tiene?",
    options: [
      { value: "emprendimiento", label: "Emprendimiento personal", subtext: "Negocio propio, marca personal o servicio" },
      { value: "empresa", label: "Empresa / Startup", subtext: "Equipo de trabajo, clientes B2B o B2C" },
      { value: "profesional", label: "Profesional independiente", subtext: "Médico, abogado, diseñador, coach, tutor" },
      { value: "ecommerce", label: "Tienda / E-commerce", subtext: "Venta de productos físicos o digitales" },
    ],
  },
  {
    key: "local",
    type: "radio",
    title: "¿Tiene local físico o atiende en persona?",
    options: [
      { value: "si", label: "Sí, tengo local o atiendo en persona", subtext: "Restaurante, consultorio, tienda, oficina" },
      { value: "no", label: "No, soy 100% online o voy donde el cliente", subtext: "Servicios remotos, delivery, freelance" },
    ],
  },
  {
    key: "contenido",
    type: "radio",
    title: "¿Tiene textos e imágenes listos?",
    options: [
      { value: "si", label: "Sí, tengo logo, fotos y textos listos", subtext: "Solo necesito que diseñen la web" },
      { value: "parcial", label: "Tengo algo, pero necesito ayuda con los textos", subtext: "Copywriting con IA incluido" },
      { value: "no", label: "Parto desde cero, no tengo nada", subtext: "Textos, estructura y sugerencias de imágenes" },
    ],
  },
  {
    key: "extras",
    type: "checkbox",
    title: "¿Qué más necesita el negocio?",
    subtitle: "Selecciona todas las que apliquen.",
    options: [
      { value: "gmb", label: "Google My Business", subtext: "Aparecer en Google Maps" },
      { value: "citas", label: "Sistema de citas online", subtext: "Reservas automáticas (Calendly)" },
      { value: "analytics", label: "Reportes mensuales de visitas", subtext: "Analytics + PDF resumen" },
      { value: "landing", label: "Landing page para anuncios", subtext: "Meta Ads o Google Ads" },
      { value: "blog", label: "Blog o sección de noticias", subtext: "Contenido actualizable" },
      { value: "auditoria", label: "Auditoría de mi web actual", subtext: "Si ya tienen una web mala" },
    ],
  },
  {
    key: "mantenimiento",
    type: "radio",
    title: "¿Quiere mantenimiento mensual?",
    options: [
      { value: "si", label: "Sí, quiero despreocuparme — $49/mes", subtext: "Actualizaciones, cambios, soporte WhatsApp directo" },
      { value: "no", label: "No por ahora", subtext: "Solo el proyecto único" },
    ],
  },
  {
    key: "urgencia",
    type: "radio",
    title: "¿Para cuándo necesita la web?",
    options: [
      { value: "semana", label: "Esta semana", subtext: "Prioridad máxima, entrega urgente", badge: "+$50 urgencia" },
      { value: "mes", label: "Este mes", subtext: "Entrega estándar en 5 días hábiles" },
      { value: "sinprisa", label: "Sin prisa", subtext: "Podemos coordinar el mejor momento" },
    ],
  },
];

interface Resultado {
  plan: string;
  base: number;
  extras: { label: string; valor: number }[];
  total: number;
  mantenimiento: number | null;
  insight: string;
}

function calcularPrecio(s: State): Resultado {
  // 1. Plan base
  let plan = "Inicio";
  let base = 149;
  if (s.negocio === "empresa") {
    plan = "Escala";
    base = 299;
  } else if (s.negocio === "ecommerce") {
    plan = "Dominio";
    base = 349;
  } else if (s.objetivo === "vender-online") {
    plan = "Dominio";
    base = 349;
  } else if (s.objetivo === "agendar-citas" || s.extras.includes("blog") || s.extras.includes("citas")) {
    plan = "Escala";
    base = 299;
  }

  // 2. Extras
  const extras: { label: string; valor: number }[] = [];
  if (s.contenido === "parcial" || s.contenido === "no") extras.push({ label: "Copywriting con IA", valor: 49 });
  if (s.local === "si" || s.extras.includes("gmb")) extras.push({ label: "Google My Business optimizado", valor: 39 });
  if (s.extras.includes("citas") && plan === "Inicio") extras.push({ label: "Sistema de citas (Calendly)", valor: 49 });
  if (s.extras.includes("landing")) extras.push({ label: "Landing page para anuncios", valor: 99 });
  if (s.extras.includes("analytics")) extras.push({ label: "Reportes mensuales de visitas", valor: 39 });
  if (s.extras.includes("auditoria") && plan !== "Dominio") extras.push({ label: "Auditoría de web existente", valor: 49 });
  if (s.urgencia === "semana") extras.push({ label: 'Prioridad urgente "esta semana"', valor: 50 });

  // 3. Total
  const total = base + extras.reduce((acc, e) => acc + e.valor, 0);

  // 4. Mantenimiento
  const mantenimiento = s.mantenimiento === "si" ? 49 : null;

  // 5. Insight (impersonal / tercera persona, sin emojis)
  let insight: string;
  if (s.objetivo === "vender-online") {
    insight =
      "Para e-commerce en Ecuador, las pasarelas más usadas son Datafast y Payphone. El SRI exige facturación electrónica al facturar online: lo integramos sin costo extra.";
  } else if (s.objetivo === "agendar-citas") {
    insight =
      "Para negocios de citas (salud, belleza, educación), Calendly embebido en la web permite que los clientes reserven solos, 24/7, sin que el negocio tenga que responder cada mensaje.";
  } else if (s.local === "si") {
    insight =
      "Con local físico, Google My Business optimizado puede triplicar las consultas locales. El 88% de las búsquedas locales en Ecuador termina en compra en menos de 24 horas.";
  } else if (s.negocio === "profesional") {
    insight =
      "Una web bien posicionada para profesionales independientes en Quito puede generar entre 3 y 10 consultas nuevas por semana, sin pagar publicidad.";
  } else {
    insight =
      "Una web optimizada con SEO técnico genera clientes nuevos de forma orgánica. El 72% de las búsquedas en Ecuador son desde el celular — la web estará perfecta para eso.";
  }

  return { plan, base, extras, total, mantenimiento, insight };
}

const CTA_URL =
  "https://wa.me/593963608530?text=Hola%20Pierre%2C%20acabo%20de%20calcular%20mi%20presupuesto%20en%20Takya%20y%20quiero%20empezar";

export function Calculator() {
  const [paso, setPaso] = useState(0);
  const [state, setState] = useState<State>(INITIAL);

  const total = STEPS.length;
  const done = paso >= total;
  const step = done ? null : STEPS[paso];

  const selectRadio = (key: RadioKey, value: string) =>
    setState((s) => ({ ...s, [key]: value }) as State);

  const toggleExtra = (value: Extra) =>
    setState((s) => ({
      ...s,
      extras: s.extras.includes(value) ? s.extras.filter((x) => x !== value) : [...s.extras, value],
    }));

  const isSelected = (opt: string): boolean => {
    if (!step) return false;
    if (step.type === "checkbox") return state.extras.includes(opt as Extra);
    return state[step.key] === opt;
  };

  // Los pasos de radio requieren una selección; los extras (checkbox) son opcionales.
  const canNext = step ? step.type === "checkbox" || state[step.key] !== "" : false;

  const r = calcularPrecio(state);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Barra de progreso */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-[#d6e4f7]">
        <motion.div
          className="h-full rounded-full bg-[#0071e3]"
          animate={{ width: `${(Math.min(paso, total) / total) * 100}%` }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done && step ? (
          <motion.div
            key={paso}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-1 text-sm text-[#6e6e73]">
              Paso {paso + 1} de {total}
            </p>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">
              {step.title}
            </h2>
            {step.subtitle ? (
              <p className="mb-6 text-sm text-[#6e6e73]">{step.subtitle}</p>
            ) : (
              <div className="mb-6" />
            )}

            <div className={step.type === "checkbox" ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}>
              {step.options.map((op) => {
                const sel = isSelected(op.value);
                return (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() =>
                      step.type === "checkbox" ? toggleExtra(op.value as Extra) : selectRadio(step.key, op.value)
                    }
                    aria-pressed={sel}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      sel ? "border-[#0071e3] bg-[#0071e3]/[0.06]" : "border-[#d6e4f7] bg-white hover:border-[#0071e3]/40"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border ${
                        step.type === "checkbox" ? "rounded-md" : "rounded-full"
                      } ${sel ? "border-[#0071e3] bg-[#0071e3] text-white" : "border-[#d2d2d7]"}`}
                    >
                      {sel && <Check size={12} weight="bold" />}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-medium text-[#1d1d1f]">{op.label}</span>
                        {op.badge && (
                          <span className="rounded-full bg-[#ff9f0a]/15 px-2 py-0.5 text-[11px] font-semibold text-[#b45309]">
                            {op.badge}
                          </span>
                        )}
                      </span>
                      {op.subtext && <span className="mt-0.5 block text-sm text-[#6e6e73]">{op.subtext}</span>}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPaso((p) => Math.max(0, p - 1))}
                disabled={paso === 0}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f] disabled:opacity-0"
              >
                <ArrowLeft size={16} /> Atrás
              </button>
              <button
                type="button"
                onClick={() => setPaso((p) => p + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed] disabled:opacity-40"
              >
                {paso === total - 1 ? "Ver resultado" : "Siguiente"} <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl border border-[#d6e4f7] bg-white p-8 text-center md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0071e3]">Plan recomendado</p>
            <h2 className="mt-1 text-2xl font-bold text-[#1d1d1f]">Plan {r.plan}</h2>
            <div className="my-3 text-6xl font-bold tracking-tighter text-[#1d1d1f] md:text-7xl">
              $<Counter value={r.total} />
            </div>
            <p className="text-sm text-[#6e6e73]">USD · pago único · sin costos ocultos</p>
            {r.mantenimiento !== null && (
              <p className="mt-1 text-sm font-medium text-[#0071e3]">+ ${r.mantenimiento}/mes de mantenimiento</p>
            )}

            {r.extras.length > 0 && (
              <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-[#d6e4f7] bg-[#f0f4fb] p-4 text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">Desglose</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#515154]">Plan {r.plan}</span>
                  <span className="font-medium text-[#1d1d1f]">${r.base}</span>
                </div>
                {r.extras.map((e) => (
                  <div key={e.label} className="mt-1 flex justify-between text-sm">
                    <span className="text-[#515154]">{e.label}</span>
                    <span className="font-medium text-[#1d1d1f]">+${e.valor}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-[#d6e4f7] pt-2 text-sm font-bold">
                  <span className="text-[#1d1d1f]">Total</span>
                  <span className="text-[#0071e3]">${r.total}</span>
                </div>
              </div>
            )}

            <div className="mx-auto mt-6 flex max-w-md items-start gap-3 rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/[0.06] p-4 text-left">
              <Lightbulb size={20} weight="duotone" className="mt-0.5 flex-shrink-0 text-[#0071e3]" />
              <p className="text-sm leading-relaxed text-[#515154]">{r.insight}</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#0077ed]"
              >
                <WhatsappLogo size={18} weight="fill" /> Empezar mi proyecto →
              </a>
              <button
                type="button"
                onClick={() => {
                  setPaso(0);
                  setState(INITIAL);
                }}
                className="text-sm text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
              >
                ← Volver a calcular
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
