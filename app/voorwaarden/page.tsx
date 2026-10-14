import type { Metadata } from "next";
import Link from "next/link";
import { JuridischePagina, Onderneming } from "../_componenten/Juridisch";
import { euro, overname, pakketten } from "@/lib/gegevens";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De voorwaarden voor het gratis voorbeeld en het website-abonnement van peleman.io.",
};

const aanpassingen = pakketten.map((p) => `${p.naam} ${p.inhoud.find((r) => r.includes("aanpassingen"))?.split(" ")[0]}`).join(", ");

export default function Voorwaarden() {
  return (
    <JuridischePagina
      titel="Algemene voorwaarden"
      intro="Wat je van ons mag verwachten, en wat we van jou vragen. Voor het gratis voorbeeld en het website-abonnement."
    >
      <h2>1. Toepassing</h2>
      <p>
        Deze voorwaarden gelden voor elk gratis voorbeeld, elk voorstel en elk abonnement van <Onderneming /> (hierna: ‘wij’). Ons
        aanbod richt zich tot ondernemingen; ‘jij’ is de onderneming die een voorbeeld aanvraagt of klant wordt. Afspraken die
        hiervan afwijken, gelden alleen als we ze schriftelijk bevestigen. Je eigen algemene voorwaarden zijn niet van toepassing.
      </p>

      <h2>2. Het gratis voorbeeld</h2>
      <ul>
        <li>Een voorbeeld is gratis en vrijblijvend. We beslissen zelf of we voor een aanvraag een voorbeeld maken.</li>
        <li>We maken een beperkt aantal voorbeelden per week. Na onze bevestiging krijg je een concrete leverdatum.</li>
        <li>
          Je bekijkt het voorbeeld via een persoonlijke link die niet in zoekmachines verschijnt. De link vervalt na dertig dagen.
        </li>
        <li>
          Ontwerp, code en door ons geschreven teksten van het voorbeeld blijven van ons tot je een abonnement afsluit. Je mag ze
          niet gebruiken of laten namaken zonder abonnement. Beelden en teksten die je zelf aanleverde, blijven van jou.
        </li>
      </ul>

      <h2>3. Abonnement en looptijd</h2>
      <ul>
        <li>Het abonnement start op de dag dat we je akkoord schriftelijk of digitaal ontvangen.</li>
        <li>De minimumduur is twaalf maanden. Daarna loopt het abonnement maandelijks verder.</li>
        <li>
          Na de minimumduur kan je opzeggen per mail, tegen het einde van de lopende maand.
        </li>
        <li>Je kan op elk moment overschakelen naar een ander pakket; de nieuwe prijs geldt vanaf de volgende maand.</li>
      </ul>

      <h2>4. Prijzen en betaling</h2>
      <ul>
        <li>
          Je betaalt de maandprijs van je pakket: {pakketten.map((p) => `${p.naam} €${p.prijs}`).join(", ")}, telkens per maand en
          exclusief btw.
        </li>
        <li>We factureren maandelijks vooraf, elektronisch. Betalen gebeurt via domiciliëring.</li>
        <li>
          Bij een laattijdige betaling sturen we eerst een herinnering. Blijft de betaling daarna uit, dan zijn de wettelijke
          interest en schadevergoeding voor handelstransacties verschuldigd. Na dertig dagen en een tweede herinnering mogen we je
          site tijdelijk offline halen.
        </li>
        <li>
          We passen onze prijzen hoogstens één keer per jaar aan, en melden dat minstens twee maanden vooraf. Ga je niet akkoord met
          een verhoging, dan kan je kosteloos opzeggen tegen de datum waarop ze ingaat.
        </li>
      </ul>

      <h2>5. Van akkoord tot online</h2>
      <ul>
        <li>Je levert je logo, foto’s, diensten, werkgebied en andere info aan via ons formulier, binnen tien werkdagen.</li>
        <li>
          Zodra alles binnen is en je de inhoud hebt goedgekeurd, staat je site binnen ongeveer twee weken online. Die termijn is
          een richtdatum; we houden je op de hoogte als er iets verschuift.
        </li>
      </ul>

      <h2>6. Aanpassingen</h2>
      <ul>
        <li>
          Je pakket bevat een aantal aanpassingen per maand: {aanpassingen}. Een aanpassing is een wijziging aan bestaande inhoud,
          zoals een tekst, foto, openingsuren of een nieuwe realisatie.
        </li>
        <li>We verwerken een aanpassing binnen vijf werkdagen.</li>
        <li>Niet gebruikte aanpassingen schuiven niet door naar de volgende maand. Een extra aanpassing kost €29, exclusief btw.</li>
        <li>Een nieuwe pagina of functie is een uitbreiding. Daarvoor krijg je eerst een vaste prijs.</li>
      </ul>

      <h2>7. Jouw inhoud</h2>
      <p>
        Je zorgt ervoor dat de inhoud die je aanlevert juist is en dat je het recht hebt om ze te gebruiken, zoals foto’s, logo’s en
        teksten. Stelt iemand ons aansprakelijk omdat jouw inhoud zijn rechten schendt, dan vrijwaar je ons daarvoor. We mogen
        inhoud weigeren die onwettig of misleidend is.
      </p>

      <h2>8. Eigendom en domein</h2>
      <ul>
        <li>Je domeinnaam staat op jouw naam. Je teksten, foto’s en logo blijven van jou.</li>
        <li>
          Het ontwerp, de code, de sjablonen en onze werkwijze blijven van ons. Zolang je abonnement loopt, mag je je site vrij
          gebruiken.
        </li>
        <li>Je e-mail blijft bij je eigen provider. Wij koppelen ze waar nodig aan je domein.</li>
      </ul>

      <h2>9. Overname</h2>
      <ul>
        <li>
          Je kan je site meteen kopen of na de minimumduur overnemen. De bouwwaarde is{" "}
          {pakketten.map((p) => `${euro(p.bouwwaarde)} voor ${p.naam}`).join(", ")}, exclusief btw.
        </li>
        <li>
          De overnameprijs daalt elke maand dat je klant bent met 1/60 van de bouwwaarde, tot hoogstens 20% van de bouwwaarde. Dat
          minimum is bereikt na {overname.bodemNa} maanden. Wil je vóór twaalf maanden overnemen, dan betaal je de resterende
          maanden tot twaalf en de overnameprijs na twaalf maanden.
        </li>
        <li>
          Na een overname krijg je de bestanden van je site en mag je ze onbeperkt gebruiken en laten aanpassen. Wil je dat wij de
          site blijven hosten, dan kan dat voor €29 per maand, exclusief btw, zonder aanpassingen.
        </li>
      </ul>

      <h2>10. Einde zonder overname</h2>
      <p>
        Eindigt je abonnement zonder overname, dan gaat je site op de einddatum offline. Je domein blijft van jou; we helpen je het
        te verhuizen. Op vraag bezorgen we je teksten en foto’s binnen dertig dagen terug.
      </p>

      <h2>11. Beschikbaarheid en resultaat</h2>
      <p>
        We doen ons best om je site veilig, bijgewerkt en bereikbaar te houden, met back-ups en updates. Een ononderbroken werking
        kunnen we niet garanderen. We beloven geen resultaten zoals een aantal bezoekers, aanvragen of een plaats in Google.
      </p>

      <h2>12. Aansprakelijkheid</h2>
      <p>
        Onze aansprakelijkheid is beperkt tot rechtstreekse schade en tot het bedrag dat je ons betaalde in de twaalf maanden vóór
        het voorval. We zijn niet aansprakelijk voor onrechtstreekse schade, zoals gederfde winst of verlies van gegevens, behalve
        bij opzet of een zware fout.
      </p>

      <h2>13. Overmacht</h2>
      <p>
        Kunnen we onze verplichtingen tijdelijk niet nakomen door omstandigheden buiten onze wil, zoals een storing bij een
        leverancier, dan schorten we ze op zolang die omstandigheden duren.
      </p>

      <h2>14. Persoonsgegevens</h2>
      <p>
        Verwerken we persoonsgegevens voor jou, bijvoorbeeld aanvragen via het formulier op je site, dan doen we dat als verwerker
        volgens een verwerkersovereenkomst. Hoe we onze eigen gegevens verwerken, lees je in onze{" "}
        <Link href="/privacy">privacyverklaring</Link>.
      </p>

      <h2>15. Toepasselijk recht</h2>
      <p>
        Op deze voorwaarden is Belgisch recht van toepassing. Bij een geschil zoeken we eerst samen een oplossing. Lukt dat niet,
        dan zijn de rechtbanken van de plaats waar wij gevestigd zijn bevoegd.
      </p>
    </JuridischePagina>
  );
}
