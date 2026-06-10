"use client";
import "@/components/charts/ChartSetup";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const sectors = [
  {
    name: "Restaurantes",
    margen: 4,
    fuga: 3.5,
    costos: 92.5,
    insight:
      "Margen neto 3–5%. Desperdicio evitable ~3.5% de ventas. La fuga prácticamente iguala al margen — el negocio puede estar lleno y perder.",
  },
  {
    name: "Salones",
    margen: 20,
    fuga: 12,
    costos: 68,
    insight:
      "5 no-shows por semana = $200–400/mes perdidos. Con recordatorio automático se recupera el 71% de esas citas.",
  },
  {
    name: "Tiendas",
    margen: 13,
    fuga: 8,
    costos: 79,
    insight:
      "El 15–25% del inventario queda inmovilizado como stock muerto. Liberar ese capital es la mejora más inmediata.",
  },
  {
    name: "Clínicas",
    margen: 27,
    fuga: 15,
    costos: 58,
    insight:
      "El 47% de los pacientes no regresa por falta de seguimiento. Un sistema de recordatorio puede recuperar más de la mitad.",
  },
  {
    name: "Academias",
    margen: 40,
    fuga: 18,
    costos: 42,
    insight:
      "Deserción silenciosa = 54% del abandono. Cobro automático + seguimiento recupera en promedio $620/mes.",
  },
  {
    name: "Agro",
    margen: 12,
    fuga: 55,
    costos: 33,
    insight:
      "El productor recibe <15% del precio final. Canal directo puede aumentar el margen/kg hasta 210%.",
  },
];

export default function SectorLeakChart() {
  const [active, setActive] = useState(0);
  const s = sectors[active];

  return (
    <div>
      {/* Sector tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {sectors.map((sec, i) => (
          <button
            key={sec.name}
            onClick={() => setActive(i)}
            style={{
              padding: "5px 13px",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 20,
              border: i === active ? "1.5px solid #181714" : "1px solid #E8E6E1",
              background: i === active ? "#181714" : "#fff",
              color: i === active ? "#fff" : "#6A6760",
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* Chart + insight */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Doughnut
          data={{
            labels: ["Margen neto", "Fuga evitable", "Costos operativos"],
            datasets: [
              {
                data: [s.margen, s.fuga, s.costos],
                backgroundColor: ["#C8F04A", "#E05252", "#E8E6E1"],
                borderWidth: 0,
                hoverOffset: 6,
              },
            ],
          }}
          options={{
            cutout: "60%",
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
                },
              },
            },
          }}
        />

        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#C8F04A", lineHeight: 1 }}>
                {s.margen}%
              </div>
              <div style={{ fontSize: 11, color: "#6A6760", marginTop: 3 }}>Margen neto</div>
            </div>
            <div style={{ width: 1, background: "#E8E6E1" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#E05252", lineHeight: 1 }}>
                {s.fuga}%
              </div>
              <div style={{ fontSize: 11, color: "#6A6760", marginTop: 3 }}>Fuga evitable</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#6A6760",
              lineHeight: 1.65,
              background: "#F5F4F1",
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            {s.insight}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {[
              { color: "#C8F04A", label: "Margen neto" },
              { color: "#E05252", label: "Fuga evitable" },
              { color: "#E8E6E1", label: "Costos operativos" },
            ].map((l) => (
              <div
                key={l.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "#6A6760",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: l.color,
                    display: "inline-block",
                  }}
                />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
