import Reveal from "@/components/Reveal";
import { Zap, ShieldCheck, Gem, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Blazing Performance", desc: "Optimized code, instant page loads, and seamless animations that keep visitors engaged from the first click." },
  { icon: Gem, title: "Design Obsessed", desc: "Award-worthy craft in every pixel, motion, and interaction." },
  { icon: ShieldCheck, title: "Reliable Delivery", desc: "Clear timelines, transparent process, no surprises." },
  { icon: HeartHandshake, title: "True Partnership", desc: "We invest in your outcomes long after launch." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Why Lumio
              </p>
            </Reveal>
            <Reveal variant="blur" delay={0.1}>
              <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                The difference is in the <span className="text-gold-gradient">details</span>.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                We combine strategy, world-class design, and engineering discipline to
                deliver work that outperforms — and endures.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} variant="scale" delay={i * 0.1}>
                <div className="group h-full rounded-3xl bg-[#080808]/80 backdrop-blur-md p-8 transition-all duration-500 border border-white/5 hover:-translate-y-1.5 hover:bg-[#0c0c0c] hover:border-gold/30 hover:shadow-[0_0_30px_rgba(205,164,94,0.15)] shadow-soft">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] border border-white/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-[#050505] shadow-inner">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gold-light">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
