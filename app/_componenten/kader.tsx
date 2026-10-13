import Link from "next/link";
import { contact } from "@/lib/gegevens";
import { Knop, Woordmerk } from "./merk";

export function Navigatie({ eenvoudig = false }: { eenvoudig?: boolean }) {
  return (
    <header className="kop">
      <div className="wrap kop-rij">
        <Woordmerk />
        {!eenvoudig && (
          <nav aria-label="Hoofdmenu">
            <ul className="kop-links">
              <li><a href="/#werkwijze">Werkwijze</a></li>
              <li><a href="/#prijzen">Prijzen</a></li>
              <li><a href="/#vragen">Vragen</a></li>
            </ul>
            <Knop klein />
          </nav>
        )}
      </div>
    </header>
  );
}

export function Voettekst() {
  return (
    <footer className="voet">
      <div className="wrap voet-rij">
        <div className="voet-merk">
          <Woordmerk />
          <p>Een website die even goed is als jouw werk.</p>
        </div>
        <div className="voet-gegevens">
          <p>
            <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>Ondernemingsnummer {contact.ondernemingsnummer}</p>
        </div>
        <ul className="voet-links">
          <li><a href="/#werkwijze">Werkwijze</a></li>
          <li><a href="/#prijzen">Prijzen</a></li>
          <li><Link href="/privacy-policy">Privacy</Link></li>
          <li><Link href="/terms-and-conditions">Voorwaarden</Link></li>
        </ul>
      </div>
    </footer>
  );
}
