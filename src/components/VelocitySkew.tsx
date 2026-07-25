import { motion, useScroll, useVelocity, useSpring, useTransform } from "motion/react";
import { ReactNode } from "react";

export default function VelocitySkew({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // A very subtle skew so it doesn't make users dizzy, just adds weight.
  const skewY = useTransform(smoothVelocity, [-3000, 3000], [-2, 2]);

  return (
    <motion.div style={{ skewY, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
