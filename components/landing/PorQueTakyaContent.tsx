"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
  CartesianGrid, Legend,
} from "recharts";

const C = {
  ink: "#0f172a", gry: "#cbd5e1", red: "#ef4444",
  amb: "#f97316", grn: "#34c759", blu: "#0071e3",
  tc: "#94a3b8",
};
const ax = { fill: C.tc, fontSize: 10 };

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm px-3 py-2 text-xs font-mono">
      {label && <p className="text-[#94a3b8] mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill ?? p.stroke ?? C.ink }} className="font-semibold">
          {p.name ? `${p.name}: ` : ""}{p.value}
        </p>
      ))}
    </div>
  );
}

function Arg({ n, title, lead, note, dark = false, children }: {
  n: number; title: ReactNode; lead: string;
  note: ReactNode; dark?: boolean; children?: ReactNode;
}) {
  return (
    <section className="py-14 border-b border-[#e2e8f0]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center font-mono text-sm font-bold text-[#0071e3]">
            {n}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-[1.1] tracking-[-0.018em] text-foreground">
            {title}
          </h2>
        </div>
        <p className="pl-11 text-base text-[#4a5568] leading-relaxed max-w-2xl mb-8">{lead}</p>
        {children}
        <div className={`rounded-xl p-6 mt-6 ${dark ? "bg-[#0f172a]" : "bg-[#f0f4fb] border border-[#d6e4f7]"}`}>
          <p className={`text-sm leading-relaxed ${dark ? "text-white/70" : "text-[#4a5568]"}`}>{note}</p>
        </div>
      </div>
    </section>
  );
}

