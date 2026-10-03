import { notFound } from "next/navigation";
import { PageHead } from "@/components/admin/PageHead";
import { PostForm } from "@/components/admin/PostForm";
import { postsDb } from "@/lib/content";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const post = await postsDb.byId((await params).id);
  if (!post) notFound();
  return (<><PageHead title="Edit post" sub={post.title} /><PostForm post={post} /></>);
}
