import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { messagesDb } from "@/lib/content";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = (await messagesDb.all()).filter((m) => !m.read).length;
  return (
    <div className="min-h-screen bg-olive-950 lg:flex">
      <Sidebar unread={unread} />
      <div className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-12">{children}</div>
    </div>
  );
}
