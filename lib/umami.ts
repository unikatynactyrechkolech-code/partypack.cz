// Měření návštěvnosti v Umami (stats.webpojede.cz). Bez cookies, takže nepotřebuje souhlas z cookie lišty.
// Měří se jen na ostrých doménách, ne na localhostu ani na náhledech z Vercelu.
export const UMAMI_SRC = "https://stats.webpojede.cz/script.js";
export const UMAMI_WEBSITE_ID = "8575b1e2-7231-430f-9b38-8a8d7604b28e";
export const UMAMI_DOMAINS = "partypack.cz,www.partypack.cz,partypackcz.vercel.app";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

/** Událost v Umami. Nikdy neposílá jméno, e-mail ani telefon. Chyba měření nesmí rozbít web. */
export function trackUmami(event: string, data?: Record<string, string | number>) {
  try {
    window.umami?.track(event, data);
  } catch {
    // měření je jen doplněk
  }
}
