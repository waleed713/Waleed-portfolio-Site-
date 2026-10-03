"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const solid = /^\/blog\/[^/]+/.test(pathname); // article pages sit on a light background

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "border-b border-white/10 bg-olive-950 py-3"
            : scrolled ? "border-b border-white/10 bg-olive-950/90 py-3 backdrop-blur-xl" : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Home" className="flex items-center">
            <Image src="/images/brand/logo-footer.png" alt="Waleed Ahmad" width={150} height={50} className="h-11 w-auto" priority />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="group relative text-sm font-medium text-cream/75 transition-colors hover:text-cream">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-primary hidden !py-2.5 !text-sm sm:inline-flex">
              Let&apos;s Work Together
            </a>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div data-lenis-prevent className={`fixed inset-0 z-[60] bg-olive-950 transition-transform duration-500 ease-out-expo lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-5">
          <Image src="/images/brand/logo-footer.png" alt="Waleed Ahmad" width={150} height={50} className="h-11 w-auto" />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-white/15">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-5 pt-8">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-head border-b border-white/10 py-5 text-lg">
              {n.label}
            </Link>
          ))}
          <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-primary mt-8">Let&apos;s Work Together</a>
        </div>
      </div>
    </>
  );
}
