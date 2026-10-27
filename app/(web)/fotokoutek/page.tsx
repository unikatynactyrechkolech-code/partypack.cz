import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, seo } from "@/lib/seo";
import { Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { HeroSlides } from "@/components/service/HeroSlides";
import { WantButton } from "@/components/service/WantButton";
import { StepsShowcase } from "@/components/service/StepsShowcase";
import { CardGrid, type GridItem } from "@/components/service/CardGrid";
import { ServiceEvents } from "@/components/service/ServiceEvents";
import { PriceFaq } from "@/components/service/PriceFaq";
import { CrossSell } from "@/components/service/CrossSell";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata(seo.fotokoutek);

const facts: Fact[] = [
  { value: "7 s", label: "tisk jedné fotky", count: true },
  { value: "100", label: "pozadí na výběr", count: true },
  { value: "45", label: "rekvizit na každé akci", count: true },
  { value: "48 h", label: "online galerie po akci", count: true },
];

const steps = [
  { title: "Vyfoťte se", text: "Před pozadím podle vás a s rekvizitami z naší nabídky." },
  { title: "Vyberte počet fotek", text: "Na velké obrazovce. Fotku si pošlete i na e-mail." },
  { title: "Fotka je venku do 7 vteřin", text: "Tisk je neomezený po celou dobu akce." },
];

const included: GridItem[] = [
  { title: "Obsluha", text: "Naše obsluha hosty provede celým focením.", image: "2024/08/IMG_3005" },
  { title: "Neomezený tisk", text: "Tiskněte, kolik chcete, po celou dobu provozu.", image: "2024/08/IMG_3080" },
  {
    title: "Pozadí",
    text: (
      <>
        Speciální, tištěné nebo klíčovací. Vyberte si v sekci <Link href="/pozadi" className="underline underline-offset-4">Pozadí</Link>.
      </>
    ),
    image: "2024/04/Partypack-specialni-Pozadi-31",
  },
  { title: "Rekvizity", text: "45 rekvizit z naší nabídky, klidně i na míru.", image: "2024/08/IMG_3079" },
  { title: "Online galerie", text: "Do 48 hodin po akci, pod heslem ke stažení a sdílení.", image: "2024/08/Snimek-obrazovky-2024-08-18-v-13.06.13" },
  { title: "Polep do brandu", text: "Fotokoutek polepíme do barev a loga vaší značky.", image: "2024/08/Snimek-obrazovky-2024-08-18-v-13.06.46" },
];

const extras: GridItem[] = [
  {
    title: "LED stěna a GIFy",
    text: "Barevná LED stěna dodá fotkám i GIFům atmosféru. Jde objednat i samostatně nebo k Partyspinu.",
    image: "2024/03/IMG_6080-1-scaled",
    position: "object-[center_30%]",
    price: "+ 3 500 Kč",
    href: "https://www.instagram.com/p/CxLEgomN-sm/",
    external: true,
    linkLabel: "Sestřih videí",
  },
  {
    title: "Party Touch: nápisy a samolepky do fotek",
    text: "Po focení si host přidá do fotky nápisy, samolepky, malůvky nebo jiné pozadí.",
    image: "2025/04/Partypack-7-2-1",
    price: "+ 2 000 Kč",
  },
];

const occasions: GridItem[] = [
  { title: "Fotokoutek na svatbu", text: "Svatební pozadí a kniha hostů zdarma.", image: "2023/05/MiaGebauer-21" },
  { title: "Fotokoutek na firemní akci", text: "Polep do brandu, pozadí na míru a dekorace ve stylu akce.", image: "2022/09/Partypack-63" },
  { title: "Fotokoutek na ples a párty", text: "Ples nad 500 hostů? Pro organizátory zdarma, hosté platí 60 Kč za fotku.", image: "2022/08/Partypack-52" },
  { title: "Fotokoutek na narozeniny", text: "Památeční kniha, pozadí a grafika na míru.", image: "2025/04/Partypack-27-scaled", position: "object-[center_35%]" },
  { title: "Fotokoutek na dětské akce", text: "Na rodinném dni ho ocení děti, babičky i všichni ostatní.", image: "2022/10/Snapseed" },
  { title: "Fotokoutek na koncerty a konference", text: "Neomezený tisk, rekvizity, obsluha a grafika na míru.", image: "2023/05/1676056892027" },
];

export default function FotokoutekPage() {
  return (
    <>
      <ServiceHero
        seed={11}
        title="Fotokoutek a GIFy na vaši akci"
        lead="Designová fotobudka s obsluhou, která tiskne fotky do 7 vteřin."
        price="od 10 000 Kč"
        cta={<WantButton service="Fotokoutek">Chci fotokoutek</WantButton>}
        facts={facts}
        visual={
          <HeroSlides
            slides={[
              { k: "2024/04/Partypack-29", alt: "Host u fotokoutku s cedulkou Budeme tančit do rána", position: "object-[30%_center]" },
              { k: "2024/06/MiaGebauer-1", alt: "Host u fotokoutku před modrým pozadím" },
              { k: "2023/07/MiaGebauer-292", alt: "Svatebčané s rekvizitami u fotobudky" },
              { k: "2024/01/Partypack-115", alt: "Dvojice na firemní oslavě" },
            ]}
          />
        }
      />

      <Section>
        <Container>
          <SectionTitle
            title="Pronájem fotokoutku s obsluhou"
            subtitle="Fotobudka se dvěma velkými obrazovkami a naše obsluha, která hosty provede celým focením."
          />
          <div className="mt-12">
            <StepsShowcase steps={steps} video={{ name: "svc-fotokoutek-v1", marks: [0, 1.2, 3.45] }} />
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle title="Co je v ceně fotokoutku" />
          <CardGrid items={included} cols={3} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle title="Doplňky k fotokoutku" />
          <CardGrid items={extras} cols={2} variant="card" headingAs="h2" aspect="aspect-[16/10]" />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle title="Fotokoutek na každou příležitost" />
          <CardGrid items={occasions} cols={3} headingAs="h2" />
        </Container>
      </Section>

      <ServiceEvents seed={23} service="fotokoutek" title="Fotky z akcí s naším fotokoutkem" subtitle="… a kde je ta vaše?" />

      <PriceFaq
        seed={37}
        heading="Kolik stojí pronájem fotokoutku?"
        price="od 10 000 Kč"
        included={["Obsluha", "Neomezený tisk", "Doprava", "Pozadí z naší nabídky", "45 rekvizit", "Online galerie"]}
        extras={[
          { label: "LED stěna a GIFy", price: "+ 3 500 Kč" },
          { label: "Party Touch", price: "+ 2 000 Kč" },
        ]}
        note="Objednáte víc služeb najednou? Získáte slevu 10–30 % podle velikosti objednávky."
        service="Fotokoutek"
        serviceLabel="Fotokoutek"
        faq={[
          { q: "Jak dlouho dopředu je potřeba rezervovat?", a: "Čím dřív, tím líp, hlavně na oblíbená data. Máme ale 12 strojů, takže akci zvládneme zajistit i když zavoláte den předem." },
          { q: "Může fotokoutek stát venku?", a: "Ano, jen musí být pod přístřeškem nebo stanem. Když ho nemáte, přivezeme vlastní černý stan 3 × 3 m s bočnicemi." },
          {
            q: "Máte nabídku na plesy?",
            a: (
              <>
                Ano. Plesové balíčky Ples, Top a Maturitní najdete v <Link href="/cena">ceníku</Link>.
              </>
            ),
          },
          { q: "Je sleva při více službách?", a: "Určitě. Když si objednáte víc služeb, připravíme vám zvýhodněný balíček na míru." },
        ]}
      />

      <CrossSell current="/fotokoutek" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
    </>
  );
}
