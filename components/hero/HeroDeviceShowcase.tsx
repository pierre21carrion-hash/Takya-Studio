"use client";
import { motion } from "framer-motion";

export function HeroDeviceShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-end gap-5 select-none w-full pt-6 pb-10"
    >

      {/* ── LAPTOP ── */}
      <div className="flex flex-col items-center flex-1 max-w-none w-full">

        {/* Tapa */}
        <div
          className="w-full rounded-t-xl rounded-b-sm overflow-hidden"
          style={{
            background: "#1c1c1e",
            border: "1px solid #3a3a3c",
            padding: "10px 10px 8px",
          }}
        >
          {/* Pantalla */}
          <div
            className="rounded-md overflow-hidden"
            style={{ border: "2px solid #111", background: "#000" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-[5px] px-[10px] py-[5px]"
              style={{
                background: "#e8e8ed",
                borderBottom: "0.5px solid rgba(0,0,0,0.1)",
              }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57] flex-shrink-0" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e] flex-shrink-0" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#28c840] flex-shrink-0" />
              <span
                className="flex-1 mx-2 rounded px-2 text-[9px] text-[#86868b]"
                style={{
                  background: "#fff",
                  padding: "2px 8px",
                  border: "0.5px solid rgba(0,0,0,0.1)",
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                takya.co
              </span>
            </div>

            {/* Navbar de la web */}
            <div
              className="flex items-center justify-between px-[14px] py-[8px]"
              style={{
                background: "#fff",
                borderBottom: "0.5px solid rgba(0,0,0,0.06)",
              }}
            >
              <span
                className="text-[11px] font-bold text-[#1d1d1f]"
                style={{ fontFamily: "-apple-system, sans-serif", letterSpacing: "-0.02em" }}
              >
                Takya
              </span>
              <div className="flex gap-3">
                {["Servicios", "Portafolio", "Precios", "Contacto"].map((l) => (
                  <span
                    key={l}
                    className="text-[8px] text-[#6e6e73]"
                    style={{ fontFamily: "-apple-system, sans-serif" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero de la web */}
            <div className="relative overflow-hidden px-[16px] py-[22px] pb-[18px]" style={{ background: "#050505" }}>
              <div className="absolute top-[-30px] right-[20px] w-[130px] h-[130px] rounded-full bg-[#0071e3] opacity-10 pointer-events-none" />
              <div className="absolute bottom-[-20px] right-[110px] w-[90px] h-[90px] rounded-full bg-[#34c759] opacity-[0.07] pointer-events-none" />

              <p
                className="text-[9px] font-semibold text-[#0071e3] mb-[6px] relative z-10"
                style={{ fontFamily: "-apple-system, sans-serif", letterSpacing: "0.04em" }}
              >
                Agencia digital · Ecuador
              </p>
              <h2
                className="text-[22px] font-bold text-white leading-[1.1] mb-[6px] relative z-10"
                style={{ fontFamily: "-apple-system, sans-serif", letterSpacing: "-0.03em" }}
              >
                El negocio<br />online en 5 días
              </h2>
              <p
                className="text-[9px] text-white/[0.38] mb-[14px] relative z-10"
                style={{ fontFamily: "-apple-system, sans-serif" }}
              >
                Diseño profesional para PYMES de Latinoamérica
              </p>
              <div className="flex gap-2 relative z-10">
                <span
                  className="text-[9px] font-semibold text-white px-[16px] py-[6px] rounded-full bg-[#0071e3]"
                  style={{ fontFamily: "-apple-system, sans-serif" }}
                >
                  Comenzar →
                </span>
                <span
                  className="text-[9px] text-white/50 px-[16px] py-[6px] rounded-full"
                  style={{
                    fontFamily: "-apple-system, sans-serif",
                    border: "0.5px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Ver portafolio
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 bg-white" style={{ borderTop: "0.5px solid rgba(0,0,0,0.06)" }}>
              {[
                { val: "98", lbl: "PageSpeed", color: "#34c759" },
                { val: "5d", lbl: "Entrega", color: "#0071e3" },
                { val: "$149", lbl: "Desde", color: "#ff9f0a" },
                { val: "24/7", lbl: "Soporte", color: "#1c1c1e" },
              ].map((s, i) => (
                <div
                  key={s.lbl}
                  className="py-[10px] text-center"
                  style={{
                    borderRight: i < 3 ? "0.5px solid rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <div
                    className="text-[17px] font-bold leading-none"
                    style={{ color: s.color, fontFamily: "-apple-system, sans-serif" }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[7.5px] text-[#8e8e93] mt-[3px]"
                    style={{ fontFamily: "-apple-system, sans-serif" }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bisagra */}
        <div className="w-[96%] h-[5px] bg-[#2c2c2e] rounded-b-sm" />

        {/* Base */}
        <div className="relative w-[110%] h-[16px] rounded-b-xl" style={{
          background: "linear-gradient(180deg, #d4d4d8 0%, #bebebc 100%)",
          border: "0.5px solid rgba(0,0,0,0.14)",
        }}>
          {/* Trackpad hint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-full rounded-b bg-black/[0.05]" />
          {/* Patas */}
          <div className="absolute bottom-0 left-[10px] w-[20px] h-[3px] rounded-b bg-black/[0.12]" />
          <div className="absolute bottom-0 right-[10px] w-[20px] h-[3px] rounded-b bg-black/[0.12]" />
        </div>
      </div>

      {/* ── TELÉFONO ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-4 flex-shrink-0"
        style={{ width: "150px" }}
      >
        {/* Cuerpo */}
        <div
          className="relative overflow-visible"
          style={{
            background: "#1c1c1e",
            borderRadius: "26px",
            border: "2px solid #3a3a3c",
          }}
        >
          {/* Botones laterales izquierda */}
          <div className="absolute left-[-6px] top-[34px] w-[4px] h-[16px] bg-[#3a3a3c] rounded-l" />
          <div className="absolute left-[-6px] top-[56px] w-[4px] h-[24px] bg-[#3a3a3c] rounded-l" />
          {/* Botón derecha */}
          <div className="absolute right-[-6px] top-[46px] w-[4px] h-[28px] bg-[#3a3a3c] rounded-r" />

          {/* Pantalla */}
          <div style={{ borderRadius: "23px", overflow: "hidden", background: "#1c1c1e" }}>

            {/* Dynamic Island */}
            <div
              className="flex justify-center items-center"
              style={{ background: "#050505", padding: "7px 0 6px" }}
            >
              <div
                style={{
                  width: "44px",
                  height: "11px",
                  background: "#000",
                  borderRadius: "20px",
                  border: "1px solid #2c2c2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "3px",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#1a1a1e",
                    border: "1.5px solid #3a3a3c",
                  }}
                />
              </div>
            </div>

            {/* Hero móvil */}
            <div style={{ background: "#050505", padding: "12px 12px 14px" }}>
              <p
                className="text-[7px] font-semibold text-[#0071e3] mb-[4px]"
                style={{ fontFamily: "-apple-system, sans-serif", letterSpacing: "0.04em" }}
              >
                Agencia digital
              </p>
              <h3
                className="text-[15px] font-bold text-white leading-[1.15] mb-[10px]"
                style={{ fontFamily: "-apple-system, sans-serif", letterSpacing: "-0.02em" }}
              >
                El negocio<br />en 5 días
              </h3>
              <span
                className="inline-block text-[8px] font-semibold text-white px-[14px] py-[5px] rounded-full bg-[#0071e3]"
                style={{ fontFamily: "-apple-system, sans-serif" }}
              >
                Empezar →
              </span>
            </div>

            {/* Cards */}
            <div style={{ background: "#f2f2f7", padding: "9px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[
                { lbl: "PAGESPEED", val: "98 / 100", color: "#34c759" },
                { lbl: "ENTREGA", val: "5 días", color: "#0071e3" },
                { lbl: "PRECIO", val: "Desde $149", color: "#ff9f0a" },
              ].map((c) => (
                <div
                  key={c.lbl}
                  style={{
                    background: "#fff",
                    borderRadius: "9px",
                    padding: "7px 10px",
                    border: "0.5px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "6px",
                      fontWeight: 600,
                      color: "#8e8e93",
                      letterSpacing: "0.06em",
                      marginBottom: "2px",
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    {c.lbl}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: c.color,
                      fontFamily: "-apple-system, sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {c.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div style={{ background: "#f2f2f7", display: "flex", justifyContent: "center", padding: "7px 0 9px" }}>
              <div style={{ width: "32px", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.18)" }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badge +98 PageSpeed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 flex items-center gap-[7px] bg-white rounded-2xl px-[16px] py-[9px]"
        style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
      >
        <span
          className="text-[17px] font-bold text-[#0071e3] leading-none"
          style={{ fontFamily: "-apple-system, sans-serif" }}
        >
          +98
        </span>
        <span
          className="text-[12px] font-medium text-[#3c3c43]"
          style={{ fontFamily: "-apple-system, sans-serif" }}
        >
          PageSpeed
        </span>
      </motion.div>

      {/* Badge responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 flex items-center gap-[7px] bg-white rounded-2xl px-[16px] py-[9px]"
        style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c3c43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="7" y="2" width="10" height="20" rx="3"/>
          <line x1="12" y1="18" x2="12" y2="18.01"/>
        </svg>
        <span
          className="text-[12px] font-medium text-[#3c3c43]"
          style={{ fontFamily: "-apple-system, sans-serif" }}
        >
          100% responsive
        </span>
      </motion.div>

    </motion.div>
  );
}
