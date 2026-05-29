import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Technology } from "@/components/sections/Technology";
import { Pricing } from "@/components/sections/Pricing";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Audit } from "@/components/sections/Audit";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Technology />
      <Pricing />
      <Projects />
      <About />
      <Audit />
      <FAQ />
      <Contact />
    </>
  );
}
