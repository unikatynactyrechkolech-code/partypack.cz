import Link from "next/link";
import { Img } from "@/components/Img";
import { ArrowUpRightIcon, SocialLinks } from "@/components/icons";
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

const heading = "text-[15px] uppercase text-ink";
const linkCls = "text-[15px] text-ink hover:underline hover:underline-offset-4";

/** Patička: logo s výzvou k poptávce, sloupce odkazů, kontakt a sítě; dole © a dokumenty. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="PARTYPACK – domů" className="inline-flex">
            <Img k={LOGO} alt="PARTYPACK" className="h-8 w-auto" sizes="120px" />
          </Link>
          <p className="mt-6 text-[15px]">{site.tagline}</p>
          <p className="mt-1 max-w-xs text-[15px] text-pretty">Fotokoutky, hostesky a další zábava na firemní akce, svatby i oslavy.</p>
          <Link
            href="/kontakt"
            className="group mt-6 flex max-w-xs items-center justify-between rounded-lg border border-line py-1 pl-4 pr-1 text-[15px] transition-colors hover:border-ink"
          >
            Chci akci
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRightIcon />
            </span>
          </Link>
        </div>

        <nav aria-label="Patička" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:gap-8">
          {columns.map((c) => (
            <div key={c.title}>
              <p className={heading}>{c.title}</p>
              <ul className="mt-5 space-y-2.5">
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
            <ul className="mt-5 space-y-2.5 text-[15px]">
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

        <div className="lg:col-span-2 lg:flex lg:justify-end">
          <SocialLinks facebook={site.facebook} instagram={site.instagram} shape="square" iconClassName="h-[18px] w-[18px]" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Partypack.cz</p>
          <div className="flex flex-col gap-2 md:flex-row md:gap-8">
            <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
              Všeobecné obchodní podmínky
            </a>
            <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
              Zásady o zpracování osobních údajů
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
