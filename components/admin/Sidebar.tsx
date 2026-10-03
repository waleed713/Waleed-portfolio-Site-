"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, FolderKanban, Inbox, LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "@/lib/actions";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export function Sidebar({ unread }: { unread: number }) {
  const path = usePathname();
  return (
    <aside className="sticky top-0 z-30 flex h-auto flex-col border-b border-white/10 bg-ink lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between px-5 py-4 lg:py-7">
        <Link href="/admin"><Image src="/images/brand/logo-footer.png" alt="Admin" width={130} height={44} className="h-10 w-auto" /></Link>
        <span className="rounded-full bg-accent-500/15 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-accent-400 uppercase lg:hidden">Admin</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? path === href : path.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap transition ${active ? "bg-accent-500 text-white" : "text-cream/65 hover:bg-white/8 hover:text-cream"}`}>
              <Icon size={18} /> {label}
              {href === "/admin/messages" && unread > 0 && <span className="ml-auto rounded-full bg-white/20 px-2 text-xs">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="hidden space-y-1 border-t border-white/10 p-3 lg:block">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream/65 hover:bg-white/8"><ExternalLink size={18} /> View site</a>
        <form action={logout}><button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream/65 hover:bg-red-500/10 hover:text-red-300"><LogOut size={18} /> Sign out</button></form>
      </div>
    </aside>
  );
}
