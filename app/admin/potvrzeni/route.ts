import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { sessionClient } from "@/lib/supabase/server";

/**
 * Sem vede odkaz z potvrzovacího e-mailu. Potvrdí e-mail a rovnou přihlásí.
 * Když přihlášení nejde (odkaz otevřený v jiném prohlížeči), e-mail už je potvrzený
 * a stačí se přihlásit heslem.
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  if (sp.get("error") || sp.get("error_description")) redirect("/admin/prihlaseni?error=odkaz");
  if (!isSupabaseConfigured()) redirect("/admin/prihlaseni");

  const supabase = await sessionClient();
  const code = sp.get("code");
  const tokenHash = sp.get("token_hash");
  const type = sp.get("type") as EmailOtpType | null;

  if (!code && !(tokenHash && type)) redirect("/admin/prihlaseni");

  let ok = false;
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  }
  redirect(ok ? "/admin" : "/admin/prihlaseni?potvrzeno=1");
}
