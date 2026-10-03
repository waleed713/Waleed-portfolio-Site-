"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Compass, Code2, PenTool, Rocket, Search } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/site";

const icons = [Search, Compass, PenTool, Code2, Rocket];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="process" className="relative overflow-hidden bg-olive-950 py-24 md:py-32">
      <div className="pointer-events-none absolute top-20 -left-40 size-[480px] rounded-full bg-accent-500/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-14 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        {/* left: sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="eyebrow">How It Works</div>
            <h2 className="font-head mt-5 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15]">
              A Process Built for <em className="not-italic text-accent-500">Clarity</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/65">
              Five clear steps from first conversation to launch day — so you always know what happens next.
            </p>
            <div className="glass mt-10 flex items-center gap-4 rounded-2xl p-5">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-500 text-white"><Rocket size={22} /></div>
              <div className="text-sm text-cream/65"><strong className="block text-base text-cream">Fast, transparent delivery</strong>Clear milestones and honest updates at every stage.</div>
            </div>
          </Reveal>
        </div>

        {/* right: timeline */}
        <div ref={ref} className="relative pl-14 md:pl-20">
          <div className="absolute top-3 bottom-3 left-[22px] w-px bg-white/10 md:left-[30px]" />
          <motion.div style={{ scaleY: fill }} className="absolute top-3 bottom-3 left-[22px] w-px origin-top bg-gradient-to-b from-accent-400 to-accent-600 md:left-[30px]" />
          <div className="space-y-6">
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={s.tag} delay={0.05}>
                  <div className="group relative">
                    <div className="absolute top-7 -left-14 grid size-11 place-items-center rounded-full border border-accent-500/60 bg-olive-950 text-accent-400 transition duration-500 group-hover:bg-accent-500 group-hover:text-white md:-left-20 md:size-[60px]">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div className="glass relative overflow-hidden rounded-3xl p-7 transition duration-500 group-hover:border-accent-500/40 group-hover:bg-white/[.07] md:p-9">
                      <span className="font-head pointer-events-none absolute -top-4 right-5 text-[7rem] leading-none text-white/[.04] transition group-hover:text-accent-500/[.12]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="inline-block rounded-full bg-accent-500/15 px-3.5 py-1 text-xs font-semibold tracking-[.18em] text-accent-400 uppercase">Step {i + 1} · {s.tag}</span>
                      <h3 className="font-head mt-5 text-xl leading-snug md:text-2xl">{s.title}</h3>
                      <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-cream/60">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
