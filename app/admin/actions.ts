"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { adminClient } from "@/lib/admin";
import { isR2Configured, uploadImageAsWebp } from "@/lib/r2";
import { isEventTypeValue, isServiceValue } from "@/lib/services";
import { slugify } from "@/lib/slug";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { sessionClient } from "@/lib/supabase/server";
import { RPC, T } from "@/lib/supabase/tables";

export type FormState = { error?: string; fieldErrors?: Record<string, string> };
export type AuthState = FormState & { done?: boolean; unconfirmed?: boolean; email?: string; notice?: string };

const s = (fd: FormData, k: string, max = 2000) => String(fd.get(k) ?? "").trim().slice(0, max);

async function confirmRedirect() {
  const h = await headers();
  const origin = h.get("origin") ?? `https://${h.get("host") ?? "partypack.cz"}`;
  return `${origin}/admin/potvrzeni`;
}

export async function signIn(_prev: AuthState, fd: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: "Supabase zatím není nastavené." };
  const email = s(fd, "email", 320).toLowerCase();
  const password = String(fd.get("password") ?? "");
  if (!email || !password) return { error: "Vyplňte e-mail i heslo." };
  const supabase = await sessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed" || /not confirmed/i.test(error.message)) {
      return {
        error: "E-mail ještě není potvrzený. Otevřete odkaz z e-mailu, který přišel po nastavení hesla, a podívejte se i do spamu.",
        unconfirmed: true,
        email,
      };
    }
    return { error: "Nesprávný e-mail nebo heslo." };
  }
  redirect("/admin");
}

/** Znovu pošle odkaz pro potvrzení e-mailu, jen pro e-maily s přístupem do administrace. */
export async function resendConfirmation(_prev: AuthState, fd: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: "Supabase zatím není nastavené." };
  const email = s(fd, "email", 320).toLowerCase();
  if (!email) return { error: "Chybí e-mail." };
  const supabase = await sessionClient();
  const { data: allowed } = await supabase.rpc(RPC.canRegister, { p_email: email });
  if (allowed !== true) return { error: "Tento e-mail nemá do administrace přístup." };
  const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: await confirmRedirect() } });
  if (error) {
    console.error("[admin] resend failed:", error.message);
    return { error: "Odkaz se nepodařilo poslat. Zkuste to za minutu znovu." };
  }
  return { notice: `Odkaz jsme poslali znovu na ${email}.` };
}

/** Nastavení hesla pro e-mail, který je v partypack_admins (bez zakládání účtu v Supabase). */
export async function register(_prev: AuthState, fd: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: "Supabase zatím není nastavené." };
  const email = s(fd, "email", 320).toLowerCase();
  const password = String(fd.get("password") ?? "");
  const password2 = String(fd.get("password2") ?? "");
  if (!email) return { error: "Vyplňte e-mail." };
  if (password.length < 8) return { error: "Heslo musí mít aspoň 8 znaků." };
  if (password !== password2) return { error: "Hesla se neshodují." };
  const supabase = await sessionClient();
  const { data: allowed, error: rpcError } = await supabase.rpc(RPC.canRegister, { p_email: email });
  if (rpcError) {
    console.error("[admin] can_register failed:", rpcError.message);
    return { error: "Databáze zatím není připravená. Zkuste to prosím později." };
  }
  if (allowed !== true) return { error: "Tento e-mail nemá do administrace přístup." };
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: await confirmRedirect() } });
  if (error) {
    if (/already registered|already exists/i.test(error.message)) {
      return { error: "Účet s tímto e-mailem už existuje. Přihlaste se jeho heslem." };
    }
    return { error: "Účet se nepodařilo vytvořit: " + error.message };
  }
  // Supabase u už potvrzeného účtu nevrací chybu, jen uživatele bez identit. Heslo se v tom případě nemění.
  if (data.user && (data.user.identities?.length ?? 0) === 0) {
    return { error: "Účet s tímto e-mailem už existuje. Přihlaste se heslem, které jste si nastavili dřív." };
  }
  if (data.session) redirect("/admin");
  return { done: true, email };
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await sessionClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/prihlaseni");
}

function revalidateEvent(...slugs: (string | null | undefined)[]) {
  revalidatePath("/galerie");
  revalidatePath("/fotokoutek");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  for (const slug of slugs) if (slug) revalidatePath(`/portfolio/${slug}`);
}

