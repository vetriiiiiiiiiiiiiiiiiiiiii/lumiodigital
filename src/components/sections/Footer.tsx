import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const cols = [
  { title: "Services", links: ["Web Design", "UI/UX", "E-commerce", "Branding", "SEO"] },
  { title: "Company", links: ["About", "Work", "Process", "Pricing", "Contact"] },
  { title: "Social", links: ["Twitter", "LinkedIn", "Instagram", "GitHub"] },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-background pt-32 pb-10 mt-20 border-t border-border">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[100vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle_at_center,rgba(229,197,135,0.08),transparent_70%)] blur-3xl animate-pulse" />
      
      <motion.div style={{ scale, opacity, y, willChange: "transform, opacity" }} className="relative mx-auto max-w-7xl px-6">
        <Reveal variant="blur">
          <div className="flex flex-col items-center justify-center pb-24 text-center">
            <h2 className="text-[14vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-gold-light/10 drop-shadow-[0_0_60px_rgba(205,164,94,0.15)]">
              LET'S TALK
            </h2>
            <div className="mt-8">
              <PillButton href="#contact" className="scale-125">Start a Project</PillButton>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#hero" className="flex items-center" data-cursor="button">
              <img src="/logo.jpg" alt="Lumio Digital" className="h-12 w-auto object-contain" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A premium digital agency. Design. Build. Scale.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      data-cursor="button"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Lumio Digital. All rights reserved.</span>
          <span>Crafted with precision.</span>
        </div>
      </motion.div>
    </footer>
  );
}
