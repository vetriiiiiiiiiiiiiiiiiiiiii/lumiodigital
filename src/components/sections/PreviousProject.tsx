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

      <motion.div 
        ref={ref}
        style={{ scale, opacity, willChange: "transform, opacity" }}
        className="group relative overflow-hidden rounded-[2rem] bg-card border border-border shadow-2xl p-4 sm:p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image Side */}
          <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-[4/3] shrink-0 overflow-hidden rounded-2xl">
            <motion.img 
              src={project.img} 
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content Side */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h3 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mb-4 font-medium text-emerald uppercase tracking-widest text-xs">
              {project.subtitle} &bull; {project.year}
            </p>
            <p className="mb-8 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
              {project.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-4">
              <Magnetic>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-105 shrink-0"
                >
                  View Live Site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              
              <div className="flex flex-wrap items-center gap-6 sm:border-l sm:border-border sm:pl-8">
                {project.stats.map((stat: any, i: number) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg font-bold text-gold leading-none">{stat.value}</span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

