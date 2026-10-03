import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "WordPress websites and web projects by Waleed Ahmad." };

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return (
    <SiteShell>
      <section className="bg-olive-900 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHead eyebrow="Portfolio" title="All" accent="Projects" text="Websites, stores and web apps — each one built around its own audience." />
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </SiteShell>
  );
}
