import Link from "next/link";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { PageHead } from "@/components/admin/PageHead";
import { ConfirmDelete } from "@/components/admin/ui";
import { fmtDate } from "@/components/site/PostCard";
import { postsDb } from "@/lib/content";
import { deletePost, togglePost } from "@/lib/actions";

export default async function PostsAdmin() {
  const posts = await postsDb.all();
  return (
    <>
      <PageHead title="Blog posts" sub="Write articles in Markdown with live preview." cta={{ href: "/admin/posts/new", label: "New post" }} />
      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.id} className="glass flex flex-wrap items-center gap-5 rounded-2xl p-4 pr-5">
            <div className="min-w-0 flex-1 basis-64 pl-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/posts/${p.id}`} className="font-medium hover:text-accent-400">{p.title}</Link>
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${p.published ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-cream/60"}`}>{p.published ? "Published" : "Draft"}</span>
              </div>
              <div className="mt-1 text-sm text-cream/45">{fmtDate(p.createdAt)} · /blog/{p.slug}</div>
            </div>
            <div className="flex items-center gap-2">
              <form action={togglePost.bind(null, p.id)}><button title={p.published ? "Unpublish" : "Publish"} className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400">{p.published ? <Eye size={17} /> : <EyeOff size={17} />}</button></form>
              <Link href={`/admin/posts/${p.id}`} className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-accent-400 hover:text-accent-400" title="Edit"><Pencil size={17} /></Link>
              <ConfirmDelete action={deletePost.bind(null, p.id)} />
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="py-16 text-center text-cream/45">No posts yet.</p>}
      </div>
    </>
  );
}
