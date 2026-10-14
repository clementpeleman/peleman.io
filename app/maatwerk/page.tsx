import type { Metadata } from "next";
import Link from "next/link";
import schaaf from "@/public/beeld/maatwerk/schaaf.jpg";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Knop } from "../_componenten/merk";
import { RibbelglasFoto } from "../_componenten/Ribbelglas";
import { AanvraagMock, CaseBeeld, Glasvlak, Punten } from "../_secties/Functies";
import { GsmBalk } from "../_secties/GsmBalk";
import { PakketKaart } from "../_secties/Pakket";
import { Slot } from "../_secties/Slot";
import { Vragen } from "../_secties/Vragen";
import { Werkwijze } from "../_secties/Werkwijze";
import { lvq } from "@/lib/cases";
import { laagstePrijs, pakketten } from "@/lib/gegevens";

export const metadata: Metadata = {
  title: "Website voor schrijnwerkers, interieurbouwers en keukenbouwers",
  description:
    "Een website die even goed is als jouw maatwerk: je realisaties per type, een aanvraag met de juiste info en je werkgebied in beeld. Eerst zie je een gratis voorbeeld.",
};

const herkenning: [string, string][] = [
  ["Je beste werk staat nergens samen", "Je mooiste realisaties staan in je gsm of op Instagram, maar niet op je site."],
  ["Aanvragen zonder de juiste info", "Je belt telkens terug voor de afmetingen, het budget of een foto van de ruimte."],
  ["Geen tijd om er zelf mee bezig te zijn", "Je site bijwerken schuift altijd door naar volgende week."],
];

const vragen: [string, string][] = [
  ["Kan ik nieuwe realisaties laten toevoegen?", "Ja. Stuur ons de foto’s en een korte uitleg, wij zetten ze erop. Dat telt als een aanpassing uit je pakket."],
  ["Komen mijn realisaties per type op de site?", "Ja. Keukens, kasten, trappen of wat je maakt: elk type krijgt een eigen plek. In Groei heb je tot zes pagina’s, in Pro tot twaalf."],
  ["Wat als ik weinig goede foto’s heb?", "Dan starten we met wat er is. In je voorbeeld vullen we aan met sfeerfoto’s die duidelijk als voorbeeld gelabeld zijn. Op je echte site komen je eigen foto’s."],
  ["Kan ik er ook personeel mee vinden?", "Dat kan, met een pagina over werken bij jouw zaak. Vermeld het in je aanvraag, dan nemen we het mee in je voorbeeld."],
  ["Zit ik meteen ergens aan vast?", "Nee. Het voorbeeld is gratis. Pas wanneer je beslist om verder te gaan, start het abonnement."],
];

export default function Maatwerk() {
  const groei = pakketten.find((p) => p.uitgelicht) ?? pakketten[1];
  return (
    <>
      <a className="overslaan" href="#inhoud">Naar de inhoud</a>
      <Navigatie />
      <main id="inhoud">
        <section className="hero maatwerk-hero" aria-labelledby="maatwerk-titel">
          <div className="wrap maatwerk-rij">
            <div className="maatwerk-intro">
              <p className="bovenregel">Voor schrijnwerkers, interieurbouwers en keukenbouwers</p>
              <h1 id="maatwerk-titel">
                Een website die even goed is <span>als jouw maatwerk.</span>
              </h1>
              <p className="tekst-groot">
                Je begint met een gratis voorbeeld. We zetten je realisaties in de kijker en bouwen een aanvraag die meteen de
                juiste info vraagt. Daarna houden wij je site bij.
              </p>
              <div className="hero-actie" data-hero-knop>
                <Knop />
                <p className="voorwaarden">Vanaf €{laagstePrijs} per maand, excl. btw, zonder kosten vooraf.</p>
              </div>
            </div>
            <figure className="maatwerk-beeld">
              <RibbelglasFoto
                className="maatwerk-foto"
                src={schaaf}
                alt="Handen van een schrijnwerker die een houten plank schaaft."
                preload
                sizes="(min-width: 900px) 560px, calc(100vw - 36px)"
                marges={{ marginRight: 0.6 }}
              />
              <div className="mock-kaart maatwerk-melding" aria-hidden="true">
                <span className="mock-melding-stip" />
                <div>
                  <b>Nieuwe aanvraag</b>
                  <span>Keuken op maat · Gent</span>
                  <span>Budget €10.000 – €20.000 · 3 foto’s</span>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="sectie sectie--vlak" aria-labelledby="herkenning-titel">
          <div className="wrap">
            <h2 id="herkenning-titel" className="titel sectie-kop">
              Herken je dit?
            </h2>
            <ul className="herkenning">
              {herkenning.map(([titel, tekst]) => (
                <li key={titel}>
                  <h3 className="subtitel">{titel}</h3>
                  <p className="zacht">{tekst}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sectie" aria-labelledby="vak-titel">
          <div className="wrap">
            <div className="functie">
              <Glasvlak label="Voorbeeld van een aanvraagformulier voor maatwerk op een gsm.">
                <AanvraagMock />
              </Glasvlak>
              <div className="functie-tekst">
                <h2 id="vak-titel" className="titel">
                  Een site die past bij je vak
                </h2>
                <p className="tekst-groot zacht">Wie een keuken of een trap laat maken, wil eerst zien wat je kan. Daar is je site voor.</p>
                <Punten
                  kop="h3"
                  punten={[
                    ["Je realisaties per type", "Keukens, kasten, trappen: elk type een eigen plek, met je beste foto’s."],
                    ["Een aanvraag met de juiste info", "Soort project, budget en foto’s van de ruimte, nog voor je belt."],
                    ["Je werkgebied en je Google-profiel", "Mensen uit je regio vinden je zo op je site en in Google Maps."],
                  ]}
                />
                <p className="functie-noot">De aanvraag op maat van je vak zit in Groei en Pro.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sectie sectie--lijn" aria-labelledby="case-titel">
          <div className="wrap">
            <div className="functie functie--om">
              <CaseBeeld item={lvq} />
              <div className="functie-tekst">
                <span className="pil pil--licht">Case</span>
                <h2 id="case-titel" className="titel case-naam">
                  Zo ziet ons werk eruit
                </h2>
                <p className="tekst-groot zacht">
                  {lvq.wie}. Een ander vak dan het jouwe, maar we pakten het op dezelfde manier aan. Hun wijnen staan centraal, in
                  een eigen stijl die ook op gsm goed werkt.
                </p>
                <Link href="/cases" className="tekstlink">
                  Bekijk alle cases
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="sectie sectie--vlak" aria-labelledby="prijs-titel">
          <div className="wrap maatwerk-prijzen">
            <div className="maatwerk-prijzen-tekst">
              <h2 id="prijs-titel" className="titel">
                Eén vaste prijs per maand
              </h2>
              <p className="tekst-groot zacht">
                Voor de meeste makers is Groei de juiste keuze. Ontwerp, bouw, hosting en onderhoud zitten erin, en je betaalt niets
                vooraf.
              </p>
              <p className="prijzen-voorwaarden">
                Het abonnement loopt twaalf maanden en is daarna maandelijks opzegbaar. Alle prijzen excl. btw.
                <br />
                <Link href="/#prijzen">Vergelijk Start, Groei en Pro</Link>
              </p>
            </div>
            <PakketKaart pakket={groei} als="div" />
          </div>
        </section>

        <Werkwijze />

        <Vragen vragen={vragen} titel="Vragen van makers" />

        <Slot titel="Benieuwd hoe jouw werk" vervolg="online kan staan?" />
      </main>
      <Voettekst />
      <GsmBalk />
    </>
  );
}
