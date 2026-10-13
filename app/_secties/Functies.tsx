import { Vinkje } from "../_componenten/merk";

const glas = "https://images.unsplash.com/photo-1652862730507-32988eb23a67?auto=format&fit=crop&q=70&w=1200";

type Punt = [string, string];

function Punten({ punten }: { punten: Punt[] }) {
  return (
    <ul className="functie-punten">
      {punten.map(([titel, tekst]) => (
        <li key={titel}>
          <Vinkje />
          <div>
            <h4>{titel}</h4>
            <p>{tekst}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Glasvlak({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="functie-beeld">
      <img className="beeld-glas" src={glas} alt="" loading="lazy" />
      <span className="pil functie-pil">Voorbeeld</span>
      <div className="functie-mock" aria-hidden="true">
        {children}
      </div>
      <figcaption className="verborgen">{label}</figcaption>
    </figure>
  );
}

function AanvraagMock() {
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

function OverzichtMock() {
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
          <Glasvlak label="Voorbeeld van een aanvraagformulier voor maatwerk op een gsm.">
            <AanvraagMock />
          </Glasvlak>
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
