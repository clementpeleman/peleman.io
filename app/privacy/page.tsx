import type { Metadata } from "next";
import Link from "next/link";
import { JuridischePagina, Onderneming } from "../_componenten/Juridisch";
import { contact } from "@/lib/gegevens";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Welke gegevens peleman.io verwerkt, waarom, hoe lang, en welke rechten je hebt.",
};

export default function Privacy() {
  return (
    <JuridischePagina titel="Privacyverklaring" intro="Welke gegevens we van je bijhouden, waarom, hoe lang, en wat je ermee kan doen.">
      <h2>1. Wie we zijn</h2>
      <p>
        Verantwoordelijk voor de verwerking van je gegevens is <Onderneming />. Vragen over privacy stel je aan{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>2. Welke gegevens we verwerken</h2>
      <ul>
        <li>
          <strong>Als je een gratis voorbeeld aanvraagt:</strong> de naam van je zaak, je beroep, of het je hoofdberoep is, je
          gemeente of regio, wat je website beter moet doen, je toelichting, je huidige website of sociale media, je naam en je
          e-mailadres. Daarnaast hoe je bij ons terechtkwam: de advertentie of link waarlangs je kwam, de eerste pagina die je
          bezocht en de site die naar ons verwees.
        </li>
        <li>
          <strong>Als je een voorbeeld aanvraagt via een formulier in een advertentie op Facebook of Instagram:</strong> dezelfde
          gegevens, die je zelf in het formulier invult. Meta bezorgt ze ons, en verwerkt ze daarvoor ook zelf.
        </li>
        <li>
          <strong>Als je ons mailt of belt:</strong> wat je ons zelf meedeelt.
        </li>
        <li>
          <strong>Als je klant bent:</strong> je contact-, facturatie- en betaalgegevens, en de teksten en beelden voor je website.
        </li>
        <li>
          <strong>Als je onze site bezoekt:</strong> technische gegevens die nodig zijn om de site te tonen, zoals je IP-adres in de
          logboeken van onze hosting. Meetgegevens via cookies alleen met je toestemming; zie ons <Link href="/cookies">cookiebeleid</Link>.
        </li>
      </ul>

      <h2>3. Waarom, en op welke grond</h2>
      <ul>
        <li>Je aanvraag behandelen, een voorbeeld maken en contact met je opnemen: op jouw verzoek, vóór een overeenkomst.</li>
        <li>Je website bouwen, onderhouden en factureren: om onze overeenkomst uit te voeren.</li>
        <li>Facturen en boekhouding bewaren: omdat de wet dat vraagt.</li>
        <li>De site veilig houden en spam weren: ons gerechtvaardigd belang.</li>
        <li>Bezoek meten en advertenties verbeteren: alleen met je toestemming, die je altijd kan intrekken.</li>
      </ul>

      <h2>4. Hoe lang we gegevens bewaren</h2>
      <ul>
        <li>Een aanvraag zonder vervolg wissen we na zes maanden.</li>
        <li>Gegevens van klanten bewaren we zolang we samenwerken, en daarna zolang de wet dat vraagt voor boekhouding en belastingen.</li>
        <li>Meetgegevens bewaren we zo lang als in het cookiebeleid staat.</li>
      </ul>

      <h2>5. Met wie we gegevens delen</h2>
      <p>
        We verkopen je gegevens nooit. We werken met een paar dienstverleners die gegevens alleen in onze opdracht verwerken: onze
        hostingpartner, onze e-mailprovider, Twenty voor ons klantenbeheer en, alleen met je toestemming, Google (Analytics) en
        Meta (advertenties). Vraag je een voorbeeld aan via een formulier van Meta, dan loopt je aanvraag ook via Meta. Met wie dat
        nodig is, sluiten we een verwerkersovereenkomst.
      </p>
      <p>
        Google en Meta kunnen gegevens buiten de Europese Economische Ruimte verwerken, onder meer in de Verenigde Staten. Dat
        gebeurt op basis van het EU-VS-gegevensprivacykader of de standaardcontractbepalingen van de Europese Commissie.
      </p>

      <h2>6. Je rechten</h2>
      <p>
        Je kan je gegevens inkijken, laten verbeteren of laten wissen. Je kan de verwerking laten beperken, je gegevens opvragen om
        ze mee te nemen, en je verzetten tegen een verwerking op basis van ons gerechtvaardigd belang. Toestemming kan je altijd
        intrekken. Mail daarvoor naar <a href={`mailto:${contact.email}`}>{contact.email}</a>; we antwoorden binnen een maand.
      </p>
      <p>
        Ben je niet tevreden over hoe we met je gegevens omgaan, dan kan je een klacht indienen bij de Gegevensbeschermingsautoriteit,
        Drukpersstraat 35, 1000 Brussel, <a href="https://www.gegevensbeschermingsautoriteit.be">gegevensbeschermingsautoriteit.be</a>.
      </p>

      <h2>7. Beveiliging</h2>
      <p>
        We beveiligen je gegevens met passende maatregelen: een versleutelde verbinding, beperkte toegang en dienstverleners die
        zelf aan de Europese regels voldoen.
      </p>

      <h2>8. Wijzigingen</h2>
      <p>Passen we deze verklaring aan, dan zie je dat aan de datum bovenaan.</p>
    </JuridischePagina>
  );
}
