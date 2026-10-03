"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Project } from "@/lib/types";

export function ProjectsGrid({ projects, light }: { projects: Project[]; light?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [lb, setLb] = useState<number | null>(null);

  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))], [projects]);
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [projects, filter]);

  useEffect(() => {
    if (lb === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [lb, list.length]);

  const active = lb !== null ? list[lb] : null;

  return (
    <div>
      {cats.length > 2 && (
        <div className="mb-12 flex flex-wrap gap-2.5">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                filter === c
                  ? "border-accent-500 bg-accent-500 text-white"
                  : light ? "border-olive-950/15 text-olive-950/70 hover:border-accent-500 hover:text-accent-600"
                          : "border-white/15 text-cream/70 hover:border-accent-400 hover:text-accent-400"}`}>
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 0.68, 0, 1] }}
              className={`group overflow-hidden rounded-3xl border transition duration-500 hover:-translate-y-1.5 ${
                light ? "border-olive-950/10 bg-white hover:shadow-2xl hover:shadow-olive-950/10" : "border-white/10 bg-olive-900 hover:border-accent-500/40"}`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-olive-800">
                <SmartImage src={p.image} alt={p.title} className="object-cover object-top transition duration-[900ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <button onClick={() => setLb(i)} aria-label={`Preview ${p.title}`}
                  className="absolute top-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white/90 text-olive-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand size={16} />
                </button>
                {p.featured && <span className="absolute top-4 left-4 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">Featured</span>}
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold tracking-[.18em] text-accent-500 uppercase">{p.category}</div>
                <h3 className={`font-head mt-3 text-[15px] leading-snug ${light ? "text-olive-950" : "text-cream"}`}>
                  <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 hover:text-accent-500">{p.title}</Link>
                </h3>
                <p className={`mt-3 line-clamp-2 text-[15px] leading-relaxed ${light ? "text-olive-950/65" : "text-cream/60"}`}>{p.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className={`rounded-full px-3 py-1 text-xs ${light ? "bg-olive-950/[.06] text-olive-950/70" : "bg-white/[.07] text-cream/70"}`}>{t}</span>
                  ))}
                  <ArrowUpRight className="ml-auto text-accent-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={20} />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="py-16 text-center text-cream/50">No projects in this category yet.</p>}

      <AnimatePresence>
        {active && (
          <motion.div data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4 backdrop-blur-md" onClick={() => setLb(null)} role="dialog" aria-modal>
            <button className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setLb(null)} aria-label="Close"><X /></button>
            {list.length > 1 && (
              <>
                <button className="absolute left-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous"
                  onClick={(e) => { e.stopPropagation(); setLb((lb! - 1 + list.length) % list.length); }}><ChevronLeft /></button>
                <button className="absolute right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next"
                  onClick={(e) => { e.stopPropagation(); setLb((lb! + 1) % list.length); }}><ChevronRight /></button>
              </>
            )}
            <motion.div key={active.id} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative max-h-[76vh] overflow-auto rounded-2xl bg-olive-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.image} alt={active.title} className="w-full" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-white">
                <div>
                  <div className="text-xs tracking-[.18em] text-accent-400 uppercase">{active.category}</div>
                  <div className="font-head mt-1 text-base">{active.title}</div>
                </div>
                <Link href={`/projects/${active.slug}`} className="btn btn-primary !py-2.5 !text-sm">View project <ArrowUpRight size={16} /></Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
