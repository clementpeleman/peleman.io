import { IcoonEuro, IcoonOog, IcoonPersoon, IcoonSleutel } from "../_componenten/merk";

const zekerheden = [
  { icoon: <IcoonEuro />, titel: "€0 vooraf", tekst: "Geen opstartkost. Eén vaste prijs per maand." },
  { icoon: <IcoonOog />, titel: "Eerst een gratis voorbeeld", tekst: "Je beslist pas als je het gezien hebt." },
  { icoon: <IcoonPersoon />, titel: "Eén vast aanspreekpunt", tekst: "Je weet wie je belt of mailt." },
  { icoon: <IcoonSleutel />, titel: "Je domein blijft van jou", tekst: "Net als je teksten en je foto’s." },
];

export function Zekerheden() {
  return (
    <section className="zekerheden" aria-label="Wat je zeker weet">
      <ul className="wrap zekerheden-rij">
        {zekerheden.map((z) => (
          <li key={z.titel}>
            {z.icoon}
            <div>
              <p className="zekerheid-titel">{z.titel}</p>
              <p>{z.tekst}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
