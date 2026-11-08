import type { Metadata } from "next";
import Link from "next/link";
import { JuridischePagina, Onderneming } from "../_componenten/Juridisch";
import { aanbod, euro } from "@/lib/gegevens";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De voorwaarden voor het gratis voorbeeld, de bouw van je website en het maandelijkse onderhoud door peleman.io.",
};

export default function Voorwaarden() {
  return (
    <JuridischePagina
      titel="Algemene voorwaarden"
      intro="Wat je van mij mag verwachten, en wat ik van jou vraag. Voor het gratis voorbeeld, de bouw van je site en het onderhoud daarna."
    >
      <h2>1. Toepassing</h2>
      <p>
        Deze voorwaarden gelden voor elk gratis voorbeeld, elke offerte en elke opdracht van <Onderneming /> (hierna: ‘ik’). Mijn
        aanbod richt zich tot ondernemingen; ‘jij’ is de onderneming die een voorbeeld aanvraagt of klant wordt. Afspraken die
        hiervan afwijken, gelden alleen als ik ze schriftelijk bevestig. Je eigen algemene voorwaarden zijn niet van toepassing.
      </p>

      <h2>2. Het gratis voorbeeld</h2>
      <ul>
        <li>Een voorbeeld is gratis en vrijblijvend. Ik beslis zelf of ik voor een aanvraag een voorbeeld maak.</li>
        <li>Ik maak een beperkt aantal voorbeelden tegelijk. Na mijn bevestiging krijg je een concrete datum.</li>
        <li>
          Je bekijkt het voorbeeld via een persoonlijke link die niet in zoekmachines verschijnt. De link vervalt na dertig dagen.
        </li>
        <li>
          Ontwerp, code en door mij geschreven teksten van het voorbeeld blijven van mij tot je een opdracht geeft. Je mag ze niet
          gebruiken of laten namaken zonder opdracht. Beelden en teksten die je zelf aanleverde, blijven van jou.
        </li>
      </ul>

      <h2>3. De opdracht</h2>
      <ul>
        <li>Wil je verder na het voorbeeld, dan krijg je een offerte met een vaste prijs voor de bouw van je site.</li>
        <li>De opdracht start op de dag dat ik je akkoord op de offerte schriftelijk of digitaal ontvang.</li>
        <li>
          Het maandelijkse onderhoud start op de dag dat je site online staat. Het loopt per maand en je kan het per mail opzeggen
          tegen het einde van de lopende maand.
        </li>
      </ul>

      <h2>4. Prijzen en betaling</h2>
      <ul>
        <li>
          De bouw van je site kost de prijs uit je offerte, vanaf {euro(aanbod.site)}, exclusief btw. Ik factureer de helft bij je
          akkoord en de rest wanneer je site online staat.
        </li>
        <li>Het onderhoud kost €{aanbod.perMaand} per maand, exclusief btw. Ik factureer het maandelijks vooraf, elektronisch.</li>
        <li>
          Bij een laattijdige betaling stuur ik eerst een herinnering. Blijft de betaling daarna uit, dan zijn de wettelijke
          interest en schadevergoeding voor handelstransacties verschuldigd. Na dertig dagen en een tweede herinnering mag ik je
          site tijdelijk offline halen.
        </li>
        <li>
          Ik pas het maandbedrag hoogstens één keer per jaar aan, en meld dat minstens twee maanden vooraf. Ga je niet akkoord met
          een verhoging, dan kan je kosteloos opzeggen tegen de datum waarop ze ingaat.
        </li>
      </ul>

      <h2>5. Van akkoord tot online</h2>
      <ul>
        <li>Je levert je logo, foto’s, diensten, werkgebied en andere info aan binnen tien werkdagen na je akkoord.</li>
        <li>
          Zodra alles binnen is en je de inhoud hebt goedgekeurd, staat je site binnen twee à drie weken online. Die termijn is een
          richtdatum; ik hou je op de hoogte als er iets verschuift.
        </li>
      </ul>

      <h2>6. Onderhoud en aanpassingen</h2>
      <ul>
        <li>Het onderhoud omvat hosting, updates, back-ups, kleine aanpassingen en een kort maandrapport.</li>
        <li>
          Een kleine aanpassing is een wijziging aan bestaande inhoud, zoals een tekst, een foto, je openingsuren of een nieuwe
          realisatie. Ik verwerk ze binnen vijf werkdagen.
        </li>
        <li>Een nieuwe pagina of functie is een uitbreiding. Daarvoor krijg je eerst een vaste prijs.</li>
      </ul>

      <h2>7. Jouw inhoud</h2>
      <p>
        Je zorgt ervoor dat de inhoud die je aanlevert juist is en dat je het recht hebt om ze te gebruiken, zoals foto’s, logo’s en
        teksten. Stelt iemand mij aansprakelijk omdat jouw inhoud zijn rechten schendt, dan vrijwaar je mij daarvoor. Ik mag inhoud
        weigeren die onwettig of misleidend is.
      </p>

      <h2>8. Eigendom en domein</h2>
      <ul>
        <li>Je domeinnaam staat op jouw naam. Je teksten, foto’s en logo blijven van jou.</li>
        <li>
          Ik host je site. Het ontwerp, de code en de sjablonen blijven van mij tot je de site overneemt. Zolang het onderhoud loopt,
          mag je je site vrij gebruiken.
        </li>
        <li>Je e-mail blijft bij je eigen provider. Ik koppel ze waar nodig aan je domein.</li>
      </ul>

      <h2>9. Overname</h2>
      <ul>
        <li>
          Wil je je site zelf hosten of door iemand anders laten beheren, dan kan je hem overnemen. De overnameprijs spreken we
          vooraf af en staat in je offerte.
        </li>
        <li>
          Na een overname krijg je de bestanden van je site en mag je ze onbeperkt gebruiken en laten aanpassen. Het onderhoud
          stopt dan, tenzij we iets anders afspreken.
        </li>
      </ul>

      <h2>10. Einde zonder overname</h2>
      <p>
        Stopt het onderhoud zonder overname, dan gaat je site op de einddatum offline. Je domein blijft van jou; ik help je het te
        verhuizen. Op vraag bezorg ik je teksten en foto’s binnen dertig dagen terug.
      </p>

      <h2>11. Beschikbaarheid en resultaat</h2>
      <p>
        Ik doe mijn best om je site veilig, bijgewerkt en bereikbaar te houden, met back-ups en updates. Een ononderbroken werking
        kan ik niet garanderen. Ik beloof geen resultaten zoals een aantal bezoekers, aanvragen of een plaats in Google.
      </p>

      <h2>12. Aansprakelijkheid</h2>
      <p>
        Mijn aansprakelijkheid is beperkt tot rechtstreekse schade en tot het bedrag dat je mij betaalde in de twaalf maanden vóór
        het voorval. Ik ben niet aansprakelijk voor onrechtstreekse schade, zoals gederfde winst of verlies van gegevens, behalve bij
        opzet of een zware fout.
      </p>

      <h2>13. Overmacht</h2>
      <p>
        Kan ik mijn verplichtingen tijdelijk niet nakomen door omstandigheden buiten mijn wil, zoals een storing bij een leverancier,
        dan schort ik ze op zolang die omstandigheden duren.
      </p>

      <h2>14. Persoonsgegevens</h2>
      <p>
        Verwerk ik persoonsgegevens voor jou, bijvoorbeeld aanvragen via het formulier op je site, dan doe ik dat als verwerker
        volgens een verwerkersovereenkomst. Hoe ik mijn eigen gegevens verwerk, lees je in de <Link href="/privacy">privacyverklaring</Link>.
      </p>

      <h2>15. Toepasselijk recht</h2>
      <p>
        Op deze voorwaarden is Belgisch recht van toepassing. Bij een geschil zoeken we eerst samen een oplossing. Lukt dat niet, dan
        zijn de rechtbanken van de plaats waar ik gevestigd ben bevoegd.
      </p>
    </JuridischePagina>
  );
}
