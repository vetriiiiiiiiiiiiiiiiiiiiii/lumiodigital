import Reveal from "@/components/Reveal";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  { n: "01", title: "Discover", desc: "We dig into your goals, audience, and market to define a sharp strategy." },
  { n: "02", title: "Design", desc: "We craft distinctive interfaces and prototypes, refined until they feel effortless." },
  { n: "03", title: "Build", desc: "We engineer fast, accessible, production-ready products with pixel precision." },
  { n: "04", title: "Scale", desc: "We launch, measure, and iterate — turning momentum into lasting growth." },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" aria-label="Our Process" ref={containerRef} className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:mb-24">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              How We Work
            </p>
          </Reveal>
          <Reveal variant="blur" delay={0.1}>
            <h2 className="text-4xl font-black leading-none tracking-tighter sm:text-6xl text-foreground">
              A process built for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-emerald">clarity & precision.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20 pl-8 md:pl-0">
          {/* Vertical line indicator for mobile/tablet */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-gold-light to-emerald origin-top" 
            />
          </div>

          {steps.map((s, i) => (
            <Reveal key={s.n} variant="up" delay={i * 0.15}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex flex-col items-start gap-6 border-t border-border pt-8 transition-colors hover:border-gold-light/50 bg-card/30 rounded-2xl p-6 shadow-soft hover:shadow-gold/20"
              >
                <div className="absolute -left-11 md:-left-4 top-8 h-6 w-6 rounded-full border-4 border-background bg-border transition-colors duration-500 group-hover:bg-gold-light md:hidden" />
                
                <span className="text-6xl font-black text-foreground/5 transition-colors duration-500 group-hover:text-gold-light/20 absolute right-6 top-6 pointer-events-none">
                  {s.n}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/80">{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
