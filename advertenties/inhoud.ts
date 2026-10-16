// Alle advertenties op één plek. Elke id is ook de utm_content, zodat een aanvraag in Twenty terug te leiden is
// tot de advertentie. Teksten volgen docs/brand/website-abonnement/11-merkstem.md; `npm run controle` kijkt ze na.
import { inclBtw, laagstePrijs, pakketten } from "../lib/gegevens.ts";

export type Formaat = "staand" | "verhaal" | "vierkant";

export const formaten: Record<Formaat, { breedte: number; hoogte: number; naam: string }> = {
  staand: { breedte: 1080, hoogte: 1350, naam: "4:5 voor de feed" },
  verhaal: { breedte: 1080, hoogte: 1920, naam: "9:16 voor stories en reels" },
  vierkant: { breedte: 1080, hoogte: 1080, naam: "1:1 voor de carrousel" },
};

// Knop onder de advertentie: call_to_action_type in Meta, met het label dat Meta in het Nederlands toont.
export const knoppen = { LEARN_MORE: "Meer informatie", GET_QUOTE: "Offerte aanvragen" } as const;
export type Knop = keyof typeof knoppen;

export type Sjabloon = "glas" | "gsm" | "prijs" | "aanvraag" | "scherm" | "stappen" | "schermvideo" | "lancering";

// Echte schermen die in beeld mogen: sites van klanten en eigen werk, en het aanvraagformulier van peleman.io.
// Namen nooit in de tekst; Tourage krijgt in beeld altijd ‘eigen concept’.
export type Scherm = "lvq" | "tourage" | "aanvraag";

export type Kaart = { kop: string; nummer?: number; titel: [string, string?]; tekst?: string };

export type Advertentie = {
  id: string;
  hoek: string;
  sjabloon: Sjabloon;
  formaten: Formaat[];
  // Wat in het beeld staat.
  beeld: { kop?: [string, string]; tekst?: string; pil?: string; lijst?: string[]; voetnoot?: string; zinnen?: string[]; slot?: string };
  scherm?: Scherm;
  kaarten?: Kaart[];
  // Wat Meta rond het beeld toont.
  hoofdtekst: string;
  kop: string;
  beschrijving: string;
  knop: Knop;
};

const groei = pakketten.find((p) => p.naam === "Groei")!;
// Lanceringsaanbod uit doc 08: de eerste drie zaken krijgen Groei het eerste jaar aan dit bedrag.
export const lanceringsprijs = 79;

// Sinds 16 oktober breed: zelfstandigen in het algemeen, naar de homepage (eerst was het maatwerk-1 naar /maatwerk).
export const campagne = "zelfstandigen-1";
export const bestemming = "https://peleman.io/";

export function url(a: Advertentie) {
  const u = new URL(bestemming);
  u.searchParams.set("utm_source", "meta");
  u.searchParams.set("utm_medium", "paid_social");
  u.searchParams.set("utm_campaign", campagne);
  u.searchParams.set("utm_content", a.id);
  return u.toString();
}

