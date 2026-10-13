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
          <h1>Bedankt voor je aanvraag.</h1>
          <p className="tekst-groot zacht">
            We bekijken ze en laten je binnen één werkdag weten of we een voorbeeld maken. Een vraag tussendoor? Bel{" "}
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
