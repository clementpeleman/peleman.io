import Image from "next/image";
import ribbelglas from "@/public/beeld/ribbelglas.jpg";
import type { Case } from "@/lib/cases";
import type { AanvraagVoorbeeld } from "@/lib/vakken";
import { Iphone } from "../_componenten/Iphone";

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
        <Iphone src={item.gsm} domein={item.domein} statusKleur={item.statusKleur} sizes={groot ? "(min-width: 1304px) 240px, 30vw" : "(min-width: 900px) 160px, 28vw"} />
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
