"use client";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

export function ImageUploader({ name, defaultValue = "", label }: { name: string; defaultValue?: string; label: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally { setBusy(false); }
  }

  return (
    <div>
      <div className="mb-2 text-sm font-medium text-cream/80">{label}</div>
      <input type="hidden" name={name} value={url} />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) upload(f); }}
        className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[.03]">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="absolute inset-0 size-full object-cover object-top" />
        ) : (
          <button type="button" onClick={() => input.current?.click()} className="flex flex-col items-center gap-2 text-sm text-cream/50 hover:text-accent-400">
            <ImagePlus size={28} /> Click or drop an image here
          </button>
        )}
        {busy && <div className="absolute inset-0 grid place-items-center bg-black/60"><Loader2 className="animate-spin" /></div>}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => input.current?.click()} className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-accent-400 hover:text-accent-400">
          {url ? "Replace image" : "Choose image"}
        </button>
        {url && <button type="button" onClick={() => setUrl("")} className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300"><Trash2 size={14} /> Remove</button>}
      </div>
      {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
    </div>
  );
}
