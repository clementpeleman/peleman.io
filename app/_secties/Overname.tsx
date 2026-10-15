"use client";

import { useId, useState } from "react";
import { euro, overname, overnameprijs, pakketten } from "@/lib/gegevens";

const tabelMaanden = [12, 24, 36, 48];

export function Overname() {
  const id = useId();
  const [naam, setNaam] = useState("Groei");
  const [maanden, setMaanden] = useState(24);
  const pakket = pakketten.find((p) => p.naam === naam) ?? pakketten[1];
  const prijs = overnameprijs(pakket.bouwwaarde, maanden);
  const opBodem = maanden >= overname.bodemNa;

  return (
    <div className="overname">
      <div className="overname-uitleg">
        <h3 className="subtitel">Liever later zelf eigenaar?</h3>
        <p className="zacht">
          Na twaalf maanden kan je je site overnemen, aan een prijs die elke maand daalt.
        </p>
      </div>

      <div className="overname-reken">
        <fieldset className="overname-keuze" style={{ "--keuze": Math.max(0, pakketten.findIndex((p) => p.naam === naam)) } as React.CSSProperties}>
          <legend className="verborgen">Pakket</legend>
          {pakketten.map((p) => (
            <label key={p.naam} className={p.naam === naam ? "is-gekozen" : undefined}>
              <input type="radio" name={`${id}-pakket`} value={p.naam} checked={p.naam === naam} onChange={() => setNaam(p.naam)} />
              {p.naam}
            </label>
          ))}
        </fieldset>

        <label className="overname-schuif" htmlFor={`${id}-maanden`}>
          <span>Klant sinds</span>
          <b>{maanden} maanden</b>
        </label>
        <input
          id={`${id}-maanden`}
          type="range"
          min={overname.vanaf}
          max={overname.tot}
          step={1}
          value={maanden}
          onChange={(e) => setMaanden(Number(e.target.value))}
          aria-valuetext={`${maanden} maanden`}
          style={{ "--vulling": `${((maanden - overname.vanaf) / (overname.tot - overname.vanaf)) * 100}%` } as React.CSSProperties}
        />

        <div className="overname-uitkomst">
          <div>
            <span>Overnameprijs</span>
            <output htmlFor={`${id}-maanden`} aria-live="polite">
              {euro(prijs)}
            </output>
          </div>
          <div>
            <span>Meteen kopen</span>
            <b>{euro(pakket.bouwwaarde)}</b>
          </div>
        </div>
        <p className="overname-noot">
          {opBodem ? "Vanaf 48 maanden daalt de prijs niet verder. " : ""}
          Bedragen excl. btw. Na een overname blijft hosting mogelijk aan €29 per maand.
        </p>

        <details className="overname-tabel">
          <summary>Alle bedragen</summary>
          <table>
            <thead>
              <tr>
                <th scope="col">Na</th>
                {pakketten.map((p) => (
                  <th key={p.naam} scope="col">{p.naam}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Meteen</th>
                {pakketten.map((p) => (
                  <td key={p.naam}>{euro(p.bouwwaarde)}</td>
                ))}
              </tr>
              {tabelMaanden.map((m) => (
                <tr key={m}>
                  <th scope="row">{m === overname.bodemNa ? `${m}+ mnd` : `${m} mnd`}</th>
                  {pakketten.map((p) => (
                    <td key={p.naam}>{euro(overnameprijs(p.bouwwaarde, m))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </div>
  );
}
