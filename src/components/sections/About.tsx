import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";

const ScrubWord = ({ word, i, total, scrollYProgress }: { word: string; i: number; total: number; scrollYProgress: any }) => {
  const start = i / total;
  const end = start + (1 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const color = useTransform(scrollYProgress, [start, end], ["#a3a3a3", "#e5c587"]);
  
  return (
    <span className="inline-block mr-[0.25em]">
      <motion.span style={{ opacity, color, display: "inline-block", willChange: "opacity, color" }}>
        {word}
      </motion.span>
    </span>
  );
};

const ScrubText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });
  
  const words = text.split(" ");
  
  return (
    <p ref={ref} className="text-xl leading-relaxed sm:text-2xl lg:text-3xl font-medium tracking-tight">
      {words.map((word, i) => (
        <ScrubWord key={i} word={word} i={i} total={words.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
};

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
    <section id="about" aria-label="About Lumio Digital" ref={ref} className="relative mx-auto max-w-7xl px-6 py-16 sm:py-36">
      {/* Matte Black textured background block for contrast */}
      <motion.div 
        style={{ scale, opacity, willChange: "transform, opacity" }}
        className="absolute inset-0 rounded-[3rem] bg-card border border-border shadow-2xl -z-10 overflow-hidden"
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

        <div className="space-y-10 lg:space-y-16">
          <ScrubText text={about.paragraph1} />
          <ScrubText text={about.paragraph2} />
        </div>
      </div>

    </section>
  );
}
