import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";

export function BlogPreview({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section id="blog" className="bg-cream py-24 text-olive-950 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHead light eyebrow="From the Blog" title="Ideas, Tips &" accent="Insights" text="Practical notes on WordPress, design and building websites that work." />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} light />)}
        </div>
        <div className="mt-14 text-center">
          <Link href="/blog" className="btn btn-dark">Read all articles <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
