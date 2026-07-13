import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "gold" | "outline" | "emerald";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export default function PillButton({
  children,
  variant = "gold",
  href,
  onClick,
  className,
  type = "button",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 active:scale-95";

  const styles = {
    gold: "bg-gradient-to-r from-gold-light to-gold text-background shadow-gold hover:shadow-[0_25px_80px_-25px_rgba(205,164,94,0.7)]",
    emerald: "bg-gradient-to-r from-emerald to-emerald-deep text-foreground shadow-emerald",
    outline: "glass text-foreground hover:border-gold/50",
  }[variant];

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  const shared = cn(base, styles, "hover:-translate-y-0.5", className);

  if (href) {
    return (
      <a href={href} className={shared} data-cursor="button">
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={shared} data-cursor="button">
      {content}
    </button>
  );
}
