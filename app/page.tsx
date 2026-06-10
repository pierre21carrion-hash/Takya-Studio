import { Hero } from "@/components/sections/Hero";
import EcuadorSection from "@/components/landing/EcuadorSection";
import { Services } from "@/components/sections/Services";
import { Industrias } from "@/components/sections/Industrias";
import { Process } from "@/components/sections/Process";
import { Technology } from "@/components/sections/Technology";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/sections/Comparison";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Audit } from "@/components/sections/Audit";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <EcuadorSection />
      <Services />
      <Industrias />
      <Process />
      <Technology />
      <Pricing />
      <Comparison />
      <Projects />
      <Testimonials />
      <About />
      <Audit />
      <FAQ />
      <Contact />
    </>
  );
}
