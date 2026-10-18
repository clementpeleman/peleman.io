// Gewone berichten voor Instagram: het startraster van het profiel. Zelfde sjablonen als de advertenties, zonder knop
// in het beeld. `volgorde` is de volgorde van plaatsen: het laatste bericht komt linksboven in het raster.
// Groen en licht wisselen af als een dambord. Namen van klanten niet in de tekst, zoals in de advertenties.
import { inclBtw, laagstePrijs } from "../lib/gegevens.ts";
import type { Beeldinhoud } from "./inhoud.ts";

export type Post = Beeldinhoud & { volgorde: number; bijschrift: string };

const bio = "Vraag je gratis voorbeeld aan via de link in onze bio.";
const tags = "#zelfstandigen #website #webdesign #vlaanderen";

export const posts: Post[] = [
  {
    volgorde: 1,
    id: "hallo",
    sjabloon: "tekst",
    beeld: { kop: ["Websites voor", "zelfstandigen."], tekst: "Wij bouwen je site en houden ze bij, voor een vast bedrag per maand." },
    bijschrift: `Hallo, wij zijn peleman.io. We maken websites voor zelfstandigen, en we houden ze ook bij. Je betaalt een vast bedrag per maand, zonder investering vooraf.\n\nBenieuwd hoe jouw zaak online kan staan? ${bio}\n\n${tags}`,
  },
  {
    volgorde: 2,
    id: "wijnimporteur",
    sjabloon: "gsm",
    scherm: "lvq",
    beeld: { kop: ["Een wijnimporteur,", "rustig in beeld."], tekst: "Grote foto’s, weinig woorden en alles meteen te vinden." },
    bijschrift: `Een wijnimporteur uit Oosterzele, met een site die past bij wat ze verkopen: grote foto’s, weinig woorden en alles meteen te vinden.\n\nZo kan het ook voor jouw zaak. ${bio}\n\n${tags}`,
  },
  {
    volgorde: 3,
    id: "alles-inbegrepen",
    sjabloon: "lijst",
    beeld: {
      pil: "Alles inbegrepen",
      kop: ["Wat zit erin?", "Alles."],
      lijst: ["Ontwerp en bouw", "Hosting en beveiliging", "Back-ups en updates", "Je domein op jouw naam", "Elke maand aanpassingen", "Eén vast aanspreekpunt"],
    },
    bijschrift: `Bij peleman.io zit alles in je maandbedrag: ontwerp, bouw, hosting, beveiliging, back-ups, updates en elke maand aanpassingen. Je domein staat op jouw naam, en je hebt één vast aanspreekpunt.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 4,
    id: "realisaties",
    sjabloon: "scherm",
    scherm: "h16",
    beeld: { kop: ["Je realisaties,", "groot in beeld."] },
    bijschrift: `Wie een groot project laat uitvoeren, wil eerst zien wat je kan. Daarom krijgen je realisaties veel plaats op je site, op elk scherm.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 5,
    id: "eerst-zien",
    sjabloon: "tekst",
    scherm: "h16",
    beeld: { kop: ["Je ziet je site eerst.", "Dan beslis je."], tekst: "Een gratis voorbeeld van je eigen zaak, binnen vijf werkdagen na onze bevestiging." },
    bijschrift: `Je hoeft niets te beslissen voor je iets gezien hebt. We maken eerst gratis een werkende pagina van je eigen zaak. Binnen vijf werkdagen na onze bevestiging heb je ze.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 6,
    id: "beter-doen",
    sjabloon: "aanvraag",
    scherm: "aanvraag",
    beeld: { kop: ["Wat moet jouw website", "beter doen?"], tekst: "Vertel het in twee minuten. Je gratis voorbeeld speelt erop in." },
    bijschrift: `Beter tonen wat je doet, betere aanvragen of personeel vinden? Of heb je nog geen website? Vertel het ons in twee minuten. Je gratis voorbeeld speelt daarop in.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 7,
    id: "vaste-prijs",
    sjabloon: "prijs",
    beeld: {
      pil: "Geen investering vooraf",
      kop: ["Vanaf", `€${laagstePrijs}`],
      tekst: "per maand, excl. btw",
      voetnoot: `${inclBtw(laagstePrijs)} incl. btw`,
      lijst: ["Ontwerp en bouw", "Hosting en onderhoud", "Elke maand aanpassingen"],
    },
    bijschrift: `Een nieuwe website, zonder investering vooraf. Vanaf €${laagstePrijs} per maand, excl. btw, met ontwerp, hosting, onderhoud en aanpassingen inbegrepen. Je start met een gratis voorbeeld.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 8,
    id: "elk-project",
    sjabloon: "gsm",
    scherm: "h16-project",
    scherm2: "h16",
    beeld: { kop: ["Van de homepage", "tot elk project."], tekst: "Elke realisatie krijgt een eigen pagina, met foto’s en uitleg." },
    bijschrift: `Elke realisatie krijgt een eigen pagina, met foto’s, uitleg en het adres. Zo ziet een nieuwe klant meteen wat je kan.\n\n${bio}\n\n${tags}`,
  },
  {
    volgorde: 9,
    id: "even-goed",
    sjabloon: "glas",
    scherm: "h16",
    scherm2: "h16-project",
    beeld: { kop: ["Een website die even goed is", "als jouw werk."] },
    bijschrift: `Staat je website nog niet op het niveau van je werk? Dan zetten we dat recht, voor een vast bedrag per maand.\n\n${bio}\n\n${tags}`,
  },
].map((p) => ({ ...p, knopInBeeld: false }) as Post);

export function postId(p: Post) {
  return `post-${p.volgorde}-${p.id}`;
}
