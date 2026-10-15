import Image from "next/image";
import ribbelglas from "@/public/beeld/ribbelglas.jpg";
import Link from "next/link";
import { lvq, type Case } from "@/lib/cases";
import type { AanvraagVoorbeeld } from "@/lib/vakken";

type Punt = [string, string];

export function Punten({ punten, kop: Kop = "h4" }: { punten: Punt[]; kop?: "h3" | "h4" }) {
  return (
    <ul className="functie-punten">
      {punten.map(([titel, tekst]) => (
        <li key={titel}>
          <Kop className="punt-titel">{titel}</Kop>
          {tekst && <p>{tekst}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Glasvlak({ label, pil = "Voorbeeld", vol, voorrang, groot, children }: { label: string; pil?: string; vol?: boolean; voorrang?: boolean; groot?: boolean; children: React.ReactNode }) {
  return (
    <figure className={groot ? "functie-beeld functie-beeld--groot" : "functie-beeld"} data-beweeg="">
      <Image className="beeld-glas" src={ribbelglas} alt="" fill quality={55} preload={voorrang} sizes={groot ? "(min-width: 1304px) 1240px, calc(100vw - 36px)" : "(min-width: 900px) 600px, calc(100vw - 36px)"} />
      <span className="pil functie-pil">{pil}</span>
      <div className={vol ? "functie-mock functie-mock--vol" : "functie-mock"} aria-hidden="true">
        {children}
      </div>
      <figcaption className="verborgen">{label}</figcaption>
    </figure>
  );
}

// Echte site op desktop, met de gsm-versie ervoor.
export function CaseBeeld({ item, pil, voorrang, groot }: { item: Case; pil?: string; voorrang?: boolean; groot?: boolean }) {
  return (
    <Glasvlak label={item.alt} pil={pil ?? `${item.soort === "Klant" ? "Case" : "Eigen concept"} · ${item.naam}`} vol voorrang={voorrang} groot={groot}>
      <div className="case-desktop">
        <div className="browserbalk">
          <span>{item.domein}</span>
        </div>
        <Image src={item.desktop} alt="" loading={voorrang ? "eager" : undefined} sizes={groot ? "(min-width: 1304px) 900px, 86vw" : "(min-width: 900px) 480px, 80vw"} />
      </div>
      <div className="case-gsm">
        <Image src={item.gsm} alt="" sizes={groot ? "(min-width: 1304px) 240px, 30vw" : "(min-width: 900px) 160px, 28vw"} />
      </div>
    </Glasvlak>
  );
}

export function AanvraagMock({ aanvraag }: { aanvraag: AanvraagVoorbeeld }) {
  return (
    <div className="mock-gsm">
      <div className="mock-gsm-balk">jouwzaak.be</div>
      <div className="mock-gsm-inhoud">
        <p className="mock-kop">{aanvraag.kop}</p>
        <p className="mock-label">{aanvraag.vraag}</p>
        <div className="mock-chips">
          {aanvraag.keuzes.map((keuze, i) => (
            <span key={keuze} className={i === 0 ? "is-gekozen" : undefined}>
              {keuze}
            </span>
          ))}
        </div>
        {aanvraag.velden.map(([label, waarde]) => (
          <div key={label} className="mock-gsm-veld">
            <p className="mock-label">{label}</p>
            <div className="mock-veld">
              {waarde}
              <svg viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        ))}
        {aanvraag.fotos && (
          <>
            <p className="mock-label">{aanvraag.fotos}</p>
            <div className="mock-fotos">
              <i />
              <i />
              <span>+</span>
            </div>
          </>
        )}
        <div className="mock-knop">Verstuur aanvraag</div>
      </div>
    </div>
  );
}

// Het maandoverzicht zoals de klant het krijgt: een gewone mail van Clément, geen grafieken (doc 13, M13).
export function MaandMail() {
  const nu = new Date();
  const vorige = new Date(nu.getFullYear(), nu.getMonth(), 0);
  const maand = vorige.toLocaleDateString("nl-BE", { month: "long" });
  const verstuurd = new Date(nu.getFullYear(), nu.getMonth(), 1).toLocaleDateString("nl-BE", { day: "numeric", month: "short" });
  return (
    <div className="mock-mail">
      <p className="mock-mail-onderwerp">Je website in {maand}</p>
      <div className="mock-mail-van">
        <i>C</i>
        <div>
          <p>
            <b>Clément van peleman.io</b> <span>clement@peleman.io</span>
          </p>
          <p className="mock-mail-aan">aan An</p>
        </div>
        <span className="mock-mail-tijd">{verstuurd}</span>
      </div>
      <div className="mock-mail-tekst">
        <p>Dag An,</p>
        <p>
          <b>Wat we deden:</b> de keuken uit Merelbeke en de trap uit Destelbergen staan nu bij je realisaties. De updates zijn ook
          gedaan.
        </p>
        <p>
          <b>Je site:</b> online, back-up gemaakt op {vorige.getDate()} {maand}.
        </p>
        <p>
          <b>Tip:</b> die keuken is een mooi project om een review voor te vragen.
        </p>
        <p>
          Groeten,
          <br />
          Clément
        </p>
      </div>
      <div className="mock-mail-acties">
        <span>
          <svg viewBox="0 0 16 16"><path d="M6.5 4 2.5 8l4 4M3 8h6.5a4 4 0 0 1 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Beantwoorden
        </span>
        <span>Doorsturen</span>
      </div>
    </div>
  );
}

export function Functies() {
  return (
    <section className="sectie" aria-labelledby="aanbod-titel">
      <div className="wrap">
        <h2 id="aanbod-titel" className="titel sectie-kop">
          Een site over jouw zaak, die wij bijhouden
        </h2>

        <div className="functie">
          <CaseBeeld item={lvq} />
          <div className="functie-tekst">
            <h3 className="subtitel">Eigen aan jouw zaak</h3>
            <p className="tekst-groot zacht">
              We tonen wat je doet en waar je werkt, met duidelijke teksten en echte foto’s.
            </p>
            <Punten
              punten={[
                ["Een aanvraag op maat van je vak", ""],
                ["Je Google-profiel in orde", ""],
                ["Reviews op je site", ""],
              ]}
            />
            <p className="functie-noot">De aanvraag op maat en de reviews zitten in Groei en Pro.</p>
            <Link href="/cases" className="tekstlink">
              Bekijk onze cases
            </Link>
          </div>
        </div>

        <div className="functie functie--om">
          <Glasvlak label="Voorbeeld van het maandoverzicht: een korte mail met wat we deden en hoe je site het doet.">
            <MaandMail />
          </Glasvlak>
          <div className="functie-tekst">
            <h3 className="subtitel">Wij houden je site bij</h3>
            <p className="tekst-groot zacht">Een nieuwe realisatie of andere openingsuren? Geef ze door, wij zetten ze erop.</p>
            <Punten
              punten={[
                ["Aanpassingen binnen vijf werkdagen", ""],
                ["Een kort maandoverzicht per mail", ""],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
