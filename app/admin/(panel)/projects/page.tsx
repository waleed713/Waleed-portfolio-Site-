import Link from "next/link";
import { Eye, EyeOff, Pencil, Star } from "lucide-react";
import { PageHead } from "@/components/admin/PageHead";
import { ConfirmDelete } from "@/components/admin/ui";
import { projectsDb } from "@/lib/content";
import { deleteProject, toggleProject } from "@/lib/actions";

export default async function ProjectsAdmin() {
  const projects = await projectsDb.all();
  return (
    <>
      <PageHead title="Projects" sub="Website projects shown in your portfolio." cta={{ href: "/admin/projects/new", label: "New project" }} />
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="glass flex flex-wrap items-center gap-5 rounded-2xl p-4 pr-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" className="h-20 w-32 shrink-0 rounded-xl object-cover object-top" />
            <div className="min-w-0 flex-1 basis-56">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/projects/${p.id}`} className="font-medium hover:text-accent-400">{p.title}</Link>
                {p.featured && <Star size={14} className="fill-accent-500 text-accent-500" />}
                {!p.published && <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-cream/60">Draft</span>}
              </div>
              <div className="mt-1 text-sm text-cream/45">{p.category} · /{p.slug}</div>
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleProject.bind(null, p.id, "published")}><button title={p.published ? "Unpublish" : "Publish"} className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400">{p.published ? <Eye size={17} /> : <EyeOff size={17} />}</button></form>
              <form action={toggleProject.bind(null, p.id, "featured")}><button title="Toggle featured" className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400"><Star size={17} className={p.featured ? "fill-accent-500 text-accent-500" : ""} /></button></form>
              <Link href={`/admin/projects/${p.id}`} className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400" title="Edit"><Pencil size={17} /></Link>
              <ConfirmDelete action={deleteProject.bind(null, p.id)} />
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="py-16 text-center text-cream/45">No projects yet.</p>}
      </div>
    </>
  );
}
