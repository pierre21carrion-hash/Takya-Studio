"use client";
import "@/components/charts/ChartSetup";
import { Bar } from "react-chartjs-2";

export default function BreachesChart() {
  return (
    <Bar
      data={{
        labels: [
          "Nunca buscó ayuda cuando el negocio decaía",
          "Sin registros contables",
          "Sin personal dedicado a lo digital",
          "Sin presencia online activa",
        ],
        datasets: [
          {
            label: "% de microempresarios",
            data: [73.3, 70, 63.6, 60],
            backgroundColor: [
              "rgba(224,82,82,0.85)",
              "rgba(224,82,82,0.70)",
              "rgba(224,82,82,0.55)",
              "rgba(224,82,82,0.40)",
            ],
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.x}% de los microempresarios`,
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
          y: {
            grid: { display: false },
            ticks: { font: { size: 12 } },
          },
        },
      }}
      height={200}
    />
  );
}
