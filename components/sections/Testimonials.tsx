"use client";

import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, inViewOnce } from "@/lib/animations";
import { useLang } from "@/lib/LanguageContext";

const TESTIMONIOS = [
  {
    nombre: "Valeria Morocho",
    ciudad: "Quito",
    negocio: "Pastelería artesanal",
    texto:
      "En 5 días tenía mi web lista y mis clientes ya me encontraban en Google. Antes dependía solo del Instagram y perdía muchas ventas. Takya cambió eso completamente.",
    rating: 5,
  },
  {
    nombre: "Sebastián Andrade",
    ciudad: "Guayaquil",
    negocio: "Consultoría financiera",
    texto:
      "Pensé que una web profesional costaría miles de dólares. Con Takya pagué $299 y el resultado supera lo que vi en agencias que me cotizaban $2,000. La comunicación fue directa y sin rodeos.",
    rating: 5,
  },
  {
    nombre: "Daniela Quispe",
    ciudad: "Cuenca",
    negocio: "Tienda de ropa",
    texto:
      "Lo que más me sorprendió fue la velocidad. El lunes hablamos, el viernes ya tenía todo publicado. Y cuando tuve dudas después, me respondieron por WhatsApp en minutos.",
    rating: 5,
  },
  {
    nombre: "Andrés Espinoza",
    ciudad: "Ambato",
    negocio: "Clínica odontológica",
    texto:
      "Mi web anterior la hice yo mismo en Wix y se veía amateur. Ahora mis pacientes me dicen que parece una clínica internacional. La diferencia es brutal.",
    rating: 5,
  },
  {
    nombre: "Camila Narváez",
    ciudad: "Loja",
    negocio: "Academia de inglés",
    texto:
      "Contraté el plan Escala y en el primer mes conseguí 8 estudiantes nuevos que me encontraron por Google. La inversión se pagó sola en dos semanas.",
    rating: 5,
  },
  {
    nombre: "Fernando Salazar",
    ciudad: "Manta",
    negocio: "Agencia de viajes",
    texto:
      "José y Pierre entienden el negocio latinoamericano. No me vendieron cosas innecesarias. Me dieron exactamente lo que necesitaba y funcionó desde el primer día.",
    rating: 5,
  },
];

const AVATAR_COLORS = ["#0071e3", "#34c759", "#ff9500", "#af52de", "#ff2d55", "#5856d6"];

export function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;

  return (
    <section className="bg-[#f0f4fb] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={tm.eyebrow}
          title={tm.title}
          subtitle={tm.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIOS.map((item, i) => (
            <motion.figure
              key={item.nombre}
              variants={fadeUp}
              className="flex flex-col rounded-3xl border border-[#d6e4f7] bg-white p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex gap-0.5" aria-label={tm.starsLabel(item.rating)}>
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} size={15} weight="fill" className="text-[#ff9500]" />
                  ))}
                </div>
                <span className="rounded-full bg-[#0071e3]/10 px-2.5 py-0.5 text-xs font-medium text-[#0071e3]">
                  {item.negocio}
                </span>
              </div>

              <blockquote className="flex-1 text-[15px] leading-relaxed text-[#1d1d1f]">
                &ldquo;{item.texto}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {item.nombre.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1d1d1f]">{item.nombre}</p>
                  <p className="text-xs text-[#6e6e73]">{item.ciudad}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
