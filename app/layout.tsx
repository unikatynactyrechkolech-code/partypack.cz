import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { consentDefaultScript } from "@/lib/consent";
import { JsonLd } from "@/components/JsonLd";
import { OG_IMAGE, SITE_URL, seo } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.home.title,
    template: "%s | Partypack",
  },
  description: seo.home.description,
  applicationName: "Partypack",
  openGraph: {
    siteName: "Partypack",
    locale: "cs_CZ",
    type: "website",
    images: [{ url: OG_IMAGE, width: 2000, height: 1334, alt: "Partypack – fotokoutek a zábava na akce" }],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Partypack",
  description: "Balíček služeb na akce: fotokoutek, AI fotokoutek, Partyspin 360°, AI Draw Bot a hostesky.",
  url: SITE_URL,
  logo: "https://pub-32c9b24c8e42465eb3608a2e395531b5.r2.dev/2022/01/cropped-cropped-logo-znak-png-male.webp",
  image: OG_IMAGE,
  telephone: "+420720448660",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mandloňová 1175/16",
    addressLocality: "Praha 9 – Hrdlořezy",
    addressCountry: "CZ",
  },
  areaServed: { "@type": "Country", name: "Česká republika" },
  sameAs: [site.facebook, site.instagram],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pronájem fotokoutku" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI fotokoutek" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "360° fotokoutek Partyspin" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Draw Bot" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hostesky, promotéři a modelky" } },
  ],
};

// Měření jako na původním webu: Google Tag Manager (v něm Google Analytics).
// Souhlas s cookies řeší vlastní lišta s Google Consent Mode v2 (components/CookieConsent.tsx).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KNHLSBW";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" data-scroll-behavior="smooth" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <JsonLd data={organization} />
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
