import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Section } from "@/components/ui";
import { CtaBand, Steps } from "@/components/sections";

export const metadata: Metadata = {
  title: "AI fotokoutek",
  description: "Staň se kýmkoli, kdekoli a to díky AI! Fotokoutek s umělou inteligencí, až 8 filtrů pro jednotlivce a výběr filtrů pro skupinky.",
  alternates: { canonical: "/ai-fotokoutek" },
};

const steps = [
  { title: "Výběr filtru", text: "Přímo na akci si host vybírá z našich různých AI filtrů svého favorita." },
  { title: "Generování", text: "Po chvilce se vygeneruje výsledný snímek pomocí umělé inteligence." },
  { title: "Tisk a sdílení", text: "Neomezený tisk & sdílení přes QR kód rovnou do mobilů!" },
  { title: "Grafika a galerie", text: "Vlastní grafika do každé fotky. Online galerie hostů po akci do 24h." },
];

const beforeAfter: [string, string][] = [
  ["2024/08/454878840_10228646758811796_1529734258425616764_n", "2025/02/image_1739353633937"],
  ["2024/08/301557972_10209961384586974_2088446339125162929_n", "2024/08/c56d962a-7e90-42d6-8517-cfd1cc873f38"],
  ["2024/08/336092111_718099589959109_1018636651805042301_n", "2024/08/58768807-6935-40bb-bd65-5ecb1af5b9fa"],
];

const features = [
  { title: "Výběr z filtrů", text: "Perfektní AI zážitek! Náš AI fotokoutek vyfotí klasickou fotku, kterou následně přemění do jednoho z našich AI filtrů." },
  { title: "Grafika?", text: "Před každou akcí pro vás připravíme nápis | grafiku do fotografií na míru pro nejlepší marketingovou strategii vašich akcí." },
  { title: "Filtr na míru?", text: "Pokud nenajdete žádný z našich předpřipravených filtrů jako vhodný, napište nám o cenu za filtr na míru." },
  { title: "Co je potřeba zajistit?", text: "Pro správné fungování AI fotokoutku potřebujeme prostor 2x2m a místo, kde je dobrý signál wifi nebo mobilních dat." },
  { title: "Žádné klíčování!", text: "Díky technologii umělé inteligence je každá z našich fotografií unikát. Zvolte filtr a nechte se překvapit." },
  { title: "Tisk a sdílení", text: "Stejně jako u klasického fotokoutku je u nás vždy neomezený tisk po celou dobu akce. Navíc lze fotky sdílet ihned přes QR kód do mobilních zařízení." },
];

export default function AiFotokoutekPage() {
  return (
    <>
      <PageHero
        image="2024/08/foto-AI-web-cenik"
        title="Staň se kýmkoli, kdekoli a to díky AI!"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="/cena" variant="outline">Cena</Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-line p-8">
              <Heading as="h3">Až 8 filtrů!</Heading>
              <p className="mt-4 leading-relaxed text-ink-soft text-pretty">
                Mrkněte na naší bohatou nabídku AI filtrů, které jsou určené pro jednotlivce. Všechny naše
                filtry fungují pro muže, ženy i děti.
              </p>
              <div className="mt-6">
                <Button href="/ai-filtry">Jdeme vybírat</Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line p-8">
              <Heading as="h3">Ještě větší výběr!</Heading>
              <p className="mt-4 leading-relaxed text-ink-soft text-pretty">
                Filtry pro skupiny 2-8 osob není potřeba vybírat dopředu. Na místě lze vybírat ze všech
                dostupných filtrů! Mrkněte se, jaké máme k dispozici.
              </p>
              <div className="mt-6">
                <Button href="/skupinove-ai-filtry">Jdeme mrknout</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <Heading>Jak to funguje?</Heading>
          <div className="mt-10">
            <Steps items={steps} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading>Před &amp; po</Heading>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {beforeAfter.map(([before, after]) => (
              <li key={before} className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-soft">
                  <Img k={before} alt="Před" fill sizes="(min-width: 640px) 16vw, 50vw" className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-soft">
                  <Img k={after} alt="Po" fill sizes="(min-width: 640px) 16vw, 50vw" className="object-cover" />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand image="2025/04/IMG_2202-scaled" title="Cena AI fotokoutku">
        <Button href="/cena" variant="light">Cena</Button>
      </CtaBand>
    </>
  );
}
