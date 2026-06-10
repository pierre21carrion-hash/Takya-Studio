import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "¿Por qué Takya? — El problema real de los negocios en Ecuador",
  description:
    "Datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas específicas que necesita cada industria para no cerrar.",
};

const stats = [
  { value: "#1",    label: "TEA en LATAM — tasa de emprendimiento más alta",       source: "GEM Ecuador 2024 · UEES",     color: "var(--foreground)" },
  { value: "−100K", label: "empresas desaparecidas en 2024",                        source: "INEC REEM 2024",               color: "#ef4444" },
  { value: "91.5%", label: "emprendieron por necesidad — no por oportunidad",       source: "GEM Ecuador 2025",             color: "#f97316" },
  { value: "6.52%", label: "de negocios sobreviven más de 42 meses (era 13.26%)",  source: "GEM Ecuador 2025–2026",        color: "#ef4444" },
  { value: "+90%",  label: "son microempresas — 1 a 9 personas haciendo todo",      source: "INEC Censo Económico",         color: "var(--accent)" },
];

const causes = [
  { pct: "31.2%", title: "Cierra porque no es rentable",            desc: "No por falta de clientes. Por falta de control: costos invisibles, errores que se repiten, decisiones sin datos.",                                                                              source: "GEM Ecuador 2024 · UEES",                    color: "#ef4444" },
  { pct: "70%",   title: "No lleva ningún registro contable",       desc: "7 de cada 10 microempresarios opera sin sistema de registro. Toman decisiones con intuición — y esa intuición siempre llega tarde.",                                                            source: "RFD Ecuador · 4.2M microempresarios",        color: "#f97316" },
  { pct: "73.3%", title: "No busca solución cuando el negocio cae", desc: "Más de 7 de cada 10 emprendedores en decrecimiento nunca pidieron ayuda. No por indiferencia — las herramientas existentes están fuera de su alcance.",                                         source: "Estudio Ibarra · Uniandes Episteme · n=181", color: "#ef4444" },
];

const evidence = [
  { icon: "📉", claim: "La supervivencia a 42 meses cayó del 13.26% al 6.52% en un solo año — la mitad de los negocios que antes llegaban a los 3.5 años ahora cierran antes.",                                     source: "GEM Ecuador 2024 (UEES) → GEM 2025–2026 (ESPAE-ESPOL)" },
  { icon: "📊", claim: "Pymes con presencia digital crecen 28% en ventas. Las que no tienen presencia crecen apenas 8%. Una brecha de 20 puntos porcentuales.",                                                       source: "CONCANACO-Servytur — 2º Estudio Digitalización Pymes 2025" },
  { icon: "💡", claim: "El 63.6% de las pymes no tiene personal especializado en digitalización. El 45.5% señala falta de conocimientos como barrera principal — no falta de voluntad.",                              source: "Horizon International Journal 2025 · Pymes norte de Quito" },
  { icon: "🔁", claim: "Aumentar la retención de clientes en apenas 5% puede incrementar las ganancias entre 25% y 95%. La mayoría de microempresas no tiene sistema de seguimiento.",                                source: "Frederick Reichheld — Bain & Company · Harvard Business Review" },
  { icon: "🌱", claim: "Un producto agrícola puede revenderse hasta 6 veces entre productor y consumidor, encareciéndose hasta 117%. El productor recibe la fracción menor.",                                         source: "INIAP / INEC Ecuador · Cadenas de comercialización · CEAP-ESPOL" },
];

