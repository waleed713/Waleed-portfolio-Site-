import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  "Client-focused design process",
  "Fully responsive, fast-loading builds",
  "Consistent, on-brand visual systems",
  "Reliable communication, real deadlines",
];

export function About() {
  return (
    <section id="about" className="bg-cream py-24 text-olive-950 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-20 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-accent-500/30 to-transparent blur-2xl" />
            <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] shadow-2xl shadow-olive-950/30 ring-1 ring-olive-950/10">
              <Image src="/images/about.jpg" alt="Waleed Ahmad — WordPress Developer at his desk" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
            <div className="absolute right-4 -bottom-10 max-w-[300px] rounded-2xl bg-olive-900 p-6 text-cream shadow-xl md:right-[-24px]">
              <div className="font-head text-4xl leading-none text-accent-500">“</div>
              <p className="mt-1 text-[15px] leading-relaxed text-cream/85">A website should load fast, guide the visitor, and turn interest into action.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="eyebrow !text-accent-600">About</div>
          <h2 className="font-head mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.2]">
            Where Design Meets <em className="not-italic text-accent-600">Development</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-olive-950/75">
            I&apos;m a WordPress developer and UI/UX designer based in Abbottabad, Pakistan, working with businesses that want their brand to look as sharp online as it does in person. Every project starts with one question: what does this brand actually need to say, and how should it work?
          </p>
          <p className="mt-4 text-lg leading-relaxed text-olive-950/75">
            My work spans real estate, healthcare, restaurants, nonprofits and eCommerce — each site built around its own audience rather than a recycled template.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-500 text-white"><Check size={14} strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

    </section>
  );
}
