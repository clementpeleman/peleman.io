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
  beeld: { kop?: [string, string?]; tekst?: string; pil?: string; lijst?: string[]; voetnoot?: string; zinnen?: string[]; slot?: string };
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
// huisstijl-1 (20 november 2026): voor zaken die al een logo of huisstijl hebben, maar nog geen site die er klanten
// mee binnenhaalt. Gebaseerd op het echte verloop bij H16 (huisstijl van een ontwerpbureau, site van Clément).
// De reeks zelfstandigen-2 staat in git en in public/beeld/advertenties/zelfstandigen-2.
export const campagne = "huisstijl-1";
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

export const advertenties: Advertentie[] = [
  {
    id: "huisstijl-klanten",
    hoek: "Je huisstijl omzetten in klanten",
    sjabloon: "glas",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Je huisstijl omzetten in klanten?"] },
    knopInBeeld: false,
    scherm: "lvq",
    scherm2: "lvq",
    hoofdtekst: "Een logo en huisstijl maken je zaak herkenbaar. Klanten komen er pas van als ze je online vinden en meteen zien wat je doet. Daarvoor bouw ik je website in je eigen stijl.",
    kop: "Websites in je eigen huisstijl",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "sterk-merk",
    hoek: "Sterk merk, geen klanten via de site",
    sjabloon: "gsm",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Een sterk merk, maar nog geen klanten via je website?"], tekst: "Deze site bouwde ik in een huisstijl die er al was." },
    scherm: "h16-project",
    scherm2: "h16",
    hoofdtekst: "Veel zaken investeren in een logo en een huisstijl en hebben daarna een website die daar niet bij aansluit. Ik bouw sites die je merk overbrengen en aanvragen binnenhalen.",
    kop: "Een website die bij je merk past",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "nieuwe-klanten",
    hoek: "Hoe nieuwe klanten je merk zien",
    sjabloon: "scherm",
    formaten: ["staand", "verhaal"],
    beeld: { kop: ["Hoe zien nieuwe klanten je merk vandaag?"] },
    scherm: "h16",
    hoofdtekst: "Wie je nog niet kent zoekt meestal eerst in Google. Wat ze daar vinden is vaak het eerste wat ze van je merk zien. Ik bouw je website in je eigen branding, gemaakt om gevonden te worden.",
    kop: "Gevonden worden met je eigen merk",
    beschrijving: "Websites voor zelfstandigen",
    knop: "LEARN_MORE",
  },
  {
    id: "huisstijl-aanvragen",
    hoek: "Van huisstijl naar aanvragen",
    sjabloon: "lijst",
    formaten: ["staand", "verhaal"],
    beeld: {
      pil: "Zo werkt het",
      kop: ["Van huisstijl naar aanvragen."],
      lijst: ["Je bezorgt me je huisstijl en foto’s", "Ik maak gratis een voorbeeld van je homepage", "Bevalt het? Dan bouw ik de rest"],
    },
    hoofdtekst: `Je bezorgt me je logo, je kleuren en foto’s van je werk. Ik maak eerst gratis een voorbeeld van je homepage. Bevalt het, dan bouw ik de rest: een site die gevonden wordt en aanvragen rechtstreeks naar je mailbox stuurt. Vanaf ${site} excl. btw.`,
    kop: "Een website op basis van je huisstijl",
    beschrijving: "Vanaf €1.500 excl. btw",
    knop: "LEARN_MORE",
  },
];
