import Image from "next/image";
import { Navigatie, Voettekst } from "./_componenten/kader";
import { Knop, Plus, Vinkje } from "./_componenten/merk";
import { contact, inclBtw, laagstePrijs, pakketten, volgendeVrijeWeek } from "@/lib/gegevens";

const glas = "https://images.unsplash.com/photo-1652862730507-32988eb23a67?auto=format&fit=crop&q=75";

const aanbod = [
  ["Eigen aan jouw zaak.", "Je werk, je diensten en je regio. Duidelijke teksten en echte foto’s, goed leesbaar op je gsm."],
  ["Een site die bijgehouden wordt.", "Hosting, beveiliging, updates en de aanpassingen van je pakket. Een nieuwe realisatie? Geef ze door."],
  ["Een vast aanspreekpunt.", "Van het eerste voorbeeld tot de laatste aanpassing. Je weet wie je kan bellen of mailen."],
];

const stappen = [
  ["Vertel ons over je zaak.", "Een kort formulier. We bekijken je aanvraag en laten binnen één werkdag weten of we een voorbeeld maken."],
  ["Bekijk je gratis voorbeeld.", "Een werkende pagina van jouw zaak. We plannen je voorbeeld en geven je een concrete leverdatum."],
  ["Tevreden? Dan werken we hem af.", "Wanneer je informatie binnen is en de inhoud goedgekeurd, staat je website na ongeveer twee weken online."],
];

