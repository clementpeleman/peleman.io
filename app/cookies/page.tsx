import type { Metadata } from "next";
import Link from "next/link";
import { JuridischePagina, Onderneming } from "../_componenten/Juridisch";
import { CookieKnop } from "../_componenten/Toestemming";
import { meetActief } from "@/lib/toestemming";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Welke cookies peleman.io gebruikt, waarvoor, en hoe je je keuze aanpast.",
};

const cookies = [
  ["_ga", "Google", "Herkent je browser om bezoekers te tellen", "2 jaar", "Meten"],
  ["_ga_…", "Google", "Houdt je bezoek bij voor de statistieken", "2 jaar", "Meten"],
  ["_fbp", "Meta", "Herkent je browser om te zien welke advertenties tot een aanvraag leiden", "3 maanden", "Advertenties"],
  ["fr", "Meta", "Toont en meet advertenties, als je bij Facebook of Instagram bent aangemeld", "3 maanden", "Advertenties"],
];

export default function Cookies() {
  return (
    <JuridischePagina
      titel="Cookiebeleid"
      intro="We plaatsen alleen cookies om te meten of voor advertenties als jij dat goed vindt. Hier lees je welke."
    >
      <h2>1. Wat cookies zijn</h2>
      <p>
        Cookies zijn kleine bestanden die een website op je toestel bewaart. Deze site is van <Onderneming />.
      </p>

      <h2>2. Wat we gebruiken</h2>
      <p>
        <strong>Zonder toestemming</strong> plaatsen we geen cookies. We bewaren alleen je keuze over cookies in je browser, zes
        maanden lang, zodat we het niet bij elke pagina opnieuw vragen.
      </p>
      <p>
        <strong>Met je toestemming</strong> gebruiken we Google Analytics om te zien welke pagina’s bezocht worden, en de Meta-pixel
        om te zien welke advertenties tot een aanvraag leiden.
        {!meetActief && " Op dit moment staan die nog niet aan."}
      </p>
      <div className="juridisch-tabel">
        <table>
          <thead>
            <tr>
              <th scope="col">Cookie</th>
              <th scope="col">Van</th>
              <th scope="col">Waarvoor</th>
              <th scope="col">Hoe lang</th>
              <th scope="col">Soort</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map(([naam, van, waarvoor, duur, soort]) => (
              <tr key={naam}>
                <td><code>{naam}</code></td>
                <td>{van}</td>
                <td>{waarvoor}</td>
                <td>{duur}</td>
                <td>{soort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>3. Je keuze aanpassen</h2>
      <p>
        Je kan je keuze altijd wijzigen of intrekken via de knop hieronder of onderaan elke pagina. Je kan cookies ook verwijderen
        of blokkeren in de instellingen van je browser.
      </p>
      {meetActief && (
        <p>
          <CookieKnop />
        </p>
      )}

      <h2>4. Meer weten</h2>
      <p>
        Hoe we met persoonsgegevens omgaan, lees je in onze <Link href="/privacy">privacyverklaring</Link>.
      </p>
    </JuridischePagina>
  );
}
