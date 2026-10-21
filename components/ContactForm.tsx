"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { INQUIRY_SERVICES } from "@/lib/services";
import { trackUmami } from "@/lib/umami";
import { packageStore, usePackage, type InquiryService } from "@/lib/package";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

type Status = "idle" | "sending" | "sent" | "error" | "missing-service";

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const picked = usePackage();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Služby přidané do poptávky na dlaždicích se tu samy zaškrtnou (a naopak).
  useEffect(() => {
    formRef.current?.querySelectorAll<HTMLInputElement>('input[name="services"]').forEach((input) => {
      input.checked = picked.includes(input.value as InquiryService);
    });
  }, [picked]);

  const syncPicked = () => {
    const form = formRef.current;
    if (!form) return;
    const checked = [...form.querySelectorAll<HTMLInputElement>('input[name="services"]:checked')].map((i) => i.value as InquiryService);
    packageStore.set(checked);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const services = fd.getAll("services").map(String);
    if (services.length === 0) {
      trackUmami("Nedokončená poptávka", { "Důvod": "Nevybraná služba" });
      setStatus("missing-service");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          source: fd.get("source"),
          services,
          message: fd.get("message"),
          web: fd.get("web"),
          page: window.location.pathname,
          elapsed: startedAt.current ? Date.now() - startedAt.current : null,
        }),
      });
      if (!res.ok) {
        trackUmami("Nedokončená poptávka", {
          "Důvod": res.status === 400 ? "Špatně vyplněný formulář" : "Chyba při odesílání",
        });
        setStatus("error");
        return;
      }
      if (!fd.get("web")) {
        trackUmami("Odeslaná poptávka", { "Služby": services.join(", "), "Stránka": window.location.pathname });
      }
      setStatus("sent");
      form.reset();
      packageStore.set([]);
    } catch {
      trackUmami("Nedokončená poptávka", { "Důvod": "Výpadek připojení" });
      setStatus("error");
    }
  }

  const labelCls = `text-xs font-semibold uppercase tracking-[0.15em] ${dark ? "text-white" : "text-ink"}`;
  const f = (name: string) => `${id}-${name}`;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div className="grid gap-2">
        <label htmlFor={f("name")} className={labelCls}>
          Jméno*
        </label>
        <input id={f("name")} name="name" required maxLength={200} className={inputCls} autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor={f("email")} className={labelCls}>
          Váš email*
        </label>
        <input id={f("email")} name="email" type="email" required maxLength={320} className={inputCls} autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <label htmlFor={f("phone")} className={labelCls}>
          Váš telefon*
        </label>
        <input id={f("phone")} name="phone" type="tel" required maxLength={50} className={inputCls} autoComplete="tel" />
      </div>
      <div className="grid gap-2">
        <label htmlFor={f("source")} className={labelCls}>
          Kde jste na nás narazili?*
        </label>
        <input id={f("source")} name="source" required maxLength={200} className={inputCls} />
      </div>

      <fieldset className="grid gap-3 sm:col-span-2">
        <legend className={labelCls}>O jaké služby máte zájem?*</legend>
        <p className={`-mt-1 text-sm ${dark ? "text-white" : "text-ink"}`}>Můžete vybrat více služeb a sestavit si balíček.</p>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_SERVICES.map((s) => (
            <label key={s} className="cursor-pointer">
              <input
                type="checkbox"
                name="services"
                value={s}
                className="peer sr-only"
                onChange={() => {
                  syncPicked();
                  if (status === "missing-service") setStatus("idle");
                }}
              />
              <span className="inline-flex items-center rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent hover:border-ink">
                {s}
              </span>
            </label>
          ))}
        </div>
        {status === "missing-service" ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            Vyberte prosím alespoň jednu službu.
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor={f("message")} className={labelCls}>
          Datum akce + vaše zpráva
        </label>
        <textarea id={f("message")} name="message" rows={6} maxLength={2000} className={inputCls} />
      </div>

      {/* Past na roboty – skryté pole, které člověk nevyplní. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={f("web")}>Web</label>
        <input id={f("web")} name="web" tabIndex={-1} autoComplete="off" />
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
          <p className={`text-sm font-medium ${dark ? "text-white" : "text-ink"}`} role="status">
            Děkujeme, poptávka je odeslaná. Ozveme se vám co nejdříve.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600" role="alert">
            Poptávku se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište na info@partypack.cz.
          </p>
        ) : null}
      </div>
    </form>
  );
}
