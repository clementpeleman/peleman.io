import { aanbod, euro } from "@/lib/gegevens";
import { Knop, Vinkje } from "../_componenten/merk";

// Het aanbod in twee kaarten: de site eenmalig, daarna het maandbedrag. Gebruikt op de homepage en de sectorpagina's.
export function Prijzen({ id = "prijzen", knop }: { id?: string; knop?: string }) {
  return (
    <section className="sectie sectie--vlak" id={id} aria-labelledby={`${id}-titel`}>
      <div className="wrap">
        <h2 id={`${id}-titel`} className="titel">
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
            <Knop className="pakket-knop" href={knop} />
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
  );
}
