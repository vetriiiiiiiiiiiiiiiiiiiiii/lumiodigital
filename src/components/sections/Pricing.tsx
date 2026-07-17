import Reveal from "@/components/Reveal";
import PillButton from "@/components/PillButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Launch",
    price: "₹1L",
    tag: "For focused launches",
    features: ["Custom landing site", "Up to 5 sections", "Responsive + SEO", "2 revision rounds", "2-week delivery"],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹3L",
    tag: "Most popular",
    features: ["Full marketing website", "Design system + branding", "CMS integration", "Advanced animations", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    tag: "For products & platforms",
    features: ["Web app / e-commerce", "End-to-end engineering", "Dedicated team", "Ongoing optimization", "SLA & maintenance"],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-36">
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} variant="up" delay={i * 0.1}>
            <div
              className={`relative flex h-full flex-col rounded-3xl p-10 transition-all duration-500 hover:-translate-y-2 border shadow-soft ${
                p.featured
                  ? "bg-[#0c0c0c]/90 backdrop-blur-xl border-gold/40 shadow-[0_0_40px_rgba(205,164,94,0.15)]"
                  : "bg-[#080808]/80 backdrop-blur-md border-white/5 hover:bg-[#0c0c0c] hover:border-emerald/30 hover:shadow-[0_0_30px_rgba(14,122,95,0.15)]"
              }`}
            >
              {/* Subtle inner glow */}
              <div className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                p.featured ? "bg-gradient-to-br from-gold/5 to-transparent" : "bg-gradient-to-br from-emerald/5 to-transparent"
              }`} />
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-gold-light to-gold px-4 py-1.5 text-[10px] font-bold tracking-widest text-[#050505] uppercase">
                  {p.tag}
                </span>
              )}
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">{p.name}</span>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                {p.price !== "Custom" && <span className="pb-2 text-sm text-muted-foreground">+</span>}
              </div>
              {!p.featured && <span className="mt-1 text-xs text-muted-foreground">{p.tag}</span>}

              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground/90">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald/20 text-emerald">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <PillButton
                  href="#contact"
                  variant={p.featured ? "gold" : "outline"}
                  className="w-full"
                >
                  Get Started
                </PillButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
