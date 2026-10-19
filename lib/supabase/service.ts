import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SCHEMA, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "./config";

/** Klient se service role klíčem – jen na serveru, obchází RLS. Používá se pro zápis poptávek. */
export function serviceClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    db: { schema: SUPABASE_SCHEMA },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
