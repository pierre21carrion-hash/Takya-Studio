import type { Metadata } from "next";
import Link from "next/link";
import { ecuadorStats, ecuadorNichos } from "@/data/ecuador-stats";
import ChartWrapper from "@/components/charts/ChartWrapper";
import dynamic from "next/dynamic";

const SurvivalChart     = dynamic(() => import("@/components/charts/SurvivalChart"),     { ssr: false });
const MotivationChart   = dynamic(() => import("@/components/charts/MotivationChart"),   { ssr: false });
const BreachesChart     = dynamic(() => import("@/components/charts/BreachesChart"),     { ssr: false });
const ClosureChart      = dynamic(() => import("@/components/charts/ClosureChart"),      { ssr: false });
const CompanySizeChart  = dynamic(() => import("@/components/charts/CompanySizeChart"),  { ssr: false });
const CompoundGrowthChart = dynamic(() => import("@/components/charts/CompoundGrowthChart"), { ssr: false });
const ImpactChart       = dynamic(() => import("@/components/charts/ImpactChart"),       { ssr: false });
const SectorLeakChart   = dynamic(() => import("@/components/charts/SectorLeakChart"),   { ssr: false });
const BarriersChart     = dynamic(() => import("@/components/charts/BarriersChart"),     { ssr: false });

export const metadata: Metadata = {
  title: "¿Por qué Takya? — El problema real de los negocios en Ecuador",
  description:
    "Datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas específicas que necesita cada industria para no cerrar.",
  openGraph: {
    title: "¿Por qué Takya? — El problema real de los negocios en Ecuador",
    description:
      "Datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas específicas que necesita cada industria para no cerrar.",
    url: "https://nixo-studio-next.vercel.app/por-que-takya",
    siteName: "Takya",
    locale: "es_EC",
    type: "website",
  },
};

