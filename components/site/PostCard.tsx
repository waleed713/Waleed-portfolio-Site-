import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { readingTime } from "@/lib/content";
import type { Post } from "@/lib/types";

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function PostCard({ post, light }: { post: Post; light?: boolean }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border transition duration-500 hover:-translate-y-1.5 ${
      light ? "border-olive-950/10 bg-white hover:shadow-2xl hover:shadow-olive-950/10" : "border-white/10 bg-olive-900 hover:border-accent-500/40"}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-olive-800">
        {post.cover && <SmartImage src={post.cover} alt={post.title} className="object-cover object-top transition duration-[900ms] group-hover:scale-105" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className={`flex items-center gap-3 text-xs ${light ? "text-olive-950/55" : "text-cream/50"}`}>
          <span>{fmtDate(post.createdAt)}</span><span>•</span><span>{readingTime(post.content)} min read</span>
        </div>
        <h3 className={`font-head mt-4 text-[15px] leading-snug ${light ? "text-olive-950" : "text-cream"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
        </h3>
        <p className={`mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed ${light ? "text-olive-950/65" : "text-cream/60"}`}>{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent-500">
          Read article <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
