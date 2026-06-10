import Link from "next/link";

const stats = [
  {
    value: "#1",
    label: "TEA en LATAM — tasa de emprendimiento más alta de la región: 33.4%",
    source: "GEM Ecuador 2024 · UEES",
    color: "text-foreground",
  },
  {
    value: "−100K",
    label: "empresas desaparecidas en 2024. La caída más grande en años",
    source: "INEC REEM 2024",
    color: "text-red-500",
  },
  {
    value: "91.5%",
    label: "emprendieron porque no encontraron empleo o sus ingresos no alcanzaban",
    source: "GEM Ecuador 2025",
    color: "text-orange-500",
  },
  {
    value: "6.52%",
    label: "de negocios sobreviven más de 42 meses. En 2024 era el 13.26% — se redujo a la mitad",
    source: "GEM Ecuador 2025–2026",
    color: "text-red-500",
  },
  {
    value: "+90%",
    label: "son microempresas — negocios de 1 a 9 personas haciendo todo al mismo tiempo",
    source: "INEC Censo Económico",
    color: "text-accent",
  },
];

export default function EcuadorSection() {
  return (
    <section className="w-full bg-background border-y border-border py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        <p className="text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-muted-foreground mb-4">
          Ecuador en datos verificados · GEM 2024–2025 · INEC 2024 · CEPAL
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground max-w-2xl mb-4">
          Ecuador emprende más que nadie en LATAM.{" "}
          <span className="border-b-[3px] border-accent">
            Y cierra más que nadie también.
          </span>
        </h2>

        <p className="text-base text-muted leading-relaxed max-w-xl mb-10">
          En 2024 cerraron más de 100,000 empresas. No por falta de clientes. No
          por falta de ganas. Sino porque administrar un negocio solo — sin
          herramientas, sin sistema, sin margen de error — es una carrera que el
          tiempo siempre termina ganando.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border border border-border rounded-xl overflow-hidden mb-8 bg-white">
          {stats.map((s, i) => (
            <div key={i} className="p-5">
              <span className={`block text-3xl font-semibold tracking-[-0.02em] leading-none mb-2 ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs text-muted leading-[1.5] mb-2">
                {s.label}
              </p>
              <span className="inline-block text-[10px] font-mono text-muted-foreground bg-card border border-border rounded px-1.5 py-0.5">
                {s.source}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/por-que-takya"
            className="inline-flex items-center gap-2 bg-[#0f172a] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#1e293b] transition-colors"
          >
            Ver el análisis completo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className="text-xs text-muted-foreground font-mono">
            Datos verificados · GEM 2024–2026 · INEC · CEPAL · Bain & Company
          </p>
        </div>

      </div>
    </section>
  );
}
