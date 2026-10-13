import { inElkPakket, pakketMatrix, pakketten } from "@/lib/gegevens";
import { Plus } from "../_componenten/merk";

export function PakketTabel() {
  return (
    <details className="pakkettabel">
      <summary>
        Vergelijk alle onderdelen
        <Plus />
      </summary>
      <table className="tabel-stapel">
        <thead>
          <tr>
            <td />
            {pakketten.map((p) => (
              <th key={p.naam} scope="col" className={p.uitgelicht ? "is-wij" : undefined}>
                {p.naam}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pakketMatrix.map((rij) => (
            <tr key={rij.onderdeel}>
              <th scope="row">{rij.onderdeel}</th>
              {rij.waarden.map((w, i) => (
                <td key={pakketten[i].naam} data-label={pakketten[i].naam} className={pakketten[i].uitgelicht ? "is-wij" : undefined}>
                  {w}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pakkettabel-noot">
        <strong>In elk pakket:</strong> {inElkPakket.charAt(0).toLowerCase() + inElkPakket.slice(1)}
      </p>
    </details>
  );
}
