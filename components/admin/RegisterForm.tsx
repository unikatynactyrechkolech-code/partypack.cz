"use client";

import { useActionState } from "react";
import { register, type AuthState } from "@/app/admin/actions";

const input = "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

export function RegisterForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(register, {});
  if (state.done) {
    return (
      <p className="text-sm leading-relaxed" role="status">
        Heslo je nastavené. Na {state.email} jsme poslali odkaz pro potvrzení e-mailu. Bez potvrzení se nepřihlásíte. Když e-mail nevidíte, podívejte se do spamu.
      </p>
    );
  }
  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium">
        E-mail
        <input name="email" type="email" required autoComplete="username" className={input} />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Nové heslo (aspoň 8 znaků)
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={input} />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Heslo znovu
        <input name="password2" type="password" required minLength={8} autoComplete="new-password" className={input} />
      </label>
      {state.error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {pending ? "Ukládám…" : "Nastavit heslo"}
      </button>
    </form>
  );
}
