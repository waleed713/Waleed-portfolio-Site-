import { ArrowUpRight, Briefcase, Mail } from "lucide-react";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

const channels = [
  { label: "Email", value: site.email, hint: "Best for detailed briefs", href: `mailto:${site.email}`, icon: <Mail size={22} strokeWidth={1.7} /> },
  { label: "WhatsApp", value: site.phone, hint: "Fastest way to reach me", href: site.whatsapp, icon: <WhatsAppIcon className="size-[22px]" /> },
  { label: "Instagram", value: "@waleed_webstudio", hint: "Behind the scenes & work", href: site.socials.instagram, icon: <InstagramIcon className="size-[22px]" /> },
  { label: "LinkedIn", value: "Waleed Ahmad", hint: "Let's connect professionally", href: site.socials.linkedin, icon: <LinkedInIcon className="size-[22px]" /> },
  { label: "Fiverr", value: "waleed_dev7", hint: "Hire me with secure payments", href: site.socials.fiverr, icon: <Briefcase size={22} strokeWidth={1.7} /> },
];

export function ContactChannels() {
  return (
    <div className="grid gap-4">
      {channels.map((c) => (
        <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
          className="group glass relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition duration-500 hover:-translate-y-1 hover:border-accent-500/50 hover:bg-white/[.07]">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-white">{c.icon}</div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold tracking-[.18em] text-cream/45 uppercase">{c.label}</div>
            <div className="mt-0.5 truncate font-medium">{c.value}</div>
            <div className="truncate text-sm text-cream/45">{c.hint}</div>
          </div>
          <ArrowUpRight size={18} className="shrink-0 text-cream/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-400" />
        </a>
      ))}
    </div>
  );
}
