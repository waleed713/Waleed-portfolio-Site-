import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SmartImage } from "@/components/ui/SmartImage";
import { fmtDate } from "@/components/site/PostCard";
import { getPublishedPosts, postsDb, readingTime } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await postsDb.bySlug((await params).slug);
  if (!p || !p.published) return {};
  return { title: p.title, description: p.excerpt, openGraph: { title: p.title, description: p.excerpt, type: "article", images: p.cover ? [{ url: p.cover }] : undefined } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await postsDb.bySlug((await params).slug);
  if (!p || !p.published) notFound();
  return (
    <SiteShell>
      <article className="bg-cream pt-36 pb-24 text-olive-950 md:pt-44">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-olive-950/60 hover:text-accent-600"><ArrowLeft size={16} /> All articles</Link>
          <div className="mt-8 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-700">{t}</span>)}</div>
          <h1 className="font-head mt-5 text-[clamp(1.7rem,3.8vw,2.8rem)] leading-[1.2]">{p.title}</h1>
          <div className="mt-5 text-sm text-olive-950/55">By {site.name} · {fmtDate(p.createdAt)} · {readingTime(p.content)} min read</div>
          {p.cover && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-olive-900">
              <SmartImage src={p.cover} alt={p.title} priority sizes="768px" className="object-cover object-top" />
            </div>
          )}
          <div className="prose-site mt-12"><ReactMarkdown remarkPlugins={[remarkGfm]}>{p.content}</ReactMarkdown></div>
          <div className="mt-16 rounded-3xl bg-olive-900 p-8 text-center text-cream">
            <p className="font-head text-lg">Need a website that actually works for your business?</p>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-primary mt-6">Let&apos;s talk</a>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
