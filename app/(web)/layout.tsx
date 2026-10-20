import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { UMAMI_DOMAINS, UMAMI_SRC, UMAMI_WEBSITE_ID } from "@/lib/umami";

// Měření jako na původním webu: Google Tag Manager (v něm Google Analytics a konverze Google Ads).
// Vedle toho Umami (lib/umami.ts) pro jednoduchý přehled návštěv a poptávek.
// Souhlas s cookies řeší vlastní lišta s Google Consent Mode v2 (components/CookieConsent.tsx).
// Administrace (/admin) tuto skupinu nepoužívá, takže se v ní neměří.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KNHLSBW";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} data-domains={UMAMI_DOMAINS} strategy="afterInteractive" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
