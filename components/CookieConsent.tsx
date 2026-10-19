"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CloseIcon, CookieIcon } from "@/components/icons";
import { CONSENT_EVENT, CONSENT_KEY, type ConsentCategory, type ConsentState } from "@/lib/consent";

// Texty převzaté z původní cookie lišty (CookieYes) na partypack.cz.
const TEXT = {
  title: "Záleží nám na vašem soukromí",
  description:
    "Pomocí cookies vylepšujeme příjemnost prohlížení, nabízíme na míru přizpůsobené reklamy či obsah a analyzujeme návštěvnost stránky. Kliknutím na „Přijmout vše“ vyjadřujete souhlas s tím, jak cookies používáme.",
  accept: "Přijmout vše",
  reject: "Odmítnout",
  customize: "Přizpůsobit",
  revisit: "Předvolby souhlasu",
  preferenceTitle: "Upravit předvolby souhlasu",
  preferenceDescription: [
    "Pomocí cookies vám umožňujeme efektivně se pohybovat po stránce a využívat některé funkce. Detailní informace o všech cookies najdete níže v jednotlivých kategoriích souhlasu.",
    "Cookies označené jako „Nezbytné“ se ukládají ve vašem prohlížeči, protože jsou nutné ke zpřístupnění základních funkcí stránky. Používáme také cookies třetí strany, které nám umožňují analyzovat, jak tuto stránku využíváte, ukládat vaše předvolby a poskytovat vám obsah a reklamy, které jsou pro vás relevantní. Tyto cookies se budou ukládat ve vašem prohlížeči výhradně až poté, co to odsouhlasíte. Můžete se rozhodnout, že některé nebo veškeré tyto cookies zapnete či vypnete, ale vypnutí některých z nich může mít vliv na vaše prohlížení.",
  ],
  alwaysEnabled: "Vždy aktivní",
  save: "Uložit moje předvolby",
  close: "Zavřít",
  showMore: "Zobrazit více",
  showLess: "Zobrazit méně",
  enable: "Umožnit",
  disable: "Zakázat",
};

const CATEGORIES: { key: "necessary" | ConsentCategory; title: string; description: string }[] = [
  {
    key: "necessary",
    title: "Nezbytné",
    description:
      "Nezbytné soubory cookie jsou zásadní pro základní funkce webu a web bez nich nebude fungovat zamýšleným způsobem. Tyto soubory cookie neukládají žádná osobní identifikační data.",
  },
  {
    key: "functional",
    title: "Funkční",
    description:
      "Funkční soubory cookie pomáhají provádět určité funkce, jako je sdílení obsahu webových stránek na platformách sociálních médií, shromažďování zpětných vazeb a další funkce třetích stran.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Analytické soubory cookie se používají k pochopení interakce návštěvníků s webem. Tyto soubory cookie pomáhají poskytovat informace o metrikách počet návštěvníků, míru okamžitého opuštění, zdroj provozu atd.",
  },
  {
    key: "performance",
    title: "Výkon",
    description:
      "Výkonnostní cookies se používají k pochopení a analýze klíčových indexů výkonu webu, což pomáhá zajistit lepší uživatelský komfort pro návštěvníky.",
  },
  {
    key: "advertisement",
    title: "Reklama",
    description:
      "Soubory cookie reklamy se používají k doručování návštěvníků přizpůsobenými reklamami na základě stránek, které navštívili dříve, a k analýze účinnosti reklamní kampaně.",
  },
];

type Choice = Record<ConsentCategory, boolean>;
const NONE: Choice = { functional: false, analytics: false, performance: false, advertisement: false };
const ALL: Choice = { functional: true, analytics: true, performance: true, advertisement: true };

