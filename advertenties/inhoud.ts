// Alle advertenties op één plek. Elke id is ook de utm_content, zodat een aanvraag in Twenty terug te leiden is
// tot de advertentie. Sinds de herpositionering (november 2026) in 'ik', met het aanbod uit lib/gegevens.ts;
// zie docs/brand/herpositionering/05-site-tekst.md. `npm run controle` kijkt ze na.
import { aanbod, euro } from "../lib/gegevens.ts";

export type Formaat = "staand" | "verhaal" | "vierkant";

export const formaten: Record<Formaat, { breedte: number; hoogte: number; naam: string }> = {
  staand: { breedte: 1080, hoogte: 1350, naam: "4:5 voor de feed" },
  verhaal: { breedte: 1080, hoogte: 1920, naam: "9:16 voor stories en reels" },
  vierkant: { breedte: 1080, hoogte: 1080, naam: "1:1 voor de carrousel" },
};

// Knop onder de advertentie: call_to_action_type in Meta, met het label dat Meta in het Nederlands toont.
export const knoppen = { LEARN_MORE: "Meer informatie", GET_QUOTE: "Offerte aanvragen" } as const;
export type Knop = keyof typeof knoppen;

export type Sjabloon = "glas" | "gsm" | "prijs" | "aanvraag" | "scherm" | "stappen" | "schermvideo" | "lancering" | "tekst" | "lijst";

// Echte schermen die in beeld mogen: sites van klanten en eigen werk, en het aanvraagformulier van peleman.io.
// Namen nooit in de tekst; Tourage krijgt in beeld altijd ‘eigen concept’.
export type Scherm = "h16" | "h16-project" | "lvq" | "tourage" | "aanvraag";

export type Kaart = { kop: string; nummer?: number; titel: [string, string?]; tekst?: string };

// Wat in het beeld staat. Gedeeld door advertenties en gewone berichten (posts.ts).
export type Beeldinhoud = {
  id: string;
  sjabloon: Sjabloon;
  beeld: { kop?: [string, string]; tekst?: string; pil?: string; lijst?: string[]; voetnoot?: string; zinnen?: string[]; slot?: string };
  // Het echte scherm in beeld. Een tweede scherm is de gsm vooraan bij ‘glas’, de gsm erachter bij ‘gsm’,
  // en de pagina waar de schermvideo naartoe gaat.
  scherm?: Scherm;
  scherm2?: Scherm;
  kaarten?: Kaart[];
  // Een knop ‘Gratis voorbeeld’ onderaan het beeld. Niet in gewone berichten: daar kan niemand op klikken.
  knopInBeeld?: boolean;
};

export type Advertentie = Beeldinhoud & {
  hoek: string;
  formaten: Formaat[];
  // Wat Meta rond het beeld toont.
  hoofdtekst: string;
  kop: string;
  beschrijving: string;
  knop: Knop;
};


// Sinds 16 oktober breed: zelfstandigen in het algemeen, naar de homepage. zelfstandigen-2 (november 2026) is de
// eerste reeks na de herpositionering: 'ik', één aanbod (site eenmalig + maandbedrag). De oude reeks staat in git.
export const campagne = "zelfstandigen-2";
export const bestemming = "https://peleman.io/";

export function url(a: Advertentie) {
  const u = new URL(bestemming);
  u.searchParams.set("utm_source", "meta");
  u.searchParams.set("utm_medium", "paid_social");
  u.searchParams.set("utm_campaign", campagne);
  u.searchParams.set("utm_content", a.id);
  return u.toString();
}

const site = euro(aanbod.site);
const maand = `€${aanbod.perMaand}`;

export const advertenties: Advertentie[] = [
  {
    id: "ik-maak",
    hoek: "Gewoon zeggen wat ik doe",
    sjabloon: "glas",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Ik maak websites voor", "zelfstandigen en kmo’s."] },
    scherm: "h16",
    scherm2: "h16-project",
    hoofdtekst: `Voor je iets beslist, maak ik gratis een voorbeeld van je homepage. Bevalt het, dan bouw ik de rest. Vanaf ${site}, daarna ${maand} per maand, excl. btw.`,
    kop: "Eerst een gratis voorbeeld",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "eerst-zien-2",
    hoek: "Eerst zien, dan beslissen",
    sjabloon: "gsm",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Je ziet je homepage", "voor je iets betaalt."], tekst: "Het voorbeeld is gratis. Je zit nergens aan vast." },
    scherm: "h16-project",
    scherm2: "h16",
    hoofdtekst: "Vertel me wat je doet en waar je werkt. Binnen een week krijg je een voorbeeld van je homepage. Daarna beslis je of je verder wil.",
    kop: "Je homepage, eerst gratis bekijken",
    beschrijving: "Geen verplichting",
    knop: "LEARN_MORE",
  },
  {
    id: "prijs-vooraf",
    hoek: "De prijs staat er gewoon",
    sjabloon: "prijs",
    formaten: ["staand", "verhaal"],
    beeld: {
      pil: "Vooraf bekend",
      kop: ["Vanaf", site],
      tekst: "eenmalig, excl. btw",
      voetnoot: `daarna ${maand} per maand`,
      lijst: ["De site en de teksten", "Hosting en updates", "Een kort maandrapport"],
    },
    hoofdtekst: `De prijs staat gewoon op de site. Vanaf ${site} voor de bouw, daarna ${maand} per maand voor hosting, updates en een kort maandrapport. Alles excl. btw. Het voorbeeld vooraf is gratis.`,
    kop: `Vanaf ${site}, daarna ${maand} per maand`,
    beschrijving: "Prijzen excl. btw",
    knop: "LEARN_MORE",
  },
  {
    id: "maandrapport",
    hoek: "Zien of het werkt",
    sjabloon: "lijst",
    formaten: ["staand", "verhaal"],
    beeld: {
      pil: "Elke maand",
      kop: ["Je ziet of je site", "zijn werk doet."],
      lijst: ["Hoe vaak je gevonden werd", "Hoeveel mensen contact opnamen"],
    },
    hoofdtekst: "Een website moet groeien in Google, en dat duurt een paar maanden. Daarom krijg je elke maand een kort rapport: hoe vaak je gevonden werd en hoeveel mensen contact opnamen.",
    kop: "Elke maand een kort rapport",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "met-mij",
    hoek: "Eén persoon, geen bureau",
    sjabloon: "tekst",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Je mailt en belt", "altijd met mij."], tekst: "Ik werk voor een beperkt aantal klanten tegelijk." },
    hoofdtekst: "Ik werk voor een beperkt aantal klanten tegelijk. Heb je een vraag of wil je iets aangepast zien, dan mail of bel je mij. Ik antwoord binnen een werkdag.",
    kop: "Antwoord binnen een werkdag",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "schermvideo-2",
    hoek: "Een echte site in beweging",
    sjabloon: "schermvideo",
    formaten: ["verhaal"],
    beeld: {
      zinnen: ["Dit is een site die ik maakte.", "Je krijgt eerst gratis een voorbeeld van je homepage.", `Vanaf ${site}, daarna ${maand} per maand, excl. btw.`],
      slot: "Vraag je gratis voorbeeld aan.",
    },
    scherm: "h16",
    scherm2: "h16-project",
    hoofdtekst: `Dit is een site die ik maakte. Voor jouw zaak maak ik eerst gratis een voorbeeld van je homepage. Bevalt het, dan bouw ik de rest, vanaf ${site} excl. btw.`,
    kop: "Eerst een gratis voorbeeld",
    beschrijving: "Prijzen excl. btw",
    knop: "LEARN_MORE",
  },
];
