"use client";
import "@/components/charts/ChartSetup";
import { Bar } from "react-chartjs-2";

export default function CompanySizeChart() {
  return (
    <Bar
      data={{
        labels: ["Microempresa (1–9)", "Pequeña (10–49)", "Mediana (50–199)", "Grande (200+)"],
        datasets: [
          {
            label: "Variación 2024 (%)",
            data: [-9.3, -1.7, -0.6, 0.3],
            backgroundColor: ["#E05252", "#F87171", "#E8E6E1", "#C8F04A"],
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
              label: (ctx) => {
                const v = ctx.parsed.x ?? 0;
                return ` ${v}% (${v < 0 ? "cayó" : "creció"})`;
              },
            },
          },
        },
        scales: {
          x: {
            min: -12,
            max: 2,
            ticks: { callback: (v) => `${v ?? 0}%` },
            grid: { color: "#E8E6E1" },
          },
          y: { grid: { display: false } },
        },
      }}
      height={180}
      plugins={[
        {
          id: "zeroLine",
          afterDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            const xScale = scales.x;
            const xZero = xScale.getPixelForValue(0);
            if (xZero < chartArea.left || xZero > chartArea.right) return;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xZero, chartArea.top);
            ctx.lineTo(xZero, chartArea.bottom);
            ctx.strokeStyle = "#181714";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          },
        },
      ]}
    />
  );
}
