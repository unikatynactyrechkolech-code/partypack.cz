import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Container, Heading, Section, SectionTitle } from "@/components/ui";
import { CtaBand, ImageGrid } from "@/components/sections";
import { teamGallery } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(seo.kontakt);

const team = [
  { name: "Alex", role: "Event & Sales", image: "2026/10/WhatsApp-Image-2026-10-05-at-15.41.05", text: "Alex přináší do Partypacku přes dvacet let zkušeností s obchodem a třináct let vedení vlastní firmy. Baví ho propojovat lidi, hledat praktická řešení a dotahovat věci do konce. Když zrovna neřeší klienty a akce, nejraději tráví čas se svými dvěma dcerami." },
  { name: "Lukáš", role: "Provozní manažer", image: "2026/10/WhatsApp-Image-2026-10-05-at-15.41.05-2", text: "Lukáš stojí za hladkou realizací akcí — od kontroly rekvizit a materiálu až po koordinaci externích spolupracovníků. Je spolehlivý, přesný a má tah na branku. Ten si přenáší i mimo práci: vedle Partypacku se stále věnuje profesionálnímu fotbalu." },
  { name: "Tina", role: "Koordinátorka hostesek", image: "2025/04/Partypack-8", text: "Tina je tu pro náš rozsáhlý tým hostesek, promotérů a modelek. K dispozici 24/7 tak, aby celý proces šel hladce a na akcích bylo vše na 110%." },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero image="2025/04/Partypack-7" title="Kontakt a nezávazná poptávka" lead="Napište, zavolejte nebo se u nás stavte na kafe" />

      <Section className="bg-paper-soft">
        <Container>
          <SectionTitle title="Poptávka fotokoutku, hostesek a dalších služeb" />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="rounded-lg border border-line bg-white p-6 sm:p-10">
              <ContactForm />
            </div>
            <div className="lg:pt-10">
              <span aria-hidden className="block h-px w-10 bg-accent" />
              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Kancelář</dt>
                  <dd className="mt-2 text-ink">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Telefon</dt>
                  <dd className="mt-2">
                    <a href={site.phoneHref} className="text-ink hover:underline underline-offset-4">{site.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.email}`} className="text-ink hover:underline underline-offset-4">{site.email}</a>
                  </dd>
                </div>
              </dl>
              <ul className="mt-8 flex gap-5 text-sm">
                <li><a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline underline-offset-4">Facebook</a></li>
                <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline underline-offset-4">Instagram</a></li>
              </ul>
              <ul className="mt-8 space-y-3 text-sm">
                <li>
                  <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4 decoration-ink">
                    Všeobecné obchodní podmínky ZDE
                  </a>
                </li>
                <li>
                  <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4 decoration-ink">
                    Zásady o zpracování osobních údajů ZDE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand image="2023/05/MiaGebauer-312" title="Náš příběh" />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-paper-soft">
              <Img k="2023/05/profilovkaaaa" alt="Mia" fill sizes="144px" className="object-cover" />
            </div>
            <Heading as="h3" className="mt-6 text-3xl">Mia</Heading>
            <div className="mt-6 space-y-4 leading-relaxed text-ink text-pretty">
              <p>
                Příběh PARTYPACK se začal psát již v roce 2012, kdy Mia organizovala akce a eventy v
                západočeském kraji. Od roku 2015 vedla a vlastnila společnost Fotodroid, která dodávala fotobudky
                na eventy. Po Covidu se již nechtěla zaměřovat pouze na fotokoutky, ale chtěla nabídnout
                komplexní balíček služeb.
              </p>
              <p>
                Proto v roce 2021 vznikl PARTYPACK, který neustále rozšiřujeme. Nejprve jsme začínali pouze s
                fotokoutkem, následovaly hostesky, 360° Spin, Fotokoutek s AI – umělou inteligencí, módní
                přehlídky a v roce 2025 i AI Draw Bot. Uvidíme co přinese čas, ale věříme, že ještě nekončíme.
                Mrkněte na naše služby a neváhejte si sestavit balíček služeb na vaší akci!
              </p>
            </div>
          </div>

          <div className="relative mx-auto mt-14 aspect-[3/2] max-w-3xl overflow-hidden rounded-md bg-paper-soft">
            <Img k="2025/03/Partypack-5" alt="Tým Partypack" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-ink text-pretty">
            Nyní na to Mia už není úplně sama a proto rádi představíme další z důležitých členů našeho týmu
            … a těmi jsou Alex, Luky a Tina!
          </p>

          <ul className="mt-16 grid gap-10 md:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full bg-paper-soft">
                  <Img k={m.image} alt={m.name} fill sizes="280px" className="object-cover" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{m.name}</h3>
                <p className="text-sm text-ink">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink text-pretty">{m.text}</p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-16 max-w-3xl text-center leading-relaxed text-ink text-pretty">
            Samozřejmě máme ještě mraky pomocníků, bez kterých by to nešlo! Našeho technika – elektrikáře,
            konstruktéra, tiskaře a mnoho dalších. Prostě takový ty lidi, který asi nikdy nepotkáte, ale jsou
            potřeba! Nicméně tady je galerie našich Partypekáčků, které rozhodně na akcích potkáte a na které se
            můžete těšit.
          </p>
        </Container>
        <div className="mt-12">
          <ImageGrid images={teamGallery} alt="Tým Partypack" cols="grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-0! sm:gap-0!" />
        </div>
      </Section>
    </>
  );
}
