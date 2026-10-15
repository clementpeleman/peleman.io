import { stappen } from "@/lib/gegevens";

export function Werkwijze({ titel = "Zo gaat het in zijn werk", id = "werkwijze", lijn = false }: { titel?: string; id?: string; lijn?: boolean }) {
  return (
    <section className={lijn ? "sectie sectie--lijn" : "sectie"} id={id} aria-labelledby={`${id}-titel`}>
      <div className="wrap">
        <h2 id={`${id}-titel`} className="titel sectie-kop">
          {titel}
        </h2>
        <ol className="tijdlijn" data-beweeg="">
          {stappen.map(([wanneer, wat], i) => (
            <li key={wat} style={{ "--i": i } as React.CSSProperties}>
              <span className="tijdlijn-wanneer">{wanneer}</span>
              <span className="tijdlijn-wat">{wat}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