const nichos = [
  { icon: "🍽", name: "Restaurantes",   problem: "Pedidos en papel, errores en cocina, el dueño no sabe por qué pierde al final del mes",             result: "−62% errores · 8 min menos de espera · +19% rotación de mesas" },
  { icon: "💇", name: "Salones & Spas", problem: "Agenda en WhatsApp, no-shows invisibles, horas perdidas que nadie recupera",                        result: "−71% no-shows · +2.4h recuperadas/semana · +34% reservas" },
  { icon: "🛍", name: "Tiendas",        problem: "Inventario en cuaderno, ventas de productos agotados, sin canal online",                            result: "−89% ventas fallidas · +41% ticket promedio · ROI en 3 semanas" },
  { icon: "🏥", name: "Clínicas",       problem: "Historiales en papel, pacientes que no regresan, cobros que se pierden",                            result: "−58% tiempo por consulta · +47% retorno de pacientes · 0 dobles reservas" },
  { icon: "🏗", name: "Constructoras",  problem: "Cero visibilidad de obra, sobrecostos invisibles, cliente que llama todo el día",                   result: "−31% sobrecosto · 0 llamadas del cliente · +2 proyectos en paralelo" },
  { icon: "📚", name: "Academias",      problem: "Cobros manuales, deserción silenciosa, mensualidades que nunca llegan",                             result: "−54% deserción · +$620 cobros/mes · +28% inscripciones online" },
  { icon: "🚚", name: "Transporte",     problem: "Sin rastreo de flota, rutas ineficientes, cliente que llama sin respuesta",                         result: "−22% combustible · −84% llamadas · +3 servicios/unidad/día" },
  { icon: "🌱", name: "Agronegocios",   problem: "100% ventas a intermediarios, sin canal directo, sin trazabilidad para vender a empresas",          result: "+210% margen/kg · 8 compradores directos en 60 días · $0 en publicidad" },
];

