import { volgendeVrijeWeek } from "@/lib/gegevens";
import { Knop } from "../_componenten/merk";

const standaardTekst = "We maken één voorbeeld per week. Vraag het aan, je beslist pas als je het gezien hebt.";

type Props = { titel?: string; vervolg?: string; tekst?: string; pil?: string };

export function Slot({ titel = "Benieuwd hoe jouw zaak", vervolg = "eruit kan zien?", tekst = standaardTekst, pil }: Props) {
  return (
    <section className="sectie sectie--groen slot" aria-labelledby="slot-titel" data-einde>
      <div className="wrap">
        {pil && <span className="pil slot-pil">{pil}</span>}
        <h2 id="slot-titel" className="titel">
          {titel} <br className="breed" />
          {vervolg}
        </h2>
        <p className="tekst-groot">{tekst}</p>
        <Knop variant="wit" />
        {volgendeVrijeWeek && <p className="vrije-week">Eerstvolgende vrije plek: {volgendeVrijeWeek}.</p>}
      </div>
    </section>
  );
}
