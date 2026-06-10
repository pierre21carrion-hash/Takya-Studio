"use client";
import "@/components/charts/ChartSetup";
import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";

export default function CompoundGrowthChart() {
  const [years, setYears] = useState(3);

  const labels = useMemo(
    () => ["Inicio", ...Array.from({ length: years }, (_, i) => `Año ${i + 1}`)],
    [years],
  );

  const noDigital = useMemo(() => {
    const arr = [10000];
    for (let i = 0; i < years; i++) arr.push(Math.round(arr[i] * 1.08));
    return arr;
  }, [years]);

  const digital = useMemo(() => {
    const arr = [10000];
    for (let i = 0; i < years; i++) arr.push(Math.round(arr[i] * 1.28));
    return arr;
  }, [years]);

  const diff = digital[years] - noDigital[years];
  const pct = Math.round((diff / noDigital[years]) * 100);

  return (
    <div>
      {/* Slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#6A6760" }}>Proyectar a:</span>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          style={{ flex: 1, accentColor: "#181714" }}
        />
        <span style={{ fontSize: 14, fontWeight: 600, color: "#181714", minWidth: 40 }}>
          Año {years}
        </span>
      </div>

      {/* Dynamic insight */}
      <div
        style={{
          background: "#F5F4F1",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 13,
          color: "#6A6760",
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        Al <strong style={{ color: "#181714" }}>año {years}</strong>, el negocio digitalizado
        factura <strong style={{ color: "#181714" }}>${digital[years].toLocaleString()}</strong> vs{" "}
        <strong style={{ color: "#181714" }}>${noDigital[years].toLocaleString()}</strong> — una
        diferencia de{" "}
        <strong style={{ color: "#22C55E" }}>
          ${diff.toLocaleString()} (+{pct}%)
        </strong>
      </div>

      {/* Chart */}
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Sin digitalizar (8%/año)",
              data: noDigital,
              borderColor: "#E05252",
              backgroundColor: "rgba(224,82,82,0.06)",
              fill: true,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2,
            },
            {
              label: "Con herramienta digital (28%/año)",
              data: digital,
              borderColor: "#181714",
              backgroundColor: "rgba(200,240,74,0.08)",
              fill: true,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toLocaleString()}`,
              },
            },
          },
          scales: {
            y: {
              ticks: { callback: (v) => "$" + Number(v).toLocaleString() },
              grid: { color: "#E8E6E1" },
            },
            x: { grid: { display: false } },
          },
        }}
        height={220}
      />
    </div>
  );
}