export default function PorQueTakya() {
  return (
    <main className="bg-background min-h-screen">

      {/* NAV BACK */}
      <div className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver a Takya
          </Link>
          <span className="text-border">|</span>
          <span className="text-sm text-muted-foreground font-mono">Ecuador en datos verificados</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HERO */}
        <span className="block text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-muted-foreground mb-4">
          GEM 2024–2025 · INEC 2024 · CEPAL · Bain & Company
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold leading-[1.06] tracking-[-0.022em] text-foreground max-w-3xl mb-5">
          Ecuador emprende más que nadie en LATAM.{" "}
          <span style={{ borderBottom: "3px solid var(--accent)" }}>
            Y cierra más que nadie también.
          </span>
        </h1>
        <p className="text-[17px] text-muted leading-relaxed max-w-xl mb-12">
          En 2024 cerraron más de 100,000 empresas. No por falta de clientes. No
          por falta de ganas. Sino porque administrar un negocio solo — sin
          herramientas, sin sistema, sin margen de error — es una carrera que el
          tiempo siempre termina ganando.
        </p>

        {/* KPI GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 border border-border rounded-xl overflow-hidden bg-white mb-2 divide-x divide-y md:divide-y-0 divide-border">
          {stats.map((s, i) => (
            <div key={i} className="p-5">
              <span className="block text-3xl font-semibold tracking-[-0.02em] leading-none mb-2" style={{ color: s.color }}>{s.value}</span>
              <p className="text-xs text-muted leading-relaxed mb-2">{s.label}</p>
              <span className="inline-block text-[10px] font-mono text-muted-foreground bg-card border border-border rounded px-1.5 py-0.5">{s.source}</span>
            </div>
          ))}
        </div>

        {/* TRUTH */}
        <div className="bg-[#0f172a] rounded-xl p-8 mb-12 mt-1">
          <h2 className="text-xl md:text-2xl font-semibold leading-snug text-white mb-4">
            La causa #1 de cierre en Ecuador no es la falta de clientes.{" "}
            <span style={{ color: "var(--accent-light)" }}>Es la falta de rentabilidad y de gestión.</span>
          </h2>
          <p className="text-[15px] leading-relaxed max-w-2xl text-white/70">
            El GEM Ecuador 2024 lo confirma: el{" "}
            <strong style={{ color: "var(--accent-light)" }}>31.17% de los negocios cerró porque simplemente no era rentable</strong>
            {" "}— no porque no hubiera demanda, sino porque los costos, los errores operativos y la falta de control se comieron el margen mes a mes. Según AAA Finanzas Corporativas:{" "}
            <em>"existen negocios que ni siquiera saben cuánto realmente ganan, cuáles son sus costos o en qué se va el flujo de caja diario"</em>.{" "}
            Y el dato más revelador:{" "}
            <strong style={{ color: "var(--accent-light)" }}>el 73.3% de los emprendedores en decrecimiento nunca buscó ayuda</strong>{" "}
            cuando el negocio empezó a caer.
          </p>
        </div>

        {/* CAUSAS */}
        <span className="block text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-muted-foreground mb-3">Por qué cierran — datos verificados</span>
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-foreground mb-6">
          No es falta de talento.{" "}
          <span style={{ borderBottom: "2px solid var(--accent)" }}>Es falta de herramientas que cubran los huecos.</span>
        </h2>
        <div className="grid md:grid-cols-3 border border-border rounded-xl overflow-hidden bg-white divide-y md:divide-y-0 divide-x divide-border mb-2">
          {causes.map((c, i) => (
            <div key={i} className="p-6">
              <span className="block text-4xl font-semibold tracking-[-0.025em] leading-none mb-3" style={{ color: c.color }}>{c.pct}</span>
              <div className="text-sm font-semibold mb-2 text-foreground">{c.title}</div>
              <p className="text-xs text-muted leading-relaxed mb-3">{c.desc}</p>
              <span className="inline-block text-[10px] font-mono text-muted-foreground bg-card border border-border rounded px-1.5 py-0.5">{c.source}</span>
            </div>
          ))}
        </div>

        {/* EVIDENCE */}
        <div className="bg-card border border-border rounded-xl p-6 mb-12 mt-1">
          <span className="block text-[11px] font-mono font-medium tracking-[0.07em] uppercase text-muted-foreground mb-4">Evidencia adicional verificada</span>
          <div className="divide-y divide-border">
            {evidence.map((e, i) => (
              <div key={i} className="flex items-start gap-3 py-4">
                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-base flex-shrink-0">{e.icon}</div>
                <div>
                  <p className="text-sm text-foreground font-medium leading-snug mb-1">{e.claim}</p>
                  <span className="text-[11px] font-mono text-muted-foreground">{e.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NICHOS PREVIEW */}
        <span className="block text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-muted-foreground mb-3">Soluciones por industria</span>
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-foreground mb-2">
          Cada negocio tiene sus propios huecos.{" "}
          <span style={{ borderBottom: "2px solid var(--accent)" }}>Construimos la herramienta exacta.</span>
        </h2>
        <p className="text-base text-muted leading-relaxed mb-8 max-w-lg">
          No plantillas. No soluciones genéricas. El sistema que tu operación necesita para que los números dejen de ser negativos.
        </p>
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden mb-10">
          {nichos.map((n, i) => (
            <div key={i} className="bg-white p-5 flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
              <div>
                <div className="text-sm font-semibold mb-1 text-foreground">{n.name}</div>
                <p className="text-xs text-red-500 leading-snug mb-2">{n.problem}</p>
                <p className="text-xs text-accent-success font-medium leading-snug">{n.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL BRIDGE */}
        <div className="bg-[#0f172a] rounded-xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-white leading-snug mb-4">
            Takya no reemplaza personas.{" "}
            <span style={{ color: "var(--accent-light)" }}>Cubre los huecos que hacen cerrar negocios.</span>
          </h3>
          <p className="text-[15px] leading-relaxed max-w-2xl mb-6 text-white/70">
            El dueño de un restaurante puede cocinar mejor que nadie — y aun así cerrar porque los pedidos se pierden en papel. La dueña de un salón puede ser la mejor estilista del barrio — y terminar el mes en negativo por las citas que nunca llegaron.{" "}
            <strong style={{ color: "var(--accent-light)" }}>No les falta talento. Les falta el sistema que sostenga lo que ya hacen bien.</strong>
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Cuéntanos de tu negocio →
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          Todos los datos presentados en esta página son verificados con fuentes primarias: GEM Ecuador (UEES / ESPAE-ESPOL / UTPL), INEC (Registro Estadístico de Empresas 2024, ENEMDU 2025), CEPAL/ECLAC, Bain & Company (Harvard Business Review), CONCANACO-Servytur, INIAP, MSP Ecuador, AAA Finanzas Corporativas, y Uniandes Episteme. Los datos de antes/después por nicho corresponden a estimaciones basadas en casos reales de clientes Takya.
        </p>

      </div>
    </main>
  );
}
