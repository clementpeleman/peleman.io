import { stappen } from "@/lib/gegevens";

export function Werkwijze({ titel = "Zo gaat het in zijn werk", id = "werkwijze" }: { titel?: string; id?: string }) {
  return (
    <section className="sectie" id={id} aria-labelledby={`${id}-titel`}>
      <div className="wrap">
        <h2 id={`${id}-titel`} className="titel sectie-kop">
          {titel}
        </h2>
        <ol className="stappen">
          {stappen.map(([titel, tekst], i) => (
            <li key={titel}>
              <span className="stap-nr" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
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
