import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { sessionClient } from "@/lib/supabase/server";

export type AdminStatus =
  | { state: "not-configured" }
  | { state: "signed-out" }
  | { state: "forbidden"; email: string }
  | { state: "ok"; email: string };

/** Zjistí, kdo je přihlášený a jestli je v tabulce partypack.admins. */
export const getAdminStatus = cache(async (): Promise<AdminStatus> => {
  // Administrace se vždy vykresluje až na požadavek (nikdy staticky při buildu).
  await connection();
  if (!isSupabaseConfigured()) return { state: "not-configured" };
  const supabase = await sessionClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  if (!email) return { state: "signed-out" };
  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error) console.error("[admin] is_admin failed:", error.message);
  return isAdmin === true ? { state: "ok", email } : { state: "forbidden", email };
});

/** Pro stránky administrace: true jen pro přihlášeného admina (layout zobrazí důvod jinak). */
export async function isAdminRequest() {
  return (await getAdminStatus()).state === "ok";
}

/** Pro server actions: vrátí přihlášeného klienta, nebo null, pokud uživatel není admin. */
export async function adminClient() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await sessionClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return null;
  const { data: isAdmin } = await supabase.rpc("is_admin");
  return isAdmin === true ? supabase : null;
}
