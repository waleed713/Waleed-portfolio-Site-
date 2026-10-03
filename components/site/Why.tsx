import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { why } from "@/lib/site";

export function Why() {
  return (
    <section className="bg-cream py-24 text-olive-950 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHead light center eyebrow="Why Work With Me" title="Built On" accent="Trust and Craft" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-3xl border border-olive-950/10 bg-white/60 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-olive-950/10">
                <div className="font-head text-4xl text-accent-500/40 transition group-hover:text-accent-500">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-head mt-6 text-[15px] leading-snug">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-olive-950/65">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
