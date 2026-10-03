import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Why } from "@/components/site/Why";
import { Process } from "@/components/site/Process";
import { BlogPreview } from "@/components/site/BlogPreview";
import { CTA } from "@/components/site/CTA";
import { Contact } from "@/components/site/Contact";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";

export default async function Home() {
  const [projects, posts] = await Promise.all([getPublishedProjects(), getPublishedPosts()]);
  const featured = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const shots = featured.slice(0, 3).map((p) => ({ src: p.image, title: p.title }));
  return (
    <SiteShell>
      <Hero shots={shots} />
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Work projects={featured.slice(0, 6)} />
      <Why />
      <Process />
      <BlogPreview posts={posts} />
      <CTA />
      <Contact />
    </SiteShell>
  );
}
