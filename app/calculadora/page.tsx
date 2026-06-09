import type { Metadata } from "next";
import { CalculadoraContent } from "./CalculadoraContent";

export const metadata: Metadata = {
  title: "Calculadora de precio — Takya",
  description:
    "Responda 7 preguntas y obtenga un estimado del precio de una web con Takya. Sin compromiso.",
};

export default function CalculadoraPage() {
  return <CalculadoraContent />;
}
