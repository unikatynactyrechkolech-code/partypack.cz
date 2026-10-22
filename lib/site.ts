export const R2_BASE = "https://pub-32c9b24c8e42465eb3608a2e395531b5.r2.dev";

export const site = {
  name: "PARTYPACK",
  tagline: "Balíček služeb na vaše akce",
  phone: "+420 720 448 660",
  phoneHref: "tel:+420720448660",
  email: "info@partypack.cz",
  address: "Mandloňová 1175/16, Praha 9 Hrdlořezy",
  facebook: "https://www.facebook.com/partypackcz",
  instagram: "https://www.instagram.com/partypack_cz/",
  instagramHandle: "@Partypack_cz",
  // Dokumenty jsou na R2 pod původní cestou z wp-content/uploads, aby fungovaly i po přepnutí domény.
  termsUrl: `${R2_BASE}/2025/04/VOP-Partypack.pages`,
  privacyUrl: `${R2_BASE}/2025/07/Zasady-o-zpracovani-osobnich-udaju-Partypack.pdf`,
};

/** Hlavní služby – v menu velkým písmem. */
export const primaryNav = [
  { href: "/fotokoutek", label: "Fotokoutek" },
  { href: "/ai-fotokoutek", label: "AI fotokoutek" },
  { href: "/hostesky", label: "Hostesky" },
  { href: "/partyspin360", label: "Partyspin 360°" },
  { href: "/ai-draw-bot", label: "AI Draw Bot" },
];

/** Ostatní stránky – v menu menším písmem. */
export const secondaryNav = [
  { href: "/galerie", label: "Galerie" },
  { href: "/pozadi", label: "Pozadí" },
  { href: "/dalsisluzby", label: "Další služby" },
  { href: "/cena", label: "Cena" },
  { href: "/kontakt", label: "Kontakt" },
];

export const nav = [...primaryNav, ...secondaryNav];
