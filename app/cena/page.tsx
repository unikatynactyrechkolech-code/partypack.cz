import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import Link from "next/link";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { SplitRows, Stats } from "@/components/sections";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata(seo.cena);

const rows = [
  {
    title: "Cena fotokoutku Partysnap",
    price: "Cena od 10 000 Kč",
    image: "2023/05/1676056892027",
    children: (
      <>
        <p>Naše designová fotobudka nabízí tisk v topové kvalitě za 7 vteřin, dopravu v ceně, výběr ze 100 pozadí a tvorbu pozadí, grafiky i rekvizit na míru!</p>
        <p>Napište nám Vaší představu a my Vám sestavíme balíček na míru <Link href="/kontakt">ZDE</Link>.</p>
      </>
    ),
  },
  {
    title: "Cena 360° fotokoutku Partyspin",
    price: "Cena od 9 900 Kč",
    image: "2024/01/3M0A0668-scaled",
    children: (
      <>
        <p>Topový videa z akce, včetně grafiky, efektů a navíc úplně ideální na Reels nebo TikTok! A navíc? Do pár vteřin v mobilu přes AirDrop, Email nebo QR kód:)</p>
        <p>Napište nám a nechte si sestavit balíček na míru <Link href="/kontakt">ZDE</Link>.</p>
      </>
    ),
  },
  {
    title: "Cena AI fotokoutku",
    price: "Cena od 14 000 Kč",
    image: "2024/08/AI-cenik",
    children: (
      <>
        <p>Naše designová fotobudka nabízí propojení s umělou inteligencí při tvorbě fotografií na vašich akcích. Nechte vaše hosty se přenést na druhý konec světa, stát se kýmkoli a to až 8x jinak! Výběr filtrů pro jednotlivce i pro skupinky až 10 osob!</p>
        <p>Balíčky na míru Vám sestavíme <Link href="/kontakt">ZDE</Link>. Filtry pro jednotlivce naleznete <Link href="/ai-filtry">ZDE</Link>. Filtry pro skupinky <Link href="/skupinove-ai-filtry">ZDE</Link>.</p>
      </>
    ),
  },
  {
    title: "Cena hostesek, promotérů a modelek",
    price: "Cena od 270 Kč / hod.",
    image: "2024/02/1902",
    children: (
      <>
        <p>Zajistíme pro vás nádherné hostesky, modelky, promotéry a promotérky, šatnářky nebo třeba pomocnice k dětským aktivitám.</p>
        <p>Veškeré informace naleznete <Link href="/hostesky">ZDE</Link>.</p>
      </>
    ),
  },
  {
    title: "Cena AI Draw Bota",
    price: "Cena od 19 000 Kč",
    image: "2025/10/WhatsApp-Image-2025-10-09-at-08.51.22-scaled",
    children: (
      <>
        <p>Naše 3 robotická ramena nakreslí s pomocí umělé inteligence jakýkoli vyfocený portrét přímo na vaší akci! Brand na papírky, možnost dovybavit si finální produkt a zábava s tvorbou.</p>
        <p>Objednejte si revoluční novinku i na vaší akci, konferenci, večírek či narozeniny!</p>
        <p className="font-medium text-ink">
          2h. provozu | 200 brandových papírků = 19 000 Kč
          <br />
          Každá další hodina + 1500 Kč | + 100 brandových papírků
        </p>
      </>
    ),
  },
];

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

const packageIncludes = "dopravu po ČR | obsluhu 2x | pozadí z naší nabídky | plesové rekvizity | online galerii po akci | grafiku na míru";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CenaPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero image="2022/01/33103039_1018111845036421_263485012270120960_n" title="Ceník služeb na akce" lead="Kolik to u nás stojí?">
        <Button href="/kontakt" variant="light">Napište nám</Button>
      </PageHero>

      <SplitRows rows={rows} headingAs="h2" />

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border border-line bg-white p-6 sm:p-10">
            <SectionTitle title="Nejčastější dotazy" />
            <div className="mt-10">
              <Faq items={faq} />
            </div>
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
          <SectionTitle
            title="Fotokoutek na ples a maturitní ples"
            subtitle="Pokud pořádáte ples nebo chystáte maturák, občas prostě na všechno není budget. Proto jsme pro vás připravily tyhle balíčky, které vám zajistí nálož zábavy a nebude to ani tolik stát!"
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <li
                key={p.name}
                className={`flex flex-col items-center rounded-lg border p-8 text-center ${
                  p.featured ? "border-ink bg-ink text-white" : "border-line bg-white"
                }`}
              >
                <h3 className={`text-xs font-semibold uppercase tracking-[0.3em] ${p.featured ? "text-white" : "text-ink"}`}>
                  {p.name}
                </h3>
                <p className="mt-3 text-4xl font-semibold uppercase tracking-tight">{p.price}</p>
                <span aria-hidden className={`mt-5 block h-px w-10 ${p.featured ? "bg-white/40" : "bg-line"}`} />
                <div className={`mt-5 space-y-2 text-sm leading-relaxed ${p.featured ? "text-white" : "text-ink"}`}>
                  {p.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <p className={`mt-6 text-sm ${p.featured ? "text-white" : "text-ink"}`}>
                  <span className="font-medium">Balíček obsahuje:</span>
                  <br />
                  {packageIncludes}
                </p>
                <div className="mt-8">
                  <Button href="/kontakt" variant={p.featured ? "light" : "secondary"}>
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