export default function PorQueTakya() {
  return (
    <main className="bg-[#F5F4F1] min-h-screen font-['Geist',_system-ui,_sans-serif]">

      {/* NAV BACK */}
      <div className="border-b border-[#E0DED9] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-[#6A6760] hover:text-[#181714] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver a Takya
          </Link>
          <span className="text-[#E0DED9]">|</span>
          <span className="text-sm text-[#9B9893] font-mono">Ecuador en datos verificados</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* HERO */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-4">
          Por qué existe Takya · 9 argumentos verificados
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-[1.04] tracking-[-0.025em] text-[#181714] max-w-3xl mb-5">
          Ecuador emprende más que nadie.{" "}
          <span className="border-b-[3px] border-[#C8F04A]">Y cierra más que nadie también.</span>
        </h1>
        <p className="text-lg text-[#6A6760] leading-relaxed max-w-2xl mb-12">
          No es falta de talento. No es falta de clientes. Los negocios cierran
          por huecos de gestión que operan en silencio — sin registros, sin
          visibilidad, sin control. Aquí están los datos.
        </p>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#E0DED9] border border-[#E0DED9] rounded-xl overflow-hidden mb-16 bg-white">
          {ecuadorStats.map((s, i) => (
            <div key={i} className="p-5">
              <span className={`block text-3xl font-semibold tracking-[-0.025em] leading-none mb-2 ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs text-[#6A6760] leading-[1.5] mb-2">{s.label}</p>
              <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-[#F5F4F1] border border-[#E0DED9] rounded px-1.5 py-0.5">
                {s.source}
              </span>
            </div>
          ))}
        </div>

        {/* ─── 9 ARGUMENTOS ─── */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-10">
          9 argumentos con datos verificados
        </p>

        {/* ARG 1 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">01</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            De cada 100 negocios en Ecuador,{" "}
            <span className="border-b-[2px] border-[#C8F04A]">solo 6.5 sobreviven 42 meses.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            La tasa de negocios establecidos (más de 42 meses) cayó de 13.26% en 2024 a 6.52% en 2025 —
            casi a la mitad en un año. El promedio latinoamericano es 7.44%. Ecuador está por debajo.
            No es una tendencia: es una emergencia silenciosa.
          </p>
          <ChartWrapper
            title="Negocios establecidos >42 meses — Ecuador vs LATAM"
            source="GEM Ecuador 2024 (UEES) · GEM 2025–2026 (ESPAE-ESPOL)"
          >
            <SurvivalChart />
          </ChartWrapper>
        </div>

        {/* ARG 2 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">02</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            El 91.5% emprende por necesidad,{" "}
            <span className="border-b-[2px] border-[#C8F04A]">no por oportunidad.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            Cuando se emprende sin plan ni herramientas, el negocio nace frágil. Solo el 8.5% de los
            emprendedores ecuatorianos lo hacen por oportunidad detectada. El resto construye sobre
            necesidad — y sin estructura, la mayoría no sobrevive el tercer año.
          </p>
          <ChartWrapper
            title="Motivación para emprender — Ecuador 2025"
            source="GEM Ecuador 2025–2026 · ESPAE-ESPOL"
          >
            <MotivationChart />
          </ChartWrapper>
        </div>

        {/* ARG 3 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">03</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            La triple brecha de gestión:{" "}
            <span className="border-b-[2px] border-[#C8F04A]">sin registros, sin ayuda, sin digital.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            El 73% nunca buscó asesoría cuando el negocio decaía. El 70% no tiene registros contables.
            Más del 63% no tiene nadie dedicado a lo digital. Estas no son debilidades aisladas —
            son los mismos huecos que aparecen en cada negocio que cierra.
          </p>
          <ChartWrapper
            title="Brechas de gestión en microempresas ecuatorianas"
            source="RFD Ecuador · Uniandes Episteme (n=181) · Horizon Intl. Journal 2025"
          >
            <BreachesChart />
          </ChartWrapper>
        </div>

        {/* ARG 4 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">04</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            Las causas de cierre declaradas:{" "}
            <span className="border-b-[2px] border-[#C8F04A]">más de la mitad son evitables.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            El 31.2% cierra por falta de rentabilidad y el 21.4% por problemas de financiamiento.
            Combinadas, estas dos causas representan el 52.6% de los cierres — y ambas se pueden
            intervenir con visibilidad financiera y control operativo a tiempo.
          </p>
          <ChartWrapper
            title="Causas declaradas de cierre de negocios — Ecuador"
            source="GEM Ecuador 2024 · APS Survey"
          >
            <ClosureChart />
          </ChartWrapper>
        </div>

        {/* ARG 5 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">05</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            2024: el año en que Ecuador perdió{" "}
            <span className="border-b-[2px] border-[#C8F04A]">más de 100,000 microempresas.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            El INEC registró una caída del 9.3% en el número de microempresas activas en 2024.
            Las pequeñas cayeron 1.7%. Solo las empresas grandes crecieron (+0.3%). La brecha entre
            micro y grande se amplía cada año — y la diferencia principal es acceso a herramientas.
          </p>
          <ChartWrapper
            title="Variación de empresas activas por tamaño — Ecuador 2024"
            source="INEC REEM 2024 (publicado oct. 2025)"
          >
            <CompanySizeChart />
          </ChartWrapper>
        </div>

        {/* ARG 6 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">06</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            El dividendo digital: 28% vs 8% de crecimiento.{" "}
            <span className="border-b-[2px] border-[#C8F04A]">Proyéctalo tú mismo.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            Las pymes con herramientas digitales crecen al 28% anual. Las que no, al 8%.
            No es magia — es eficiencia operativa compuesta. Mueve el slider para ver
            cómo esa diferencia se vuelve insuperable con el tiempo.
          </p>
          <ChartWrapper
            title="Efecto compuesto: digital vs no digital (base $10,000)"
            source="CONCANACO-Servytur · 2º Estudio Digitalización Pymes 2025 (LATAM)"
          >
            <CompoundGrowthChart />
          </ChartWrapper>
        </div>

        {/* ARG 7 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">07</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            No es teoría: las herramientas funcionan.{" "}
            <span className="border-b-[2px] border-[#C8F04A]">Los porcentajes son reales.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            Recordatorios que reducen no-shows un 38%. Control de inventario que recupera el 89% de
            ventas fallidas. Retención de clientes que puede multiplicar ganancias hasta 95%.
            Estos no son casos de Silicon Valley — son estudios con negocios latinoamericanos.
          </p>
          <ChartWrapper
            title="Impacto medido de herramientas digitales en negocios LATAM"
            source="Imperial College London · Bain & Company · AgendaPro LATAM · Datos clientes Takya"
          >
            <ImpactChart />
          </ChartWrapper>
        </div>

        {/* ARG 8 */}
        <div className="mb-12">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">08</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            La matemática que quiebra:{" "}
            <span className="border-b-[2px] border-[#C8F04A]">margen ≈ fuga evitable.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            En muchos sectores, la fuga de ingresos evitable (no-shows, merma, stock muerto,
            deserción silenciosa) equivale casi al margen neto del negocio. Eso significa que
            el negocio puede estar ocupado y aun así no sobrevivir. Selecciona tu sector.
          </p>
          <ChartWrapper
            title="Margen neto vs fuga evitable por sector — selecciona el tuyo"
            source="Fudo · INIAP/INEC vía CEAP-ESPOL · AgendaPro · elaboración propia"
          >
            <SectorLeakChart />
          </ChartWrapper>
        </div>

        {/* ARG 9 */}
        <div className="mb-16">
          <span className="inline-block text-[10px] font-mono text-[#9B9893] bg-white border border-[#E0DED9] rounded px-2 py-0.5 mb-3">09</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-3">
            El problema no es voluntad.{" "}
            <span className="border-b-[2px] border-[#C8F04A]">Es fricción de entrada.</span>
          </h2>
          <p className="text-base text-[#6A6760] leading-relaxed max-w-2xl">
            El 45% no sabe cómo empezar a digitalizar su negocio. El 41% cree que es caro.
            Nadie les ha mostrado que existe una herramienta diseñada exactamente para lo que
            hacen, al precio que pueden pagar, sin curva de aprendizaje. Eso es Takya.
          </p>
          <ChartWrapper
            title="Barreras declaradas para no digitalizar — pymes Ecuador"
            source="Horizon International Journal 2025 · GEM Ecuador 2025–2026"
          >
            <BarriersChart />
          </ChartWrapper>
        </div>

        {/* NICHOS */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#9B9893] mb-3">
          Soluciones por industria
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-[#181714] mb-2">
          Cada negocio tiene sus propios huecos.{" "}
          <span style={{ borderBottom: "2px solid #C8F04A" }}>
            Construimos la herramienta exacta.
          </span>
        </h2>
        <p className="text-base text-[#6A6760] leading-relaxed mb-8 max-w-lg">
          No plantillas. No soluciones genéricas. El sistema que tu operación
          necesita para que los números dejen de ser negativos.
        </p>
        <div className="grid md:grid-cols-2 gap-px bg-[#E0DED9] border border-[#E0DED9] rounded-xl overflow-hidden mb-10">
          {ecuadorNichos.map((n, i) => (
            <div key={i} className="bg-white p-5 flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
              <div>
                <div className="text-sm font-semibold mb-1">{n.name}</div>
                <p className="text-xs text-[#D43C3C] leading-snug mb-2">{n.problem}</p>
                <p className="text-xs text-[#1A9960] font-medium leading-snug">{n.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="bg-[#181714] rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-white leading-snug mb-4">
            Takya no reemplaza personas.{" "}
            <span style={{ color: "#C8F04A" }}>Cubre los huecos que hacen cerrar negocios.</span>
          </h3>
          <p className="text-[15px] leading-relaxed max-w-2xl mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            El dueño de un restaurante puede cocinar mejor que nadie — y aun así
            cerrar porque los pedidos se pierden en papel. La dueña de un salón
            puede ser la mejor estilista del barrio — y terminar el mes en negativo
            por las citas que nunca llegaron.{" "}
            <strong style={{ color: "#C8F04A" }}>
              No les falta talento. Les falta el sistema que sostenga lo que ya hacen bien.
            </strong>
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-[#C8F04A] text-[#181714] text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#b8e038] transition-colors"
          >
            Cuéntanos de tu negocio →
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-[#9B9893] leading-relaxed">
          Todos los datos presentados en esta página son verificados con fuentes
          primarias: GEM Ecuador (UEES / ESPAE-ESPOL / UTPL), INEC (Registro
          Estadístico de Empresas 2024, ENEMDU 2025), CEPAL/ECLAC, Bain & Company
          (Harvard Business Review), CONCANACO-Servytur, INIAP, MSP Ecuador, AAA
          Finanzas Corporativas, y Uniandes Episteme. Los datos de antes/después
          por nicho corresponden a estimaciones basadas en casos reales de clientes Takya.
        </p>

      </div>
    </main>
  );
}
