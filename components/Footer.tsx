import { SocialLinks } from "@/components/icons";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-soft text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-5 py-8 text-sm sm:px-8 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Partypack.cz</p>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
            Všeobecné obchodní podmínky
          </a>
          <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
            Zásady o zpracování osobních údajů
          </a>
          <SocialLinks facebook={site.facebook} instagram={site.instagram} iconClassName="h-[18px] w-[18px]" />
        </div>
      </div>
    </footer>
  );
}
