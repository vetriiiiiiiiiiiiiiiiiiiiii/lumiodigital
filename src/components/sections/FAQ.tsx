import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

const faqs = [
  { q: "What does a typical project timeline look like?", a: "Most marketing sites ship in 2–4 weeks, while web apps and e-commerce builds run 6–12 weeks depending on scope. We define clear milestones upfront." },
  { q: "Do you work with clients outside India?", a: "Absolutely. We partner with brands worldwide and work asynchronously across time zones with clear communication." },
  { q: "What's included in the price?", a: "Strategy, design, development, and launch. Every plan includes responsive design, SEO fundamentals, and revision rounds." },
  { q: "Do you provide ongoing support?", a: "Yes — our Maintenance service covers performance, updates, and continuous improvements after launch." },
  { q: "Which technologies do you use?", a: "We build with modern, performant stacks — React, Tailwind, and best-in-class animation and CMS tools tailored to your needs." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-6 py-16 sm:py-36">
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} variant="up" delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl bg-[#080808]/80 backdrop-blur-md border border-white/5 transition-colors hover:border-emerald/30 shadow-soft">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-gold">
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
