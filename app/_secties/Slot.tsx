import { volgendeVrijeWeek } from "@/lib/gegevens";
import { Knop } from "../_componenten/merk";

export function Slot({ titel = "Benieuwd hoe jouw zaak", vervolg = "eruit kan zien?" }: { titel?: string; vervolg?: string }) {
  return (
    <section className="sectie sectie--groen slot" aria-labelledby="slot-titel" data-einde>
      <div className="wrap">
        <h2 id="slot-titel" className="titel">
          {titel} <br className="breed" />
          {vervolg}
        </h2>
        <p className="tekst-groot">We maken één voorbeeld per week. Vraag het aan, je beslist pas als je het gezien hebt.</p>
        <Knop variant="wit" />
        {volgendeVrijeWeek && <p className="vrije-week">Eerstvolgende vrije plek: {volgendeVrijeWeek}.</p>}
      </div>
    </section>
  );
}
