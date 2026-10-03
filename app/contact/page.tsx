import type { Metadata } from "next";
import { CalendarCheck, MessageSquareText, Rocket } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ContactChannels } from "@/components/site/ContactChannels";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Waleed Ahmad — message via the form, email, WhatsApp, Instagram, LinkedIn or Fiverr.",
};

const next = [
  { icon: MessageSquareText, title: "You send the details", text: "Share your goals, timeline and rough budget." },
  { icon: CalendarCheck, title: "I reply within a day", text: "With questions, a rough plan and next steps." },
  { icon: Rocket, title: "We start building", text: "Once we agree on scope, work begins right away." },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="grain relative isolate overflow-hidden bg-olive-950 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[560px] rounded-full bg-accent-500/20 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 -left-40 -z-10 size-[460px] rounded-full bg-olive-500/20 blur-[130px]" />

        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <div className="glass inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-3 text-xs font-medium text-cream/80">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for new projects · replies within 24 hours
            </div>
            <h1 className="font-head mt-8 text-[clamp(2.1rem,5vw,4rem)] leading-[1.1]">
              Let&apos;s build something <em className="not-italic text-accent-500">great together.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/65">
              Have a website, store or redesign in mind? Send a message, or reach me on whichever platform suits you best.
            </p>
          </Reveal>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
            <Reveal>
              <h2 className="font-head mb-5 text-sm tracking-wider text-cream/45 uppercase">Reach me directly</h2>
              <ContactChannels />
              <div className="mt-10 space-y-5">
                <h2 className="font-head text-sm tracking-wider text-cream/45 uppercase">What happens next</h2>
                {next.map(({ icon: Icon, title, text }, i) => (
                  <div key={title} className="flex gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-accent-500/50 text-accent-400"><Icon size={18} strokeWidth={1.7} /></div>
                    <div><div className="font-medium">{i + 1}. {title}</div><p className="mt-0.5 text-[15px] text-cream/55">{text}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <h2 className="font-head mb-5 text-sm tracking-wider text-cream/45 uppercase">Send a message</h2>
                <ContactForm web3Key={process.env.WEB3FORMS_KEY} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
