import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactChannels } from "./ContactChannels";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className="bg-olive-950 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <div className="eyebrow">Get In Touch</div>
          <h2 className="font-head mt-5 text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.15]">Start the <em className="not-italic text-accent-500">Conversation</em></h2>
          <p className="mt-5 max-w-md text-lg text-cream/65">Tell me a bit about your project and I&apos;ll get back to you within a day.</p>
          <div className="mt-10"><ContactChannels /></div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-500">Open the full contact page <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal delay={0.1}><ContactForm web3Key={process.env.WEB3FORMS_KEY} /></Reveal>
      </div>
    </section>
  );
}
