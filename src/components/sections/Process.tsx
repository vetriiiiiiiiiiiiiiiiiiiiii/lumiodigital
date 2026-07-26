import Reveal from "@/components/Reveal";
import { motion } from "motion/react";

const steps = [
  { n: "01", title: "Discover", desc: "We dig into your goals, audience, and market to define a sharp strategy." },
  { n: "02", title: "Design", desc: "We craft distinctive interfaces and prototypes, refined until they feel effortless." },
  { n: "03", title: "Build", desc: "We engineer fast, accessible, production-ready products with pixel precision." },
  { n: "04", title: "Scale", desc: "We launch, measure, and iterate — turning momentum into lasting growth." },
];

export default function Process() {
  return (
    <section id="process" aria-label="Our Process" className="relative bg-background py-24 sm:py-32">
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

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
          {steps.map((s, i) => (
            <Reveal key={s.n} variant="up" delay={i * 0.1}>
              <div className="group flex flex-col items-start gap-6 border-t border-border pt-8 transition-colors hover:border-gold-light/50">
                <span className="text-5xl font-black text-foreground/5 transition-colors duration-500 group-hover:text-gold-light">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/80">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
