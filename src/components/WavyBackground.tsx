import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function WavyBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden opacity-30">
      {/* Wave 1 - Emerald */}
      <motion.div
        className="absolute bottom-0 left-0 h-[60vh] w-[200vw]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full opacity-40">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,126,195.42,112.5,238.13,103.58,280.3,80.77,321.39,56.44Z"
            className="fill-emerald"
          ></path>
          {/* Duplicate for seamless loop */}
          <path
            d="M1521.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39,79.91,16.85,162.8,57.85,241.79,78.68,70.05,18.48,146.53,26.09,214.34,3V120H1200V95.8C1259.71,118,1330.42,126,1395.42,112.5,1438.13,103.58,1480.3,80.77,1521.39,56.44Z"
            className="fill-emerald"
            transform="translate(1200, 0)"
          ></path>
        </svg>
      </motion.div>

      {/* Wave 2 - Gold */}
      <motion.div
        className="absolute bottom-0 left-0 h-[40vh] w-[200vw]"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full opacity-30">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-gold"
          ></path>
          {/* Duplicate for seamless loop */}
          <path
            d="M2185.66,92.83C2106.67,72,2023.78,31,1943.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,1200,27.35V120H2400V95.8C2332.19,118.92,2255.71,111.31,2185.66,92.83Z"
            className="fill-gold"
            transform="translate(-1200, 0)"
          ></path>
        </svg>
      </motion.div>
      
      {/* Creative addition: Floating glowing particles */}
      <div className="absolute inset-0">
         {Array.from({ length: 8 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute rounded-full"
             style={{
               width: Math.random() * 4 + 2,
               height: Math.random() * 4 + 2,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               backgroundColor: i % 2 === 0 ? "var(--gold)" : "var(--emerald)",
               boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(205,164,94,0.5)" : "rgba(14,122,95,0.5)"}`
             }}
             animate={{ y: [0, -100, 0], opacity: [0.2, 0.8, 0.2] }}
             transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
           />
         ))}
      </div>
    </div>
  );
}
