import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Lead, Prose, Section, TextLink } from "@/components/ui";
import { CardLink, CtaBand, FeatureList, ImageGrid } from "@/components/sections";
import { fotokoutekGallery, gallery, ledWallImages, partyTouchImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partysnap - Fotobudka na akci, maturák nebo jinou párty!",
  description: "Okořeňte svou akci nejlepší kombinací zábavy a vzpomínek. Fotokoutek Partysnap s neomezeným tiskem, obsluhou a pozadím na míru.",
  alternates: { canonical: "/fotokoutek" },
};

const classicImages = [
  "2024/01/Partypack-115",
  "2023/09/3M0A9772",
  "2023/07/MiaGebauer-292",
];

const features = [
  {
    title: "Rekvizity",
    text: "Na akce vozíme balíček 45 připravených rekvizit z naší nabídky. Samozřejmě rádi připravíme i rekvizity přímo na míru.",
    image: "2024/08/IMG_3079",
  },
  {
    title: "Neomezený tisk",
    text: "Na každé akci je možné si nechat vytisknout neomezeně fotek. Objednejte si fotokoutek na kolik hodin potřebujete a po celou dobu provozu je tisk v ceně!",
    image: "2024/06/MiaGebauer-1",
  },
  {
    title: "Pozadí",
    text: (
      <>
        V naší sekci <Link href="/pozadi">POZADÍ</Link> je možné si vybrat ze tří variant. Speciální
        pozadí (ideální pro plesy, svatby, narozeniny a firemní akce), tištěná pozadí či klíčovací
        greenscreen.
      </>
    ),
    image: "2024/08/IMG_3080",
  },
  {
    title: "Obsluha",
    text: "Pro komfortní focení je přítomná vždy naše obsluha, která vás i vaše hosty celým procesem provede.",
    image: "2024/08/IMG_3005",
  },
  {
    title: "Online galerie",
    text: "Po akci je do 48h vždy připravená online galerie pod heslem pro stažení a sdílení všech nafocených fotografií.",
    image: "2024/08/Snimek-obrazovky-2024-08-18-v-13.06.13",
  },
  {
    title: "Polep",
    text: "Kromě pozadí, rekvizit či textu do emailu, umíme též polepit fotokoutek do brandu klienta a tím zajistit maximalizaci marketingové kampaně.",
    image: "2024/08/Snimek-obrazovky-2024-08-18-v-13.06.46",
  },
];

const occasions = [
  { title: "Svatby", text: "Pro nevěsty máme připravené speciální pozadí a knihu hostů zdarma! Náš tým za Vámi dorazí klidně až na Měsíc! :)" },
  { title: "Firemní akce", text: "Fantazii se meze nekladou! Polep fotobudky do brandu. Pozadí na míru. Dekorace ve stylu akce. Příjemné hostesky. Doprava zdarma a neomezený tisk!" },
  { title: "Ples | Párty", text: "Fotokoutek na ples zdarma! Tak to jo! Stačí, aby na plese bylo potvrzených min. 500 hostů a je to!:) O detailní info nám napiš!" },
  { title: "Narozeniny", text: "Kulatiny a nevíte program? Fotokoutek s památeční knihou by neměl nikde chybět! Topový pozadí a grafika na míru." },
  { title: "Dětské akce", text: "Kdo miluje focení nejvíc? Děti, babičky a prostě všichni! Proto by náš fotokoutek Partysnap neměl chybět na žádném rodinném dnu:)" },
  { title: "Koncerty | Konference a jiné", text: "Samozřejmostí pro nás zůstává neomezený tisk, nálož rekvizit, příjemná obsluha, grafika na míru ... a mnoho dalšího na jakoukoli vaší akci:)" },
];

const otherServices = [
  { href: "/partyspin360", title: "Partyspin 360", image: "2024/08/IMG_3006" },
  { href: "/ai-fotokoutek", title: "Fotokoutek s AI", image: "2024/07/8f6802ed-afe1-45f4-af6d-52b1fadeb461" },
  { href: "/hostesky", title: "Hostesky", image: "2024/08/IMG_9544-2" },
];

