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
          <p>{tekst}</p>
        </li>
      ))}
    </ul>
  );
}

export function Glasvlak({ label, pil = "Voorbeeld", vol, voorrang, groot, children }: { label: string; pil?: string; vol?: boolean; voorrang?: boolean; groot?: boolean; children: React.ReactNode }) {
  return (
    <figure className={groot ? "functie-beeld functie-beeld--groot" : "functie-beeld"}>
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

// Het maandoverzicht zoals de klant het krijgt: een korte mail, geen grafieken (doc 13, M13).
export function MaandMail() {
  const vorige = new Date();
  vorige.setDate(0);
  const maand = vorige.toLocaleDateString("nl-BE", { month: "long" });
  return (
    <div className="mock-mail">
      <div className="mock-mail-kop">
        <p>
          <span>Van</span>Clément, peleman.io
        </p>
        <p>
          <span>Onderwerp</span>Je website in {maand}
        </p>
      </div>
      <div className="mock-mail-tekst">
        <p>Dag An,</p>
        <p>
          <b>Wat we deden:</b> twee nieuwe realisaties op je site gezet en de updates gedaan.
        </p>
        <p>
          <b>Je site:</b> online, back-up gemaakt op {vorige.getDate()} {maand}.
        </p>
        <p>
          <b>Tip:</b> vraag een tevreden klant om een review op Google.
        </p>
        <p>Clément, peleman.io</p>
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
              We tonen wat je doet en waar je werkt, met duidelijke teksten en echte foto’s. Alles leest ook goed op je gsm.
            </p>
            <Punten
              punten={[
                ["Een functie voor jouw vak", "Bijvoorbeeld een aanvraag met soort project, budget en foto’s."],
                ["Je Google-profiel in orde", "Dan vinden mensen je ook buiten je site, bijvoorbeeld in Google Maps."],
                ["Reviews op je site", "Je krijgt een kant-en-klaar bericht om je klanten om een review te vragen."],
              ]}
            />
            <p className="functie-noot">De functie voor je vak en de reviews zitten in Groei en Pro.</p>
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
                ["Altijd bijgewerkt", "Hosting, beveiliging, back-ups en updates zitten erin."],
                ["Aanpassingen binnen vijf werkdagen", "Drie, vijf of tien per maand, afhankelijk van je pakket."],
                ["Een kort maandoverzicht", "Wat er op je site gebeurde, in Groei en Pro."],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
