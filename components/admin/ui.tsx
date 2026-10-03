"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-cream/80">
      {label}
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1.5 block text-xs font-normal text-cream/40">{hint}</span>}
    </label>
  );
}

export function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-accent-500 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
      {label}
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
      {pending && <Loader2 size={16} className="animate-spin" />} {children}
    </button>
  );
}

export function ConfirmDelete({ action, label = "Delete" }: { action: () => void | Promise<void>; label?: string }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm("Delete this permanently?")) e.preventDefault(); }}>
      <button type="submit" className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">{label}</button>
    </form>
  );
}
