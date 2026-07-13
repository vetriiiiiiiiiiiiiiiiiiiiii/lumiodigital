import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";

const cols = [
  { title: "Services", links: ["Web Design", "UI/UX", "E-commerce", "Branding", "SEO"] },
  { title: "Company", links: ["About", "Work", "Process", "Pricing", "Contact"] },
  { title: "Social", links: ["Twitter", "LinkedIn", "Instagram", "GitHub"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-muted/20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-emerald/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <Reveal variant="blur">
          <div className="flex flex-col items-start justify-between gap-8 pb-14 md:flex-row md:items-end">
            <h2 className="max-w-lg text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Ready to <span className="text-gradient">stand out</span>?
            </h2>
            <PillButton href="#contact">Start a Project</PillButton>
          </div>
        </Reveal>

        <div className="grid gap-10 border-t border-white/5 pt-14 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Lumio Digital. All rights reserved.</span>
          <span>Crafted with precision.</span>
        </div>
      </div>
    </footer>
  );
}
