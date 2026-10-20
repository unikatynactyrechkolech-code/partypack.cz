// Ověří napojení webu na Supabase (bez vypisování klíčů). Spuštění: npm run db:check
import { createClient } from "@supabase/supabase-js";

const e = process.env;
const url = e.NEXT_PUBLIC_SUPABASE_URL || e.SUPABASE_URL;
const anon = e.NEXT_PUBLIC_SUPABASE_ANON_KEY || e.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || e.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || e.SUPABASE_ANON_KEY || e.SUPABASE_PUBLISHABLE_KEY;
const service = e.SUPABASE_SERVICE_ROLE_KEY || e.SUPABASE_SECRET_KEY || e.SUPABASE_SERVICE_KEY;
const schema = process.env.SUPABASE_SCHEMA || "public";
const ok = (m) => console.log("  OK   ", m);
const bad = (m) => { console.log("  CHYBA", m); process.exitCode = 1; };

if (!url || !anon) {
  bad("Chybí URL nebo anon/publishable klíč Supabase v .env.local");
  process.exit(1);
}
console.log("Supabase projekt:", new URL(url).host, "| schéma:", schema);

const pub = createClient(url, anon, { db: { schema }, auth: { persistSession: false } });
const { count, error } = await pub.from("partypack_events").select("slug", { count: "exact" }).eq("published", true).limit(1);
if (error) {
  if (/partypack_events|relation|schema cache|PGRST205/i.test(error.message + (error.code ?? ""))) bad(`Tabulky Partypacku v databázi zatím nejsou – spusťte SQL ze složky supabase. (${error.message})`);
  else bad("Čtení akcí: " + error.message);
} else ok(`Veřejné čtení akcí funguje, publikovaných akcí: ${count}`);

const { error: insErr } = await pub.from("partypack_inquiries").insert({ name: "x", email: "x@x.cz", phone: "123" });
if (insErr) ok("Anonym nesmí zapisovat poptávky přímo (oprávnění fungují)");
else bad("Anonym smí zapsat poptávku – zkontrolujte RLS!");

const { data: isAdmin, error: adminErr } = await pub.rpc("partypack_is_admin");
if (isAdmin === false) ok("partypack_is_admin() pro nepřihlášeného vrací false");
else bad("partypack_is_admin(): " + (adminErr?.message ?? JSON.stringify(isAdmin)));

if (service) {
  const srv = createClient(url, service, { db: { schema }, auth: { persistSession: false } });
  const { count: n, error: e } = await srv.from("partypack_inquiries").select("id", { count: "exact" }).limit(1);
  if (e) bad("Service role klíč: " + e.message);
  else ok(`Service role klíč funguje, poptávek v databázi: ${n}`);
  const { data: admins, error: ae } = await srv.from("partypack_admins").select("email");
  if (ae) bad("Tabulka admins: " + ae.message);
  else if (admins.length) ok(`Administrátoři: ${admins.length}`);
  else bad("V partypack.admins zatím není žádný administrátor");
} else ok("Tajný klíč není potřeba – poptávky se ukládají přes funkci partypack_submit_inquiry");

console.log(process.exitCode ? "\nNěco je potřeba doladit." : "\nVše v pořádku.");
