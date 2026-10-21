import Link from "next/link";
import { Img } from "@/components/Img";
import { Glow } from "@/components/sections";
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

const heading = "text-[17px] font-semibold text-white";
const linkCls = "text-[15px] text-white hover:text-[#00b1ff]";

/**
 * Tmavá patička: sloupce Služby, Partypack a Kontakt, pod čarou velké logo, dokumenty a sítě,
 * úplně dole ©.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <Glow variant="footer" />
      <div className="mx-auto w-full max-w-7xl px-5 pt-14 pb-12 sm:px-8 lg:pt-16">
        <nav aria-label="Patička" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-8">
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
        <div className="border-t border-white/15 py-8 text-sm">© {new Date().getFullYear()} Partypack.cz</div>
      </div>
    </footer>
  );
}
