import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";
import Magnetic from "@/components/Magnetic";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/contentFunctions";

function Particles() {
  const [dots, setDots] = useState<
    { size: number; left: number; top: number; dur: number; delay: number }[]
  >([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 26 }).map(() => ({
        size: 1 + Math.random() * 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 5,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/40"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            top: `${d.top}%`,
            boxShadow: "0 0 8px rgba(205,164,94,0.6)",
          }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const lightX = useSpring(useTransform(mx, [0, 1], ["20%", "80%"]), { damping: 30, stiffness: 120 });
  const lightY = useSpring(useTransform(my, [0, 1], ["20%", "80%"]), { damping: 30, stiffness: 120 });

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { damping: 30, stiffness: 100 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const { data: content } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const headline = content?.hero?.headline || ["We Build Digital", "Experiences That", "Convert."];
  const subtext = content?.hero?.subtext || "A premium digital agency crafting high-converting websites, apps, and brands for ambitious companies worldwide.";

  return (
    <header
      id="hero"
      aria-label="Welcome to Lumio Digital"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
      style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      {/* Animated aurora gradient & Background Image Fallback */}
      <div className="absolute inset-0 z-0 bg-background/60">
        <div className="absolute top-0 left-1/2 w-full max-w-3xl -translate-x-1/2 h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(229,197,135,0.15),transparent_70%)] opacity-60" />
        <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,122,95,0.18),transparent_70%)] animate-aurora" style={{ willChange: "transform" }} />
        <div className="absolute bottom-0 right-0 h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(205,164,94,0.1),transparent_70%)] animate-aurora" style={{ animationDelay: "-8s", willChange: "transform" }} />
      </div>

      {/* Mouse-responsive light */}
      <motion.div
        className="pointer-events-none absolute h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(205,164,94,0.08),transparent_70%)]"
        style={{ left: lightX, top: lightY, translateX: "-50%", translateY: "-50%", willChange: "left, top" }}
      />

      <Particles />

      {/* Content */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative z-10 w-full max-w-7xl px-6 pt-20 pb-32"
      >
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={mounted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-8 rounded-full border border-border bg-muted/20 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-gold-light">
              Lumio Digital Studio
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter text-foreground">
            {headline.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "100%", opacity: 0, rotateZ: 2 }}
                  animate={mounted ? { y: "0%", opacity: 1, rotateZ: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + li * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {li === 2 ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-emerald">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-muted-foreground/80"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <Magnetic>
              <a 
                href="https://wa.me/919600407657" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
              >
                Start a Project 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gold-light to-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="#work"
                className="group flex h-14 items-center justify-center px-8 text-sm font-medium text-foreground transition-colors hover:text-gold-light"
              >
                View Portfolio
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1" aria-hidden="true">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </header>
  );
}
