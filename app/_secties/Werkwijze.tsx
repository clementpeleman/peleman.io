import { stappen } from "@/lib/gegevens";

export function Werkwijze({ titel = "Zo gaat het in zijn werk", id = "werkwijze", lijn = false }: { titel?: string; id?: string; lijn?: boolean }) {
  return (
    <section className={lijn ? "sectie sectie--lijn" : "sectie"} id={id} aria-labelledby={`${id}-titel`}>
      <div className="wrap kolommen">
        <h2 id={`${id}-titel`} className="titel sectie-kop">
          {titel}
        </h2>
        <ol className="stappen">
          {stappen.map(([titel, tekst], i) => (
            <li key={titel}>
              <span className="stap-nr" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="subtitel">{titel}</h3>
                <p className="zacht">{tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
