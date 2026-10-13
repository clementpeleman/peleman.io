import Link from "next/link";
import { contact } from "@/lib/gegevens";
import { Knop, Woordmerk } from "./merk";
import { CookieKnop } from "./Toestemming";

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
    <footer className="voet" data-einde>
      <div className="wrap voet-rij">
        <div className="voet-merk">
          <Woordmerk />
          <p>Een website die even goed is als jouw werk.</p>
        </div>
        <nav className="voet-kolom" aria-label="Aanbod">
          <p className="voet-kop">Aanbod</p>
          <ul>
            <li><a href="/#werkwijze">Werkwijze</a></li>
            <li><a href="/#prijzen">Prijzen</a></li>
            <li><a href="/#vragen">Vragen</a></li>
            <li><Link href="/aanvraag">Gratis voorbeeld</Link></li>
          </ul>
        </nav>
        <div className="voet-kolom">
          <p className="voet-kop">Contact</p>
          <ul>
            <li><a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a></li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>Ondernemingsnummer {contact.ondernemingsnummer}</li>
            {contact.adres && <li>{contact.adres}</li>}
          </ul>
        </div>
        <nav className="voet-kolom" aria-label="Juridisch">
          <p className="voet-kop">Juridisch</p>
          <ul>
            <li><Link href="/voorwaarden">Algemene voorwaarden</Link></li>
            <li><Link href="/privacy">Privacyverklaring</Link></li>
            <li><Link href="/cookies">Cookiebeleid</Link></li>
            <li><CookieKnop /></li>
          </ul>
        </nav>
      </div>
      <div className="wrap voet-onder">
        <p>© {new Date().getFullYear()} peleman.io</p>
      </div>
      <div className="voet-woordmerk" aria-hidden="true" />
    </footer>
  );
}
