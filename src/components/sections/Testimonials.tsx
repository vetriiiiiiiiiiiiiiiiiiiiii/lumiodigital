import Reveal from "@/components/Reveal";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "Lumio redefined what our brand could be. The site is stunning and our conversions doubled within weeks.", name: "Aarav Mehta", role: "Founder, Lonétion" },
  { quote: "Every interaction feels intentional. Working with Lumio was the best investment we made this year.", name: "Sofia Laurent", role: "CMO, Elior" },
  { quote: "They think like partners, not vendors. The craft and speed are genuinely world-class.", name: "David Chen", role: "CEO, Agentix" },
  { quote: "The attention to detail is unreal. Our app finally feels as premium as our product.", name: "Priya Nair", role: "Product Lead, Pulse" },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} variant={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 0.1}>
            <figure className="h-full rounded-3xl bg-[#080808]/80 backdrop-blur-md p-10 transition-all duration-500 border border-white/5 hover:-translate-y-1 hover:bg-[#0c0c0c] hover:border-gold/30 hover:shadow-[0_0_30px_rgba(205,164,94,0.15)] shadow-soft">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-emerald to-emerald-deep text-sm font-semibold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
