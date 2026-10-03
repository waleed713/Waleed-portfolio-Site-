import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SmartImage } from "@/components/ui/SmartImage";
import { getPublishedProjects, projectsDb } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getPublishedProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await projectsDb.bySlug((await params).slug);
  if (!p || !p.published) return {};
  return { title: p.title, description: p.description, openGraph: { title: p.title, description: p.description, images: [{ url: p.image }] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await projectsDb.bySlug((await params).slug);
  if (!p || !p.published) notFound();
  const others = (await getPublishedProjects()).filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <SiteShell>
      <article className="bg-olive-900 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-accent-400"><ArrowLeft size={16} /> All projects</Link>
          <div className="eyebrow mt-8">{p.category}</div>
          <h1 className="font-head mt-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.18]">{p.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/65">{p.description}</p>

          <div className="mt-10 grid gap-6 border-y border-white/10 py-6 text-sm sm:grid-cols-4">
            {[["Client", p.client || "—"], ["Year", p.year || "—"], ["Category", p.category]].map(([k, v]) => (
              <div key={k}><div className="text-xs tracking-wider text-cream/40 uppercase">{k}</div><div className="mt-1 font-medium">{v}</div></div>
            ))}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-3 sm:justify-self-end">Visit website <ArrowUpRight size={16} /></a>
            )}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-olive-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.title} className="w-full" />
          </div>

          {p.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="glass rounded-full px-4 py-1.5 text-sm text-cream/75">{t}</span>)}</div>
          )}

          {p.details && (
            <div className="prose-site mt-12 max-w-3xl"><ReactMarkdown remarkPlugins={[remarkGfm]}>{p.details}</ReactMarkdown></div>
          )}
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-24 max-w-[1100px] px-5 md:px-8">
            <h2 className="font-head mb-8 text-xl">More projects</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <Link key={o.id} href={`/projects/${o.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-olive-950 transition hover:border-accent-500/40">
                  <div className="relative aspect-[16/10] overflow-hidden"><SmartImage src={o.image} alt={o.title} className="object-cover object-top transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-5 text-[15px] font-medium">{o.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-20 text-center">
          <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-primary">Want something like this? Let&apos;s talk</a>
        </div>
      </article>
    </SiteShell>
  );
}
