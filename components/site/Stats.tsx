"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { Gauge, Layers, MessageCircle, Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/site";

const icons = [Layers, Smartphone, MessageCircle, Gauge];

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 0.68, 0, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-olive-900 py-20 md:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[130px]" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="group glass relative h-full overflow-hidden rounded-3xl p-8 transition duration-500 hover:-translate-y-1.5 hover:border-accent-500/50">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60 transition group-hover:opacity-100" />
                  <div className="grid size-11 place-items-center rounded-xl bg-accent-500/15 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <div className="font-head mt-8 text-5xl leading-none text-cream md:text-6xl">
                    <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-5 text-lg font-medium">{s.label}</div>
                  <p className="mt-1 text-sm text-cream/50">{s.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
