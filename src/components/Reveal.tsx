import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variantsMap: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 24 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
  },
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  variant?: keyof typeof variantsMap;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variantsMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
