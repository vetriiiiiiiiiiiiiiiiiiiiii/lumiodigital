import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";
import Magnetic from "@/components/Magnetic";

export default function PreviousProject() {
  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const project = content?.previousProject || {
    heading: "Our Previous",
    headingHighlight: "Project",
    title: "TSRM.in",
    subtitle: "Web Platform",
    img: "/tsrm-banner.png",
    year: "2026",
    desc: "A custom web application built with robust architecture, designed for maximum performance and a premium user experience.",
    stats: [
      { label: "Performance", value: "99%" },
      { label: "Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" }
    ],
    link: "https://tsrm.in"
  };

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
          {project.heading} <span className="text-gold-gradient">{project.headingHighlight}</span>.
        </h2>
      </Reveal>

      <div className="flex justify-center">
        <motion.div 
          ref={ref}
          style={{ scale, opacity, willChange: "transform, opacity" }}
          className="group relative flex items-center gap-5 overflow-hidden rounded-2xl bg-card border border-border shadow-xl p-3 pr-6 max-w-md w-full hover:border-gold/30 transition-colors"
        >
          {/* Small Image */}
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
            <motion.img 
              src={project.img} 
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Minimal Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold tracking-tight text-foreground truncate">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {project.desc}
            </p>
          </div>

          {/* Action */}
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110 hover:bg-gold-light"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

