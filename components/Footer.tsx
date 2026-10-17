import Link from "next/link";
import { Img } from "@/components/Img";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Img
                k="2022/01/cropped-cropped-logo-znak-png-male"
                alt=""
                className="h-6 w-auto"
                sizes="80px"
              />
              <span className="text-sm font-semibold tracking-[0.25em] text-ink">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Služby
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>{site.address}</li>
              <li>
                <a href={site.phoneHref} className="hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-5 text-sm">
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Partypack.cz</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Všeobecné obchodní podmínky
            </a>
            <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Zásady o zpracování osobních údajů
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