export default function FotokoutekPage() {
  const recent = gallery.slice(0, 6);
  return (
    <>
      <PageHero
        image="2024/04/Partypack-29"
        title="Fotokoutek | GIFy"
        lead="Okořeňte svou akci nejlepší kombinací zábavy a vzpomínek"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="/cena" variant="outline">Ukaž cenu</Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Heading>Klasický fotokoutek</Heading>
              <Prose className="mt-6">
                <p>
                  … jak ho asi všichni znáte. Naše designová fotobudka s dvěmi velkými obrazovkami zajistí
                  rychlý výběr, zasílání na email a srandu u prohlížení nafocených fotek:)
                </p>
                <p>
                  Na každé akci je přítomná naše obsluha, která se stará o hladký chod focení, jedno z
                  našich <Link href="/pozadi">speciálních pozadí</Link>, 45 ks rekvizit, neomezená cartridge
                  na tisk fotek a neskutečná nálož zábavy!
                </p>
                <p>
                  Navíc ještě umíme třeba velký formát fotek 20×15 cm, vlastní text do emailu, polep
                  fotobudky do brandu klienta, pozadí a rekvizity na míru nebo třeba naší fotobudku s umělou
                  inteligencí – viz, níže!
                </p>
              </Prose>
            </div>
            <ImageGrid images={classicImages} alt="Fotobudka Partysnap" cols="grid-cols-2" featureFirst />
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ImageGrid images={ledWallImages} alt="LED stěna" cols="grid-cols-2" featureFirst />
            <div className="lg:order-first">
              <Heading>Led stěna &amp; GIFY</Heading>
              <Prose className="mt-6">
                <p>
                  Pro nejlepší efekt a kombinace fotek a GIFů, poslouží naše LED stěna! Stěnu lze nastavit
                  do jedné barvy, do mixu či prolínání barev. Dodá fotkám a GIFům cool atmošku.{" "}
                  <TextLink href="https://www.instagram.com/p/CxLEgomN-sm/" external>ZDE</TextLink> mrkněte na
                  výsledný sestřih videí.
                </p>
                <p>
                  LED STĚNU si lze objednat i jako samostatnou stěnu nebo třeba k našemu Partyspinu. Pro více
                  informací nám napište. Stejně jako k fotkám, tak i ke GIFům je možné přidat nápis / logo /
                  grafiku a tím propagovat event i na sociálních sítích.
                </p>
                <p className="font-medium text-ink">Cena navíc ke každému základnímu balíčku + 3500 Kč.</p>
              </Prose>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Heading>Party touch</Heading>
              <Prose className="mt-6">
                <p>
                  … občas je potřeba si celý proces focení trochu okořenit. Proto jsme vymysleli PARTY TOUCH!
                  A co to vlastně je?
                </p>
                <p>
                  Každý, kdo má naší fotobudku na své akci si může přidat i PartyTouch funkci, která vašim
                  fotkám dodá poslední třešničku na dortu!
                </p>
                <p>
                  Poté, co se u nás host vyfotí, může si přidat na svou fotku například: nápisy, stickers,
                  malůvky, knírky, klobouky, brýle nebo třeba vyzkoušet několik možností klíčovacího pozadí!
                </p>
                <p className="font-medium text-ink">K ceně každého fotokoutku jen za +2000 Kč.</p>
              </Prose>
            </div>
            <ImageGrid images={partyTouchImages} alt="Party touch" cols="grid-cols-2" featureFirst />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line pt-0 sm:pt-0">
        <Container>
          <div className="pt-16 sm:pt-24">
            <Heading>Fotky z fotokoutku</Heading>
          </div>
          <div className="mt-10">
            <ImageGrid images={fotokoutekGallery} alt="Fotka z fotokoutku Partysnap" cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
          </div>
        </Container>
      </Section>

      <Section className="bg-paper-soft">
        <Container>
          <Heading>Co je v ceně</Heading>
          <div className="mt-10">
            <FeatureList items={features} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading>Pro jaké akce</Heading>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o) => (
              <li key={o.title} className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">{o.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Heading>Fotky z našich posledních akcí</Heading>
              <Lead className="mt-3">... a kde je ta vaše?</Lead>
            </div>
            <Button href="/galerie" variant="secondary">Galerie</Button>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((g) => (
              <li key={g.slug}>
                <CardLink
                  href={g.album ?? "/galerie"}
                  external={Boolean(g.album)}
                  image={g.img}
                  title={g.title}
                  aspect="aspect-[3/2]"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <Heading>Naše další služby</Heading>
            <Lead className="mt-4">
              Objednáním několika našich služeb získáte slevy od 10 – 30 % v závislosti na velikosti
              objednávky. Budeme se těšit na spolupráci!
            </Lead>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {otherServices.map((s) => (
              <li key={s.href}>
                <CardLink href={s.href} image={s.image} title={s.title} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand image="2023/05/MiaGebauer-21" title="Konkrétní ceny za naše služby?">
        <Button href="/cena" variant="light">Ukaž cenu</Button>
      </CtaBand>
    </>
  );
}
