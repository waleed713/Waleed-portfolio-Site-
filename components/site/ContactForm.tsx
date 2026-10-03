"use client";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { projectTypes } from "@/lib/site";

/**
 * 1. POST /api/contact -> validates + stores the message (shows in /admin/messages)
 * 2. The browser POSTs to Web3Forms -> the email lands in your inbox.
 *    Web3Forms blocks server-to-server calls on the free plan, so this must run in the browser.
 *    The access key is meant to be public: it can only send mail to your own address.
 */
export function ContactForm({ web3Key }: { web3Key?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    setError("");
    try {
      if (data.website) { form.reset(); setState("ok"); return; } // honeypot

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "Something went wrong");

      let mailed = false;
      if (web3Key) {
        try {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: web3Key,
              subject: `New project inquiry — ${data.project}`,
              from_name: "Portfolio Contact Form",
              name: data.name,
              email: data.email,
              replyto: data.email,
              project: data.project,
              message: data.message,
            }),
          });
          const j = await r.json().catch(() => ({}));
          mailed = r.ok && j.success === true;
        } catch {}
      }

      if (!out.saved && !mailed) throw new Error("Could not send your message right now. Please email or WhatsApp me directly.");
      form.reset();
      setState("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 md:p-9">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-cream/80">Full name
          <input name="name" required maxLength={100} placeholder="Your name" className="field-input mt-2" />
        </label>
        <label className="block text-sm font-medium text-cream/80">Email address
          <input type="email" name="email" required maxLength={150} placeholder="you@email.com" className="field-input mt-2" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-cream/80">Project type
        <select name="project" className="field-input mt-2">
          {projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="mt-5 block text-sm font-medium text-cream/80">Project details
        <textarea name="message" required minLength={10} maxLength={3000} rows={6} placeholder="Tell me about your project, timeline and budget..." className="field-input mt-2 resize-y" />
      </label>
      <button type="submit" disabled={state === "sending"} className="btn btn-primary mt-6 w-full disabled:opacity-60">
        {state === "sending" ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send Message <Send size={17} /></>}
      </button>
      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {state === "ok" && <p className="text-emerald-400">Thanks! Your message has been sent — I&apos;ll get back to you within a day.</p>}
        {state === "error" && <p className="text-red-400">{error}</p>}
      </div>
    </form>
  );
}
