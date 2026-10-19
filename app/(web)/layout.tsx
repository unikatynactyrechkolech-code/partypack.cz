import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

// Měření jako na původním webu: Google Tag Manager (v něm Google Analytics).
// Souhlas s cookies řeší vlastní lišta s Google Consent Mode v2 (components/CookieConsent.tsx).
// Administrace (/admin) tuto skupinu nepoužívá, takže se v ní neměří.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KNHLSBW";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
