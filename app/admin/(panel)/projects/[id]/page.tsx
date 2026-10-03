import { notFound } from "next/navigation";
import { PageHead } from "@/components/admin/PageHead";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { projectsDb } from "@/lib/content";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const project = await projectsDb.byId((await params).id);
  if (!project) notFound();
  return (<><PageHead title="Edit project" sub={project.title} /><ProjectForm project={project} /></>);
}
