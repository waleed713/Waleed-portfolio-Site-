import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PostCard } from "@/components/site/PostCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Notes on WordPress, UI/UX design and building websites that convert." };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <SiteShell>
      <section className="min-h-[70vh] bg-olive-900 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHead eyebrow="Blog" title="Ideas, Tips &" accent="Insights" text="Practical notes on WordPress, design and building websites that work." />
          {posts.length === 0 ? <p className="text-cream/50">No articles yet — check back soon.</p> : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
