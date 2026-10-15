import { inclBtw, type Pakket } from "@/lib/gegevens";
import { Knop, Vinkje } from "../_componenten/merk";

export function PakketKaart({ pakket: p, als = "li" }: { pakket: Pakket; als?: "li" | "div" }) {
  const Element = als;
  return (
    <Element className={p.uitgelicht ? "pakket pakket--uitgelicht" : "pakket"}>
      <div className="pakket-kop">
        <h3 className="subtitel">{p.naam}</h3>
        {p.uitgelicht && <span className="pil">Aanbevolen</span>}
      </div>
      <p className="pakket-zin">{p.zin}</p>
      <p className="pakket-prijs">€{p.prijs}</p>
      <p className="pakket-btw">
        per maand, excl. btw
        <br />
        {inclBtw(p.prijs)} incl. btw
      </p>
      {p.uitgelicht && (
        <p className="pakket-lancering">
          <b>Lanceringsaanbod</b> Voor de eerste drie zaken €79 per maand in het eerste jaar, in ruil voor een case.
        </p>
      )}
      <ul className="pakket-inhoud">
        {p.inhoud.map((regel) => (
          <li key={regel}>
            <Vinkje />
            {regel}
          </li>
        ))}
      </ul>
      <Knop variant={p.uitgelicht ? "wit" : "rand"} className="pakket-knop" />
    </Element>
  );
}
