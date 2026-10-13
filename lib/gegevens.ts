export const contact = {
  naam: "Clément Peleman",
  email: "clement@peleman.io",
  telefoon: "+32496343936",
  telefoonLeesbaar: "0496 34 39 36",
  ondernemingsnummer: "BE 1037.045.608",
  // Nog in te vullen: wettelijk verplicht op de site (doc 06, wettelijke vermeldingen).
  adres: null as string | null,
  rechtsvorm: null as string | null,
};

// Eerstvolgende week met een vrije plek voor een gratis voorbeeld. Op null zetten verbergt de regel.
export const volgendeVrijeWeek: string | null = "week van 26 oktober";

export type Pakket = {
  naam: string;
  prijs: number;
  zin: string;
  inhoud: string[];
  bouwwaarde: number;
  uitgelicht?: boolean;
};

export const pakketten: Pakket[] = [
  {
    naam: "Start",
    prijs: 79,
    zin: "Een verzorgde online kaart.",
    inhoud: ["Onepager", "Contactformulier", "Google-profiel gekoppeld", "3 aanpassingen per maand"],
    bouwwaarde: 900,
  },
  {
    naam: "Groei",
    prijs: 119,
    zin: "Je zaak volledig in beeld.",
    inhoud: [
      "Tot zes pagina’s",
      "Een functie voor jouw zaak",
      "Google-profiel ingesteld",
      "Hulp bij reviews",
      "5 aanpassingen per maand",
      "Kort maandoverzicht",
    ],
    bouwwaarde: 1900,
    uitgelicht: true,
  },
  {
    naam: "Pro",
    prijs: 189,
    zin: "Meer diensten. Meer mogelijkheden.",
    inhoud: [
      "Tot twaalf pagina’s",
      "Alles uit Groei",
      "Eén standaardkoppeling",
      "10 aanpassingen per maand",
      "Rapport met bezoek en aanvragen",
    ],
    bouwwaarde: 3200,
  },
];

export const laagstePrijs = Math.min(...pakketten.map((p) => p.prijs));

export function inclBtw(prijs: number) {
  return `€${(prijs * 1.21).toFixed(2).replace(".", ",")}`;
}

export function euro(bedrag: number) {
  return `€${bedrag.toLocaleString("nl-BE")}`;
}

// Overnameprijs uit doc 08: daalt elke maand met 1/60 van de bouwwaarde, tot een bodem van 20%. Overnemen kan na twaalf maanden.
export const overname = { vanaf: 12, tot: 60, bodemNa: 48 };

export function overnameprijs(bouwwaarde: number, maanden: number) {
  return Math.round(Math.max(bouwwaarde * (1 - maanden / 60), bouwwaarde * 0.2));
}

type Rij = { onderdeel: string; waarden: [string, string, string] };

// Waarden in de volgorde van `pakketten`: Start, Groei, Pro.
export const pakketMatrix: Rij[] = [
  { onderdeel: "Voor wie", waarden: ["Wie vooral een verzorgde online kaart wil", "De meeste zelfstandigen", "Wie in meerdere gemeenten of diensten gevonden wil worden"] },
  { onderdeel: "Website", waarden: ["Onepager met secties", "Tot zes pagina’s", "Tot twaalf pagina’s, met pagina’s per dienst of gemeente"] },
  { onderdeel: "Functie voor je vak", waarden: ["Contactformulier", "Een aanvraag op maat van je vak, bijvoorbeeld met soort project, budget en foto’s", "Idem, plus één standaardkoppeling met je agenda, CRM of mail"] },
  { onderdeel: "Google-bedrijfsprofiel", waarden: ["Gekoppeld", "Volledig ingesteld", "Volledig ingesteld en elk kwartaal nagekeken"] },
  { onderdeel: "Reviews", waarden: ["—", "Kant-en-klaar reviewverzoek, reviews op je site", "Idem"] },
  { onderdeel: "Aanpassingen", waarden: ["3 per maand", "5 per maand", "10 per maand"] },
  { onderdeel: "Rapport", waarden: ["—", "Kort maandoverzicht", "Maandoverzicht met bezoek en aanvragen"] },
  { onderdeel: "Gratis voorbeeld vooraf", waarden: ["Ja", "Ja", "Ja"] },
];

export const inElkPakket =
  "Ontwerp, bouw, hosting, beveiliging, back-ups, updates, SSL, je domein op jouw naam, één aanspreekpunt en online na ongeveer twee weken.";

// Marktbereiken uit doc 08 (‘Waar peleman.io staat’). Waarden: peleman.io, laten maken, zelf doen.
export const alternatieven = ["peleman.io", "Laten maken", "Zelf doen"] as const;

export const vergelijking: Rij[] = [
  { onderdeel: "Vooraf", waarden: ["€0", "Ongeveer €1.500 – €3.500", "€0"] },
  { onderdeel: "Per maand", waarden: [`Vanaf €${laagstePrijs}, alles inbegrepen`, "Ongeveer €40 – €170 voor onderhoud", "Ongeveer €4 – €40 voor het platform"] },
  { onderdeel: "Wie doet het werk", waarden: ["Wij, op maat van je zaak", "Een bureau of freelancer", "Jij"] },
  { onderdeel: "Hoe het eruitziet", waarden: ["Verzorgd, met een functie voor je vak", "Afhankelijk van de maker", "Zoals je het zelf kan"] },
  { onderdeel: "Eerst zien voor je beslist", waarden: ["Ja, met een gratis voorbeeld", "Meestal niet", "Je bouwt eerst zelf"] },
  { onderdeel: "Aanpassingen achteraf", waarden: ["Inbegrepen, binnen vijf werkdagen", "Vaak apart te betalen", "Zelf te doen"] },
];
