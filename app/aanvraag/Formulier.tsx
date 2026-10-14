"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Pijl } from "../_componenten/merk";
import { leesBron } from "@/lib/bron";
import { beroepen, doelen, type FormStatus } from "@/lib/formulier";
import { vraagVoorbeeldAan } from "./actie";

function Verstuur() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="knop" disabled={pending} aria-disabled={pending}>
      {pending ? "Even geduld…" : "Vraag je voorbeeld"}
      {!pending && <Pijl />}
    </button>
  );
}

function Fout({ veld, tekst }: { veld: string; tekst?: string }) {
  if (!tekst) return null;
  return (
    <p className="veld-fout" id={`${veld}-fout`}>
      {tekst}
    </p>
  );
}

export function Formulier({ beroep }: { beroep?: string }) {
  const [status, actie] = useActionState<FormStatus, FormData>(vraagVoorbeeldAan, {});
  const [geladen, setGeladen] = useState("");
  const [bron, setBron] = useState<Record<string, string>>({});
  const formulier = useRef<HTMLFormElement>(null);
  const f = status.fouten ?? {};
  const w = status.waarden;

  useEffect(() => {
    setGeladen(String(Date.now()));
    setBron(leesBron());
  }, []);

  useEffect(() => {
    formulier.current?.querySelector<HTMLElement>('[aria-invalid="true"], .formulier-melding')?.focus();
  }, [status]);

  const fout = (veld: keyof typeof f) =>
    f[veld] ? { "aria-invalid": true, "aria-describedby": `${veld}-fout` } : { "aria-invalid": false };

  return (
    <form className="formulier" action={actie} ref={formulier}>
      {status.melding && (
        <p className="formulier-melding" role="alert" tabIndex={-1}>
          {status.melding}
        </p>
      )}

      <div className="veld">
        <label htmlFor="zaak">Naam van je zaak</label>
        <input id="zaak" name="zaak" type="text" autoComplete="organization" placeholder="Je zaaknaam" required maxLength={120} defaultValue={w?.zaak} {...fout("zaak")} />
        <Fout veld="zaak" tekst={f.zaak} />
      </div>
      <div className="veld">
        <label htmlFor="beroep">Je beroep</label>
        <select id="beroep" name="beroep" required defaultValue={w?.beroep ?? beroep ?? ""} {...fout("beroep")}>
          <option value="" disabled>
            Kies je beroep
          </option>
          {beroepen.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <Fout veld="beroep" tekst={f.beroep} />
      </div>
      <fieldset className="veld" {...(f.hoofdberoep ? { "aria-describedby": "hoofdberoep-fout" } : {})}>
        <legend>Is dit je hoofdberoep?</legend>
        <div className="keuzes keuzes--rij">
          <label className="keuze">
            <input type="radio" name="hoofdberoep" value="ja" required defaultChecked={w?.hoofdberoep === "ja"} {...fout("hoofdberoep")} /> Ja
          </label>
          <label className="keuze">
            <input type="radio" name="hoofdberoep" value="nee" defaultChecked={w?.hoofdberoep === "nee"} /> Nee
          </label>
        </div>
        <Fout veld="hoofdberoep" tekst={f.hoofdberoep} />
      </fieldset>
      <div className="veld">
        <label htmlFor="gemeente">Gemeente of regio waar je werkt</label>
        <input id="gemeente" name="gemeente" type="text" autoComplete="address-level2" placeholder="Waar werk je?" required maxLength={80} defaultValue={w?.gemeente} {...fout("gemeente")} />
        <Fout veld="gemeente" tekst={f.gemeente} />
      </div>
      <fieldset className="veld" {...(f.doel ? { "aria-describedby": "doel-fout" } : {})}>
        <legend>Wat moet je website beter doen?</legend>
        <div className="keuzes">
          {doelen.map((d, i) => (
            <label key={d} className="keuze">
              <input type="checkbox" name="doel" value={d} defaultChecked={w?.doelen.includes(d)} {...(i === 0 ? fout("doel") : {})} /> {d}
            </label>
          ))}
        </div>
        <Fout veld="doel" tekst={f.doel} />
      </fieldset>
      <div className="veld">
        <label htmlFor="toelichting">
          Wil je nog iets kwijt? <span className="optioneel">(optioneel)</span>
        </label>
        <textarea id="toelichting" name="toelichting" rows={3} maxLength={1000} defaultValue={w?.toelichting} />
      </div>
      <div className="veld">
        <label htmlFor="huidig">
          Je huidige website, Facebook of Instagram <span className="optioneel">(optioneel)</span>
        </label>
        <input id="huidig" name="huidig" type="text" inputMode="url" placeholder="www.jouwzaak.be" maxLength={200} defaultValue={w?.huidig} />
      </div>
      <div className="veld">
        <label htmlFor="naam">Je naam</label>
        <input id="naam" name="naam" type="text" autoComplete="name" placeholder="Voornaam en naam" required maxLength={80} defaultValue={w?.naam} {...fout("naam")} />
        <Fout veld="naam" tekst={f.naam} />
      </div>
      <div className="veld">
        <label htmlFor="email">Je e-mailadres</label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="naam@jouwzaak.be" required maxLength={200} defaultValue={w?.email} {...fout("email")} />
        <Fout veld="email" tekst={f.email} />
      </div>

      <div className="valkuil" aria-hidden="true">
        <label htmlFor="website">Laat dit veld leeg</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="geladen" value={geladen} />
      {Object.entries(bron).map(([sleutel, waarde]) => (
        <input key={sleutel} type="hidden" name={`bron_${sleutel}`} value={waarde} />
      ))}

      <Verstuur />
      <p className="formulier-noot">
        We gebruiken je gegevens alleen om je aanvraag te behandelen. Komt er geen vervolg, dan wissen we ze na zes maanden. Meer in
        onze <a href="/privacy">privacyverklaring</a>.
      </p>
    </form>
  );
}
