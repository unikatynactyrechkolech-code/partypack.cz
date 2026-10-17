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

## Kontaktní formulář

Formulář odesílá data na `app/api/contact/route.ts`. Pokud je nastavená proměnná `CONTACT_WEBHOOK_URL`
(viz `.env.example`), route handler data přepošle na tento webhook. Bez ní se odeslání pouze zaloguje.

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
| `/galerie` | Galerie posledních akcí (odkazy na alba na Zonerama) |
| `/pozadi`, `/specialni-pozadi`, `/tistena-pozadi-4` | Nabídka pozadí |
| `/dalsisluzby` | Další služby |
| `/cena` | Ceník, FAQ, plesové balíčky |
| `/kontakt` | Kontakt, formulář, tým |