const vragen = [
  ["Zit ik meteen ergens aan vast?", "Nee. Het voorbeeld is gratis. Pas wanneer je beslist om verder te gaan, start het abonnement."],
  ["Hoe lang loopt het abonnement?", "Twaalf maanden. Daarna kan je maandelijks opzeggen. Liever in één keer betalen? Dan koop je je site meteen, of neem je hem later over aan de vooraf bekende overnameprijs."],
  ["Wat moet ik zelf aanleveren?", "Je logo, foto’s van je werk, je diensten en je werkgebied. Dat gaat via één formulier. Wij maken er duidelijke teksten van."],
  ["Ik heb al een website. Kan dat ook?", "Ja. We vertrekken van wat er al staat: je teksten, foto’s en realisaties. Je huidige site blijft online tot de nieuwe klaar is."],
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
            <p className="bovenregel">Websites voor zelfstandigen.</p>
            <h1 id="hero-titel">
              Een website die even goed is <span>als jouw werk.</span>
            </h1>
            <div className="hero-rij">
              <p className="tekst-groot">
                Wij bouwen en onderhouden je website. Jij houdt je bezig met je zaak. Eerst zie je een gratis voorbeeld.
              </p>
              <div className="hero-actie">
                <Knop />
                <p className="voorwaarden">Vanaf €{laagstePrijs} per maand, excl. btw. €0 vooraf.</p>
              </div>
            </div>
            <figure className="beeld">
              <img
                className="beeld-glas"
                src={`${glas}&w=1400`}
                srcSet={`${glas}&w=800 800w, ${glas}&w=1400 1400w, ${glas}&w=2000 2000w`}
                sizes="(min-width: 1304px) 1240px, calc(100vw - 36px)"
                alt=""
                fetchPriority="high"
              />
              <div className="beeld-waas" />
              <p className="beeld-slogan">
                Goed werk.
                <br />
                Goed in beeld.
              </p>
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
                  priority
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="sectie" aria-labelledby="aanbod-titel">
          <div className="wrap">
            <h2 id="aanbod-titel" className="titel sectie-kop">
              Jouw zaak in beeld.
              <br />
              De rest geregeld.
            </h2>
            <ul className="rijen">
              {aanbod.map(([titel, tekst]) => (
                <li key={titel}>
                  <h3 className="subtitel">{titel}</h3>
                  <p className="tekst-groot zacht">{tekst}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sectie sectie--groen" aria-labelledby="waarom-titel">
          <div className="wrap">
            <h2 id="waarom-titel" className="titel">
              Een stevige basis.
              <br />
              Jouw eigen verhaal.
            </h2>
            <div className="waarom">
              <p className="waarom-zin">Een website maken is een tweede vak. Jij hebt er al één.</p>
              <div className="waarom-tekst">
                <p className="tekst-groot">
                  We vertrekken van een basis die goed werkt en steken onze tijd in wat jouw zaak eigen maakt. Zo krijg je een
                  verzorgde website voor een vaste prijs per maand.
                </p>
                <p>Je ziet je nieuwe site eerst. Pas als hij je bevalt, werken we hem af. Daarna houden wij hem bij.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sectie" id="werkwijze" aria-labelledby="werkwijze-titel">
          <div className="wrap">
            <h2 id="werkwijze-titel" className="titel sectie-kop">
              Eerst zien. Dan beslissen.
            </h2>
            <ol className="stappen">
              {stappen.map(([titel, tekst], i) => (
                <li key={titel}>
                  <span className="stap-nr" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="subtitel">{titel}</h3>
                    <p className="zacht">{tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sectie sectie--vlak" id="prijzen" aria-labelledby="prijzen-titel">
          <div className="wrap">
            <h2 id="prijzen-titel" className="titel">
              Eén vaste prijs per maand.
            </h2>
            <p className="tekst-groot zacht prijzen-intro">Ontwerp, bouw, hosting en onderhoud zitten in elk pakket. Niets vooraf.</p>
            <ul className="pakketten">
              {pakketten.map((p) => (
                <li key={p.naam} className={p.uitgelicht ? "pakket pakket--uitgelicht" : "pakket"}>
                  <div className="pakket-kop">
                    <h3 className="subtitel">{p.naam}</h3>
                    {p.uitgelicht && <span className="pil">Aanbevolen</span>}
                  </div>
                  <p className="pakket-zin">{p.zin}</p>
                  <p className="pakket-prijs">€{p.prijs}</p>
                  <p className="pakket-btw">
                    per maand, excl. btw
                    <br />
                    {inclBtw(p.prijs)} incl. btw
                  </p>
                  <ul className="pakket-inhoud">
                    {p.inhoud.map((regel) => (
                      <li key={regel}>
                        <Vinkje />
                        {regel}
                      </li>
                    ))}
                  </ul>
                  <Knop variant={p.uitgelicht ? "wit" : "groen"} className="pakket-knop" />
                </li>
              ))}
            </ul>
            <div className="prijzen-voorwaarden">
              <p>Twaalf maanden, daarna maandelijks opzegbaar.</p>
              <p>Liever in één keer betalen? Je kan je site meteen kopen of later overnemen aan de vooraf bekende overnameprijs.</p>
            </div>
            <div className="lancering">
              <span className="pil pil--licht">Lanceringsaanbod</span>
              <h3 className="subtitel">Voor de eerste drie zaken.</h3>
              <p className="zacht">
                Groei aan €79 per maand tijdens je eerste jaar. Daarna €119. In ruil maken we samen een case met foto’s en een
                review. Prijzen excl. btw.
              </p>
            </div>
          </div>
        </section>

        <section className="sectie" aria-labelledby="contact-titel">
          <div className="wrap contact">
            <div className="portret">
              <img className="portret-glas" src={`${glas}&w=800`} alt="" loading="lazy" />
              <p className="portret-naam">{contact.naam}</p>
              <p className="portret-rol">Je vaste aanspreekpunt</p>
            </div>
            <div>
              <h2 id="contact-titel" className="titel">
                Je weet wie je belt.
              </h2>
              <p className="tekst-groot zacht contact-tekst">
                Clément maakt je voorbeeld, bouwt je site en houdt hem bij. Een vraag of een nieuwe foto? Je weet bij wie je
                terechtkan.
              </p>
              <p className="contact-gegevens">
                <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <Knop />
            </div>
          </div>
        </section>

        <section className="sectie sectie--vlak" id="vragen" aria-labelledby="vragen-titel">
          <div className="wrap">
            <h2 id="vragen-titel" className="titel">
              Wat je vooraf wil weten.
            </h2>
            <div className="vragen">
              {vragen.map(([vraag, antwoord], i) => (
                <details key={vraag} className="vraag" open={i === 0}>
                  <summary>
                    {vraag}
                    <Plus />
                  </summary>
                  <p>{antwoord}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sectie sectie--groen slot" aria-labelledby="slot-titel">
          <div className="wrap">
            <h2 id="slot-titel" className="titel">
              Benieuwd hoe jouw zaak <br className="breed" />
              eruit kan zien?
            </h2>
            <p className="tekst-groot">We maken één voorbeeld per week. Vraag het aan, je beslist pas als je het gezien hebt.</p>
            <Knop variant="wit" />
            {volgendeVrijeWeek && <p className="vrije-week">Eerstvolgende vrije plek: {volgendeVrijeWeek}.</p>}
          </div>
        </section>
      </main>
      <Voettekst />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
