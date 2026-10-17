import type { Metadata } from "next";
import Link from "next/link";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Lead, Prose, Section } from "@/components/ui";
import { Stats } from "@/components/sections";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Partypack - Nejlepší fotokoutek na akci",
  description: "Kolik to u nás stojí? Fotobudka Partysnap od 10 000 Kč, Partyspin 360° od 9 900 Kč, fotobudka s AI od 14 000 Kč, hostesky od 270 Kč / hod., AI Draw Bot od 19 000 Kč.",
  alternates: { canonical: "/cena" },
};

const faq = [
  { q: "Jak moc dopředu je nutné si termín rezervovat?", a: "Samozřejmě čím dříve tím lépe (hlavně na oblíbená data). Nicméně máme k dispozici 12 strojů a jsme schopni pro Vás zajistit akci i když zavoláte den předem:)" },
  { q: "Je možná sleva při výběru více aktivit?", a: "Určitě ano! Pokud si u nás objednáte vícero služeb, rádi Vám připravíme zvýhodněný balíček na míru." },
  { q: "Může akce probíhat ve venkovních prostorách?", a: "Ano samozřejmě. Bude však nutné nás dát pod přístřešek či pod stan. Pokud náhodou stan či přístřešek nebude možné zajistit, poptejte u nás stan. Přijedeme i se stanem:)" },
  { q: "Jsme omezení počtem hostesek / promotérů, které dokážete zajistit?", a: "Nikoli! V případě včasného objednání, zvládneme zajistit i opravdu veliké akce s větším počtem personálu:)" },
];

const packages = [
  { name: "Ples", price: "3000 Kč", lines: ["Ideální pro menší plesy do 500 hostů :)", "Hosté si platí 60 Kč / foto. 10 fotek zdarma pro organizátory."] },
  { name: "Top", price: "Zdarma", lines: ["Ideální pro velké (maturitní) plesy | akce nad 500 hostů :)", "Hosté si platí 60 Kč / foto."], featured: true },
  { name: "Maturitní", price: "2000 Kč", lines: ["Maturanti mají fotky ZDARMA v ∞ množství!", "Ostatní hosté si platí 60 Kč / foto."] },
];

const packageIncludes = [
  "dopravu po ČR",
  "obsluhu 2x",
  "pozadí z naší nabídky",
  "plesové rekvizity",
  "online galerii po akci",
  "grafiku na míru",
];

