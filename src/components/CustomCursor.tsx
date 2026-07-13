import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // disable on touch
    
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      // Check for custom cursor data attributes
      const elWithCursor = target.closest("[data-cursor]") as HTMLElement | null;
      if (elWithCursor) {
        setIsHovering(true);
        const variant = elWithCursor.dataset.cursor;
        setCursorText(variant === "view" ? "View" : variant === "drag" ? "Drag" : "");
        return;
      }

      const isInteractive = target.closest("a, button, input, textarea, [role='button'], .interactive");
      setIsHovering(!!isInteractive);
      setCursorText("");
    };
    
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          rotate: isClicking ? -5 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
          style={{ transform: "translate(-2px, -2px) scaleX(-1)" }}
        >
          <path 
            d="M30 1L1 12.6L12.6 15.5L19.8 28.5L30 1Z" 
            fill="url(#emeraldGoldGradient)" 
            stroke="#141414" 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />
          <defs>
            <linearGradient id="emeraldGoldGradient" x1="1" y1="1" x2="30" y2="28.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0E7A5F" />
              <stop offset="1" stopColor="#CDA45E" />
            </linearGradient>
          </defs>
        </svg>

      </motion.div>
    </>
  );
}
