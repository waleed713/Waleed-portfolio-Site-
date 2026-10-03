"use client";
import { useActionState } from "react";
import Link from "next/link";
import { savePost, type FormState } from "@/lib/actions";
import type { Post } from "@/lib/types";
import { Field, SubmitButton, Toggle } from "./ui";
import { ImageUploader } from "./ImageUploader";
import { MarkdownEditor } from "./MarkdownEditor";

export function PostForm({ post }: { post?: Post }) {
  const [state, action] = useActionState<FormState, FormData>(savePost.bind(null, post?.id ?? null), undefined);
  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <Field label="Title *"><input name="title" required maxLength={160} defaultValue={post?.title} placeholder="Post title" className="field-input !text-lg" /></Field>
        <MarkdownEditor name="content" label="Content *" defaultValue={post?.content} rows={22} />
      </div>
      <div className="space-y-6">
        <ImageUploader name="cover" label="Cover image" defaultValue={post?.cover} />
        <Field label="Excerpt" hint="Short summary for cards & SEO. Auto-generated if empty."><textarea name="excerpt" rows={3} maxLength={300} defaultValue={post?.excerpt} className="field-input resize-y" /></Field>
        <Field label="Tags" hint="Comma separated"><input name="tags" defaultValue={post?.tags.join(", ")} className="field-input" /></Field>
        <Field label="URL slug" hint="Leave empty to generate from the title."><input name="slug" defaultValue={post?.slug} className="field-input" /></Field>
        <div className="rounded-2xl border border-white/10 p-5"><Toggle name="published" label="Published (visible on site)" defaultChecked={post?.published ?? false} /></div>
        {state?.error && <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{state.error}</p>}
        <div className="flex gap-3">
          <SubmitButton>{post ? "Save changes" : "Create post"}</SubmitButton>
          <Link href="/admin/posts" className="btn btn-ghost">Cancel</Link>
        </div>
      </div>
    </form>
  );
}
