import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import WavyBackground from "@/components/WavyBackground";
import { useLenis } from "@/hooks/useLenis";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <Navbar />
      <main className={ready ? "opacity-100 transition-opacity duration-700 relative z-10" : "opacity-0 relative z-10"}>
        <Hero />
        <WavyBackground />
        <Marquee items={["Web Design", "UI/UX", "Branding", "E-commerce", "SEO", "Web Apps"]} />
        <About />
        <Services />
        <Work />
        <Process />
        <WhyChooseUs />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
