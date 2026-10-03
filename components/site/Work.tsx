import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectsGrid } from "./ProjectsGrid";
import type { Project } from "@/lib/types";

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="bg-olive-900 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHead eyebrow="Selected Work" title="Websites &" accent="Projects"
          text="A selection of WordPress and web projects — from real estate and healthcare to restaurants and eCommerce." />
        <ProjectsGrid projects={projects} />
        <div className="mt-14 text-center">
          <Link href="/projects" className="btn btn-ghost">Browse all projects <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
