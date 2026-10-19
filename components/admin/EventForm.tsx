"use client";

import { useActionState, useRef, useState } from "react";
import { saveEvent, type FormState } from "@/app/admin/actions";
import { EVENT_TYPES, SERVICES } from "@/lib/services";
import { slugify } from "@/lib/slug";
import { R2_BASE } from "@/lib/site";

export type EventFormValues = {
  id?: string;
  title: string;
  slug: string;
  event_date: string;
  service: string | null;
  event_type: string | null;
  album_url: string | null;
  description: string | null;
  published: boolean;
  cover_key: string | null;
};

const input = "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

/** Zmenší fotku v prohlížeči (max. 2000 px), aby se vešla do limitu nahrávání. */
async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" }).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const toBlob = (type: string, q: number) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, q));
  let blob = await toBlob("image/webp", 0.9);
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg", 0.9);
  if (!blob) return file;
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type: blob.type });
}

function Field({ label, children, hint, error }: { label: string; children: React.ReactNode; hint?: string; error?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
      {hint ? <span className="text-xs font-normal">{hint}</span> : null}
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}

export function EventForm({ values }: { values: EventFormValues }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});
  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(values.id));
  const [preview, setPreview] = useState<string | null>(values.cover_key ? `${R2_BASE}/${values.cover_key}.webp` : null);
  const [preparing, setPreparing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const err = state.fieldErrors ?? {};

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreparing(true);
    try {
      const small = await shrink(file);
      const dt = new DataTransfer();
      dt.items.add(small);
      if (fileRef.current) fileRef.current.files = dt.files;
      setPreview(URL.createObjectURL(small));
    } finally {
      setPreparing(false);
    }
  }

  return (
    <form action={action} className="grid gap-6 rounded-lg border border-line bg-white p-6 sm:p-8">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field error={err.title} label="Název akce*">
          <input
            name="title"
            required
            maxLength={200}
            className={input}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field error={err.slug} label="Adresa stránky" hint={`partypack.cz/portfolio/${slug || "…"}`}>
          <input
            name="slug"
            maxLength={120}
            className={input}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
          />
        </Field>
        <Field error={err.event_date} label="Datum akce*">
          <input name="event_date" type="date" required defaultValue={values.event_date} className={input} />
        </Field>
        <Field error={err.album_url} label="Odkaz na celou galerii (Zonerama)">
          <input name="album_url" type="url" defaultValue={values.album_url ?? ""} placeholder="https://eu.zonerama.com/…" className={input} />
        </Field>
        <Field error={err.service} label="Služba">
          <select name="service" defaultValue={values.service ?? ""} className={input}>
            <option value="">Neuvedeno</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field error={err.event_type} label="Typ akce">
          <select name="event_type" defaultValue={values.event_type ?? ""} className={input}>
            <option value="">Neuvedeno</option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field error={err.description} label="Popis (nepovinný)">
        <textarea name="description" rows={4} maxLength={2000} defaultValue={values.description ?? ""} className={input} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-[1fr_240px] sm:items-start">
        <Field error={err.cover} label="Úvodní fotka" hint="Fotka se sama zmenší a převede do WebP. Bez nahrání zůstane stávající.">
          <input ref={fileRef} name="cover" type="file" accept="image/*" onChange={onFile} className="text-sm" />
        </Field>
        <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-paper-soft">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Náhled úvodní fotky" className="h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs">Bez fotky</span>
          )}
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input name="published" type="checkbox" defaultChecked={values.published} className="h-4 w-4 accent-black" />
        Zobrazit na webu
      </label>

      {state.error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending || preparing}
          className="inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {pending ? "Ukládám…" : preparing ? "Připravuji fotku…" : "Uložit akci"}
        </button>
      </div>
    </form>
  );
}
