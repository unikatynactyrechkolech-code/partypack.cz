import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

// Stejné měření jako na původním webu: CookieYes (souhlas s cookies) + Google Tag Manager,
// ve kterém běží Google Analytics. IDs lze přepsat v .env.
const COOKIEYES_ID = process.env.NEXT_PUBLIC_COOKIEYES_ID ?? "6cd7ec8809f3395b620154a2";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KNHLSBW";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" data-scroll-behavior="smooth" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <Script
          id="cookieyes"
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
          strategy="beforeInteractive"
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
