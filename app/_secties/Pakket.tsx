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
      <ul className="pakket-inhoud">
        {p.inhoud.map((regel) => (
          <li key={regel}>
            <Vinkje />
            {regel}
          </li>
        ))}
      </ul>
      <Knop variant={p.uitgelicht ? "wit" : "groen"} className="pakket-knop" />
    </Element>
  );
}

export function Lancering({ titel = "Voor de eerste drie zaken.", kop: Kop = "h3" }: { titel?: string; kop?: "h2" | "h3" }) {
  return (
    <div className="lancering">
      <span className="pil pil--licht">Lanceringsaanbod</span>
      <Kop className="subtitel">{titel}</Kop>
      <p className="zacht">
        Groei aan €79 per maand tijdens je eerste jaar. Daarna €119. In ruil maken we samen een case met foto’s en een review.
      </p>
      <Knop className="lancering-knop" />
    </div>
  );
}
