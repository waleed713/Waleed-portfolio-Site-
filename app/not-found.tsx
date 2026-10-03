import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <div className="font-head text-7xl text-accent-500">404</div>
        <p className="mt-4 text-cream/65">This page doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary mt-8">Back home</Link>
      </div>
    </div>
  );
}
