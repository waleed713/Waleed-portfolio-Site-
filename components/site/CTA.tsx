import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400 py-24 text-olive-950 md:py-28">
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-white/20 blur-3xl" />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <div className="text-xs font-semibold tracking-[.24em] uppercase opacity-70">Let&apos;s Talk</div>
        <h2 className="font-head mt-5 text-[clamp(1.7rem,4vw,3rem)] leading-[1.2]">Have a project in mind? Let&apos;s create something great.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn btn-dark">Start a Project <ArrowRight size={18} /></Link>
          <a href={site.whatsapp} target="_blank" rel="noopener" className="btn border border-olive-950/30 hover:bg-olive-950/10">
            WhatsApp Waleed <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
