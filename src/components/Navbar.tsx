import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import PillButton from "./PillButton";
import { useTheme } from "./ThemeProvider";

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
  const { theme, setTheme } = useTheme();

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
              ? "bg-background/80 backdrop-blur-[40px] saturate-[1.5] border border-border mx-4 rounded-full py-2 pl-5 pr-2 sm:mx-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]"
              : "py-2"
          }`}
        >
          <a href="#hero" className="flex items-center gap-3" data-cursor="button">
            <img src="/logo.jpg" alt="Lumio Digital" className="h-12 w-auto object-contain rounded-lg" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              <span className="text-emerald">Lumio</span> <span className="text-gold">Digital</span>
            </span>
          </a>

          <nav aria-label="Main Navigation" className="hidden items-center gap-1 lg:flex">
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

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <PillButton href="https://wa.me/919600407657" className="px-6 py-2.5">
              Start a Project
            </PillButton>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-11 w-11 place-items-center rounded-full bg-muted/50 border border-border text-foreground shadow-inner"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-muted/50 border border-border text-gold shadow-inner"
              aria-label="Open menu"
              data-cursor="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-background/95 backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <img src="/logo.jpg" alt="Lumio Digital" className="h-10 w-auto object-contain rounded" />
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-muted border border-border text-gold shadow-inner"
                aria-label="Close menu"
                data-cursor="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile Navigation" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="border-b border-border py-4 text-4xl font-semibold tracking-tight text-foreground"
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
