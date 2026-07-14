import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";

type Project = {
  title: string;
  category: string;
  cat: string;
  img: string;
  tall?: boolean;
  year: string;
  desc: string;
};

// Removed hardcoded projects

const filters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Apps", value: "app" },
  { label: "Branding", value: "brand" },
];

function TiltCard({ p }: { p: Project }) {
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
          {p.category}
          <ArrowUpRight className="h-6 w-6 opacity-0 -translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
      </div>
    </motion.button>
  );
}

export default function Work() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const workData = content?.work || {
    heading: "Fields we",
    headingHighlight: "work in",
    items: []
  };
  const projects = workData.items || [];

  const shown = projects.filter((p: Project) => active === "all" || p.cat === active);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Expertise
            </p>
          </Reveal>
          <Reveal variant="blur" delay={0.1}>
            <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {workData.heading} <span className="text-gold-gradient">{workData.headingHighlight}</span>.
            </h2>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.15}>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                data-cursor="button"
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                  active === f.value ? "text-[#050505]" : "text-muted-foreground hover:text-gold"
                }`}
              >
                {active === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-light to-gold"
                    transition={{ type: "spring", damping: 22, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              <TiltCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>


    </section>
  );
}
