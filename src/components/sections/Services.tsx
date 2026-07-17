import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";
import * as Icons from "lucide-react";

export default function Services() {
  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const services = content?.services || {
    heading: "A full-stack studio for",
    headingHighlight: "ambitious brands",
    items: [
      { title: "Web Design", desc: "Distinctive, high-end websites engineered to captivate and convert." },
      { title: "UI/UX", desc: "Intuitive interfaces and journeys backed by research and testing." },
      { title: "Shopify", desc: "Custom Shopify storefronts built for speed and scale." },
      { title: "E-commerce", desc: "Conversion-focused commerce experiences end to end." },
      { title: "Branding", desc: "Identity systems that make your brand unforgettable." },
      { title: "SEO", "desc": "Technical and content SEO that grows qualified traffic." },
      { title: "Web Apps", desc: "Robust, elegant applications from concept to launch." },
      { title: "Maintenance", desc: "Ongoing care, performance, and evolution of your product." },
    ]
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="services" ref={ref} className="relative mx-auto max-w-7xl px-6 py-16 sm:py-36 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(14,122,95,0.1),transparent_70%)] pointer-events-none" />

      <motion.div style={{ y, opacity }} className="mb-16 max-w-2xl relative z-10">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Expertise
          </p>
        </Reveal>
        <Reveal variant="blur" delay={0.1}>
          <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            {services.heading} <span className="text-gold-gradient">{services.headingHighlight}</span>.
          </h2>
        </Reveal>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        {services.items.map((s: any, i: number) => {
          // Attempt to map an icon, or fallback to an empty fragment
          const Icon = (Icons as any)[s.icon] || Icons.Code;
          return (
          <Reveal key={s.title} variant="up" delay={(i % 4) * 0.1}>
            <motion.div
              data-cursor="button"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative h-full overflow-hidden rounded-3xl bg-[#080808] border border-white/5 p-7 shadow-lg transition-all duration-500 hover:border-gold/30 hover:shadow-gold"
              style={{ willChange: "transform" }}
            >
              {/* Glossy gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at top right, rgba(205,164,94,0.15), transparent 70%)" }}
              />
              
              <div className="relative z-10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] border border-white/10 text-emerald transition-all duration-500 group-hover:text-gold group-hover:scale-110 shadow-inner">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold-light">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">{s.desc}</p>
              </div>

              {/* Animated bottom bar */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald to-gold transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </Reveal>
        )})}
      </div>
    </section>
  );
}
