import { Phone } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36 flex flex-col items-center justify-center">
      <div className="pointer-events-none absolute right-1/2 top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/5 blur-[130px]" />
      
      <Reveal variant="up" delay={0.1}>
        <div className="rounded-[2.5rem] bg-[#1a1a1a]/30 backdrop-blur-[40px] border border-white/10 p-10 sm:p-14 shadow-2xl saturate-[1.5]">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Contact <span className="text-gold-gradient">Us</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            <a href="https://wa.me/919600407657" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-xl sm:text-2xl font-medium text-foreground transition-all duration-300 hover:text-gold hover:scale-105" data-cursor="button">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#141414]/80 border border-gold/20 text-gold shadow-[0_0_15px_rgba(205,164,94,0.15)]"><Phone className="h-6 w-6" /></span>
              Vetri Prasath — 9600407657
            </a>
            <a href="https://wa.me/919809801019" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-xl sm:text-2xl font-medium text-foreground transition-all duration-300 hover:text-gold hover:scale-105" data-cursor="button">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#141414]/80 border border-gold/20 text-gold shadow-[0_0_15px_rgba(205,164,94,0.15)]"><Phone className="h-6 w-6" /></span>
              Saran — 98098 01019
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
