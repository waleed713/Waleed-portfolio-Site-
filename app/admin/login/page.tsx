import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="grain relative grid min-h-screen place-items-center overflow-hidden bg-olive-950 px-5">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-accent-500/20 blur-[120px]" />
      <LoginForm />
    </div>
  );
}
