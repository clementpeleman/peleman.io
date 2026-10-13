import Image from "next/image";
import ribbelglas from "@/public/beeld/ribbelglas.jpg";
import Link from "next/link";
import { cases, type Case } from "@/lib/cases";
import { Vinkje } from "../_componenten/merk";

type Punt = [string, string];

export function Punten({ punten, kop: Kop = "h4" }: { punten: Punt[]; kop?: "h3" | "h4" }) {
  return (
    <ul className="functie-punten">
      {punten.map(([titel, tekst]) => (
        <li key={titel}>
          <Vinkje />
          <div>
            <Kop className="punt-titel">{titel}</Kop>
            <p>{tekst}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Glasvlak({ label, pil = "Voorbeeld", vol, voorrang, children }: { label: string; pil?: string; vol?: boolean; voorrang?: boolean; children: React.ReactNode }) {
  return (
    <figure className="functie-beeld">
      <Image className="beeld-glas" src={ribbelglas} alt="" fill quality={55} priority={voorrang} sizes="(min-width: 900px) 600px, calc(100vw - 36px)" />
      <span className="pil functie-pil">{pil}</span>
      <div className={vol ? "functie-mock functie-mock--vol" : "functie-mock"} aria-hidden="true">
        {children}
      </div>
      <figcaption className="verborgen">{label}</figcaption>
    </figure>
  );
}

// Echte site op desktop, met de gsm-versie ervoor.
export function CaseBeeld({ item, pil, voorrang }: { item: Case; pil?: string; voorrang?: boolean }) {
  return (
    <Glasvlak label={item.alt} pil={pil ?? `${item.soort === "Klant" ? "Case" : "Eigen concept"} · ${item.naam}`} vol voorrang={voorrang}>
      <div className="case-desktop">
        <div className="browserbalk">
          <i />
          <i />
          <i />
          <span>{item.domein}</span>
        </div>
        <Image src={item.desktop} alt="" priority={voorrang} sizes="(min-width: 900px) 480px, 80vw" />
      </div>
      <div className="case-gsm">
        <Image src={item.gsm} alt="" sizes="(min-width: 900px) 160px, 28vw" />
      </div>
    </Glasvlak>
  );
}

export function AanvraagMock() {
  return (
    <div className="mock-gsm">
      <div className="mock-gsm-balk">jouwzaak.be</div>
      <div className="mock-gsm-inhoud">
        <p className="mock-kop">Vraag je project aan</p>
        <p className="mock-label">Wat wil je laten maken?</p>
        <div className="mock-chips">
          <span className="is-gekozen">Keuken</span>
          <span>Kast</span>
          <span>Trap</span>
          <span>Iets anders</span>
        </div>
        <p className="mock-label">Budget</p>
        <div className="mock-veld">
          €10.000 – €20.000
          <svg viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="mock-label">Foto’s van de ruimte</p>
        <div className="mock-fotos">
          <i />
          <i />
          <span>+</span>
        </div>
        <div className="mock-knop">Verstuur aanvraag</div>
      </div>
    </div>
  );
}

export function OverzichtMock() {
  const staven = [38, 52, 44, 61, 57, 72, 66, 84];
  return (
    <>
      <div className="mock-kaart mock-overzicht">
        <p className="mock-kop">Maandoverzicht</p>
        <p className="mock-sub">jouwzaak.be</p>
        <p className="mock-label">Bezoek</p>
        <div className="mock-staven">
          {staven.map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mock-regel">
          <span>Aanpassingen</span>
          <b>2 van 5 gebruikt</b>
        </div>
        <div className="mock-voortgang"><i style={{ width: "40%" }} /></div>
        <div className="mock-regel">
          <span>Nieuwe review op Google</span>
          <b className="mock-sterren">★★★★★</b>
        </div>
        <div className="mock-regel">
          <span>Updates en back-ups</span>
          <b className="mock-ok">In orde</b>
        </div>
      </div>
      <div className="mock-kaart mock-melding">
        <span className="mock-melding-stip" />
        <div>
          <b>Aanpassing klaar</b>
          <span>Nieuwe realisatie staat online</span>
        </div>
      </div>
    </>
  );
}

export function Functies() {
  return (
    <section className="sectie" aria-labelledby="aanbod-titel">
      <div className="wrap">
        <h2 id="aanbod-titel" className="titel sectie-kop">
          Jouw zaak in beeld.
          <br />
          De rest geregeld.
        </h2>

        <div className="functie">
          <CaseBeeld item={cases[0]} />
          <div className="functie-tekst">
            <h3 className="subtitel">Eigen aan jouw zaak.</h3>
            <p className="tekst-groot zacht">
              Je werk, je diensten en je regio. Duidelijke teksten en echte foto’s, goed leesbaar op je gsm.
            </p>
            <Punten
              punten={[
                ["Een functie voor jouw vak", "Bijvoorbeeld een aanvraag met soort project, budget en foto’s."],
                ["Je Google-profiel in orde", "Zodat je zaak ook buiten je site goed gevonden wordt."],
                ["Reviews op je site", "Met een kant-en-klaar reviewverzoek voor je klanten."],
              ]}
            />
            <p className="functie-noot">De functie voor je vak en de reviews zitten in Groei en Pro.</p>
            <Link href="/cases" className="tekstlink">
              Bekijk onze cases
            </Link>
          </div>
        </div>

        <div className="functie functie--om">
          <Glasvlak label="Voorbeeld van een maandoverzicht met bezoek, aanpassingen en een nieuwe review.">
            <OverzichtMock />
          </Glasvlak>
          <div className="functie-tekst">
            <h3 className="subtitel">Een site die bijgehouden wordt.</h3>
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
