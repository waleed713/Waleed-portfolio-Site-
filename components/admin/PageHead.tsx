import Link from "next/link";
import { Plus } from "lucide-react";

export function PageHead({ title, sub, cta }: { title: string; sub?: string; cta?: { href: string; label: string } }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-head text-2xl">{title}</h1>
        {sub && <p className="mt-2 text-cream/55">{sub}</p>}
      </div>
      {cta && <Link href={cta.href} className="btn btn-primary"><Plus size={18} /> {cta.label}</Link>}
    </div>
  );
}
