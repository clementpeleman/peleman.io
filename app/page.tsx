import Image from "next/image";
import Link from "next/link";
import ribbelglas from "@/public/beeld/ribbelglas.jpg";
import { Navigatie, Voettekst } from "./_componenten/kader";
import { Knop, Pijl, Vinkje } from "./_componenten/merk";
import { GsmBalk } from "./_secties/GsmBalk";
import { Slot } from "./_secties/Slot";
import { Vragen } from "./_secties/Vragen";
import { Werkwijze } from "./_secties/Werkwijze";
import { aanbod, contact, euro } from "@/lib/gegevens";

const vragen: [string, string][] = [
  ["Zit ik vast als ik een voorbeeld vraag?", "Nee. Het voorbeeld is gratis. Pas als je verder wil, krijg je een offerte."],
  ["Wat moet ik zelf aanleveren?", "Je logo, foto’s van je werk en een lijst van wat je doet en waar. Heb je al een huisstijl, dan bouw ik daarop verder."],
  ["Ik heb al een website. Kan dat ook?", "Ja. Ik vertrek van wat er staat, en je oude links blijven werken, zodat je niet terugvalt in Google."],
  ["Hoe snel sta ik bovenaan in Google?", "Dat kan niemand eerlijk beloven. Een nieuwe site heeft een paar maanden nodig. Het maandrapport toont hoe het evolueert."],
  ["Gebruik je AI?", "Waar het tijd bespaart, ja. Daardoor kan ik goedkoper werken dan een bureau. Je teksten schrijf ik met jou, niet met een generator."],
];

