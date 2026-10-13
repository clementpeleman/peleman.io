import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Pijl } from "../_componenten/merk";
import { contact, volgendeVrijeWeek } from "@/lib/gegevens";
import { vraagVoorbeeldAan } from "./actie";

export const metadata: Metadata = {
  title: "Gratis voorbeeld aanvragen",
  description: "Vertel ons over je zaak. We laten binnen één werkdag weten of we een gratis voorbeeld van je website maken.",
};

const beroepen = [
  "Schrijnwerk of interieurbouw",
  "Keukens op maat",
  "Tuinaanleg",
  "Interieurarchitect",
  "Feestzaal",
  "Cateraar",
  "Advocaat",
  "Dierenarts",
  "Ander",
];

const doelen = [
  "Beter tonen wat ik doe",
  "Betere aanvragen, met de juiste info",
  "Personeel vinden",
  "Ik heb nog geen website",
  "Iets anders",
];

export default function Aanvraag() {
  return (
    <>
      <Navigatie eenvoudig />
      <main className="aanvraag">
        <div className="wrap aanvraag-rij">
          <div className="aanvraag-intro">
            <h1>Gratis voorbeeld aanvragen</h1>
            <p className="tekst-groot zacht">
              Vertel ons over je zaak. We bekijken je aanvraag en laten binnen één werkdag weten of we een voorbeeld maken.
            </p>
            <ol className="aanvraag-stappen">
              <li><span>01</span>Je vult dit formulier in. Twee minuten.</li>
              <li><span>02</span>Binnen één werkdag hoor je of we een voorbeeld maken, met een concrete leverdatum.</li>
              <li><span>03</span>Je bekijkt je voorbeeld en beslist. Het voorbeeld is gratis.</li>
            </ol>
            <p className="aanvraag-hulp">
              We maken één voorbeeld per week.
              {volgendeVrijeWeek && <> Eerstvolgende vrije plek: {volgendeVrijeWeek}.</>} Liever eerst bellen?{" "}
              <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
            </p>
          </div>

          <form className="formulier" action={vraagVoorbeeldAan}>
            <div className="veld">
              <label htmlFor="zaak">Naam van je zaak</label>
              <input id="zaak" name="zaak" type="text" autoComplete="organization" placeholder="Je zaaknaam" required />
            </div>
            <div className="veld">
              <label htmlFor="beroep">Je beroep</label>
              <select id="beroep" name="beroep" required defaultValue="">
                <option value="" disabled>Kies je beroep</option>
                {beroepen.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <fieldset className="veld">
              <legend>Is dit je hoofdberoep?</legend>
              <div className="keuzes keuzes--rij">
                <label className="keuze"><input type="radio" name="hoofdberoep" value="ja" required /> Ja</label>
                <label className="keuze"><input type="radio" name="hoofdberoep" value="nee" /> Nee</label>
              </div>
            </fieldset>
            <div className="veld">
              <label htmlFor="gemeente">Gemeente of regio waar je werkt</label>
              <input id="gemeente" name="gemeente" type="text" autoComplete="address-level2" placeholder="Waar werk je?" required />
            </div>
            <fieldset className="veld">
              <legend>Wat moet je website beter doen?</legend>
              <div className="keuzes">
                {doelen.map((d) => (
                  <label key={d} className="keuze"><input type="checkbox" name="doel" value={d} /> {d}</label>
                ))}
              </div>
            </fieldset>
            <div className="veld">
              <label htmlFor="toelichting">Wil je nog iets kwijt? <span className="optioneel">(optioneel)</span></label>
              <textarea id="toelichting" name="toelichting" rows={3} />
            </div>
            <div className="veld">
              <label htmlFor="huidig">Je huidige website, Facebook of Instagram <span className="optioneel">(optioneel)</span></label>
              <input id="huidig" name="huidig" type="text" inputMode="url" placeholder="www.jouwzaak.be" />
            </div>
            <div className="veld">
              <label htmlFor="naam">Je naam</label>
              <input id="naam" name="naam" type="text" autoComplete="name" placeholder="Voornaam en naam" required />
            </div>
            <div className="veld">
              <label htmlFor="email">Je e-mailadres</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="naam@jouwzaak.be" required />
            </div>
            <button type="submit" className="knop">
              Vraag je voorbeeld
              <Pijl />
            </button>
            <p className="formulier-noot">
              We gebruiken je gegevens alleen om je aanvraag te behandelen. Komt er geen vervolg, dan wissen we ze na zes maanden.
            </p>
          </form>
        </div>
      </main>
      <Voettekst />
    </>
  );
}
