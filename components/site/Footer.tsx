import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-20 pb-8">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/images/brand/logo-footer.png" alt="Waleed Ahmad" width={170} height={50} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-cream/55">WordPress developer &amp; UI/UX designer based in {site.location} — building websites with intent.</p>
          </div>
          <FooterCol title="Navigate" links={[["Home", "/"], ["About", "/#about"], ["Work", "/#work"], ["Blog", "/blog"], ["Contact", "/contact"]]} />
          <FooterCol title="Services" links={[["WordPress Websites", "/#services"], ["WooCommerce Stores", "/#services"], ["UI/UX Design", "/#services"], ["Landing Pages", "/#services"]]} />
          <div>
            <h4 className="font-head mb-5 text-base text-cream/70 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-[15px] text-cream/70">
              <li><a href={`mailto:${site.email}`} className="hover:text-accent-400">{site.email}</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener" className="hover:text-accent-400">{site.phone}</a></li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-cream/45">
          <span>© {new Date().getFullYear()} Waleed Ahmad. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-head mb-5 text-base text-cream/70 uppercase tracking-wider">{title}</h4>
      <ul className="space-y-3 text-[15px] text-cream/70">
        {links.map(([l, h]) => <li key={l}><Link href={h} className="hover:text-accent-400">{l}</Link></li>)}
      </ul>
    </div>
  );
}
