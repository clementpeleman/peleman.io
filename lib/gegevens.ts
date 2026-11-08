export const contact = {
  naam: "Clément Peleman",
  email: "clement@peleman.io",
  telefoon: "+32496343936",
  telefoonLeesbaar: "0496 34 39 36",
  ondernemingsnummer: "BE 1037.045.608",
  // Wettelijk verplicht op de site (doc 06, wettelijke vermeldingen).
  adres: "Kortrijksepoortstraat 202, 9000 Gent",
  rechtsvorm: "eenmanszaak",
};

// Eerstvolgende week met een vrije plek voor een gratis voorbeeld. Op null zetten verbergt de regel.
export const volgendeVrijeWeek: string | null = null;

// Het aanbod sinds de herpositionering (november 2026): één site, eenmalig vanaf een bedrag, daarna een vast maandbedrag.
// Clément host de site; wie later zelf eigenaar wil worden, neemt over aan een vooraf afgesproken prijs.
export const aanbod = {
  site: 1500,
  perMaand: 29,
  inDeSite: [
    "Een site op maat, met een pagina per dienst en per gemeente waar je werkt",
    "Teksten die ik samen met jou schrijf, op basis van wat je echt doet",
    "Gebouwd om snel te laden en goed te scoren in Google",
    "Een formulier dat aanvragen rechtstreeks naar je mailbox stuurt",
  ],
  perMaandInhoud: ["Hosting, updates en back-ups", "Kleine aanpassingen", "Elke maand een kort rapport: hoe vaak je gevonden werd en hoeveel mensen contact opnamen"],
};

export function euro(bedrag: number) {
  return `€${bedrag.toLocaleString("nl-BE")}`;
}

// Werkwijze als tijdlijn: wanneer, en wat er dan gebeurt.
export const stappen: [string, string][] = [
  ["Eerst", "We praten een halfuur over wat je doet, voor wie en waar"],
  ["Binnen een week", "Je krijgt gratis een voorbeeld van je homepage"],
  ["Twee à drie weken na je akkoord", "Je site staat online"],
  ["Daarna", "Ik volg je site op en je krijgt elke maand een kort rapport"],
];
