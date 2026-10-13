import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Pijl } from "../_componenten/merk";
import { CaseBeeld, Punten } from "../_secties/Functies";
import { Lancering } from "../_secties/Pakket";
import { Slot } from "../_secties/Slot";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: "Websites die we maakten, van dichtbij: LVQ.wine, wijnimporteur in Oosterzele, en ons eigen concept Tourage.",
};

export default function Cases() {
  return (
    <>
      <Navigatie />
      <main>
        <section className="cases-kop" aria-labelledby="cases-titel">
          <div className="wrap">
            <p className="bovenregel">Cases</p>
            <h1 id="cases-titel">Werk dat we maakten.</h1>
            <p className="tekst-groot zacht">
              Echte sites, van dichtbij: wat de zaak doet, wat de site regelt, en hoe ze eruitziet op desktop en gsm.
            </p>
          </div>
        </section>

        <section className="sectie cases-lijst" aria-label="Cases">
          <div className="wrap">
            {cases.map((c, i) => (
              <article key={c.naam} className={i % 2 ? "functie functie--om" : "functie"} aria-labelledby={`case-${i}`}>
                <CaseBeeld item={c} voorrang={i === 0} />
                <div className="functie-tekst">
                  <span className={c.soort === "Klant" ? "pil pil--licht" : "pil pil--concept"}>{c.soort}</span>
                  <h2 id={`case-${i}`} className="titel case-naam">
                    {c.naam}
                  </h2>
                  <p className="case-wie">{c.wie}</p>
                  <p className="tekst-groot zacht">{c.intro}</p>
                  <Punten punten={c.punten} kop="h3" />
                  {c.noot && <p className="functie-noot">{c.noot}</p>}
                  <a className="tekstlink" href={c.url} target="_blank" rel="noopener">
                    Bekijk {c.domein}
                    <Pijl />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sectie sectie--vlak" aria-label="Jouw zaak als volgende case">
          <div className="wrap volgende-case">
            <div>
              <h2 className="titel">Jouw zaak als volgende case?</h2>
              <p className="tekst-groot zacht">
                We zoeken drie zaken die hun nieuwe site met ons willen tonen. Je krijgt Groei een jaar lang aan de prijs van Start.
              </p>
            </div>
            <Lancering titel="Voor de eerste drie zaken." />
          </div>
        </section>

        <Slot />
      </main>
      <Voettekst />
    </>
  );
}
