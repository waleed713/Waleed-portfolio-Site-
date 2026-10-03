import Link from "next/link";
import { ArrowUpRight, FileText, FolderKanban, Inbox, Eye } from "lucide-react";
import { PageHead } from "@/components/admin/PageHead";
import { messagesDb, postsDb, projectsDb } from "@/lib/content";
import { fmtDate } from "@/components/site/PostCard";

export default async function Dashboard() {
  const [projects, posts, messages] = await Promise.all([projectsDb.all(), postsDb.all(), messagesDb.all()]);
  const cards = [
    { label: "Projects", value: projects.length, sub: `${projects.filter((p) => p.published).length} published`, icon: FolderKanban, href: "/admin/projects" },
    { label: "Blog posts", value: posts.length, sub: `${posts.filter((p) => p.published).length} published`, icon: FileText, href: "/admin/posts" },
    { label: "Messages", value: messages.length, sub: `${messages.filter((m) => !m.read).length} unread`, icon: Inbox, href: "/admin/messages" },
  ];
  return (
    <>
      <PageHead title="Dashboard" sub="Welcome back, Waleed. Here's what's on your site." />
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href} className="glass group rounded-3xl p-7 transition hover:border-accent-500/50">
            <div className="flex items-center justify-between text-cream/60"><span className="text-sm">{label}</span><Icon size={20} className="text-accent-400" /></div>
            <div className="font-head mt-5 text-4xl">{value}</div>
            <div className="mt-2 text-sm text-cream/50">{sub}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/admin/projects/new" className="btn btn-primary">Add project</Link>
        <Link href="/admin/posts/new" className="btn btn-ghost">Write blog post</Link>
        <a href="/" target="_blank" className="btn btn-ghost"><Eye size={17} /> View live site</a>
      </div>

      <div className="mt-12 grid gap-8 xl:grid-cols-2">
        <section>
          <h2 className="font-head mb-4 text-sm text-cream/50 uppercase">Latest messages</h2>
          <div className="glass divide-y divide-white/10 rounded-3xl">
            {messages.slice(0, 5).map((m) => (
              <Link key={m.id} href="/admin/messages" className="flex items-start justify-between gap-4 p-5 hover:bg-white/[.03]">
                <div className="min-w-0"><div className="flex items-center gap-2 font-medium">{!m.read && <span className="size-2 rounded-full bg-accent-500" />}{m.name}</div><p className="mt-1 truncate text-sm text-cream/50">{m.message}</p></div>
                <span className="shrink-0 text-xs text-cream/40">{fmtDate(m.createdAt)}</span>
              </Link>
            ))}
            {messages.length === 0 && <p className="p-6 text-cream/45">No messages yet.</p>}
          </div>
        </section>
        <section>
          <h2 className="font-head mb-4 text-sm text-cream/50 uppercase">Recent projects</h2>
          <div className="glass divide-y divide-white/10 rounded-3xl">
            {projects.slice(0, 5).map((p) => (
              <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-white/[.03]">
                <span className="truncate font-medium">{p.title}</span><ArrowUpRight size={16} className="shrink-0 text-cream/40" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
