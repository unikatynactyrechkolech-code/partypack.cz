"use client";

import { useActionState } from "react";
import { resendConfirmation, signIn, type AuthState } from "@/app/admin/actions";

const input = "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, {});
  const [resent, resend, resending] = useActionState<AuthState, FormData>(resendConfirmation, {});
  return (
    <>
      <form action={action} className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          E-mail
          <input name="email" type="email" required autoComplete="username" className={input} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Heslo
          <input name="password" type="password" required autoComplete="current-password" className={input} />
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
          {pending ? "Přihlašuji…" : "Přihlásit se"}
        </button>
      </form>
      {state.unconfirmed && state.email ? (
        <form action={resend} className="mt-4 grid gap-2">
          <input type="hidden" name="email" value={state.email} />
          <button
            type="submit"
            disabled={resending}
            className="inline-flex items-center justify-center rounded-lg border border-ink px-6 py-3 text-sm font-medium text-ink hover:bg-paper-soft disabled:opacity-60"
          >
            {resending ? "Posílám…" : "Poslat potvrzovací odkaz znovu"}
          </button>
          {resent.notice ? (
            <p className="text-sm" role="status">
              {resent.notice}
            </p>
          ) : null}
          {resent.error ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {resent.error}
            </p>
          ) : null}
        </form>
      ) : null}
    </>
  );
}
