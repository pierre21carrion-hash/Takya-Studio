"use client";
import "@/components/charts/ChartSetup";
import { Bar } from "react-chartjs-2";
import type { Plugin } from "chart.js";

const endLabelPlugin: Plugin<"bar"> = {
  id: "endLabel",
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const value = (data.datasets[0].data[i] as number);
      ctx.save();
      ctx.fillStyle = "#181714";
      ctx.font = "600 11px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(`${value}%`, bar.x + 4, bar.y);
      ctx.restore();
    });
  },
};

const SOURCES = [
  "Imperial College London",
  "AgendaPro LATAM",
  "Bain & Company (piso)",
  "Bain & Company (techo)",
  "Datos clientes Takya",
];

export default function ImpactChart() {
  return (
    <Bar
      data={{
        labels: [
          "Recordatorio SMS → menos no-shows",
          "Prepago online → menos no-shows",
          "Retención +5% clientes → más ganancias (piso)",
          "Retención +5% clientes → más ganancias (techo)",
          "Control inventario → menos ventas fallidas",
        ],
        datasets: [
          {
            label: "% de mejora documentado",
            data: [38, 32, 25, 95, 89],
            backgroundColor: [
              "#C8F04A",
              "#C8F04A",
              "rgba(200,240,74,0.5)",
              "#C8F04A",
              "#C8F04A",
            ],
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        indexAxis: "y",
        responsive: true,
        layout: { padding: { right: 40 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x}%`,
              afterLabel: (ctx) => ` Fuente: ${SOURCES[ctx.dataIndex]}`,
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: { callback: (v) => `${v}%` },
            grid: { color: "#E8E6E1" },
          },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      }}
      plugins={[endLabelPlugin]}
      height={220}
    />
  );
}
