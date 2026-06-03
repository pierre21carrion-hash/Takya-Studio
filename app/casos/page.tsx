import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Target, Lightbulb, Code, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Casos de estudio — Takya",
  description:
    "Cómo Takya construyó plataformas reales para turismo y cultura en Ecuador: desafío, solución, tecnología y resultados.",
};

const CASOS = [
  {
    cliente: "Pueblos Mágicos del Ecuador",
    categoria: "Turismo / Cultura",
    desafio:
      "Es un proyecto propio que desarrollamos junto a un profesor universitario. El reto: mostrar los 21 destinos más emblemáticos del Ecuador de forma visual, rápida y accesible para turistas internacionales.",
    solucion:
      "Desarrollamos una plataforma con mapa interactivo, explorador de destinos por región y sistema de filtros. Optimizada para SEO internacional con metadatos en español e inglés.",
    tecnologias: ["Next.js 14", "Mapbox", "TypeScript", "Vercel"],
    resultado: "PageSpeed 96/100. Lanzada en 5 días. Disponible para millones de turistas.",
    url: "https://pueblos-magicos-arquitectura.vercel.app",
  },
  {
    cliente: "Ruta Turística Llano Grande",
    categoria: "Turismo comunitario / Cultura",
    desafio:
      "La Comuna Llano Grande necesitaba una plataforma digital para mostrar sus 8 emprendimientos ancestrales y atraer turistas a sus experiencias vivenciales.",
    solucion:
      "Creamos una web con mapa Leaflet interactivo, fichas de cada emprendimiento, sistema de filtros por categoría y conexión directa a WhatsApp de cada negocio.",
    tecnologias: ["Next.js", "Leaflet", "TypeScript", "Tailwind CSS"],
    resultado:
      "8 emprendimientos en el mapa. Accesible desde cualquier dispositivo. Diseño que respeta la identidad cultural Kitu Kara.",
    url: "https://llano-grande.vercel.app",
  },
];

const BLOCKS = [
  { key: "desafio", label: "El desafío", Icon: Target },
  { key: "solucion", label: "La solución", Icon: Lightbulb },
  { key: "resultado", label: "El resultado", Icon: ChartLineUp },
] as const;

export default function CasosPage() {
  return (
    <div className="bg-white px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline"
        >
          <ArrowLeft size={16} weight="bold" /> Volver a Takya
        </Link>

        <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#0071e3]">
          Casos de estudio
        </span>
        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tighter text-[#1d1d1f] md:text-5xl">
          Resultados reales, no promesas
        </h1>
        <p className="mb-16 max-w-2xl text-lg text-[#515154]">
          Un vistazo a cómo trabajamos: el problema del cliente, lo que construimos y el impacto.
        </p>

        <div className="flex flex-col gap-16">
          {CASOS.map((caso) => (
            <article key={caso.cliente} className="rounded-3xl border border-[#d6e4f7] p-8 md:p-10">
              <span className="inline-block rounded-full bg-[#0071e3]/10 px-3 py-1 text-xs font-semibold text-[#0071e3]">
                {caso.categoria}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1d1d1f]">{caso.cliente}</h2>

              <div className="mt-8 flex flex-col gap-8">
                {BLOCKS.map(({ key, label, Icon }) => (
                  <div key={key}>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon size={20} weight="duotone" className="text-[#0071e3]" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-[#1d1d1f]">{label}</h3>
                    </div>
                    <p className="leading-relaxed text-[#515154]">{caso[key]}</p>
                  </div>
                ))}

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Code size={20} weight="duotone" className="text-[#0071e3]" />
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[#1d1d1f]">Tecnologías</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caso.tecnologias.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#d6e4f7] bg-[#f0f4fb] px-3 py-1 text-sm text-[#515154]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={caso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]"
              >
                Ver proyecto en vivo <ArrowUpRight size={16} weight="bold" />
              </a>
            </article>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-16 rounded-3xl bg-[#0071e3] p-10 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">¿Busca un resultado así?</h2>
          <p className="mx-auto mt-2 max-w-md text-white/80">
            Cuéntenos su proyecto — la primera conversación es gratis.
          </p>
          <a
            href={whatsappUrl("Hola, vi sus casos de estudio y quiero un resultado así")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#0071e3] transition-transform hover:-translate-y-0.5"
          >
            Hablemos <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}
