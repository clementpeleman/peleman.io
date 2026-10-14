import Image from "next/image";
import ribbelglas from "@/public/beeld/ribbelglas.jpg";
import { Navigatie, Voettekst } from "./_componenten/kader";
import { Knop } from "./_componenten/merk";
import { Functies } from "./_secties/Functies";
import { GsmBalk } from "./_secties/GsmBalk";
import { Overname } from "./_secties/Overname";
import { PakketKaart } from "./_secties/Pakket";
import { PakketTabel } from "./_secties/PakketTabel";
import { Slot } from "./_secties/Slot";
import { Vergelijking } from "./_secties/Vergelijking";
import { Vragen } from "./_secties/Vragen";
import { Werkwijze } from "./_secties/Werkwijze";
import { Zekerheden } from "./_secties/Zekerheden";
import { contact, laagstePrijs, pakketten } from "@/lib/gegevens";

const vragen: [string, string][] = [
  ["Zit ik meteen ergens aan vast?", "Nee. Het voorbeeld is gratis. Pas wanneer je beslist om verder te gaan, start het abonnement."],
  ["Hoe lang loopt het abonnement?", "Twaalf maanden. Daarna kan je maandelijks opzeggen. Liever in één keer betalen? Dan koop je je site meteen, of neem je hem later over aan de vooraf bekende overnameprijs."],
  ["Wat moet ik zelf aanleveren?", "Je logo, foto’s van je werk, je diensten en je werkgebied. Dat gaat via één formulier. Wij maken er duidelijke teksten van."],
  ["Ik heb al een website. Kan dat ook?", "Ja. We vertrekken van je huidige teksten en foto’s, en je site blijft online tot de nieuwe klaar is."],
  ["Wat als ik iets wil aanpassen?", "Start bevat drie, Groei vijf en Pro tien aanpassingen per maand. We verwerken ze binnen vijf werkdagen. Een extra aanpassing kost €29, excl. btw."],
  ["Blijft mijn domein van mij?", "Ja. Je domein, je teksten en je foto’s blijven van jou."],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "peleman.io",
  url: "https://peleman.io",
  description: "Websites voor zelfstandigen, gebouwd en onderhouden voor een vaste prijs per maand.",
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
            <p className="bovenregel">Websites voor zelfstandigen</p>
            <h1 id="hero-titel">
              Een website die even goed is <span>als jouw werk.</span>
            </h1>
            <div className="hero-rij">
              <p className="tekst-groot">
                Wij bouwen je website en houden hem daarna bij. Voor je iets beslist, krijg je een gratis voorbeeld te zien.
              </p>
              <div className="hero-actie" data-hero-knop>
                <Knop />
                <p className="voorwaarden">Vanaf €{laagstePrijs} per maand, excl. btw, zonder kosten vooraf.</p>
              </div>
            </div>
            <figure className="beeld">
              <Image className="beeld-glas" src={ribbelglas} alt="" fill preload quality={55} sizes="(min-width: 1304px) 1240px, calc(100vw - 36px)" />
              <div className="beeld-waas" />
              <p className="beeld-slogan">De site die we voor H16 maakten.</p>
              <div className="beeld-site">
                <div className="browserbalk" aria-hidden="true">
                  <i />
                  <i />
                  <i />
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
          </div>
        </section>

        <Zekerheden />

        <Functies />

        <section className="sectie sectie--groen" aria-labelledby="waarom-titel">
          <div className="wrap">
            <h2 id="waarom-titel" className="titel">
              Hoe dat kan voor een vaste prijs
            </h2>
            <div className="waarom">
              <p className="waarom-zin">We beginnen niet telkens van nul.</p>
              <div className="waarom-tekst">
                <p className="tekst-groot">
                  We vertrekken van een basis die goed werkt en steken onze tijd in wat jouw zaak eigen maakt. Zo krijg je een
                  verzorgde website voor een vaste prijs per maand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Werkwijze />

        <Vergelijking />

        <section className="sectie sectie--vlak" id="prijzen" aria-labelledby="prijzen-titel">
          <div className="wrap">
            <h2 id="prijzen-titel" className="titel">
              Eén vaste prijs per maand
            </h2>
            <p className="tekst-groot zacht prijzen-intro">Ontwerp, bouw, hosting en onderhoud zitten in elk pakket, en je betaalt niets vooraf.</p>
            <ul className="pakketten">
              {pakketten.map((p) => (
                <PakketKaart key={p.naam} pakket={p} />
              ))}
            </ul>
            <p className="prijzen-voorwaarden">Het abonnement loopt twaalf maanden en is daarna maandelijks opzegbaar. Alle prijzen excl. btw.</p>
            <PakketTabel />
            <Overname />
          </div>
        </section>

        <section className="sectie" aria-labelledby="contact-titel">
          <div className="wrap contact">
            <div className="portret">
              <Image className="portret-glas" src={ribbelglas} alt="" fill quality={55} sizes="(min-width: 900px) 380px, calc(100vw - 36px)" />
              <p className="portret-naam">{contact.naam}</p>
              <p className="portret-rol">Je vaste aanspreekpunt</p>
            </div>
            <div>
              <h2 id="contact-titel" className="titel">
                Je weet wie je belt
              </h2>
              <p className="tekst-groot zacht contact-tekst">
                Clément maakt je voorbeeld en bouwt je site. Ook daarna kan je bij hem terecht, voor een vraag of een nieuwe
                foto.
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

        <Slot />
      </main>
      <Voettekst />
      <GsmBalk />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
