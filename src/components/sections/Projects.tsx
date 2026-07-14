import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

type Project = {
  title: string;
  category: string;
  img: string;
  tall?: boolean;
  year: string;
  desc: string;
  link?: string;
};

const projects: Project[] = [
  { 
    title: "TSRM.in", 
    category: "Web Platform", 
    img: work1, 
    year: "2026", 
    desc: "A custom web application built with robust architecture, designed for maximum performance and a premium user experience.",
    link: "https://tsrm.in"
  },
  { 
    title: "More Coming Soon", 
    category: "Digital Experiences", 
    img: work2, 
    tall: true,
    year: "2026", 
    desc: "We are currently crafting more high-end digital experiences. Stay tuned for our upcoming launches."
  },
];

function TiltProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 15, stiffness: 150 });
  const sry = useSpring(ry, { damping: 15, stiffness: 150 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onOpen}
      data-cursor="view"
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`group relative block w-full overflow-hidden rounded-3xl bg-[#080808] border border-white/5 shadow-soft text-left ${
        p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
      }`}
    >
      <img
        src={p.img}
        alt={p.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-8 transition-transform duration-700 ease-out group-hover:translate-y-0">
        <h3 className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-gold transition-colors duration-500 group-hover:text-gold-light">
          {p.title}
          <ArrowUpRight className="h-6 w-6 opacity-0 -translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">{p.category}</p>
      </div>
    </motion.button>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <div className="mb-12">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Portfolio
          </p>
        </Reveal>
        <Reveal variant="blur" delay={0.1}>
          <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Our <span className="text-gold-gradient">Works</span>.
          </h2>
        </Reveal>
      </div>

      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-2 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              <TiltProjectCard p={p} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case study modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#050505]/90 backdrop-blur-2xl"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#0c0c0c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#050505]/50 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-white hover:text-[#050505]"
                aria-label="Close"
                data-cursor="button"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selected.img}
                alt={selected.title}
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="p-10 sm:p-12">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">
                  <span>{selected.category}</span>
                  <span className="text-muted-foreground/50">/ {selected.year}</span>
                </div>
                <h3 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">{selected.title}</h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground/90">{selected.desc}</p>
                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-bold uppercase tracking-widest text-sm" data-cursor="button">
                    Visit Site <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
