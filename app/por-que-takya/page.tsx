import type { Metadata } from "next";
import PorQueTakyaContent from "@/components/landing/PorQueTakyaContent";

export const metadata: Metadata = {
  title: "¿Por qué Takya? — La paradoja ecuatoriana",
  description:
    "9 argumentos con datos verificados sobre por qué cierran los negocios en Ecuador y cómo Takya construye las herramientas exactas para que no cierren.",
};

export default function PorQueTakya() {
  return <PorQueTakyaContent />;
}
