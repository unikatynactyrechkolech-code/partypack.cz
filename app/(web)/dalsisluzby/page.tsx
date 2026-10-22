import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Partners } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { HeroSlides } from "@/components/service/HeroSlides";
import { WantButton } from "@/components/service/WantButton";
import { CardGrid, type GridItem } from "@/components/service/CardGrid";
import { CrossSell } from "@/components/service/CrossSell";

export const metadata: Metadata = pageMetadata(seo.dalsiSluzby);

const facts: Fact[] = [
  { value: "9", label: "služeb navíc k fotokoutkům a hosteskám", count: true },
  { value: "1", label: "dodavatel na celou akci", count: true },
  { value: "Na míru", label: "balíček sestavíme podle vaší akce" },
  { value: "od 3 000 Kč", label: "módní přehlídka" },
];

const services: GridItem[] = [
  { title: "Partyprint GO", text: "Hostesky fotí hosty na telefon a fotky hned tisknou z mini tiskárny.", image: "2024/03/Canon-SELPHY-CP1500_Lifestyle_03" },
  { title: "Modelky a módní přehlídky", text: "Krátká přehlídka okoření firemní akci i večírek.", image: "2022/10/IMG_9706-3-scaled", position: "object-[center_30%]", price: "od 3 000 Kč" },
  { title: "Fotograf a kameraman", text: "Foto i video report z eventu, plesu nebo narozenin.", image: "2022/10/MiaGebauer6" },
  { title: "Fotostěna a výzdoba", text: "Fotostěny na míru, výzdoba do stylu, jmenovky, sweet bar i květiny.", image: "2022/10/294738451_3307571636124376_4756334303324609136_n" },
  { title: "Scrapbooky a knihy hostů", text: "Ručně dělaný scrapbook na památku ze svatby, narozenin nebo babyshower.", image: "2022/01/28700798_977669922413947_663599014785014599_o" },
  { title: "Dětské aktivity", text: "Malování, tetovačky, hry nebo kouzelník na rodinné dny.", image: "2022/10/IMG_0446-scaled", position: "object-[center_35%]" },
  { title: "DJ a moderátor", text: "Hudba a moderátor, bez kterých se akce neobejde.", image: "2022/10/1331686452939_2" },
  { title: "Pronájem stanů a techniky", text: "Mokrá varianta pro případ, že počasí nevyjde.", image: "2024/08/IMG_3005", position: "object-[center_20%]" },
  { title: "Taneční vystoupení", text: "Pole dance, striptéři nebo elegantní kankán.", image: "2022/10/Depositphotos_211251522_S" },
];

export default function DalsiSluzbyPage() {
  return (
    <>
      <ServiceHero
        seed={149}
        title="Další služby na akce"
        lead="DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí."
        price="Sleva 10–30 %"
        priceNote="při objednání více služeb"
        cta={<WantButton service="Něco jiného">Chci balíček na míru</WantButton>}
        facts={facts}
        visual={
          <HeroSlides
            slides={[
              { k: "2022/10/IMG_9706-3-scaled", alt: "Modelka na módní přehlídce", position: "object-[center_30%]" },
              { k: "2022/10/1331686452939_2", alt: "DJ za mixážním pultem" },
              { k: "2022/10/IMG_0446-scaled", alt: "Malování na obličej na dětské akci", position: "object-[center_35%]" },
              { k: "2022/10/294738451_3307571636124376_4756334303324609136_n", alt: "Prostřený stůl s výzdobou" },
            ]}
          />
        }
      />

      <Section>
        <Container>
          <SectionTitle
            title="Vše pro vaši akci od jednoho dodavatele"
            subtitle="Kromě fotokoutků a hostesek zajistíme i tyhle služby. Napište nám a sestavíme balíček na míru."
          />
          <CardGrid items={services} cols={3} variant="card" headingAs="h2" />
        </Container>
      </Section>

      <Partners className="bg-paper" />

      <CrossSell current="/dalsisluzby" title="Naše hlavní služby" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
    </>
  );
}
