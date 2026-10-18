import { contact } from "@/lib/gegevens";
import { Navigatie, Voettekst } from "./kader";

// Concepten, op te maken door Claude en na te lezen door een jurist vóór de livegang (doc 06).
export const bijgewerkt = "18 oktober 2026";

export function Onderneming() {
  return (
    <>
      peleman.io, {contact.rechtsvorm} van {contact.naam}, met ondernemingsnummer {contact.ondernemingsnummer}{" "}
      en adres {contact.adres}
    </>
  );
}

export function JuridischePagina({ titel, intro, children }: { titel: string; intro: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Navigatie />
      <main className="juridisch">
        <div className="wrap juridisch-rij">
          <header className="juridisch-kop">
            <h1>{titel}</h1>
            <p className="tekst-groot zacht">{intro}</p>
            <p className="juridisch-datum">Laatst bijgewerkt op {bijgewerkt}</p>
          </header>
          <div className="juridisch-tekst">{children}</div>
        </div>
      </main>
      <Voettekst />
    </>
  );
}
