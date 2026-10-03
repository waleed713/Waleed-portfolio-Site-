import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServiceIcon } from "@/components/ui/icons";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="relative bg-olive-950 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHead center eyebrow="What I Do" title="Services Built for" accent="Growing Brands"
          text="WordPress websites that turn attention into business, backed by interface design that makes them a pleasure to use." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.07}>
              <div className="group glass relative h-full overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 hover:border-accent-500/50 hover:bg-white/[.07]">
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-accent-500/0 blur-3xl transition duration-500 group-hover:bg-accent-500/25" />
                <div className="grid size-12 place-items-center rounded-2xl bg-accent-500/15 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-white">
                  <ServiceIcon name={s.icon} className="size-6" />
                </div>
                <h3 className="font-head mt-6 text-[15px] leading-snug">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
