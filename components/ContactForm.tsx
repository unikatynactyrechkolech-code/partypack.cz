"use client";

import { useState, type FormEvent } from "react";

const products = [
  "Fotokoutek",
  "Hostesky",
  "AI fotokoutek",
  "AI Draw Bot",
  "360 Partyspin",
  "Něco jiného?",
];

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const labelCls = `text-xs font-semibold uppercase tracking-[0.15em] ${
    dark ? "text-white/70" : "text-muted"
  }`;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-2">
        <label htmlFor="name" className={labelCls}>
          Jméno*
        </label>
        <input id="name" name="name" required maxLength={400} className={inputCls} autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className={labelCls}>
          Váš email*
        </label>
        <input id="email" name="email" type="email" required maxLength={400} className={inputCls} autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className={labelCls}>
          Váš telefon*
        </label>
        <input id="phone" name="phone" type="tel" required maxLength={400} className={inputCls} autoComplete="tel" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="source" className={labelCls}>
          Kde jste na nás narazili?*
        </label>
        <input id="source" name="source" required maxLength={400} className={inputCls} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="product" className={labelCls}>
          O jaký produkt máte zájem?*
        </label>
        <select id="product" name="product" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Vyberte
          </option>
          {products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="message" className={labelCls}>
          Datum akce + vaše zpráva
        </label>
        <textarea id="message" name="message" rows={6} maxLength={2000} className={inputCls} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-lg bg-ink px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
        >
          {status === "sending" ? "Odesílám…" : "Odeslat"}
        </button>
        {status === "sent" ? (
          <p className={`text-sm ${dark ? "text-white/80" : "text-ink-soft"}`}>
            Děkujeme, zpráva byla odeslána.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600">
            Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište na info@partypack.cz.
          </p>
        ) : null}
      </div>
    </form>
  );
}
