# PARTYPACK – web

Modernizovaná verze webu [partypack.cz](https://partypack.cz) postavená na Next.js (App Router) a Tailwind CSS.
Texty a struktura stránek odpovídají původnímu webu, změnil se pouze design.

## Spuštění

```bash
npm install
npm run dev
```

Web běží na http://localhost:3000.

Produkční build:

```bash
npm run build
npm start
```

## Obrázky

Všechny obrázky původního webu byly staženy, zkonvertovány do WebP (max. 2000 px na delší straně, kvalita 82)
a nahrány do Cloudflare R2 bucketu `partypack`. Veřejně jsou dostupné na:

```
https://pub-32c9b24c8e42465eb3608a2e395531b5.r2.dev/<rok>/<měsíc>/<název>.webp
```

Cesty kopírují strukturu `wp-content/uploads` původního webu (např. `2024/04/Partypack-35.webp`).
Rozměry všech obrázků jsou v `lib/media.json`, komponenta `components/Img.tsx` z nich skládá `next/image`.
Seznamy (AI filtry, pozadí, partneři, galerie) jsou v `lib/data.ts`.

## Databáze (Supabase), galerie a poptávky

Web používá vlastní schéma `partypack` ve sdílené databázi Supabase, takže v jednom projektu
může být víc webů. Dokud nejsou klíče nastavené, galerie ukazuje 36 akcí uložených v kódu
a administrace zobrazí návod.

### Zapojení krok za krokem

1. **SQL schéma:** v Supabase → SQL Editor spusťte celý soubor `supabase/migrations/0001_partypack.sql`.
2. **Import akcí:** stejně spusťte `supabase/seed/events.sql` (1099 akcí z původního webu včetně
   služby, typu akce, odkazu na Zoneramu a úvodní fotky, která už je v R2). Lze spustit opakovaně.
3. **Zpřístupnit schéma:** Project Settings → Data API → Exposed schemas → přidat `partypack`.
4. **Administrátor:** Authentication → Users → Add user (e-mail + heslo, zaškrtnout Auto Confirm).
   Pak v SQL Editoru: `insert into partypack.admins (email) values ('vas@email.cz');`
   (e-mail malými písmeny).
5. **Proměnné prostředí:** vyplňte `.env.local` (lokálně) a stejné hodnoty ve Vercelu
   (Project → Settings → Environment Variables), pak nové nasazení. Vzor je v `.env.example`.

| Proměnná | Kde ji najdete |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | tamtéž, anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | tamtéž, service_role / secret key (jen na server, nikdy do prohlížeče) |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET` | Cloudflare → R2 → Manage API Tokens |
| `RESEND_API_KEY` | resend.com → API Keys |
| `INQUIRY_TO_EMAIL` | kam chodí poptávky (výchozí info@partypack.cz) |
| `INQUIRY_FROM_EMAIL` | odesílatel na doméně ověřené v Resend, např. `Partypack web <poptavky@partypack.cz>` |

### Administrace

Na adrese `/admin` (přihlášení e-mailem a heslem ze Supabase Auth):

- **Akce:** seznam všech akcí s hledáním, přidání a úprava akce (název, adresa, datum, služba,
  typ akce, odkaz na Zoneramu, popis, úvodní fotka, zobrazit/skrýt), smazání.
  Fotka se v prohlížeči zmenší a na serveru převede do WebP a nahraje do R2.
- **Poptávky:** všechny odeslané poptávky se stavem Nová / Řeší se / Hotovo.

Přístup hlídá databáze (Row Level Security): veřejnost čte jen publikované akce,
poptávky a úpravy smí jen e-maily v tabulce `partypack.admins`.

### Poptávky

Formulář odesílá na `app/api/contact/route.ts`. Poptávka se uloží do `partypack.inquiries`
a zároveň odejde e-mailem přes Resend (odpovědí se píše rovnou zákazníkovi). Volitelně ji
lze poslat i na webhook (`CONTACT_WEBHOOK_URL`). Proti spamu je skryté pole a minimální
doba vyplnění. Na produkci bez nastaveného kanálu formulář vrátí chybu, aby se poptávky
neztrácely potichu.

### Galerie a stránky akcí

- `/galerie` – stránkování po 24 akcích a filtry podle služby a typu akce.
- `/portfolio/[slug]` – stránka akce na stejné adrese jako na původním webu (Google je má
  zaindexované), s odkazem na celou galerii a dalšími akcemi. Akce jsou i v `sitemap.xml`.
- Staré stránkování `/galerie/page/N` se přesměrovává na `/galerie?strana=N`.

## Struktura stránek

| Cesta | Obsah |
| --- | --- |
| `/` | Úvod, služby, statistiky, partneři, kontakt |
| `/fotokoutek` | Fotokoutek \| GIFy (Partysnap) |
| `/ai-fotokoutek` | Fotokoutek s AI |
| `/ai-filtry`, `/skupinove-ai-filtry` | Nabídka AI filtrů |
| `/hostesky` | Hostesky, modelky, promotéři |
| `/partyspin360` | Partyspin 360° |
| `/ai-draw-bot` | AI Draw Bot |
| `/galerie` | Galerie akcí z databáze, filtry a stránkování |
| `/portfolio/[slug]` | Stránka jedné akce (původní adresy z WordPressu) |
| `/admin` | Administrace akcí a poptávek |
| `/pozadi`, `/specialni-pozadi`, `/tistena-pozadi-4` | Nabídka pozadí |
| `/dalsisluzby` | Další služby |
| `/cena` | Ceník, FAQ, plesové balíčky |
| `/kontakt` | Kontakt, formulář, tým |
