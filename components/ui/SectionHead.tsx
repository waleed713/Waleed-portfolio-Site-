import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  accent,
  text,
  center,
  light,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  text?: string;
  center?: boolean;
  light?: boolean; // true on cream backgrounds
}) {
  return (
    <Reveal className={`mb-14 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`eyebrow ${center ? "center" : ""}`}>{eyebrow}</div>
      <h2 className={`font-head mt-5 text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.2] ${light ? "text-olive-950" : "text-cream"}`}>
        {title} {accent && <em className="not-italic text-accent-500">{accent}</em>}
      </h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-olive-950/70" : "text-cream/65"}`}>{text}</p>}
    </Reveal>
  );
}
