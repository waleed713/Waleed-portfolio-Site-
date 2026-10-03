"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/lib/site";

type Shot = { src: string; title: string };
const ease = [0.22, 0.68, 0, 1] as const;

export function Hero({ shots }: { shots: Shot[] }) {
  const [a, b, c] = shots;
  return (
    <section id="home" className="grain relative isolate overflow-hidden bg-olive-950 pt-36 pb-24 md:pt-44 md:pb-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[620px] rounded-full bg-accent-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -left-52 -z-10 size-[520px] rounded-full bg-olive-500/25 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-3 text-xs font-medium text-cream/80">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
            <span className="hidden items-center gap-1 text-cream/50 sm:inline-flex"><MapPin size={12} /> {site.location}</span>
          </motion.div>

          <h1 className="font-head mt-8 text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.12]">
            {["Websites That Make", "Your Brand Impossible", "to Ignore."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 1 ? "bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent" : ""}`}
                  initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.15 + i * 0.12, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-cream/65">
            I&apos;m Waleed — a WordPress developer and UI/UX designer building fast, responsive websites that look sharp and turn visitors into customers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-10 flex flex-wrap gap-4">
            <Link href="/#work" className="btn btn-primary">View My Work <ArrowRight size={18} /></Link>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost">Let&apos;s Talk <ArrowRight size={18} /></a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-sm text-cream/55">
            <div><strong className="mb-1 block text-base text-cream">WordPress</strong>Business &amp; eCommerce</div>
            <div><strong className="mb-1 block text-base text-cream">UI/UX</strong>Web &amp; app interfaces</div>
            <div><strong className="mb-1 block text-base text-cream">Performance</strong>Fast, responsive builds</div>
          </motion.div>
        </div>

        {/* floating project mockups */}
        <div className="relative mx-auto hidden h-[560px] w-full max-w-[560px] lg:block">
          {[a, b, c].filter(Boolean).map((s, i) => {
            const pos = [
              "left-0 top-6 w-[78%] rotate-[-4deg]",
              "right-0 top-[190px] w-[74%] rotate-[3deg]",
              "left-[8%] bottom-0 w-[62%] rotate-[-1.5deg]",
            ][i];
            return (
              <motion.div key={s.src} className={`absolute ${pos}`}
                initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.18, ease }}>
                <motion.div animate={{ y: [0, i % 2 ? 10 : -10, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-olive-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-olive-800/80 px-4 py-2.5">
                    <span className="size-2 rounded-full bg-red-400/70" /><span className="size-2 rounded-full bg-amber-400/70" /><span className="size-2 rounded-full bg-emerald-400/70" />
                    <span className="ml-3 truncate text-[10px] text-cream/40">{s.title}</span>
                  </div>
                  <div className="relative aspect-[16/10]">
                    <SmartImage src={s.src} alt={s.title} sizes="380px" priority={i === 0} />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