function PriceRow({
  name,
  price,
  image,
  reverse,
  children,
}: {
  name: string;
  price: string;
  image: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 border-t border-line py-14 first:border-0 first:pt-0 lg:grid-cols-2 lg:gap-20">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-soft ${reverse ? "lg:order-last" : ""}`}>
        <Img k={image} alt={name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div>
        <Heading>{name}</Heading>
        <p className="mt-3 text-xl font-medium text-ink">{price}</p>
        <Prose className="mt-5">{children}</Prose>
      </div>
    </div>
  );
}

export default function CenaPage() {
  return (
    <>
      <PageHero
        image="2022/01/33103039_1018111845036421_263485012270120960_n"
        title="Kolik to u nás stojí?"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
      </PageHero>

      <Section>
        <Container>
          <PriceRow name="Fotobudka Partysnap" price="Cena od 10 000 Kč" image="2023/05/1676056892027">
            <p>
              Naše designová fotobudka nabízí tisk v topové kvalitě za 7 vteřin, dopravu v ceně, výběr ze 100
              pozadí a tvorbu pozadí, grafiky i rekvizit na míru!
            </p>
            <p>
              Napište nám Vaší představu a my Vám sestavíme balíček na míru <Link href="/kontakt">ZDE</Link>.
            </p>
          </PriceRow>

          <PriceRow name="Partyspin 360°" price="Cena od 9 900 Kč" image="2024/01/3M0A0668-scaled" reverse>
            <p>
              Topový videa z akce, včetně grafiky, efektů a navíc úplně ideální na Reels nebo TikTok! A navíc?
              Do pár vteřin v mobilu přes AirDrop, Email nebo QR kód:)
            </p>
            <p>
              Napište nám a nechte si sestavit balíček na míru <Link href="/kontakt">ZDE</Link>.
            </p>
          </PriceRow>

          <PriceRow name="Fotobudka s AI - umělou inteligencí" price="Cena od 14 000 Kč" image="2024/08/AI-cenik">
            <p>
              Naše designová fotobudka nabízí propojení s umělou inteligencí při tvorbě fotografií na vašich
              akcích. Nechte vaše hosty se přenést na druhý konec světa, stát se kýmkoli a to až 8x jinak! Výběr
              filtrů pro jednotlivce i pro skupinky až 10 osob!
            </p>
            <p>
              Balíčky na míru Vám sestavíme <Link href="/kontakt">ZDE</Link>. Filtry pro jednotlivce naleznete{" "}
              <Link href="/ai-filtry">ZDE</Link>. Filtry pro skupinky <Link href="/skupinove-ai-filtry">ZDE</Link>.
            </p>
          </PriceRow>

          <PriceRow name="Hostesky | Promotéři | Modelky" price="Cena od 270 Kč / hod." image="2024/02/1902" reverse>
            <p>
              Zajistíme pro vás nádherné hostesky, modelky, promotéry a promotérky, šatnářky nebo třeba pomocnice
              k dětským aktivitám.
            </p>
            <p>
              Veškeré informace naleznete <Link href="/hostesky">ZDE</Link>.
            </p>
          </PriceRow>

          <PriceRow name="AI Draw Bot" price="Cena od 19 000 Kč" image="2025/10/WhatsApp-Image-2025-10-09-at-08.51.22-scaled">
            <p>
              Naše 3 robotická ramena nakreslí s pomocí umělé inteligence jakýkoli vyfocený portrét přímo na vaší
              akci! Brand na papírky, možnost dovybavit si finální produkt a zábava s tvorbou.
            </p>
            <p>Objednejte si revoluční novinku i na vaší akci, konferenci, večírek či narozeniny!</p>
            <p className="font-medium text-ink">
              2h. provozu | 200 brandových papírků = 19 000 Kč
              <br />
              Každá další hodina + 1500 Kč | + 100 brandových papírků
            </p>
          </PriceRow>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <Heading>FAQ</Heading>
            </div>
            <Faq items={faq} />
          </div>
        </Container>
      </Section>

      <Stats
        image="2023/07/MiaGebauer-285"
        items={[
          { value: "10", label: "Fotobudek" },
          { value: "1000+", label: "ověřených hostesek" },
          { value: "3", label: "AI Draw Bot" },
          { value: "3", label: "360° Spin" },
        ]}
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <Heading>Plesové | Maturitní balíčky</Heading>
            <Lead className="mt-4">
              Pokud pořádáte ples nebo chystáte maturák, občas prostě na všechno není budget. Proto jsme pro vás
              připravily tyhle balíčky, které vám zajistí nálož zábavy a nebude to ani tolik stát!
            </Lead>
          </div>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <li
                key={p.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  p.featured ? "border-ink bg-ink text-white" : "border-line bg-white"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${p.featured ? "text-white/70" : "text-muted"}`}>
                  {p.name}
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight">{p.price}</p>
                <div className={`mt-5 space-y-2 text-sm leading-relaxed ${p.featured ? "text-white/80" : "text-ink-soft"}`}>
                  {p.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.15em] ${p.featured ? "text-white/70" : "text-muted"}`}>
                  Balíček obsahuje
                </p>
                <ul className={`mt-3 space-y-1 text-sm ${p.featured ? "text-white/85" : "text-ink-soft"}`}>
                  {packageIncludes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/kontakt" variant={p.featured ? "light" : "primary"}>
                    Objednat
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="relative isolate h-[50vh] min-h-[360px] overflow-hidden bg-ink">
        <Img k="2022/10/Partypack-3-kopie" alt="" fill sizes="100vw" className="object-cover" />
      </section>
    </>
  );
}
