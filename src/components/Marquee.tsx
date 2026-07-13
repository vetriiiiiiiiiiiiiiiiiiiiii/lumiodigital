export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-white/5 bg-muted/30 py-6">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold text-muted-foreground/60 sm:text-4xl">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold text-muted-foreground/60 sm:text-4xl">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
