import { IcoonEuro, IcoonOog, IcoonPersoon, IcoonSleutel } from "../_componenten/merk";

const zekerheden = [
  { icoon: <IcoonEuro />, titel: "€0 vooraf", tekst: "Geen opstartkost. Je betaalt een vaste prijs per maand." },
  { icoon: <IcoonOog />, titel: "Eerst een gratis voorbeeld", tekst: "Ga je niet verder, dan betaal je niets." },
  { icoon: <IcoonPersoon />, titel: "Eén vast aanspreekpunt", tekst: "Je belt en mailt altijd met dezelfde persoon." },
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
