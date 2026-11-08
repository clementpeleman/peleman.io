import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../_componenten/kader";
import { contact, volgendeVrijeWeek } from "@/lib/gegevens";
import { leesBeroep } from "@/lib/formulier";
import { Formulier } from "./Formulier";

export const metadata: Metadata = {
  title: "Gratis voorbeeld aanvragen",
  description: "Vertel me over je zaak. Binnen één werkdag laat ik weten wanneer je een gratis voorbeeld van je homepage krijgt.",
};

// Een vakpagina kan het beroep al meegeven: /aanvraag?beroep=Tuinaannemer.
export default async function Aanvraag({ searchParams }: { searchParams: Promise<{ beroep?: string | string[] }> }) {
  const { beroep } = await searchParams;
  const gekozen = leesBeroep(beroep);
  return (
    <>
      <Navigatie eenvoudig />
      <main className="aanvraag">
        <div className="wrap aanvraag-rij">
          <div className="aanvraag-intro">
            <h1>Gratis voorbeeld aanvragen</h1>
            <p className="tekst-groot zacht">
              Vertel me over je zaak. Ik bekijk je aanvraag en laat binnen één werkdag iets weten.
            </p>
            <ol className="aanvraag-stappen">
              <li><span>1</span>Je vult dit formulier in. Dat duurt twee minuten.</li>
              <li><span>2</span>Binnen één werkdag hoor je van mij, met een datum voor je voorbeeld.</li>
              <li><span>3</span>Je bekijkt je voorbeeld en beslist. Het voorbeeld is gratis.</li>
            </ol>
            <p className="aanvraag-hulp">
              {volgendeVrijeWeek && <> Eerstvolgende vrije plek: {volgendeVrijeWeek}.</>} Liever eerst bellen?{" "}
              <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a>
            </p>
          </div>

          <Formulier beroep={gekozen} />
        </div>
      </main>
      <Voettekst />
    </>
  );
}
