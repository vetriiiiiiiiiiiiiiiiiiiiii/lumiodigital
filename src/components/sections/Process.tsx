import Reveal from "@/components/Reveal";

const steps = [
  { n: "01", title: "Discover", desc: "We dig into your goals, audience, and market to define a sharp strategy." },
  { n: "02", title: "Design", desc: "We craft distinctive interfaces and prototypes, refined until they feel effortless." },
  { n: "03", title: "Build", desc: "We engineer fast, accessible, production-ready products with pixel precision." },
  { n: "04", title: "Scale", desc: "We launch, measure, and iterate — turning momentum into lasting growth." },
];

export default function Process() {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <div className="mb-16 max-w-2xl">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            How We Work
          </p>
        </Reveal>
        <Reveal variant="blur" delay={0.1}>
          <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            A process built for <span className="text-gold-gradient">clarity</span>.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} variant="up" delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-[#080808]/80 backdrop-blur-md p-10 transition-all duration-500 border border-white/5 hover:-translate-y-1.5 hover:bg-[#0c0c0c] hover:border-emerald/40 hover:shadow-[0_0_30px_rgba(14,122,95,0.15)] shadow-soft">
              <span className="text-7xl font-bold text-white/[0.02] transition-colors duration-500 group-hover:text-gold/20">
                {s.n}
              </span>
              <div className="relative z-10 mt-2">
                <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-gold-light">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80">{s.desc}</p>
              </div>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald to-gold transition-all duration-700 ease-out group-hover:w-full" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