export const advertenties: Advertentie[] = [
  {
    id: "even-goed",
    hoek: "Even goed als je werk",
    sjabloon: "glas",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Een website die even goed is", "als jouw werk."] },
    scherm: "lvq",
    hoofdtekst:
      "Wij maken en onderhouden websites voor zelfstandigen. Je begint met een gratis voorbeeld van je eigen zaak, en pas daarna beslis je.",
    kop: "Eerst een gratis voorbeeld",
    beschrijving: "Vast bedrag per maand",
    knop: "LEARN_MORE",
  },
  {
    id: "eerst-zien",
    hoek: "Eerst gratis zien",
    sjabloon: "gsm",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Zie eerst hoe jouw zaak", "online kan staan."], tekst: "Een gratis voorbeeld, binnen vijf werkdagen na onze bevestiging." },
    scherm: "lvq",
    hoofdtekst:
      "Benieuwd hoe jouw werk online kan staan? Vraag een gratis voorbeeld aan. Binnen vijf werkdagen na onze bevestiging zie je een werkende pagina van je eigen zaak.",
    kop: "Je eigen site, eerst gratis bekijken",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "vaste-prijs",
    hoek: "Vaste prijs, niets vooraf",
    sjabloon: "prijs",
    formaten: ["staand", "verhaal"],
    beeld: {
      pil: "Geen investering vooraf",
      kop: ["Vanaf", `€${laagstePrijs}`],
      tekst: `per maand, excl. btw`,
      voetnoot: `${inclBtw(laagstePrijs)} incl. btw`,
      lijst: ["Ontwerp en bouw", "Hosting en onderhoud", "Elke maand aanpassingen"],
    },
    hoofdtekst:
      "Een nieuwe website, zonder investering vooraf. Je betaalt een vast bedrag per maand. Ontwerp, hosting, onderhoud en aanpassingen zitten erin. Je start met een gratis voorbeeld.",
    kop: `Vanaf €${laagstePrijs} per maand, excl. btw`,
    beschrijving: "Alles inbegrepen",
    knop: "LEARN_MORE",
  },
  {
    id: "beter-doen",
    hoek: "Wat moet je site beter doen",
    sjabloon: "aanvraag",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Wat moet jouw website", "beter doen?"], tekst: "Vertel het in twee minuten. Je gratis voorbeeld speelt erop in." },
    scherm: "aanvraag",
    hoofdtekst:
      "Beter tonen wat je doet, betere aanvragen of personeel vinden? Vertel ons wat je website moet doen. We maken een gratis voorbeeld van je eigen zaak dat daarop inspeelt.",
    kop: "Vertel wat je site moet doen",
    beschrijving: "In twee minuten aangevraagd",
    knop: "LEARN_MORE",
  },
  {
    id: "niveau",
    hoek: "Herkenning",
    sjabloon: "scherm",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Staat je website nog niet", "op het niveau van je werk?"] },
    scherm: "lvq",
    hoofdtekst:
      "Staat je website nog niet op het niveau van je werk? Dan zetten we dat recht. Wij bouwen je site en houden ze bij, voor een vast bedrag per maand. Eerst zie je een gratis voorbeeld.",
    kop: "Een site die bij je werk past",
    beschrijving: "Gratis voorbeeld eerst",
    knop: "LEARN_MORE",
  },
  {
    id: "zo-werkt-het",
    hoek: "Zo werkt het",
    sjabloon: "stappen",
    formaten: ["vierkant"],
    beeld: {},
    kaarten: [
      { kop: "Zo werkt het", titel: ["Je nieuwe website,", "in drie stappen."] },
      { kop: "Gratis voorbeeld aanvragen", nummer: 1, titel: ["Je vraagt een gratis voorbeeld aan"], tekst: "Dat duurt twee minuten, ook op je gsm." },
      {
        kop: "Je voorbeeld in vijf werkdagen",
        nummer: 2,
        titel: ["Je bekijkt je voorbeeld"],
        tekst: "Een werkende pagina van je eigen zaak, binnen vijf werkdagen na onze bevestiging.",
      },
      { kop: "Online na zo’n twee weken", nummer: 3, titel: ["Je beslist"], tekst: "Ga je verder, dan staat je site zo’n twee weken later online." },
    ],
    scherm: "lvq",
    hoofdtekst: "Een nieuwe website in drie stappen, met eerst een gratis voorbeeld van je eigen zaak.",
    kop: "Zo werkt het",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "schermvideo",
    hoek: "Een echte site in beweging",
    sjabloon: "schermvideo",
    formaten: ["verhaal"],
    beeld: {
      zinnen: ["Zo kan jouw werk online staan.", "Eerst zie je een gratis voorbeeld van je eigen zaak.", "Daarna een vast bedrag per maand, alles inbegrepen."],
      slot: "Vraag je gratis voorbeeld aan.",
    },
    scherm: "lvq",
    hoofdtekst:
      "Zo kan jouw werk online staan. We maken eerst een gratis voorbeeld van je eigen zaak. Daarna betaal je een vast bedrag per maand, met alles inbegrepen.",
    kop: "Zie hoe jouw site kan worden",
    beschrijving: "Vast bedrag per maand",
    knop: "LEARN_MORE",
  },
  {
    id: "lanceringsaanbod",
    hoek: "Lanceringsaanbod",
    sjabloon: "lancering",
    formaten: ["staand", "verhaal"],
    beeld: {
      pil: "Lanceringsaanbod",
      kop: [`${groei.naam} aan €${lanceringsprijs} per maand,`, "het eerste jaar."],
      tekst: "Voor de eerste drie zaken, in ruil voor een case met foto’s en een review.",
      voetnoot: `Daarna €${groei.prijs} per maand. Prijzen excl. btw.`,
      lijst: groei.inhoud.slice(0, 5),
    },
    hoofdtekst: `Voor de eerste drie zaken: ${groei.naam} een jaar lang aan €${lanceringsprijs} per maand in plaats van €${groei.prijs}, excl. btw. In ruil maken we samen een case met foto’s en een review. Je begint met een gratis voorbeeld.`,
    kop: `Eerste jaar ${groei.naam} aan €${lanceringsprijs} per maand`,
    beschrijving: "Voor de eerste drie zaken",
    knop: "LEARN_MORE",
  },
];
