"use client";
import { useActionState } from "react";
import Link from "next/link";
import { saveProject, type FormState } from "@/lib/actions";
import type { Project } from "@/lib/types";
import { Field, SubmitButton, Toggle } from "./ui";
import { ImageUploader } from "./ImageUploader";
import { MarkdownEditor } from "./MarkdownEditor";

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action] = useActionState<FormState, FormData>(saveProject.bind(null, project?.id ?? null), undefined);
  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        <Field label="Title *"><input name="title" required maxLength={140} defaultValue={project?.title} placeholder="e.g. Artesia — Real Estate Website" className="field-input" /></Field>
        <Field label="Short description" hint="Shown on cards. 1–2 sentences."><textarea name="description" rows={3} maxLength={400} defaultValue={project?.description} className="field-input resize-y" /></Field>
        <MarkdownEditor name="details" label="Case study (optional, Markdown)" defaultValue={project?.details} rows={12} />
      </div>
      <div className="space-y-6">
        <ImageUploader name="image" label="Project image *" defaultValue={project?.image} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category"><input name="category" list="cats" defaultValue={project?.category ?? "WordPress"} className="field-input" />
            <datalist id="cats">{["WordPress", "eCommerce", "Real Estate", "Restaurant", "Healthcare", "Agency", "Nonprofit", "Web App", "UI/UX"].map((c) => <option key={c} value={c} />)}</datalist>
          </Field>
          <Field label="Year"><input name="year" maxLength={10} defaultValue={project?.year ?? new Date().getFullYear().toString()} className="field-input" /></Field>
        </div>
        <Field label="Client"><input name="client" maxLength={100} defaultValue={project?.client} className="field-input" /></Field>
        <Field label="Live URL"><input name="liveUrl" type="url" defaultValue={project?.liveUrl} placeholder="https://" className="field-input" /></Field>
        <Field label="Tags" hint="Comma separated — WordPress, Elementor, Responsive"><input name="tags" defaultValue={project?.tags.join(", ")} className="field-input" /></Field>
        <Field label="URL slug" hint="Leave empty to generate from the title."><input name="slug" defaultValue={project?.slug} className="field-input" /></Field>
        <div className="space-y-4 rounded-2xl border border-white/10 p-5">
          <Toggle name="published" label="Published (visible on site)" defaultChecked={project?.published ?? true} />
          <Toggle name="featured" label="Featured (shown first)" defaultChecked={project?.featured} />
        </div>
        {state?.error && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{state.error}</p>}
        <div className="flex gap-3">
          <SubmitButton>{project ? "Save changes" : "Create project"}</SubmitButton>
          <Link href="/admin/projects" className="btn btn-ghost">Cancel</Link>
        </div>
      </div>
    </form>
  );
}
