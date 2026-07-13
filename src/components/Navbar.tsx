import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import PillButton from "./PillButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 ${
            scrolled
              ? "bg-[#1a1a1a]/40 backdrop-blur-[40px] saturate-[1.5] border border-white/10 mx-4 rounded-full py-2 pl-5 pr-2 sm:mx-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
              : "py-2"
          }`}
        >
          <a href="#hero" className="flex items-center gap-3" data-cursor="button">
            <img src="/logo.jpg" alt="Lumio Digital" className="h-12 w-auto object-contain rounded-lg" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              <span className="text-emerald">Lumio</span> <span className="text-gold">Digital</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="button"
                className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <PillButton href="https://wa.me/919600407657" className="px-6 py-2.5">
              Start a Project
            </PillButton>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-[#141414] border border-white/5 text-gold lg:hidden shadow-inner"
            aria-label="Open menu"
            data-cursor="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-[#050505]/95 backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <img src="/logo.jpg" alt="Lumio Digital" className="h-10 w-auto object-contain" />
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#141414] border border-white/5 text-gold shadow-inner"
                aria-label="Close menu"
                data-cursor="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="border-b border-white/5 py-4 text-4xl font-semibold tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <PillButton href="https://wa.me/919600407657" onClick={() => setOpen(false)}>
                  Start a Project
                </PillButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
