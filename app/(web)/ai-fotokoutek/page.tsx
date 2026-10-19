import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button, Container, Divider, Heading, Section, SectionTitle } from "@/components/ui";
import { CtaBand, Steps } from "@/components/sections";

export const metadata: Metadata = pageMetadata(seo.aiFotokoutek);

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
      <PageHero image="2024/08/foto-AI-web-cenik" title="AI fotokoutek na vaši akci" lead="Staň se kýmkoli, kdekoli a to díky AI!" align="left">
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="/cena" variant="outline">Cena</Button>
      </PageHero>

      <Section>
        <Container>
          <SectionTitle title="AI filtry pro jednotlivce i skupiny" />
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Heading as="h3">Až 8 filtrů pro jednotlivce</Heading>
              <Divider className="mt-4" />
              <p className="mt-5 leading-relaxed text-ink text-pretty">
                Mrkněte na naší bohatou nabídku AI filtrů, které jsou určené pro jednotlivce. Všechny naše
                filtry fungují pro muže, ženy i děti.
              </p>
              <div className="mt-6">
                <Button href="/ai-filtry" variant="secondary">Jdeme vybírat</Button>
              </div>
            </div>
            <div>
              <Heading as="h3">Skupinové filtry pro 2–8 osob</Heading>
              <Divider className="mt-4" />
              <p className="mt-5 leading-relaxed text-ink text-pretty">
                Filtry pro skupiny 2-8 osob není potřeba vybírat dopředu. Na místě lze vybírat ze všech
                dostupných filtrů! Mrkněte se, jaké máme k dispozici.
              </p>
              <div className="mt-6">
                <Button href="/skupinove-ai-filtry" variant="secondary">Jdeme mrknout</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <section className="grid border-y border-line lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Heading>Jak funguje AI fotokoutek</Heading>
          <Divider className="mt-5" />
          <div className="mt-10">
            <Steps items={steps} />
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-[640px]">
          <Img k="2024/08/454878840_10228646758811796_1529734258425616764_n" alt="AI fotokoutek na akci" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <Section>
        <Container>
          <Heading>AI fotky před a po</Heading>
          <Divider className="mt-5" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {beforeAfter.map(([before, after]) => (
              <li key={before}>
                <BeforeAfter before={before} after={after} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <SectionTitle title="Co umí fotokoutek s umělou inteligencí" />
          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title}>
                <span aria-hidden className="block h-px w-8 bg-accent" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink text-pretty">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand image="2025/04/IMG_2202-scaled" title="Kolik stojí AI fotokoutek?">
        <Button href="/cena" variant="outline">Cena</Button>
      </CtaBand>
    </>
  );
}
