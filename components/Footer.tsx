import Link from "next/link";
import { BrandShape } from "@/components/BrandShape";
import { Img } from "@/components/Img";
import { SocialLinks } from "@/components/icons";
import { primaryNav, site } from "@/lib/site";

const LOGO = "2022/01/cropped-cropped-logo-znak-png-male";

const columns = [
  { title: "Služby", links: [...primaryNav, { href: "/dalsisluzby", label: "Další služby" }] },
  {
    title: "Partypack",
    links: [
      { href: "/galerie", label: "Galerie" },
      { href: "/pozadi", label: "Pozadí" },
      { href: "/cena", label: "Ceník" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
];

const heading = "text-[17px] font-medium text-white";
const linkCls = "text-[15px] text-white hover:text-[#00b1ff]";

/**
 * Tmavá patička: vlevo výzva k poptávce, vpravo sloupce Služby, Partypack a Kontakt.
 * Pod čarou velké logo, dokumenty a sítě, úplně dole ©. Dva tvary z čáry loga pro oživení.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-ink text-white">

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-14 pb-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div className="relative lg:col-span-5">
          {/* Tvar z čáry loga ve volném místě pod výzvou (jen na počítači). */}
          <BrandShape kind="zigzag" id="footer-zigzag" rotate={10} className="-z-10 top-[62%] right-[14%] hidden w-28 opacity-90 lg:block" />
          <p className={heading}>Plánujete akci?</p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-pretty">
            Napište nám datum a představu o akci. Ozveme se vám co nejdříve a sestavíme balíček na míru.
          </p>
          <Link
            href="/kontakt"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#3a7dff] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#2f6df6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Chci akci
          </Link>
        </div>

        <nav aria-label="Patička" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
          {columns.map((c) => (
            <div key={c.title}>
              <p className={heading}>{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <p className={heading}>Kontakt</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a href={site.phoneHref} className={linkCls}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={linkCls}>
                  {site.email}
                </a>
              </li>
              <li className="max-w-[14rem] text-pretty">{site.address}</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-t border-white/15 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <Link href="/" aria-label="PARTYPACK – domů" className="inline-flex">
              <Img k={LOGO} alt="PARTYPACK" className="h-11 w-auto" sizes="160px" />
            </Link>
            <div className="flex flex-col gap-3 text-[15px] sm:flex-row sm:gap-10">
              <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Všeobecné obchodní podmínky
              </a>
              <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Zásady o zpracování osobních údajů
              </a>
            </div>
          </div>
          <SocialLinks facebook={site.facebook} instagram={site.instagram} shape="plain" iconClassName="h-6 w-6" />
        </div>
        <div className="relative border-t border-white/15 py-8 text-sm">
          © {new Date().getFullYear()} Partypack.cz
          <BrandShape kind="ring" id="footer-ring" delay={2} className="-z-10 top-1/2 right-2 w-12 -translate-y-1/2 opacity-80 sm:w-14" />
        </div>
      </div>
    </footer>
  );
}