const werk = [
  {
    naam: "H16",
    wat: "Bouwcoördinatie en projectontwikkeling in Oosterzele. De huisstijl kwam van een ontwerpbureau, de foto’s van hun eigen projecten. Ik bouwde de site errond.",
    url: "https://h16.be",
    domein: "h16.be",
  },
  {
    naam: "LVQ.wine",
    wat: "Een wijnbedrijf. De site moest de kwaliteit en de sfeer van het bedrijf uitstralen.",
    url: "https://lvq.wine",
    domein: "lvq.wine",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "peleman.io",
  url: "https://peleman.io",
  description: "Websites voor zelfstandigen en kmo's. Eerst een gratis voorbeeld, daarna een site op maat.",
  email: contact.email,
  telephone: contact.telefoon,
  vatID: contact.ondernemingsnummer.replace(/[ .]/g, ""),
  areaServed: { "@type": "Country", name: "België" },
};

export default function Home() {
  return (
    <>
      <a className="overslaan" href="#inhoud">Naar de inhoud</a>
      <Navigatie />
      <main id="inhoud">
        <section className="hero" aria-labelledby="hero-titel">
          <div className="wrap">
            <h1 id="hero-titel">
              Ik maak websites voor <span>zelfstandigen en kmo’s.</span>
            </h1>
            <div className="hero-rij">
              <p className="tekst-groot">
                Ik bouw websites voor zaken die online gevonden willen worden. Voor je iets beslist, maak ik gratis een voorbeeld van je homepage.
              </p>
              <div className="hero-actie" data-hero-knop>
                <Knop />
                <p className="voorwaarden">
                  Vanaf {euro(aanbod.site)}, daarna €{aanbod.perMaand} per maand. Excl. btw.
                </p>
              </div>
            </div>
            <figure className="beeld">
              <Image className="beeld-glas" src={ribbelglas} alt="" fill preload quality={55} sizes="(min-width: 1304px) 1240px, calc(100vw - 36px)" />
              <div className="beeld-waas" />
              <div className="beeld-site">
                <div className="browserbalk" aria-hidden="true">
                  <span>h16.be</span>
                </div>
                <Image
                  src="/beeld/h16-landing.jpg"
                  width={1440}
                  height={968}
                  sizes="(min-width: 1100px) 520px, (min-width: 640px) 52vw, 84vw"
                  alt="De website van H16, bouwcoördinatie en projectontwikkeling, met foto’s van twee realisaties."
                  loading="eager"
                />
              </div>
            </figure>
            <p className="beeld-onderschrift">De site die ik voor H16 maakte.</p>
          </div>
        </section>

        <section className="sectie sectie--lijn" aria-labelledby="krijgt-titel">
          <div className="wrap kolommen">
            <h2 id="krijgt-titel" className="titel">
              Wat je krijgt
            </h2>
            <ul className="vinklijst">
              {[...aanbod.inDeSite, aanbod.perMaandInhoud[2]].map((regel) => (
                <li key={regel}>
                  <Vinkje />
                  {regel}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Werkwijze titel="Hoe het gaat" lijn />

        <section className="sectie sectie--lijn" aria-labelledby="werk-titel">
          <div className="wrap kolommen">
            <h2 id="werk-titel" className="titel">
              Wat ik al maakte
            </h2>
            <div>
              <ul className="werklijst">
                {werk.map((w) => (
                  <li key={w.naam}>
                    <h3 className="subtitel">{w.naam}</h3>
                    <p className="zacht">{w.wat}</p>
                    <a className="tekstlink" href={w.url} target="_blank" rel="noopener">
                      Bekijk {w.domein}
                      <Pijl />
                    </a>
                  </li>
                ))}
              </ul>
              <Link className="tekstlink werklijst-meer" href="/cases">
                Bekijk alle cases
                <Pijl />
              </Link>
            </div>
          </div>
        </section>

        <section className="sectie sectie--vlak" id="prijzen" aria-labelledby="prijzen-titel">
          <div className="wrap">
            <h2 id="prijzen-titel" className="titel">
              Eén prijs, vooraf bekend
            </h2>
            <ul className="pakketten pakketten--twee">
              <li className="pakket">
                <h3 className="subtitel">De site</h3>
                <p className="pakket-prijs">
                  <span className="pakket-vanaf">vanaf</span> {euro(aanbod.site)}
                </p>
                <p className="pakket-btw">eenmalig, excl. btw</p>
                <ul className="pakket-inhoud">
                  {["De site op maat", "De teksten", "Het gratis voorbeeld", "De lancering"].map((regel) => (
                    <li key={regel}>
                      <Vinkje />
                      {regel}
                    </li>
                  ))}
                </ul>
                <Knop className="pakket-knop" />
              </li>
              <li className="pakket">
                <h3 className="subtitel">Daarna</h3>
                <p className="pakket-prijs">€{aanbod.perMaand}</p>
                <p className="pakket-btw">per maand, excl. btw</p>
                <ul className="pakket-inhoud">
                  {aanbod.perMaandInhoud.map((regel) => (
                    <li key={regel}>
                      <Vinkje />
                      {regel}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <p className="prijzen-voorwaarden">
              Alle prijzen excl. btw. Ik host je site. Wil je later zelf eigenaar worden, dan neem je hem over aan een vooraf afgesproken prijs.
            </p>
          </div>
        </section>

        <section className="sectie" aria-labelledby="maatwerk-titel">
          <div className="wrap kolommen">
            <h2 id="maatwerk-titel" className="titel">
              Ook voor maatwerk
            </h2>
            <div>
              <p className="tekst-groot zacht">
                Loopt er in je zaak iets met de hand dat sneller kan? Offertes die je telkens opnieuw typt, gegevens die je van het ene programma in het andere overzet. Daar bouw ik ook kleine tools voor.
              </p>
              <Knop variant="rand" className="maatwerk-knop" href={`mailto:${contact.email}?subject=Maatwerk`}>
                Vertel me wat er wringt
              </Knop>
            </div>
          </div>
        </section>

        <section className="sectie sectie--lijn" aria-labelledby="contact-titel">
          <div className="wrap contact">
            <div className="portret">
              <Image className="portret-glas" src={ribbelglas} alt="" fill quality={55} sizes="(min-width: 900px) 380px, calc(100vw - 36px)" />
              <p className="portret-naam">{contact.naam}</p>
            </div>
            <div>
              <h2 id="contact-titel" className="titel">
                Wie je site bouwt
              </h2>
              <p className="tekst-groot zacht contact-tekst">
                Ik ben Clément Peleman, ingenieur. Ik werk voor een beperkt aantal klanten tegelijk. Je mailt en belt dus altijd met mij, en ik antwoord binnen een werkdag.
              </p>
              <p className="contact-gegevens">
                <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <Knop />
            </div>
          </div>
        </section>

        <Vragen vragen={vragen} />

        <Slot titel="Benieuwd hoe je site" vervolg="eruit kan zien?" tekst="Je krijgt gratis een voorbeeld van je homepage." />
      </main>
      <Voettekst />
      <GsmBalk />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
