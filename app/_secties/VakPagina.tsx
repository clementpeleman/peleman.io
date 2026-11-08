import type { Metadata } from "next";
import Link from "next/link";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { Knop } from "../_componenten/merk";
import { RibbelglasFoto } from "../_componenten/Ribbelglas";
import { AanvraagMock, CaseBeeld, Glasvlak, Punten } from "./Functies";
import { GsmBalk } from "./GsmBalk";
import { Prijzen } from "./Prijzen";
import { Slot } from "./Slot";
import { Vragen } from "./Vragen";
import { Werkwijze } from "./Werkwijze";
import { lvq } from "@/lib/cases";
import { aanbod, euro } from "@/lib/gegevens";
import type { Vak } from "@/lib/vakken";

export function vakMetadata(vak: Vak): Metadata {
  return { title: vak.titel, description: vak.beschrijving };
}

// Landingspagina voor één vak. Zonder foto blijft de hero alleen tekst.
export function VakPagina({ vak }: { vak: Vak }) {
  const aanvraag = vak.beroep ? `/aanvraag?beroep=${encodeURIComponent(vak.beroep)}` : "/aanvraag";

  const intro = (
    <div className="maatwerk-intro">
      <h1 id="vak-hero-titel">
        {vak.kop[0]} <span>{vak.kop[1]}</span>
      </h1>
      <p className="tekst-groot">{vak.intro}</p>
      <div className="hero-actie" data-hero-knop>
        <Knop href={aanvraag} />
        <p className="voorwaarden">
          Vanaf {euro(aanbod.site)}, daarna €{aanbod.perMaand} per maand. Excl. btw.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <a className="overslaan" href="#inhoud">Naar de inhoud</a>
      <Navigatie />
      <main id="inhoud">
        <section className="hero maatwerk-hero" aria-labelledby="vak-hero-titel">
          {vak.foto ? (
            <div className="wrap maatwerk-rij">
              {intro}
              <figure className="maatwerk-beeld">
                <RibbelglasFoto
                  src={vak.foto.src}
                  alt={vak.foto.alt}
                  preload
                  sizes="(min-width: 900px) 560px, calc(100vw - 36px)"
                  marges={vak.foto.marges}
                />
              </figure>
            </div>
          ) : (
            <div className="wrap vak-zonder-beeld">{intro}</div>
          )}
        </section>

        <section className="sectie sectie--lijn" aria-labelledby="herkenning-titel">
          <div className="wrap">
            <h2 id="herkenning-titel" className="titel sectie-kop">
              {vak.herkenning.titel}
            </h2>
            <ul className="herkenning">
              {vak.herkenning.punten.map(([titel, tekst]) => (
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
              <Glasvlak label={vak.vak.aanvraag.label}>
                <AanvraagMock aanvraag={vak.vak.aanvraag} />
              </Glasvlak>
              <div className="functie-tekst">
                <h2 id="vak-titel" className="titel">
                  {vak.vak.titel}
                </h2>
                <p className="tekst-groot zacht">{vak.vak.tekst}</p>
                <Punten kop="h3" punten={vak.vak.punten} />
              </div>
            </div>
          </div>
        </section>

        <section className="sectie sectie--lijn" aria-labelledby="case-titel">
          <div className="wrap">
            <div className="functie functie--om">
              <CaseBeeld item={lvq} />
              <div className="functie-tekst">
                <h2 id="case-titel" className="titel">
                  Zo ziet mijn werk eruit
                </h2>
                <p className="tekst-groot zacht">
                  {lvq.wie}.{" "}
                  {vak.caseTekst ??
                    "Een ander vak dan het jouwe, maar ik pakte het op dezelfde manier aan. Hun wijnen staan centraal, in een eigen stijl die ook op gsm goed werkt."}
                </p>
                <Link href="/cases" className="tekstlink">
                  Bekijk alle cases
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Prijzen id="prijs" knop={aanvraag} />

        <Werkwijze titel="Hoe het gaat" />

        <Vragen vragen={vak.vragen.lijst} titel={vak.vragen.titel} />

        <Slot titel={vak.slot[0]} vervolg={vak.slot[1]} knop={aanvraag} />
      </main>
      <Voettekst />
      <GsmBalk href={aanvraag} />
    </>
  );
}
