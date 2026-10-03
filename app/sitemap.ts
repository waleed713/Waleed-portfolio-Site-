import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getPublishedProjects(), getPublishedPosts()]);
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}
