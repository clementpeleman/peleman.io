import { Plus } from "../_componenten/merk";

export function Vragen({ vragen, titel = "Wat je vooraf wil weten" }: { vragen: [string, string][]; titel?: string }) {
  return (
    <section className="sectie sectie--lijn" id="vragen" aria-labelledby="vragen-titel">
      <div className="wrap kolommen">
        <h2 id="vragen-titel" className="titel">
          {titel}
        </h2>
        <div className="vragen">
          {vragen.map(([vraag, antwoord], i) => (
            <details key={vraag} className="vraag" open={i === 0}>
              <summary>
                {vraag}
                <Plus />
              </summary>
              <p>{antwoord}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
