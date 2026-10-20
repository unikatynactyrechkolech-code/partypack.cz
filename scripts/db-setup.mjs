// Nahraje schéma partypack a import akcí do Supabase přes přímé připojení k databázi.
// Spuštění: npm run db:setup  (potřebuje DATABASE_URL v .env.local – Supabase → Connect → Session pooler URI)
// Sahá jen na tabulky a funkce s předponou partypack_, tabulky ostatních webů nechává být.
import fs from "node:fs";
import pg from "pg";

const e = process.env;
const url = e.DATABASE_URL || e.SUPABASE_DB_URL || e.DIRECT_URL || e.POSTGRES_URL_NON_POOLING || e.POSTGRES_URL;
if (!url) {
  console.error("Chybí připojení k databázi (DATABASE_URL) v .env.local.");
  process.exit(1);
}
const migration = fs.readFileSync(new URL("../supabase/migrations/0001_partypack.sql", import.meta.url), "utf8");
const seed = fs.readFileSync(new URL("../supabase/seed/events.sql", import.meta.url), "utf8");

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  const before = await client.query("select schema_name from information_schema.schemata order by 1");
  console.log("Schémata v databázi:", before.rows.map((r) => r.schema_name).join(", "));
  await client.query("begin");
  await client.query(migration);
  await client.query(seed);
  await client.query("commit");
  const n = await client.query("select count(*)::int n, count(cover_key)::int covers from public.partypack_events");
  console.log(`Hotovo: partypack_events má ${n.rows[0].n} akcí (${n.rows[0].covers} s fotkou).`);
  if (process.env.ADMIN_EMAIL) {
    await client.query("insert into public.partypack_admins (email) values (lower($1)) on conflict do nothing", [process.env.ADMIN_EMAIL]);
    console.log("Administrátor přidán:", process.env.ADMIN_EMAIL.toLowerCase());
  }
} catch (e) {
  await client.query("rollback").catch(() => {});
  console.error("Chyba, nic se nezměnilo:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
