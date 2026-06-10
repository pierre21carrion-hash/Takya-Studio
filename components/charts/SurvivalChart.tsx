"use client";
import "@/components/charts/ChartSetup";
import { Bar } from "react-chartjs-2";

export default function SurvivalChart() {
  return (
    <Bar
      data={{
        labels: ["Ecuador 2024", "Ecuador 2025", "Promedio LATAM 2025"],
        datasets: [
          {
            label: "Negocios >42 meses (%)",
            data: [13.26, 6.52, 7.44],
            backgroundColor: ["#C8F04A", "#E05252", "#E8E6E1"],
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}% de negocios sobreviven`,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 16,
            ticks: { callback: (v) => `${v}%` },
            grid: { color: "#E8E6E1" },
          },
          x: { grid: { display: false } },
        },
      }}
      height={220}
    />
  );
}
