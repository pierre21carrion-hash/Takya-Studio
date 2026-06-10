"use client";
import "@/components/charts/ChartSetup";
import { Doughnut } from "react-chartjs-2";

export default function MotivationChart() {
  return (
    <div className="relative" style={{ maxWidth: 280, margin: "0 auto" }}>
      <Doughnut
        data={{
          labels: ["Por necesidad económica", "Por oportunidad"],
          datasets: [
            {
              data: [91.5, 8.5],
              backgroundColor: ["#E05252", "#C8F04A"],
              borderWidth: 0,
              hoverOffset: 8,
            },
          ],
        }}
        options={{
          cutout: "65%",
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
              },
            },
          },
        }}
        height={240}
      />
      {/* Center text overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#E05252", lineHeight: 1 }}>
          91.5%
        </div>
        <div style={{ fontSize: 11, color: "#6A6760", marginTop: 4 }}>por necesidad</div>
      </div>
    </div>
  );
}
