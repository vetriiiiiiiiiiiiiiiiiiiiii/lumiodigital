import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
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

  const shape1X = useSpring(useTransform(mx, [0, 1], [30, -30]), { damping: 20 });
  const shape1Y = useSpring(useTransform(my, [0, 1], [30, -30]), { damping: 20 });
  const shape2X = useSpring(useTransform(mx, [0, 1], [-40, 40]), { damping: 25 });
  const shape2Y = useSpring(useTransform(my, [0, 1], [-25, 25]), { damping: 25 });

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

  const { data: content, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(),
  });

  const headline = content?.hero?.headline || ["We Build Digital", "Experiences That", "Convert."];
  const subtext = content?.hero?.subtext || "A premium digital agency crafting high-converting websites, apps, and brands for ambitious companies worldwide.";

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      {/* Animated aurora gradient - optimized */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,122,95,0.18),transparent_70%)] animate-aurora" style={{ willChange: "transform" }} />
        <div className="absolute bottom-0 right-0 h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(205,164,94,0.1),transparent_70%)] animate-aurora" style={{ animationDelay: "-8s", willChange: "transform" }} />
        <div className="absolute bottom-1/4 left-0 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,90,69,0.15),transparent_70%)] animate-aurora" style={{ animationDelay: "-14s", willChange: "transform" }} />
      </div>

      {/* Mouse-responsive light - optimized */}
      <motion.div
        className="pointer-events-none absolute h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(205,164,94,0.08),transparent_70%)]"
        style={{ left: lightX, top: lightY, translateX: "-50%", translateY: "-50%", willChange: "left, top" }}
      />

      <Particles />


      {/* Content */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >


        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.02] tracking-tight">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={mounted ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.4 + li * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {li === 2 ? <span className="text-gold-gradient">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-7 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <PillButton href="https://wa.me/919600407657" target="_blank" rel="noopener noreferrer">
              Start a Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </PillButton>
          </Magnetic>
          <Magnetic>
            <PillButton href="#work" variant="outline">
              View Portfolio
            </PillButton>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