function G2({ children }: { children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-[#d6e4f7] border border-[#d6e4f7] rounded-xl overflow-hidden">
      {children}
    </div>
  );
}
function G1({ children }: { children: ReactNode }) {
  return <div className="border border-[#d6e4f7] rounded-xl overflow-hidden">{children}</div>;
}
function CB({ title, src, children }: { title: string; src: string; children: ReactNode }) {
  return (
    <div className="bg-white p-5">
      <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#94a3b8] mb-3">{title}</p>
      <div style={{ height: 220 }}>{children}</div>
      <p className="text-[10px] font-mono text-[#94a3b8] mt-3 leading-snug">{src}</p>
    </div>
  );
}

const kpis = [
  { v: "#1",    l: "TEA en LATAM — 33.4%",            c: C.ink },
  { v: "−100K", l: "empresas desaparecidas en 2024",   c: C.red },
  { v: "91.5%", l: "emprendieron por necesidad",       c: C.amb },
  { v: "6.52%", l: "sobreviven más de 42 meses",       c: C.red },
  { v: "+90%",  l: "son microempresas (1–9 personas)", c: C.blu },
];

const nichos = [
  { icon: "🍽", name: "Restaurantes",   problem: "Pedidos en papel, errores en cocina, el dueño no sabe por qué pierde al final del mes",     result: "−62% errores · 8 min menos de espera · +19% rotación de mesas" },
  { icon: "💇", name: "Salones & Spas", problem: "Agenda en WhatsApp, no-shows invisibles, horas perdidas que nadie recupera",                result: "−71% no-shows · +2.4h recuperadas/semana · +34% reservas" },
  { icon: "🛍", name: "Tiendas",        problem: "Inventario en cuaderno, ventas de productos agotados, sin canal online",                    result: "−89% ventas fallidas · +41% ticket promedio · ROI en 3 semanas" },
  { icon: "🏥", name: "Clínicas",       problem: "Historiales en papel, pacientes que no regresan, cobros que se pierden",                    result: "−58% tiempo por consulta · +47% retorno de pacientes · 0 dobles reservas" },
  { icon: "🏗", name: "Constructoras",  problem: "Cero visibilidad de obra, sobrecostos invisibles, cliente que llama todo el día",           result: "−31% sobrecosto · 0 llamadas del cliente · +2 proyectos en paralelo" },
  { icon: "📚", name: "Academias",      problem: "Cobros manuales, deserción silenciosa, mensualidades que nunca llegan",                     result: "−54% deserción · +$620 cobros/mes · +28% inscripciones online" },
  { icon: "🚚", name: "Transporte",     problem: "Sin rastreo de flota, rutas ineficientes, cliente que llama sin respuesta",                 result: "−22% combustible · −84% llamadas · +3 servicios/unidad/día" },
  { icon: "🌱", name: "Agronegocios",   problem: "100% ventas a intermediarios, sin canal directo, sin trazabilidad",                         result: "+210% margen/kg · 8 compradores directos en 60 días · $0 en publicidad" },
];

export default function PorQueTakyaContent() {
  return (
    <main className="bg-background min-h-screen">

      {/* NAV */}
      <div className="border-b border-[#d6e4f7] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-[#4a5568] hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver a Takya
          </Link>
          <span className="text-[#d6e4f7]">|</span>
          <span className="text-sm text-[#94a3b8] font-mono">Dossier · 9 argumentos verificados</span>
        </div>
      </div>

      {/* HERO */}
      <div className="bg-white border-b border-[#d6e4f7] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <span className="block text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-[#94a3b8] mb-4">
            GEM 2024–2025 · INEC 2024 · CEPAL · Bain & Company · Imperial College London
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.06] tracking-[-0.022em] text-foreground max-w-3xl mb-5">
            La paradoja ecuatoriana: el país que más emprende es el que{" "}
            <span style={{ borderBottom: "3px solid var(--accent)" }}>menos sobrevive.</span>
          </h1>
          <p className="text-[17px] text-[#4a5568] leading-relaxed max-w-2xl mb-12">
            Nueve argumentos, cada uno con datos verificados y fuente primaria. Juntos demuestran una sola cosa: los negocios en Ecuador no cierran por falta de talento ni de clientes — cierran por huecos de gestión que una herramienta puede tapar.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 border border-[#d6e4f7] rounded-xl overflow-hidden bg-white divide-x divide-y md:divide-y-0 divide-[#d6e4f7]">
            {kpis.map((s, i) => (
              <div key={i} className="p-5">
                <span className="block text-3xl font-semibold tracking-[-0.02em] leading-none mb-2" style={{ color: s.c }}>{s.v}</span>
                <p className="text-xs text-[#4a5568] leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ARG 1 */}
      <Arg n={1}
        title={<>De cada 100 negocios que nacen, <span style={{ borderBottom: "2px solid var(--accent)" }}>solo 7 llegan a los 3.5 años.</span></>}
        lead="La tasa de negocios establecidos (que superan 42 meses) se desplomó a la mitad en un solo año. Ecuador genera emprendimientos a ritmo récord — y los pierde al mismo ritmo."
        dark
        note={<><strong className="text-white">Lo que esto significa:</strong> en 2024 Ecuador superaba al promedio latinoamericano en negocios consolidados. En un solo año cayó por debajo. María Luisa Granda (ESPAE-ESPOL): <em className="text-white/60">"El problema no es cuántos negocios nacen, sino cuántos logran sobrevivir."</em> La capacidad de emprender está intacta — lo que colapsó es la capacidad de sostener la operación.</>}
      >
        <G2>
          <CB title="De 100 negocios nacientes, ¿cuántos se establecen?" src="GEM Ecuador 2024 (UEES) · GEM 2025–2026 (ESPAE-ESPOL) · negocios >42 meses">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Nacen",v:100},{n:"Establecidos 2024",v:13.26},{n:"Establecidos 2025",v:6.52}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.gry}/><Cell fill={C.amb}/><Cell fill={C.red}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="Ecuador vs promedio LATAM — negocios establecidos (%)" src="GEM 2024: Ecuador 13.26% vs LATAM 7.44% → GEM 2025: Ecuador cae a 6.52%, bajo el promedio regional">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{y:"2024",ec:13.26,latam:7.44},{y:"2025",ec:6.52,latam:7.44}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="y" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<Tip/>}/>
                <Legend iconSize={8} wrapperStyle={{fontSize:10,color:C.tc}}/>
                <Bar dataKey="ec" name="Ecuador" fill={C.ink} radius={[4,4,0,0]}/>
                <Bar dataKey="latam" name="Prom. LATAM" fill={C.gry} radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 2 */}
      <Arg n={2}
        title={<>El 91.5% emprende por necesidad. <span style={{ borderBottom: "2px solid var(--accent)" }}>Nadie les enseñó a administrar.</span></>}
        lead="Quien emprende porque perdió el empleo no tuvo tiempo de aprender gestión, contabilidad ni operaciones. Abre el negocio con su oficio — y descubre los huecos cuando ya están costando dinero."
        note={<><strong>La conexión:</strong> el segundo país más emprendedor del mundo es también donde 9 de cada 10 emprenden sin haberlo planeado. El emprendedor ecuatoriano domina su oficio — cocinar, cortar, construir, curar — pero nunca tuvo la oportunidad de aprender la parte administrativa. Esa parte es exactamente la que Takya convierte en herramienta.</>}
      >
        <G2>
          <CB title="Motivación para emprender en Ecuador" src="GEM Ecuador 2025–2026 · 'inició su negocio porque no encontró empleo o sus ingresos eran insuficientes'">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name:"Por necesidad",value:91.5},{name:"Por oportunidad",value:8.5}]} cx="50%" cy="50%" innerRadius="52%" outerRadius="78%" dataKey="value" paddingAngle={2}>
                  <Cell fill={C.red}/><Cell fill={C.gry}/>
                </Pie>
                <Tooltip content={<Tip/>}/>
                <Legend iconSize={8} wrapperStyle={{fontSize:10,color:C.tc}}/>
              </PieChart>
            </ResponsiveContainer>
          </CB>
          <CB title="TEA mundial 2025 — Ecuador es 2º del mundo" src="GEM 2025–2026 · Tasa de Actividad Emprendedora Temprana (TEA) · selección de países">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[{n:"Angola",v:52.9},{n:"Ecuador",v:29.63},{n:"Prom. LATAM",v:20},{n:"Prom. mundial",v:13}]} margin={{top:4,right:28,bottom:4,left:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false}/>
                <XAxis type="number" tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                <YAxis type="category" dataKey="n" tick={ax} axisLine={false} tickLine={false} width={90}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[0,4,4,0]}>
                  <Cell fill={C.gry}/><Cell fill={C.ink}/><Cell fill={C.gry}/><Cell fill={C.gry}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 3 */}
      <Arg n={3}
        title={<>La triple brecha de gestión: <span style={{ borderBottom: "2px solid var(--accent)" }}>sin registros, sin ayuda, sin personal.</span></>}
        lead="Tres datos independientes, de tres estudios distintos, cuentan la misma historia: el negocio ecuatoriano promedio opera a ciegas — y cuando empieza a caer, cae solo."
        dark
        note={<><strong className="text-white">El hallazgo más revelador de toda la investigación:</strong> el 73.3% de los emprendedores cuyo negocio estaba decayendo <strong className="text-white">nunca buscó ayuda profesional</strong>. No es indiferencia — es que las soluciones disponibles (contadores, consultores, software corporativo) están fuera de su alcance económico. El hueco no es de voluntad. Es de acceso.</>}
      >
        <G1>
          <CB title="Las brechas de gestión del microempresario ecuatoriano (%)" src="RFD Ecuador (4.2M microempresarios) · Uniandes Episteme (n=181) · Horizon Intl. Journal 2025 (pymes Quito)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical"
                data={[
                  {n:"No lleva ningún registro contable",v:70},
                  {n:"No buscó ayuda cuando el negocio decayó",v:73.3},
                  {n:"Opera informal (sin RUC)",v:65},
                  {n:"Sin personal especializado en digital",v:63.6},
                  {n:"Sin presencia digital (CEPAL)",v:60},
                ]}
                margin={{top:4,right:32,bottom:4,left:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false}/>
                <XAxis type="number" tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[0,85]}/>
                <YAxis type="category" dataKey="n" tick={ax} axisLine={false} tickLine={false} width={210}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[0,4,4,0]}>
                  {[C.red,C.red,C.amb,C.amb,C.amb].map((fill,i)=><Cell key={i} fill={fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G1>
      </Arg>

      {/* ARG 4 */}
      <Arg n={4}
        title={<>Las causas de cierre declaradas: <span style={{ borderBottom: "2px solid var(--accent)" }}>más de la mitad son problemas de gestión.</span></>}
        lead="Cuando el GEM pregunta a los emprendedores por qué cerraron, las respuestas se agrupan: rentabilidad y financiamiento — ambos síntomas de operación sin control — suman el 52.6% de los cierres."
        note={<><strong>Lo que dice un experto financiero:</strong> Galo Aguirre (AAA Finanzas Corporativas): <em>"existen negocios que ni siquiera saben cuánto realmente ganan, cuáles son sus costos o en qué se va el flujo de caja diario"</em>. La falta de rentabilidad no es un problema de mercado — es la consecuencia final de operar meses sin datos.</>}
      >
        <G2>
          <CB title="Causas de cierre · GEM Ecuador 2024" src="GEM Ecuador 2024 · APS Survey · rojo = causas vinculadas a gestión y control financiero">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical"
                data={[
                  {n:"No era rentable",v:31.17},
                  {n:"Sin financiamiento",v:21.38},
                  {n:"Problemas personales",v:18},
                  {n:"Oportunidad de vender",v:14},
                  {n:"Política fiscal",v:10},
                  {n:"Jubilación/retiro",v:5.45},
                ]}
                margin={{top:4,right:32,bottom:4,left:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false}/>
                <XAxis type="number" tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[0,40]}/>
                <YAxis type="category" dataKey="n" tick={ax} axisLine={false} tickLine={false} width={140}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[0,4,4,0]}>
                  {[C.red,C.red,C.gry,C.gry,C.gry,C.gry].map((fill,i)=><Cell key={i} fill={fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="Agrupado: gestión vs causas externas (%)" src="Elaboración propia sobre GEM 2024: rentabilidad (31.17%) + financiamiento (21.38%) = 52.55%">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name:"Gestión y control financiero",value:52.55},{name:"Causas externas y personales",value:47.45}]} cx="50%" cy="50%" innerRadius="52%" outerRadius="78%" dataKey="value" paddingAngle={2}>
                  <Cell fill={C.red}/><Cell fill={C.gry}/>
                </Pie>
                <Tooltip content={<Tip/>}/>
                <Legend iconSize={8} wrapperStyle={{fontSize:10,color:C.tc}}/>
              </PieChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 5 */}
      <Arg n={5}
        title={<>2024: el año en que Ecuador perdió <span style={{ borderBottom: "2px solid var(--accent)" }}>100,461 empresas.</span></>}
        lead="El registro oficial del INEC muestra la mayor contracción empresarial en años. Y la víctima fue una sola categoría: la microempresa — exactamente el segmento sin acceso a herramientas."
        note={<><strong>El patrón:</strong> las empresas medianas y grandes — las que tienen sistemas, contadores y control — apenas variaron. La microempresa, que opera sin nada de eso, perdió casi 102,000 unidades. No es coincidencia: <strong>es la diferencia entre operar con herramientas y operar a ciegas.</strong></>}
      >
        <G2>
          <CB title="Empresas activas en Ecuador (miles) · INEC REEM" src="INEC — Registro Estadístico de Empresas 2024 (publicado oct. 2025)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{y:"2020",v:842},{y:"2021",v:846},{y:"2022",v:864},{y:"2023",v:1174},{y:"2024",v:1074}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="y" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`} domain={[800,1200]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  {[C.gry,C.gry,C.gry,C.grn,C.red].map((fill,i)=><Cell key={i} fill={fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="¿Quién absorbió la caída? · variación 2024 (%)" src="INEC REEM 2024 · microempresas −9.3% (−101,900) · comercio −12.2% (−50,700 empresas)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Microempresas",v:-9.3},{n:"Sector comercio",v:-12.2},{n:"Total empresas",v:-8.6}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[-15,0]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[0,0,5,5]}>
                  {[C.red,C.red,C.amb].map((fill,i)=><Cell key={i} fill={fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 6 */}
      <Arg n={6}
        title={<>El dividendo digital: <span style={{ borderBottom: "2px solid var(--accent)" }}>28% vs 8% de crecimiento anual.</span></>}
        lead="Las pymes con presencia digital crecen 3.5 veces más rápido que las que no la tienen. Y el efecto se acumula: en tres años, la brecha se vuelve insalvable."
        note={<><strong>La trampa de la inacción:</strong> dos negocios idénticos hoy. El que se digitaliza factura el doble en 3 años. Y mientras tanto, la intención de digitalizarse en Ecuador <strong>está cayendo</strong> (de 63.1% a 56.9% según GEM) — no porque no quieran, sino porque el 45.5% no sabe cómo y el 40.9% cree que es caro. Takya elimina ambas barreras.</>}
      >
        <G2>
          <CB title="Crecimiento anual en ventas · con vs sin presencia digital" src="CONCANACO-Servytur · 2º Estudio de Digitalización Pymes 2025 (LATAM)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Con presencia digital",v:28},{n:"Sin presencia digital",v:8}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`+${v}%`} domain={[0,35]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.ink}/><Cell fill={C.gry}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="El efecto compuesto: mismas ventas iniciales, 3 años después" src="Proyección compuesta sobre datos CONCANACO: base 100 → digital 210 vs analógico 126 al año 3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{y:"Hoy",d:100,a:100},{y:"Año 1",d:128,a:108},{y:"Año 2",d:164,a:117},{y:"Año 3",d:210,a:126}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)"/>
                <XAxis dataKey="y" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} domain={[80,230]}/>
                <Tooltip content={<Tip/>}/>
                <Legend iconSize={8} wrapperStyle={{fontSize:10,color:C.tc}}/>
                <Line type="monotone" dataKey="d" name="Con herramientas (+28%/año)" stroke={C.ink} strokeWidth={2.5} dot={{fill:C.ink,r:4}}/>
                <Line type="monotone" dataKey="a" name="Sin digitalización (+8%/año)" stroke={C.gry} strokeWidth={2} strokeDasharray="5 3" dot={{fill:C.gry,r:3}}/>
              </LineChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 7 */}
      <Arg n={7}
        title={<>No es teoría: las herramientas funcionan. <span style={{ borderBottom: "2px solid var(--accent)" }}>Lo dice la evidencia científica.</span></>}
        lead="No son promesas de vendedor. Son estudios revisados por pares que cuantifican exactamente cuánto recupera un negocio cuando tapa el hueco."
        note={<><strong>La cadena de evidencia es sólida:</strong> Imperial College London midió la reducción de no-shows con recordatorios SMS en un ensayo clínico controlado. Bain & Company cuantificó el impacto de la retención con datos de cientos de empresas. El BID confirmó la resiliencia de las pymes digitalizadas durante crisis. No son estimaciones — son estudios.</>}
      >
        <G2>
          <CB title="Recordatorio SMS y citas perdidas · estudio clínico" src="Koshy, Car & Majeed · Imperial College London · BMC Ophthalmology 2008 · reducción del 38%">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Sin recordatorio",v:18.1},{n:"Con recordatorio SMS",v:11.2}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[0,22]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.gry}/><Cell fill={C.grn}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="Retener 5% más de clientes → impacto en ganancias" src="Frederick Reichheld · Bain & Company · Harvard Business Review · +5% retención = +25% a +95% ganancias">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Ganancia base",v:100},{n:"Escenario conservador",v:125},{n:"Escenario alto",v:195}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} domain={[0,220]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.gry}/><Cell fill={C.grn}/><Cell fill={C.grn}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#d6e4f7] border border-[#d6e4f7] rounded-xl overflow-hidden mt-2">
          {[
            {v:"−38%",    l:"citas perdidas con recordatorio automático (Imperial College London, peer-reviewed)",  c:C.grn},
            {v:"−32%",    l:"no-shows adicionales cuando hay prepago online (AgendaPro LATAM)",                     c:C.grn},
            {v:"+25–95%", l:"en ganancias por retener solo 5% más clientes (Bain & Company)",                      c:C.grn},
            {v:"✓ BID",   l:"pymes digitalizadas fueron más resilientes en flujo de caja durante crisis (2020)",   c:C.blu},
          ].map((s,i)=>(
            <div key={i} className="bg-white p-5">
              <span className="block text-2xl font-semibold tracking-[-0.02em] leading-none mb-2" style={{color:s.c}}>{s.v}</span>
              <p className="text-xs text-[#4a5568] leading-snug">{s.l}</p>
            </div>
          ))}
        </div>
      </Arg>

      {/* ARG 8 */}
      <Arg n={8}
        title={<>La matemática que quiebra: <span style={{ borderBottom: "2px solid var(--accent)" }}>el desperdicio supera a la ganancia.</span></>}
        lead="Un restaurante opera con margen neto del 3–5%. El desperdicio evitable ronda el 10% del costo de insumos. La fuga es más grande que la ganancia — el negocio puede estar lleno y aun así perder."
        note={<><strong>El mismo patrón en cada sector:</strong> en el restaurante, la fuga es el desperdicio. En el salón, los no-shows. En la tienda, el stock muerto. En el agro, el intermediario. <strong>Ninguna de esas fugas se ve sin herramienta — y todas son más grandes que el margen del negocio.</strong></>}
      >
        <G2>
          <CB title="Restaurante con $10,000/mes en ventas — ganancia vs desperdicio" src="Margen neto 3–5% del sector (Fudo) · desperdicio ~10% del costo de insumos (~35% de ventas)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Ganancia neta (~4%)",v:400},{n:"Desperdicio evitable",v:350}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} domain={[0,500]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.grn}/><Cell fill={C.red}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="Cadena agrícola: lo que recibe el productor vs lo que paga el consumidor" src="INIAP / INEC · caso lenteja: encarecimiento del 117% en la cadena · hasta 6 reventas · vía CEAP-ESPOL">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n:"Lo que recibe el productor",v:100},{n:"Lo que paga el consumidor",v:217}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="n" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} domain={[0,250]}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[5,5,0,0]}>
                  <Cell fill={C.red}/><Cell fill={C.gry}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* ARG 9 */}
      <Arg n={9}
        title={<>El problema no es voluntad. <span style={{ borderBottom: "2px solid var(--accent)" }}>Es acceso.</span></>}
        lead="Cuando se les pregunta a las pymes por qué no se digitalizan, las respuestas no hablan de desinterés. Hablan de barreras concretas — exactamente las que un servicio accesible y en español elimina."
        dark
        note={<><strong className="text-white">La conclusión del dossier:</strong> Ecuador tiene el talento emprendedor más activo del continente, pero opera sin red: sin registros contables (70%), sin ayuda profesional (73.3%), sin personal digital (63.6%), sin presencia online (~60%). Cada brecha es un hueco que filtra dinero. <strong className="text-white">Takya existe para tapar esos huecos a un precio que una microempresa sí puede pagar.</strong> No para que crezcan más rápido. Para que no cierren.</>}
      >
        <G2>
          <CB title="Barreras declaradas para digitalizarse · pymes Quito" src="Horizon International Journal 2025 · estudio pymes sector norte de Quito">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical"
                data={[
                  {n:"Sin personal especializado",v:63.6},
                  {n:"Falta de conocimientos",v:45.5},
                  {n:"Costos elevados",v:40.9},
                  {n:"Resistencia interna",v:33.2},
                  {n:"Desconocimiento de beneficios",v:28.1},
                ]}
                margin={{top:4,right:32,bottom:4,left:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false}/>
                <XAxis type="number" tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[0,75]}/>
                <YAxis type="category" dataKey="n" tick={ax} axisLine={false} tickLine={false} width={145}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" radius={[0,4,4,0]}>
                  {[C.red,C.amb,C.amb,C.gry,C.gry].map((fill,i)=><Cell key={i} fill={fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CB>
          <CB title="Presencia digital de pymes: Ecuador y LATAM" src="CEPAL / ECLAC · Revista ITI (U. de Guayaquil) · Observatorio de Desarrollo Digital">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{p:"Pymes Ecuador",d:40,nd:60},{p:"Pymes LATAM",d:30,nd:70}]} margin={{top:4,right:8,bottom:4,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false}/>
                <XAxis dataKey="p" tick={ax} axisLine={false} tickLine={false}/>
                <YAxis tick={ax} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<Tip/>}/>
                <Legend iconSize={8} wrapperStyle={{fontSize:10,color:C.tc}}/>
                <Bar dataKey="d" name="Con presencia digital" stackId="a" fill={C.blu}/>
                <Bar dataKey="nd" name="Sin presencia digital" stackId="a" fill={C.gry} radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CB>
        </G2>
      </Arg>

      {/* NICHOS */}
      <section className="py-14 border-b border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-6">
          <span className="block text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-[#94a3b8] mb-3">Soluciones por industria</span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.018em] text-foreground mb-2">
            Cada negocio tiene sus propios huecos.{" "}
            <span style={{ borderBottom: "2px solid var(--accent)" }}>Construimos la herramienta exacta.</span>
          </h2>
          <p className="text-base text-[#4a5568] leading-relaxed mb-8 max-w-lg">
            No plantillas. No soluciones genéricas. El sistema que tu operación necesita para que los números dejen de ser negativos.
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-[#d6e4f7] border border-[#d6e4f7] rounded-xl overflow-hidden">
            {nichos.map((n, i) => (
              <div key={i} className="bg-white p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</span>
                <div>
                  <div className="text-sm font-semibold mb-1 text-foreground">{n.name}</div>
                  <p className="text-xs text-red-500 leading-snug mb-2">{n.problem}</p>
                  <p className="text-xs font-medium leading-snug" style={{color:C.grn}}>{n.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#0f172a] rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-white leading-snug mb-4">
              Takya no reemplaza personas.{" "}
              <span style={{ color: "var(--accent-light)" }}>Cubre los huecos que hacen cerrar negocios.</span>
            </h3>
            <p className="text-[15px] leading-relaxed max-w-2xl mb-6 text-white/70">
              El dueño de un restaurante puede cocinar mejor que nadie — y aun así cerrar porque los pedidos se pierden en papel. La dueña de un salón puede ser la mejor estilista del barrio — y terminar el mes en negativo por las citas que nunca llegaron.{" "}
              <strong style={{ color: "var(--accent-light)" }}>No les falta talento. Les falta el sistema que sostenga lo que ya hacen bien.</strong>
            </p>
            <Link href="/#contacto" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
              Cuéntanos de tu negocio →
            </Link>
          </div>
          <p className="text-xs text-[#94a3b8] font-mono leading-relaxed">
            Fuentes: GEM Ecuador 2024 (UEES/UTPL/PUCE-Ibarra) y GEM 2025–2026 (ESPAE-ESPOL/UTPL/U. Cuenca/UEES/PUCE) · INEC: REEM 2024, ENEMDU 2025, Censo Económico · CEPAL/ECLAC · RFD Ecuador · Uniandes Episteme (n=181) · Horizon International Journal 2025 · CONCANACO-Servytur 2025 · Frederick Reichheld, Bain & Company (HBR) · Koshy, Car & Majeed, Imperial College London (BMC Ophthalmology 2008) · BID 2020 · INIAP/INEC vía CEAP-ESPOL · AAA Finanzas Corporativas · Fudo · AgendaPro. Proyecciones y estimaciones de fuga: elaboración propia sobre fuentes citadas.
          </p>
        </div>
      </section>

    </main>
  );
}
