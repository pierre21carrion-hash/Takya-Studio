// data/ecuador-stats.ts
// Fuente única de verdad para todos los datos de Ecuador
// Actualiza aquí — los componentes los consumen automáticamente

export const ecuadorStats = [
  {
    value: "#1",
    label: "TEA en LATAM — tasa de emprendimiento más alta de la región: 33.4%",
    source: "GEM Ecuador 2024 · UEES",
    color: "text-[#181714]",
  },
  {
    value: "−100K",
    label: "empresas desaparecidas en 2024. La caída más grande en años",
    source: "INEC REEM 2024",
    color: "text-red-600",
  },
  {
    value: "91.5%",
    label: "emprendieron porque no encontraron empleo o sus ingresos no alcanzaban",
    source: "GEM Ecuador 2025",
    color: "text-orange-600",
  },
  {
    value: "6.52%",
    label: "de negocios sobreviven más de 42 meses. En 2024 era 13.26% — se redujo a la mitad",
    source: "GEM Ecuador 2025–2026",
    color: "text-red-600",
  },
  {
    value: "+90%",
    label: "son microempresas — negocios de 1 a 9 personas haciendo todo al mismo tiempo",
    source: "INEC Censo Económico",
    color: "text-blue-700",
  },
];

export const ecuadorCauses = [
  {
    pct: "31.2%",
    title: "Cierra porque no es rentable",
    desc: "No por falta de clientes. Por falta de control: costos invisibles, errores que se repiten, decisiones sin datos.",
    source: "GEM Ecuador 2024 · UEES",
    color: "#D43C3C",
  },
  {
    pct: "70%",
    title: "No lleva ningún registro contable",
    desc: "7 de cada 10 microempresarios opera sin sistema de registro. Toman decisiones con intuición — y esa intuición siempre llega tarde.",
    source: "RFD Ecuador · 4.2M microempresarios",
    color: "#D4781A",
  },
  {
    pct: "73.3%",
    title: "No busca solución cuando el negocio cae",
    desc: "Más de 7 de cada 10 emprendedores en decrecimiento nunca pidieron ayuda. No por indiferencia — las herramientas existentes están fuera de su alcance.",
    source: "Estudio Ibarra · Uniandes Episteme · n=181",
    color: "#D43C3C",
  },
];

export const ecuadorEvidence = [
  {
    icon: "📉",
    claim: "La supervivencia a 42 meses cayó del 13.26% al 6.52% en un solo año — la mitad de los negocios que antes llegaban a los 3.5 años ahora cierran antes.",
    source: "GEM Ecuador 2024 (UEES) → GEM 2025–2026 (ESPAE-ESPOL)",
  },
  {
    icon: "📊",
    claim: "Pymes con presencia digital crecen 28% en ventas. Las que no tienen presencia crecen apenas 8%. Una brecha de 20 puntos porcentuales.",
    source: "CONCANACO-Servytur — 2º Estudio Digitalización Pymes 2025",
  },
  {
    icon: "💡",
    claim: "El 63.6% de las pymes no tiene personal especializado en digitalización. El 45.5% señala falta de conocimientos como barrera principal — no falta de voluntad.",
    source: "Horizon International Journal 2025 · Pymes norte de Quito",
  },
  {
    icon: "🔁",
    claim: "Aumentar la retención de clientes en apenas 5% puede incrementar las ganancias entre 25% y 95%. La mayoría de microempresas no tiene sistema de seguimiento.",
    source: "Frederick Reichheld — Bain & Company · Harvard Business Review",
  },
  {
    icon: "🌱",
    claim: "Un producto agrícola puede revenderse hasta 6 veces entre productor y consumidor, encareciéndose hasta 117%. El productor recibe la fracción menor.",
    source: "INIAP / INEC Ecuador · Cadenas de comercialización · CEAP-ESPOL",
  },
];

export const ecuadorNichos = [
  {
    icon: "🍽",
    name: "Restaurantes",
    problem: "Pedidos en papel, errores en cocina, el dueño no sabe por qué pierde al final del mes",
    result: "−62% errores · 8 min menos de espera · +19% rotación de mesas",
  },
  {
    icon: "💇",
    name: "Salones & Spas",
    problem: "Agenda en WhatsApp, no-shows invisibles, horas perdidas que nadie recupera",
    result: "−71% no-shows · +2.4h recuperadas/semana · +34% reservas",
  },
  {
    icon: "🛍",
    name: "Tiendas",
    problem: "Inventario en cuaderno, ventas de productos agotados, sin canal online",
    result: "−89% ventas fallidas · +41% ticket promedio · ROI en 3 semanas",
  },
  {
    icon: "🏥",
    name: "Clínicas",
    problem: "Historiales en papel, pacientes que no regresan, cobros que se pierden",
    result: "−58% tiempo por consulta · +47% retorno de pacientes · 0 dobles reservas",
  },
  {
    icon: "🏗",
    name: "Constructoras",
    problem: "Cero visibilidad de obra, sobrecostos invisibles, cliente que llama todo el día",
    result: "−31% sobrecosto · 0 llamadas del cliente · +2 proyectos en paralelo",
  },
  {
    icon: "📚",
    name: "Academias",
    problem: "Cobros manuales, deserción silenciosa, mensualidades que nunca llegan",
    result: "−54% deserción · +$620 cobros/mes · +28% inscripciones online",
  },
  {
    icon: "🚚",
    name: "Transporte",
    problem: "Sin rastreo de flota, rutas ineficientes, cliente que llama sin respuesta",
    result: "−22% combustible · −84% llamadas · +3 servicios/unidad/día",
  },
  {
    icon: "🌱",
    name: "Agronegocios",
    problem: "100% ventas a intermediarios, sin canal directo, sin trazabilidad para vender a empresas",
    result: "+210% margen/kg · 8 compradores directos en 60 días · $0 en publicidad",
  },
];
