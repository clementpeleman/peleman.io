const zekerheden = ["€0 vooraf", "Eerst een gratis voorbeeld", "Eén vast aanspreekpunt", "Je domein op jouw naam"];

export function Zekerheden() {
  return (
    <section className="zekerheden" aria-label="Wat je zeker weet">
      <ul className="wrap zekerheden-rij">
        {zekerheden.map((z) => (
          <li key={z}>{z}</li>
        ))}
      </ul>
    </section>
  );
}
