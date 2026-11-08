import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Pijl } from "../_componenten/merk";
import { CaseBeeld, Punten } from "../_secties/Functies";
import { Slot } from "../_secties/Slot";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: "Websites die ik maakte, van dichtbij: H16, LVQ.wine en mijn eigen concept Tourage.",
};

export default function Cases() {
  return (
    <>
      <Navigatie />
      <main>
        <section className="cases-kop" aria-labelledby="cases-titel">
          <div className="wrap">
            <h1 id="cases-titel">Wat ik al maakte</h1>
            <p className="tekst-groot zacht">
              Per site lees je wat de zaak doet en wat ik bouwde. De beelden tonen de site op desktop en op gsm.
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

        <Slot titel="Benieuwd hoe je site" vervolg="eruit kan zien?" />
      </main>
      <Voettekst />
    </>
  );
}
