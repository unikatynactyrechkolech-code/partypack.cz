import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { consentDefaultScript } from "@/lib/consent";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partypack.cz"),
  title: {
    default: "Partypack - Ta nejlepší zábava na akce",
    template: "%s - PARTYPACK",
  },
  description: "Fotokoutek, virtuální realita a další služby do jednoho Partypacku!",
  openGraph: {
    siteName: "PARTYPACK",
    locale: "cs_CZ",
    type: "website",
  },
};

// Měření jako na původním webu: Google Tag Manager (v něm Google Analytics).
// Souhlas s cookies řeší vlastní lišta s Google Consent Mode v2 (components/CookieConsent.tsx).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KNHLSBW";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" data-scroll-behavior="smooth" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
