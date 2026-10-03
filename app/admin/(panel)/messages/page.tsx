import { Mail, MailOpen } from "lucide-react";
import { PageHead } from "@/components/admin/PageHead";
import { ConfirmDelete } from "@/components/admin/ui";
import { fmtDate } from "@/components/site/PostCard";
import { messagesDb } from "@/lib/content";
import { deleteMessage, toggleMessageRead } from "@/lib/actions";

export default async function MessagesAdmin() {
  const messages = await messagesDb.all();
  return (
    <>
      <PageHead title="Messages" sub="Enquiries from your contact form." />
      <div className="grid gap-4">
        {messages.map((m) => (
          <div key={m.id} className={`glass rounded-2xl p-6 ${m.read ? "" : "border-accent-500/40"}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-medium">{!m.read && <span className="size-2 rounded-full bg-accent-500" />}{m.name}
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-normal text-cream/60">{m.project}</span></div>
                <a href={`mailto:${m.email}`} className="mt-1 block text-sm text-accent-400 hover:underline">{m.email}</a>
              </div>
              <span className="text-xs text-cream/40">{fmtDate(m.createdAt)}</span>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-cream/75">{m.message}</p>
            <div className="mt-5 flex gap-2">
              <a href={`mailto:${m.email}?subject=Re: your project enquiry`} className="btn btn-primary !px-5 !py-2 !text-sm">Reply</a>
              <form action={toggleMessageRead.bind(null, m.id)}><button className="btn btn-ghost !px-5 !py-2 !text-sm">{m.read ? <><Mail size={15} /> Mark unread</> : <><MailOpen size={15} /> Mark read</>}</button></form>
              <ConfirmDelete action={deleteMessage.bind(null, m.id)} />
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="py-16 text-center text-cream/45">No messages yet.</p>}
      </div>
    </>
  );
}
