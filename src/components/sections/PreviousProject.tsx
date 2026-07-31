import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";

export default function PreviousProject() {
  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const projectData = content?.previousProject || {
    heading: "Our Previous",
    headingHighlight: "Project",
    items: [
      {
        title: "TSRM.in",
        subtitle: "Web Platform",
        img: "/tsrm-banner.png",
        year: "2026",
        desc: "A custom web application built with robust architecture, designed for maximum performance and a premium user experience.",
        link: "https://tsrm.in"
      }
    ]
  };

  const items = projectData.items || [];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="previous-project" aria-label="Previous Project" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-36">
      <Reveal>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald">
          Featured
        </p>
      </Reveal>
      <Reveal variant="blur" delay={0.1}>
        <h2 className="mb-12 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          {projectData.heading} <span className="text-gold-gradient">{projectData.headingHighlight}</span>.
        </h2>
      </Reveal>

      <motion.div 
        ref={ref}
        style={{ scale, opacity, willChange: "transform, opacity" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {items.map((item: any, i: number) => (
          <div 
            key={i}
            className="group relative flex items-center gap-5 overflow-hidden rounded-2xl bg-card border border-border shadow-xl p-3 pr-6 w-full hover:border-gold/30 transition-colors"
          >
            {/* Small Image */}
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
              <motion.img 
                src={item.img} 
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Minimal Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold tracking-tight text-foreground truncate">
                {item.title}
              </h3>
              <div className="text-xs font-semibold text-emerald mb-1">{item.subtitle} • {item.year}</div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {item.desc}
              </p>
            </div>

            {/* Action */}
            {item.link && (
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110 hover:bg-gold-light"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

