import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { Checkerboard, ContactSection, Partners } from "@/components/sections";

export const metadata: Metadata = pageMetadata(seo.dalsiSluzby);

const services = [
  { title: "Partyprint GO", text: "Hostesky chodí označené jako fotografky po akci a fotí vaše hosty na kvalitní telefon. Následně fotku vloží do aplikace a do chvilky hostovi vytisknou fotky z mini-tiskárny, kterou mají u sebe.", image: "2024/03/Canon-SELPHY-CP1500_Lifestyle_03" },
  { title: "Modelky a módní přehlídky", text: "Ideální možností jak okořenit vaší firemní akci či večírek je menší módní přehlídka! Cena dle typu akce a velikosti přehlídky - od 3000 Kč.", image: "2022/10/MiaGebauer6" },
  { title: "Fotograf a kameraman", text: "Foto + video report pro nás není nic složitého. Náš tým fotografů a kameramanů je ready zachytit váš event, ples či narozeniny :)", image: "2022/10/IMG_9706-3-scaled" },
  { title: "Fotostěna a výzdoba", text: "Pozadí a fotostěny na míru akce. Výzdoba do stylu, jmenovky, sweet bar, květiny a vše na co si dokážete vzpomenout.", image: "2022/10/294738451_3307571636124376_4756334303324609136_n" },
  { title: "Scrapbooky a knihy hostů", text: "Na památku ze svatby, narozenin nebo třeba babyshower, pro vás dokážeme vyrobit nádherný ... ručně dělaný scrapbook!", image: "2022/10/IMG_0446-scaled" },
  { title: "Dětské aktivity", text: "Na FamilyDays jsme ready všemi 10! Fantazii se meze nekladou, dokážeme zařídit malování, tetovačky, hry nebo třeba kouzelníka :)", image: "2022/01/28700798_977669922413947_663599014785014599_o" },
  { title: "DJ a moderátor", text: "To je taková klasika - bez toho by snad žádná akce ani nemohla proběhnout! Pokud si nevíte rady, napište nám a my už se postaráme o zbytek :)", image: "2022/10/1331686452939_2" },
  { title: "Pronájem stanů a techniky", text: "Nepřízeň počasí může překvapit každého, proto pozor a raději mít vždy mokrou variantu připravenou!", image: "2022/10/Depositphotos_211251522_S" },
  { title: "Taneční vystoupení", text: "Ani zde se meze nekladou, PoleDance tanečnice, striptéři nebo třeba elegantní kankán? Pro nás žádný problém:)", image: "2022/10/294840480_3307569629457910_8228899314877146125_n" },
];

export default function DalsiSluzbyPage() {
  return (
    <>
      <PageHero image="2022/10/Partypack-50-kopie" title="Další služby na akce" lead="Sestavte si svůj balíček služeb!">
        <Button href="/kontakt" variant="light">Napište nám</Button>
      </PageHero>

      <Section className="pb-12 sm:pb-16">
        <Container>
          <SectionTitle
            title="Vše pro vaši akci od jednoho dodavatele"
            subtitle="Kromě fotokoutků a hostesek zajistíme i další služby. Objednáním více služeb získáte slevu 10–30 % podle velikosti objednávky."
          />
        </Container>
      </Section>
      <Checkerboard items={services} headingAs="h2" />

      <Partners />

      <ContactSection
        lead="… Vaší představu o plánované svatbě, (maturitním) plese, nebo firemní akci a my se už postaráme o zbytek! Naše služby zajistíme taky na konferenci, koncert, narozeniny nebo třeba babyshower!"
      />
    </>
  );
}
