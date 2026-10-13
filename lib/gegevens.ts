export const contact = {
  naam: "Clément Peleman",
  email: "clement@peleman.io",
  telefoon: "+32496343936",
  telefoonLeesbaar: "0496 34 39 36",
  ondernemingsnummer: "BE 1037.045.608",
};

// Eerstvolgende week met een vrije plek voor een gratis voorbeeld. Op null zetten verbergt de regel.
export const volgendeVrijeWeek: string | null = "week van 26 oktober";

export type Pakket = {
  naam: string;
  prijs: number;
  zin: string;
  inhoud: string[];
  uitgelicht?: boolean;
};

export const pakketten: Pakket[] = [
  {
    naam: "Start",
    prijs: 79,
    zin: "Een verzorgde online kaart.",
    inhoud: ["Onepager", "Contactformulier", "Google-profiel gekoppeld", "3 aanpassingen per maand"],
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
  },
];

export const laagstePrijs = Math.min(...pakketten.map((p) => p.prijs));

export function inclBtw(prijs: number) {
  return `€${(prijs * 1.21).toFixed(2).replace(".", ",")}`;
}
