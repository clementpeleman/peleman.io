const zekerheden = [
  { titel: "€0 vooraf", tekst: "Geen opstartkost. Je betaalt een vaste prijs per maand." },
  { titel: "Eerst een gratis voorbeeld", tekst: "Ga je niet verder, dan betaal je niets." },
  { titel: "Eén vast aanspreekpunt", tekst: "Je belt en mailt altijd met dezelfde persoon." },
  { titel: "Je domein blijft van jou", tekst: "Net als je teksten en je foto’s." },
];

export function Zekerheden() {
  return (
    <section className="zekerheden" aria-label="Wat je zeker weet">
      <ul className="wrap zekerheden-rij">
        {zekerheden.map((z) => (
          <li key={z.titel}>
            <p className="zekerheid-titel">{z.titel}</p>
            <p>{z.tekst}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