export async function saveEvent(_prev: FormState, fd: FormData): Promise<FormState> {
  const supabase = await adminClient();
  if (!supabase) return { error: "Nemáte oprávnění. Přihlaste se prosím znovu." };

  const id = s(fd, "id", 64) || null;
  const title = s(fd, "title", 200);
  const slug = slugify(s(fd, "slug", 120) || title);
  const eventDate = s(fd, "event_date", 10);
  const service = s(fd, "service", 40);
  const eventType = s(fd, "event_type", 40);
  const albumUrl = s(fd, "album_url", 500);
  const description = s(fd, "description", 2000);
  const published = fd.get("published") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = "Vyplňte název akce.";
  if (!slug) fieldErrors.slug = "Adresa nesmí být prázdná.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) fieldErrors.event_date = "Vyplňte datum akce.";
  if (service && !isServiceValue(service)) fieldErrors.service = "Neznámá služba.";
  if (eventType && !isEventTypeValue(eventType)) fieldErrors.event_type = "Neznámý typ akce.";
  if (albumUrl && !/^https?:\/\//i.test(albumUrl)) fieldErrors.album_url = "Odkaz musí začínat https://";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const row: Record<string, unknown> = {
    title,
    slug,
    event_date: eventDate,
    service: service || null,
    event_type: eventType || null,
    album_url: albumUrl || null,
    description: description || null,
    published,
  };

  const cover = fd.get("cover");
  if (cover instanceof File && cover.size > 0) {
    if (!cover.type.startsWith("image/")) return { fieldErrors: { cover: "Nahrajte prosím obrázek." } };
    if (cover.size > 15 * 1024 * 1024) return { fieldErrors: { cover: "Obrázek je příliš velký (max. 15 MB)." } };
    if (!isR2Configured()) return { error: "Úložiště obrázků (Cloudflare R2) není nastavené." };
    try {
      const year = eventDate.slice(0, 4);
      const rand = Math.random().toString(36).slice(2, 8);
      const up = await uploadImageAsWebp(Buffer.from(await cover.arrayBuffer()), `akce/${year}/${slug}-${rand}`);
      row.cover_key = up.key;
      row.cover_w = up.width;
      row.cover_h = up.height;
    } catch (e) {
      console.error("[admin] upload failed:", e);
      return { fieldErrors: { cover: "Obrázek se nepodařilo zpracovat. Zkuste jiný soubor." } };
    }
  }

  let previousSlug: string | null = null;
  if (id) {
    const { data: prev } = await supabase.from(T.events).select("slug").eq("id", id).maybeSingle();
    previousSlug = (prev as { slug: string } | null)?.slug ?? null;
    const { error } = await supabase.from(T.events).update(row).eq("id", id);
    if (error) return dbError(error);
  } else {
    const { error } = await supabase.from(T.events).insert(row);
    if (error) return dbError(error);
  }

  revalidateEvent(slug, previousSlug);
  redirect("/admin?ulozeno=1");
}

function dbError(error: { code?: string; message: string }): FormState {
  if (error.code === "23505") return { fieldErrors: { slug: "Akce s touto adresou už existuje. Upravte adresu." } };
  console.error("[admin] db error:", error.message);
  return { error: "Uložení se nepovedlo: " + error.message };
}

export async function deleteEvent(fd: FormData) {
  const supabase = await adminClient();
  if (!supabase) redirect("/admin/prihlaseni");
  const id = s(fd, "id", 64);
  const { data } = await supabase.from(T.events).select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from(T.events).delete().eq("id", id);
  if (error) {
    console.error("[admin] delete failed:", error.message);
    redirect(`/admin/akce/${id}?chyba=1`);
  }
  revalidateEvent((data as { slug: string } | null)?.slug);
  redirect("/admin?smazano=1");
}

const INQUIRY_STATUSES = ["nova", "resi-se", "hotovo"] as const;

export async function setInquiryStatus(fd: FormData) {
  const supabase = await adminClient();
  if (!supabase) redirect("/admin/prihlaseni");
  const id = s(fd, "id", 64);
  const status = s(fd, "status", 20);
  if (!(INQUIRY_STATUSES as readonly string[]).includes(status)) return;
  const { error } = await supabase.from(T.inquiries).update({ status }).eq("id", id);
  if (error) console.error("[admin] status update failed:", error.message);
  revalidatePath("/admin/poptavky");
}
