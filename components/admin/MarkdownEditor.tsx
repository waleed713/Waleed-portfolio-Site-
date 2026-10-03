"use client";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bold, Code, Heading2, ImagePlus, Italic, Link2, List, Quote } from "lucide-react";

export function MarkdownEditor({ name, defaultValue = "", label, rows = 16 }: { name: string; defaultValue?: string; label: string; rows?: number }) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);

  function wrap(before: string, after = before, placeholder = "text") {
    const el = ref.current; if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    setValue(next);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + before.length, s + before.length + sel.length); });
  }
  function linePrefix(prefix: string) {
    const el = ref.current; if (!el) return;
    const s = value.lastIndexOf("\n", el.selectionStart - 1) + 1;
    setValue(value.slice(0, s) + prefix + value.slice(s));
    requestAnimationFrame(() => el.focus());
  }
  async function insertImage(f: File) {
    const fd = new FormData(); fd.append("file", f);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) wrap(`![${f.name.replace(/\.[^.]+$/, "")}](${data.url})`, "", "");
    else alert(data.error || "Upload failed");
  }

  const tools = [
    { i: <Heading2 size={16} />, t: "Heading", f: () => linePrefix("## ") },
    { i: <Bold size={16} />, t: "Bold", f: () => wrap("**") },
    { i: <Italic size={16} />, t: "Italic", f: () => wrap("*") },
    { i: <List size={16} />, t: "List", f: () => linePrefix("- ") },
    { i: <Quote size={16} />, t: "Quote", f: () => linePrefix("> ") },
    { i: <Code size={16} />, t: "Code", f: () => wrap("`") },
    { i: <Link2 size={16} />, t: "Link", f: () => wrap("[", "](https://)", "link text") },
    { i: <ImagePlus size={16} />, t: "Image", f: () => file.current?.click() },
  ];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-cream/80">{label}</span>
        <div className="flex rounded-full border border-white/10 p-0.5 text-xs">
          {(["write", "preview"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 capitalize ${tab === t ? "bg-accent-500 text-white" : "text-cream/60"}`}>{t}</button>
          ))}
        </div>
      </div>
      <input type="hidden" name={name} value={value} />
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[.03]">
        {tab === "write" ? (
          <>
            <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
              {tools.map((x) => <button key={x.t} type="button" title={x.t} aria-label={x.t} onClick={x.f} className="grid size-9 place-items-center rounded-lg text-cream/60 hover:bg-white/10 hover:text-accent-400">{x.i}</button>)}
            </div>
            <textarea ref={ref} value={value} onChange={(e) => setValue(e.target.value)} rows={rows} placeholder="Write in Markdown…"
              className="block w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-cream outline-none placeholder:text-cream/30" />
          </>
        ) : (
          <div className="prose-site min-h-[300px] bg-cream p-6 text-olive-950">
            {value.trim() ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown> : <p className="opacity-50">Nothing to preview yet.</p>}
          </div>
        )}
      </div>
      <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) insertImage(f); e.target.value = ""; }} />
    </div>
  );
}
