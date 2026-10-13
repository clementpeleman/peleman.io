import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Pijl } from "../_componenten/merk";
import { CaseBeeld, Punten } from "../_secties/Functies";
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
              <article key={c.naam} className="case-groot" aria-labelledby={`case-${i}`}>
                <CaseBeeld item={c} voorrang={i === 0} groot />
                <div className="case-groot-tekst">
                  <div>
                    <span className={c.soort === "Klant" ? "pil pil--licht" : "pil pil--concept"}>{c.soort}</span>
                    <h2 id={`case-${i}`} className="titel case-naam">
                      {c.naam}
                    </h2>
                    <p className="case-wie">{c.wie}</p>
                    <a className="tekstlink" href={c.url} target="_blank" rel="noopener">
                      Bekijk {c.domein}
                      <Pijl />
                    </a>
                  </div>
                  <div>
                    <p className="tekst-groot zacht">{c.intro}</p>
                    <Punten punten={c.punten} kop="h3" />
                    {c.noot && <p className="functie-noot">{c.noot}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Slot
          pil="Lanceringsaanbod"
          titel="Jouw zaak als"
          vervolg="volgende case?"
          tekst="De eerste drie zaken krijgen Groei een jaar lang aan €79 per maand. In ruil maken we samen een case met foto’s en een review."
        />
      </main>
      <Voettekst />
    </>
  );
}
