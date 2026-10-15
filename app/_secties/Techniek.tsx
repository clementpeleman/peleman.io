// Echte stukjes van een site in plaats van een opsomming: adresbalk, zoekresultaat, de stand van je site en een aanvraag in je CRM.
export function Techniek() {
  const vorige = new Date();
  vorige.setDate(0);
  const backup = vorige.toLocaleDateString("nl-BE", { day: "numeric", month: "long" });
  return (
    <section className="sectie sectie--lijn" aria-labelledby="techniek-titel">
      <div className="wrap">
        <h2 id="techniek-titel" className="titel sectie-kop">
          Wat er technisch in zit
        </h2>
        <div className="techniek">
          <figure className="techniek-vak" data-beweeg="">
            <div className="techniek-beeld" aria-hidden="true">
              <div className="adresbalk">
                <svg viewBox="0 0 16 16">
                  <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" fill="currentColor" />
                  <path className="slot-beugel" d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                jouwzaak.be
              </div>
            </div>
            <figcaption>Beveiligd domein op jouw naam</figcaption>
          </figure>
          <figure className="techniek-vak" data-beweeg="">
            <div className="techniek-beeld" aria-hidden="true">
              <div className="zoekresultaat">
                <div className="zoek-site">
                  <i>J</i>
                  <p>
                    Jouw Zaak
                    <span>https://jouwzaak.be › realisaties</span>
                  </p>
                </div>
                <p className="zoek-titel">Keukens op maat in Gent | Jouw Zaak</p>
                <p className="zoek-tekst">Bekijk onze realisaties en vraag je project aan. Keukens, kasten en trappen op maat, in Gent en omgeving.</p>
              </div>
            </div>
            <figcaption>Zo verschijn je in Google</figcaption>
          </figure>
          <figure className="techniek-vak" data-beweeg="">
            <div className="techniek-beeld" aria-hidden="true">
              <div className="statuskaart">
                <p className="statuskaart-kop">jouwzaak.be</p>
                <dl>
                  <div>
                    <dt>Site</dt>
                    <dd>Online</dd>
                  </div>
                  <div>
                    <dt>Laatste back-up</dt>
                    <dd>{backup}</dd>
                  </div>
                  <div>
                    <dt>Updates</dt>
                    <dd>Bijgewerkt</dd>
                  </div>
                </dl>
              </div>
            </div>
            <figcaption>Hosting, updates en back-ups</figcaption>
          </figure>
          <figure className="techniek-vak" data-beweeg="">
            <div className="techniek-beeld" aria-hidden="true">
              <div className="crm">
                <div className="crm-kolom">
                  <p className="crm-kop">
                    Nieuw <span>2</span>
                  </p>
                  <div className="crm-kaart crm-nieuw">
                    <p className="crm-naam">Keuken op maat</p>
                    <p className="crm-info">Gent · €10.000 tot €20.000</p>
                    <p className="crm-bron">Via je website · zojuist</p>
                  </div>
                  <div className="crm-kaart">
                    <p className="crm-naam">Trap in eik</p>
                    <p className="crm-info">Destelbergen · 3 foto’s</p>
                  </div>
                </div>
                <div className="crm-kolom">
                  <p className="crm-kop">
                    Offerte <span>1</span>
                  </p>
                  <div className="crm-kaart">
                    <p className="crm-naam">Inbouwkast</p>
                    <p className="crm-info">Merelbeke · €4.500</p>
                  </div>
                </div>
              </div>
            </div>
            <figcaption>Aanvragen komen automatisch in jouw CRM</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
