import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { consentDefaultScript } from "@/lib/consent";
import { JsonLd } from "@/components/JsonLd";
import { OG_IMAGE, SITE_URL, seo } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" data-scroll-behavior="smooth" className={`${figtree.variable} h-full antialiased`}>
      <head>
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <JsonLd data={organization} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
