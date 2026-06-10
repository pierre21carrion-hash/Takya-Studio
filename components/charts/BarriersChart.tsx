"use client";
import "@/components/charts/ChartSetup";
import { Bar } from "react-chartjs-2";
import type { Plugin } from "chart.js";

const endLabelPlugin: Plugin<"bar"> = {
  id: "endLabel",
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const value = data.datasets[0].data[i] as number;
      ctx.save();
      ctx.fillStyle = "#181714";
      ctx.font = "600 11px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(`${value}%`, bar.x + 4, bar.y);
      ctx.restore();
    });
  },
};

export default function BarriersChart() {
  return (
    <Bar
      data={{
        labels: [
          "No sabe cómo empezar",
          "Cree que es muy caro",
          "No tiene tiempo para aprenderlo",
          "No sabe qué herramienta elegir",
        ],
        datasets: [
          {
            label: "% de pymes",
            data: [45.5, 40.9, 28, 22],
            backgroundColor: "rgba(24,23,20,0.75)",
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
              label: (ctx) => ` ${ctx.parsed.x}% de las pymes señalan esto como barrera`,
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 60,
            ticks: { callback: (v) => `${v}%` },
            grid: { color: "#E8E6E1" },
          },
          y: { grid: { display: false }, ticks: { font: { size: 12 } } },
        },
      }}
      plugins={[endLabelPlugin]}
      height={180}
    />
  );
}
