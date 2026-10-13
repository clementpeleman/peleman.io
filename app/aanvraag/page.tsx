import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { contact, volgendeVrijeWeek } from "@/lib/gegevens";
import { Formulier } from "./Formulier";

export const metadata: Metadata = {
  title: "Gratis voorbeeld aanvragen",
  description: "Vertel ons over je zaak. We laten binnen één werkdag weten of we een gratis voorbeeld van je website maken.",
};

export default function Aanvraag() {
  return (
    <>
      <Navigatie eenvoudig />
      <main className="aanvraag">
        <div className="wrap aanvraag-rij">
          <div className="aanvraag-intro">
            <h1>Gratis voorbeeld aanvragen</h1>
            <p className="tekst-groot zacht">
              Vertel ons over je zaak. We bekijken je aanvraag en laten binnen één werkdag weten of we een voorbeeld maken.
            </p>
            <ol className="aanvraag-stappen">
              <li><span>01</span>Je vult dit formulier in. Twee minuten.</li>
              <li><span>02</span>Binnen één werkdag hoor je of we een voorbeeld maken, met een concrete leverdatum.</li>
              <li><span>03</span>Je bekijkt je voorbeeld en beslist. Het voorbeeld is gratis.</li>
            </ol>
            <p className="aanvraag-hulp">
              We maken één voorbeeld per week.
              {volgendeVrijeWeek && <> Eerstvolgende vrije plek: {volgendeVrijeWeek}.</>} Liever eerst bellen?{" "}
              <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
            </p>
          </div>

          <Formulier />
        </div>
      </main>
      <Voettekst />
    </>
  );
}
