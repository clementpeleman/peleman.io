import { alternatieven, vergelijking } from "@/lib/gegevens";

export function Vergelijking() {
  return (
    <section className="sectie sectie--lijn" aria-labelledby="vergelijking-titel">
      <div className="wrap">
        <h2 id="vergelijking-titel" className="titel">
          Laten maken, zelf doen of een abonnement?
        </h2>
        <p className="tekst-groot zacht vergelijking-intro">
          Elke manier heeft zijn plaats. Hieronder zie je wat ze kosten en wie het werk doet.
        </p>
        <table className="tabel-stapel vergelijking">
          <thead>
            <tr>
              <td />
              {alternatieven.map((a, i) => (
                <th key={a} scope="col" className={i === 0 ? "is-wij" : undefined}>
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vergelijking.map((rij) => (
              <tr key={rij.onderdeel}>
                <th scope="row">{rij.onderdeel}</th>
                {rij.waarden.map((w, i) => (
                  <td key={alternatieven[i]} data-label={alternatieven[i]} className={i === 0 ? "is-wij" : undefined}>
                    {w}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="vergelijking-bron">Bedragen voor laten maken en zelf doen zijn gangbare marktprijzen in België, excl. btw.</p>
      </div>
    </section>
  );
}
