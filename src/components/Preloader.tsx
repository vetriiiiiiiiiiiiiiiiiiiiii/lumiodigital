import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        setTimeout(() => {
          setGone(true);
          setTimeout(onDone, 700);
        }, 400);
        return;
      }
      setProgress(p);
      setTimeout(tick, 130);
    };
    const start = setTimeout(tick, 250);
    return () => clearTimeout(start);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img src="/logo.jpg" alt="Lumio Digital" className="h-20 w-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <div className="mt-10 h-px w-64 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald via-gold to-gold-light"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="mt-4 text-xs font-medium tracking-[0.3em] text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