// Záloha pro prohlížeče, kde localStorage nefunguje (anonymní okno apod.).
let memoryConsent = "";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_EVENT, onChange);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function parse(raw: string): ConsentState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function persist(choice: Choice) {
  const state: ConsentState = { v: 1, necessary: true, updatedAt: new Date().toISOString(), ...choice };
  const raw = JSON.stringify(state);
  memoryConsent = raw;
  try {
    window.localStorage.setItem(CONSENT_KEY, raw);
  } catch {
    // localStorage nedostupné – stav zůstane v paměti do zavření stránky
  }

  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  const v = (b: boolean) => (b ? "granted" : "denied");
  w.gtag?.("consent", "update", {
    functionality_storage: v(choice.functional),
    personalization_storage: v(choice.functional),
    analytics_storage: v(choice.analytics),
    ad_storage: v(choice.advertisement),
    ad_user_data: v(choice.advertisement),
    ad_personalization: v(choice.advertisement),
  });
  w.dataLayer?.push({ event: "cookie_consent_update", cookie_consent: state });
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function CookieConsent() {
  // null = server / hydratace, "" = bez souhlasu, jinak uložený JSON
  const raw = useSyncExternalStore<string | null>(subscribe, getSnapshot, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<Choice>(NONE);

  if (raw === null) return null;
  const stored = parse(raw);

  const openSettings = () => {
    setDraft(stored ? pick(stored) : NONE);
    setSettingsOpen(true);
  };
  const decide = (choice: Choice) => {
    persist(choice);
    setSettingsOpen(false);
  };

  return (
    <>
      {!stored && !settingsOpen ? (
        <div
          role="region"
          aria-label={TEXT.title}
          className="fixed inset-x-3 bottom-3 z-[55] rounded-lg border border-line bg-white p-5 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-300 starting:translate-y-3 starting:opacity-0 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[420px] sm:p-6"
        >
          <p className="text-base font-semibold">{TEXT.title}</p>
          <p className="mt-2 text-sm leading-relaxed">{TEXT.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => decide(ALL)} className={btnPrimary}>
              {TEXT.accept}
            </button>
            <button type="button" onClick={() => decide(NONE)} className={btnSecondary}>
              {TEXT.reject}
            </button>
            <button type="button" onClick={openSettings} className={btnText}>
              {TEXT.customize}
            </button>
          </div>
        </div>
      ) : null}

      {stored && !settingsOpen ? (
        <button
          type="button"
          onClick={openSettings}
          aria-label={TEXT.revisit}
          className="group fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.22)] ring-1 ring-black/5 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:bottom-5 sm:left-5"
        >
          <CookieIcon className="h-6 w-6" />
          <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
            {TEXT.revisit}
          </span>
        </button>
      ) : null}

      {settingsOpen ? (
        <Preferences
          draft={draft}
          setDraft={setDraft}
          onClose={() => setSettingsOpen(false)}
          onSave={() => decide(draft)}
          onAcceptAll={() => decide(ALL)}
          onRejectAll={() => decide(NONE)}
        />
      ) : null}
    </>
  );
}

function pick(s: ConsentState): Choice {
  return {
    functional: Boolean(s.functional),
    analytics: Boolean(s.analytics),
    performance: Boolean(s.performance),
    advertisement: Boolean(s.advertisement),
  };
}

const btnBase =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
const btnPrimary = `${btnBase} bg-ink text-white hover:bg-zinc-800`;
const btnSecondary = `${btnBase} border border-ink bg-white text-ink hover:bg-paper-soft`;
const btnText = `${btnBase} px-2 text-ink underline underline-offset-4 hover:decoration-2`;

function Preferences({
  draft,
  setDraft,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: {
  draft: Choice;
  setDraft: (c: Choice) => void;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) {
  const [more, setMore] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 transition-opacity duration-200 starting:opacity-0 sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-pref-title"
        className="flex max-h-[90svh] w-full flex-col rounded-t-lg bg-white text-ink shadow-2xl outline-none sm:max-w-xl sm:rounded-lg"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <h2 id="cookie-pref-title" className="text-lg font-semibold">
            {TEXT.preferenceTitle}
          </h2>
          <button type="button" onClick={onClose} aria-label={TEXT.close} className="-mr-2 inline-flex h-10 w-10 items-center justify-center">
            <CloseIcon size="sm" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{TEXT.preferenceDescription[0]}</p>
            {more ? <p>{TEXT.preferenceDescription[1]}</p> : null}
          </div>
          <button type="button" onClick={() => setMore((m) => !m)} className="mt-2 text-sm font-medium underline underline-offset-4">
            {more ? TEXT.showLess : TEXT.showMore}
          </button>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {CATEGORIES.map((c) => {
              const locked = c.key === "necessary";
              const on = locked ? true : draft[c.key as ConsentCategory];
              return (
                <li key={c.key} className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{c.title}</p>
                    {locked ? (
                      <span className="text-sm font-medium">{TEXT.alwaysEnabled}</span>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={`${on ? TEXT.disable : TEXT.enable}: ${c.title}`}
                        onClick={() => setDraft({ ...draft, [c.key]: !on })}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                          on ? "bg-ink" : "bg-zinc-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                            on ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{c.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button type="button" onClick={onRejectAll} className={btnSecondary}>
            {TEXT.reject}
          </button>
          <button type="button" onClick={onSave} className={btnSecondary}>
            {TEXT.save}
          </button>
          <button type="button" onClick={onAcceptAll} className={btnPrimary}>
            {TEXT.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
