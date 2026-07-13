import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";

export default function About() {
  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const about = content?.about || {
    heading: "We turn bold ideas into",
    headingHighlight: "refined digital products",
    paragraph1: "Lumio Digital is a design-led studio obsessed with detail. We blend strategy, craft, and motion to build experiences that feel effortless — and perform relentlessly.",
    paragraph2: "From the first pixel to production, every decision is intentional. The result: brands that command attention and products that convert.",
    stats: [
      { value: "120+", label: "Projects Delivered" },
      { value: "45+", label: "Global Clients" },
      { value: "9x", label: "Avg. Conversion Lift" },
      { value: "12", label: "Design Awards" },
    ]
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={ref} className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      {/* Matte Black textured background block for contrast */}
      <motion.div 
        style={{ scale, opacity, willChange: "transform, opacity" }}
        className="absolute inset-0 rounded-[3rem] bg-[#050505] border border-white/5 shadow-2xl -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,122,95,0.15),transparent_70%)]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(205,164,94,0.15),transparent_70%)]" />
      </motion.div>

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 relative z-10 px-4 py-8">
        <div>
          <Reveal variant="up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald">
              About Lumio
            </p>
          </Reveal>
          <Reveal variant="blur" delay={0.1}>
            <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {about.heading} <span className="text-gold-gradient">{about.headingHighlight}</span>.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal variant="up" delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {about.paragraph1}
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.25}>
            <p className="leading-relaxed text-muted-foreground">
              {about.paragraph2}
            </p>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
