"use client";

import dynamic from "next/dynamic";
import ChartWrapper from "@/components/charts/ChartWrapper";

const SurvivalChart       = dynamic(() => import("@/components/charts/SurvivalChart"),       { ssr: false });
const MotivationChart     = dynamic(() => import("@/components/charts/MotivationChart"),     { ssr: false });
const BreachesChart       = dynamic(() => import("@/components/charts/BreachesChart"),       { ssr: false });
const ClosureChart        = dynamic(() => import("@/components/charts/ClosureChart"),        { ssr: false });
const CompanySizeChart    = dynamic(() => import("@/components/charts/CompanySizeChart"),    { ssr: false });
const CompoundGrowthChart = dynamic(() => import("@/components/charts/CompoundGrowthChart"), { ssr: false });
const ImpactChart         = dynamic(() => import("@/components/charts/ImpactChart"),         { ssr: false });
const SectorLeakChart     = dynamic(() => import("@/components/charts/SectorLeakChart"),     { ssr: false });
const BarriersChart       = dynamic(() => import("@/components/charts/BarriersChart"),       { ssr: false });

export function Chart1() {
  return (
    <ChartWrapper title="Negocios establecidos >42 meses — Ecuador vs LATAM" source="GEM Ecuador 2024 (UEES) · GEM 2025–2026 (ESPAE-ESPOL)">
      <SurvivalChart />
    </ChartWrapper>
  );
}

export function Chart2() {
  return (
    <ChartWrapper title="Motivación para emprender — Ecuador 2025" source="GEM Ecuador 2025–2026 · ESPAE-ESPOL">
      <MotivationChart />
    </ChartWrapper>
  );
}

export function Chart3() {
  return (
    <ChartWrapper title="Brechas de gestión en microempresas ecuatorianas" source="RFD Ecuador · Uniandes Episteme (n=181) · Horizon Intl. Journal 2025">
      <BreachesChart />
    </ChartWrapper>
  );
}

export function Chart4() {
  return (
    <ChartWrapper title="Causas declaradas de cierre de negocios — Ecuador" source="GEM Ecuador 2024 · APS Survey">
      <ClosureChart />
    </ChartWrapper>
  );
}

export function Chart5() {
  return (
    <ChartWrapper title="Variación de empresas activas por tamaño — Ecuador 2024" source="INEC REEM 2024 (publicado oct. 2025)">
      <CompanySizeChart />
    </ChartWrapper>
  );
}

export function Chart6() {
  return (
    <ChartWrapper title="Efecto compuesto: digital vs no digital (base $10,000)" source="CONCANACO-Servytur · 2º Estudio Digitalización Pymes 2025 (LATAM)">
      <CompoundGrowthChart />
    </ChartWrapper>
  );
}

export function Chart7() {
  return (
    <ChartWrapper title="Impacto medido de herramientas digitales en negocios LATAM" source="Imperial College London · Bain & Company · AgendaPro LATAM · Datos clientes Takya">
      <ImpactChart />
    </ChartWrapper>
  );
}

export function Chart8() {
  return (
    <ChartWrapper title="Margen neto vs fuga evitable por sector — selecciona el tuyo" source="Fudo · INIAP/INEC vía CEAP-ESPOL · AgendaPro · elaboración propia">
      <SectorLeakChart />
    </ChartWrapper>
  );
}

export function Chart9() {
  return (
    <ChartWrapper title="Barreras declaradas para no digitalizar — pymes Ecuador" source="Horizon International Journal 2025 · GEM Ecuador 2025–2026">
      <BarriersChart />
    </ChartWrapper>
  );
}
