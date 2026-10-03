"use client";
import { useActionState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { login, type FormState } from "@/lib/actions";
import { SubmitButton } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action] = useActionState<FormState, FormData>(login, undefined);
  return (
    <form action={action} className="glass relative w-full max-w-sm rounded-3xl p-8">
      <Image src="/images/brand/logo-footer.png" alt="" width={160} height={54} className="mx-auto h-14 w-auto" />
      <h1 className="font-head mt-8 text-center text-lg">Admin sign in</h1>
      <div className="relative mt-7">
        <Lock size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-cream/40" />
        <input type="password" name="password" required autoFocus placeholder="Password" className="field-input !pl-11" />
      </div>
      {state?.error && <p className="mt-3 text-sm text-red-400">{state.error}</p>}
      <div className="mt-6 [&>button]:w-full"><SubmitButton>Sign in</SubmitButton></div>
    </form>
  );
}
