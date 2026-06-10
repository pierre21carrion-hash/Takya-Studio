"use client";
import "@/components/charts/ChartSetup";
import { Doughnut } from "react-chartjs-2";

export default function ClosureChart() {
  return (
    <div>
      <div style={{ maxWidth: 340, margin: "0 auto" }}>
        <Doughnut
          data={{
            labels: [
              "Falta de rentabilidad",
              "Problemas de financiamiento",
              "Otra oportunidad laboral",
              "Razones personales",
              "Incidente / venta planeada",
            ],
            datasets: [
              {
                data: [31.2, 21.4, 18.7, 14.1, 14.6],
                backgroundColor: ["#E05252", "#F87171", "#E8E6E1", "#D3D1CB", "#C0BDB6"],
                borderWidth: 0,
                hoverOffset: 8,
              },
            ],
          }}
          options={{
            cutout: "55%",
            responsive: true,
            plugins: {
              legend: { position: "right", labels: { font: { size: 11 } } },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
                },
              },
            },
          }}
          height={240}
        />
      </div>
      {/* Manual legend summary */}
      <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#E05252", fontWeight: 600 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#E05252", display: "inline-block", flexShrink: 0 }} />
          Causas vinculadas a gestión sin control: 52.6%
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6A6760" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#E8E6E1", display: "inline-block", flexShrink: 0 }} />
          Causas externas o personales: 47.4%
        </div>
      </div>
    </div>
  );
}
