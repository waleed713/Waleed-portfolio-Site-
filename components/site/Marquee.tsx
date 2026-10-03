const items = ["WordPress", "Elementor", "WooCommerce", "UI/UX Design", "Figma", "Responsive Design", "Speed Optimisation", "Landing Pages", "Website Redesign"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-accent-500 py-5 text-olive-950" aria-hidden>
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-head flex items-center gap-10 text-sm">
            {t} <span className="size-1.5 rounded-full bg-olive-950/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
