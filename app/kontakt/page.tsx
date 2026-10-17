import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Container, Heading, Prose, Section } from "@/components/ui";
import { ImageGrid } from "@/components/sections";
import { teamGallery } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partypack - Kontaktní info",
  description: "Napište, zavolejte nebo se u nás stavte na kafe. Mandloňová 1175/16, Praha 9 Hrdlořezy, +420 720 448 660, info@partypack.cz.",
  alternates: { canonical: "/kontakt" },
};

const team = [
  { name: "Alex", role: "Event & Sales", image: "2026/10/WhatsApp-Image-2026-10-05-at-15.41.05", text: "Alex přináší do Partypacku přes dvacet let zkušeností s obchodem a třináct let vedení vlastní firmy. Baví ho propojovat lidi, hledat praktická řešení a dotahovat věci do konce. Když zrovna neřeší klienty a akce, nejraději tráví čas se svými dvěma dcerami." },
  { name: "Lukáš", role: "Provozní manažer", image: "2026/10/WhatsApp-Image-2026-10-05-at-15.41.05-2", text: "Lukáš stojí za hladkou realizací akcí — od kontroly rekvizit a materiálu až po koordinaci externích spolupracovníků. Je spolehlivý, přesný a má tah na branku. Ten si přenáší i mimo práci: vedle Partypacku se stále věnuje profesionálnímu fotbalu." },
  { name: "Tina", role: "Koordinátorka hostesek", image: "2025/04/Partypack-8", text: "Tina je tu pro náš rozsáhlý tým hostesek, promotérů a modelek. K dispozici 24/7 tak, aby celý proces šel hladce a na akcích bylo vše na 110%." },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero
        image="2025/04/Partypack-7"
        title="Napište, zavolejte nebo se u nás stavte na kafe"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <dl className="space-y-8">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Kancelář</dt>
                  <dd className="mt-2 text-lg text-ink">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Telefon</dt>
                  <dd className="mt-2 text-lg">
                    <a href={site.phoneHref} className="text-ink hover:underline">{site.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Email</dt>
                  <dd className="mt-2 text-lg">
                    <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a>
                  </dd>
                </div>
              </dl>
              <ul className="mt-10 space-y-2 border-t border-line pt-8 text-sm">
                <li>
                  <a href={site.termsUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
                    Všeobecné obchodní podmínky ZDE
                  </a>
                </li>
                <li>
                  <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
                    Zásady o zpracování osobních údajů ZDE
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Img k="2023/05/profilovkaaaa" alt="Mia" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <Heading>Mia</Heading>
              <Prose className="mt-6">
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
              </Prose>
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white lg:order-last">
              <Img k="2025/03/Partypack-5" alt="Tým Partypack" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xl leading-relaxed text-ink text-pretty">
                Nyní na to Mia už není úplně sama a proto rádi představíme další z důležitých členů našeho týmu
                … a těmi jsou Alex, Luky a Tina!
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-8 md:grid-cols-3">
            {team.map((m) => (
              <li key={m.name}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                  <Img k={m.image} alt={m.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{m.name}</h3>
                <p className="text-sm text-muted">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft text-pretty">{m.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="max-w-3xl leading-relaxed text-ink-soft text-pretty">
            Samozřejmě máme ještě mraky pomocníků, bez kterých by to nešlo! Našeho technika – elektrikáře,
            konstruktéra, tiskaře a mnoho dalších. Prostě takový ty lidi, který asi nikdy nepotkáte, ale jsou
            potřeba! Nicméně tady je galerie našich Partypekáčků, které rozhodně na akcích potkáte a na které se
            můžete těšit.
          </p>
          <div className="mt-10">
            <ImageGrid images={teamGallery} alt="Tým Partypack" cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
          </div>
        </Container>
      </Section>
    </>
  );
}
