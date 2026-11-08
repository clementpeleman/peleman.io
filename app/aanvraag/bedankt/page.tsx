import type { Metadata } from "next";
import { Navigatie, Voettekst } from "../../_componenten/kader";
import { Knop } from "../../_componenten/merk";
import { contact } from "@/lib/gegevens";
import { Conversie } from "./Conversie";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  robots: { index: false },
};

export default function Bedankt() {
  return (
    <>
      <Navigatie eenvoudig />
      <main className="bedankt">
        <div className="wrap">
          <span className="bedankt-vink" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m6 12.5 4 4L18 8" pathLength={1} />
            </svg>
          </span>
          <h1>Bedankt voor je aanvraag</h1>
          <p className="tekst-groot zacht">
            Ik bekijk ze en laat je binnen één werkdag iets weten, met een datum voor je voorbeeld. Een vraag tussendoor? Bel{" "}
            <a href={`tel:${contact.telefoon}`}>{contact.telefoonLeesbaar}</a> of mail{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
          <Knop href="/">Terug naar de homepage</Knop>
        </div>
      </main>
      <Voettekst />
      <Conversie />
    </>
  );
}
