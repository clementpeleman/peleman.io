import type { StaticImageData } from "next/image";
import schaaf from "@/public/beeld/maatwerk/schaaf.jpg";

// Landingspagina's per vak (doc 12 en 18). Elke pagina gebruikt dezelfde opbouw uit app/_secties/VakPagina.tsx.
// Sinds de herpositionering (november 2026) staan ze niet meer in het menu, maar blijven ze bestaan voor Google.

type Punt = [string, string];

// Het aanvraagformulier op een gsm, zoals het voor dit vak zou werken. Altijd gelabeld als voorbeeld.
export type AanvraagVoorbeeld = {
  label: string;
  kop: string;
  vraag: string;
  keuzes: string[];
  velden: Punt[];
  fotos?: string;
};

export type Vak = {
  pad: string;
  menu: string;
  titel: string;
  beschrijving: string;
  // Vult het beroep in het aanvraagformulier al in.
  beroep?: string;
  kop: [string, string];
  intro: string;
  foto?: { src: StaticImageData; alt: string; marges?: { marginLeft?: number; marginRight?: number } };
  herkenning: { titel: string; punten: Punt[] };
  vak: { titel: string; tekst: string; punten: Punt[]; aanvraag: AanvraagVoorbeeld };
  // Wat na de naam van LVQ.wine komt in het blok met de case.
  caseTekst?: string;
  vragen: { titel: string; lijst: Punt[] };
  slot: [string, string];
};

const vastzitten: Punt = ["Zit ik vast als ik een voorbeeld vraag?", "Nee. Het voorbeeld is gratis. Pas als je verder wil, krijg je een offerte."];
const realisatiesToevoegen: Punt = [
  "Kan ik nieuwe realisaties laten toevoegen?",
  "Ja. Stuur me de foto’s en een korte uitleg, ik zet ze erop. Dat valt onder de kleine aanpassingen in je maandbedrag.",
];
const personeel: Punt = [
  "Kan ik er ook personeel mee vinden?",
  "Dat kan, met een pagina over werken bij jouw zaak. Vermeld het in je aanvraag, dan neem ik het mee in je voorbeeld.",
];

export const maatwerk: Vak = {
  pad: "/maatwerk",
  menu: "Schrijnwerk, interieurbouw en keukens",
  titel: "Website voor schrijnwerkers, interieurbouwers en keukenbouwers",
  beschrijving:
    "Ik maak websites voor schrijnwerkers, interieurbouwers en keukenbouwers: je realisaties per type, een aanvraag met de juiste info en je werkgebied in beeld. Eerst krijg je een gratis voorbeeld.",
  kop: ["Ik maak websites voor", "schrijnwerkers en keukenbouwers."],
  intro:
    "Je begint met een gratis voorbeeld. Ik zet je realisaties in de kijker en bouw een aanvraag die meteen de juiste info vraagt. Daarna hou ik je site bij.",
  foto: { src: schaaf, alt: "Handen van een schrijnwerker die een houten plank schaaft.", marges: { marginRight: 0.6 } },
  herkenning: {
    titel: "Herken je dit?",
    punten: [
      ["Je beste werk staat nergens samen", "Je mooiste realisaties staan in je gsm of op Instagram, maar niet op je site."],
      ["Aanvragen zonder de juiste info", "Je belt telkens terug voor de afmetingen, het budget of een foto van de ruimte."],
      ["Geen tijd om er zelf mee bezig te zijn", "Je site bijwerken schuift altijd door naar volgende week."],
    ],
  },
  vak: {
    titel: "Een site die past bij je vak",
    tekst: "Wie een keuken of een trap laat maken, wil eerst zien wat je kan. Daar is je site voor.",
    punten: [
      ["Je realisaties per type", "Keukens, kasten, trappen: elk type een eigen plek, met je beste foto’s."],
      ["Een aanvraag met de juiste info", "Soort project, budget en foto’s van de ruimte, nog voor je belt."],
      ["Je werkgebied en je Google-profiel", "Mensen uit je regio vinden je zo op je site en in Google Maps."],
    ],
    aanvraag: {
      label: "Voorbeeld van een aanvraagformulier voor maatwerk op een gsm.",
      kop: "Vraag je project aan",
      vraag: "Wat wil je laten maken?",
      keuzes: ["Keuken", "Kast", "Trap", "Iets anders"],
      velden: [["Budget", "€10.000 – €20.000"]],
      fotos: "Foto’s van de ruimte",
    },
  },
  vragen: {
    titel: "Vragen van makers",
    lijst: [
      realisatiesToevoegen,
      [
        "Komen mijn realisaties per type op de site?",
        "Ja. Keukens, kasten, trappen of wat je maakt: elk type krijgt een eigen pagina.",
      ],
      [
        "Wat als ik weinig goede foto’s heb?",
        "Dan start ik met wat er is. In je voorbeeld vul ik aan met sfeerfoto’s die duidelijk als voorbeeld gelabeld zijn. Op je echte site komen je eigen foto’s.",
      ],
      personeel,
      vastzitten,
    ],
  },
  slot: ["Benieuwd hoe jouw werk", "online kan staan?"],
};

export const tuinaanleg: Vak = {
  pad: "/tuinaanleg",
  menu: "Tuinaanleg",
  titel: "Website voor tuinaannemers",
  beschrijving:
    "Ik maak websites voor tuinaannemers, met je realisaties per soort en een aanvraag met de juiste info. Eerst krijg je een gratis voorbeeld.",
  beroep: "Tuinaannemer",
  kop: ["Ik maak websites voor", "tuinaannemers."],
  intro:
    "Je begint met een gratis voorbeeld. Daarin staan je mooiste tuinen vooraan, met een aanvraag die meteen vraagt wat je wil weten. Daarna hou ik je site bij.",
  herkenning: {
    titel: "Klinkt dit bekend?",
    punten: [
      ["Je beste werk staat op je gsm", "Soms ook op Instagram, maar een klant die je via Google vindt, krijgt het niet te zien."],
      ["In het voorjaar wil iedereen tegelijk", "Dan loopt je agenda vol en schuift je site nog verder naar achteren."],
      ["Prijsvragen zonder foto of afmetingen", "Je moet eerst gaan kijken voor je weet of het project bij je past."],
    ],
  },
  vak: {
    titel: "Een site die je tuinen laat zien",
    tekst: "Wie een tuin laat aanleggen, wil eerst zien wat je eerder deed. Grote foto’s zeggen dan meer dan een lange uitleg.",
    punten: [
      ["Je realisaties per soort", "Aanleg, terrassen, beplanting of onderhoud: elk een eigen plek, met je beste foto’s."],
      ["Een aanvraag met de juiste info", "Wat de klant wil, een budget en foto’s van de tuin, nog voor je langsgaat."],
      ["Je werkgebied en je Google-profiel", "Mensen uit je regio vinden je op je site en in Google Maps."],
    ],
    aanvraag: {
      label: "Voorbeeld van een aanvraagformulier voor tuinaanleg op een gsm.",
      kop: "Vraag je tuinproject aan",
      vraag: "Wat wil je laten doen?",
      keuzes: ["Nieuwe tuin", "Terras", "Beplanting", "Onderhoud"],
      velden: [["Budget", "€5.000 – €15.000"]],
      fotos: "Foto’s van je tuin",
    },
  },
  vragen: {
    titel: "Vragen van tuinaannemers",
    lijst: [
      realisatiesToevoegen,
      [
        "Ik heb vooral foto’s van tijdens de werken. Kan dat?",
        "Ja. Een tuin voor en na de werken toont goed wat je doet. Ontbreekt er iets, dan vul ik je voorbeeld aan met sfeerfoto’s die duidelijk als voorbeeld gelabeld zijn.",
      ],
      [
        "Kan ik laten weten wanneer ik weer tijd heb?",
        "Ja. Geef het door, dan zet ik een korte melding op je site, bijvoorbeeld vanaf wanneer je nieuwe projecten aanneemt.",
      ],
      personeel,
      vastzitten,
    ],
  },
  slot: ["Benieuwd hoe jouw tuinen", "online kunnen staan?"],
};

export const interieurarchitecten: Vak = {
  pad: "/interieurarchitecten",
  menu: "Interieurarchitecten",
  titel: "Website voor interieurarchitecten",
  beschrijving:
    "Ik maak websites voor interieurarchitecten, met je projecten groot in beeld. Ik bouw en onderhoud de site. Eerst krijg je een gratis voorbeeld.",
  beroep: "Interieurarchitect",
  kop: ["Ik maak websites voor", "interieurarchitecten."],
  intro:
    "Je begint met een gratis voorbeeld, opgebouwd rond je eigen projecten en je huisstijl. Ik bouw de site en hou hem daarna bij, zodat jij kan blijven ontwerpen.",
  herkenning: {
    titel: "Herken je dit?",
    punten: [
      ["Je beste projecten zitten in een pdf", "Je stuurt ze rond als portfolio, maar wie je via Google vindt, krijgt ze niet te zien."],
      ["Je site is ouder dan je laatste projecten", "Bijwerken is er nooit van gekomen. Er was altijd een klant die voorging."],
    ],
  },
  vak: {
    titel: "Je projecten groot in beeld",
    tekst: "Wie een interieurarchitect zoekt, kiest op stijl. Daarom krijgen je projecten de meeste ruimte, met grote foto’s en een korte uitleg.",
    punten: [
      ["Projecten per ruimte of per soort", "Woningen, keukens, badkamers of winkels: elk project met je beste beelden."],
      ["Een aanvraag die vooraf veel vertelt", "Welke ruimte, een budget, een timing en foto’s of plannen."],
      ["Je Google-profiel in orde", "Mensen uit je regio vinden je ook in Google Maps."],
    ],
    aanvraag: {
      label: "Voorbeeld van een aanvraagformulier voor een interieurproject op een gsm.",
      kop: "Vertel over je project",
      vraag: "Om welke ruimte gaat het?",
      keuzes: ["Woonkamer", "Keuken", "Badkamer", "Hele woning"],
      velden: [
        ["Budget", "€20.000 – €50.000"],
        ["Timing", "Voorjaar 2027"],
      ],
      fotos: "Foto’s of plannen",
    },
  },
  vragen: {
    titel: "Vragen van interieurarchitecten",
    lijst: [
      [
        "Ik ontwerp zelf. Kan ik meebeslissen over de stijl?",
        "Ja. Je voorbeeld vertrekt van je eigen projecten en je huisstijl. Daarna bespreken we het samen, en wat je anders wil, neem ik mee.",
      ],
      [
        "Kan ik ook schetsen, plannen of moodboards tonen?",
        "Ja. Bij elk project kunnen naast foto’s ook schetsen, plannen of moodboards. Je stuurt ze door, ik zet ze erop.",
      ],
      ["Kan ik nieuwe projecten laten toevoegen?", "Ja. Dat valt onder de kleine aanpassingen in je maandbedrag."],
      vastzitten,
    ],
  },
  slot: ["Benieuwd hoe jouw ontwerpen", "online kunnen staan?"],
};

export const feest: Vak = {
  pad: "/feestzalen-en-cateraars",
  menu: "Feestzalen en cateraars",
  titel: "Website voor feestzalen en cateraars",
  beschrijving:
    "Ik maak websites voor feestzalen en cateraars, met je zaal of je formules en een aanvraag met datum en aantal gasten. Eerst krijg je een gratis voorbeeld.",
  kop: ["Ik maak websites voor", "feestzalen en cateraars."],
  intro:
    "Je begint met een gratis voorbeeld. Koppels en bedrijven zien er meteen je zaal of je formules, en de aanvraag vraagt de datum en het aantal gasten. Daarna hou ik je site bij.",
  herkenning: {
    titel: "Herken je dit?",
    punten: [
      ["Elke mail begint met ‘is die datum nog vrij?’", "Je beantwoordt telkens dezelfde vraag, per mail of aan de telefoon."],
      ["Je formules staan nog op vorig jaar", "Nieuwe prijzen of een nieuw menu op je site zetten schuift altijd op de lange baan."],
      ["Je mooiste feesten staan op trouwplatformen", "Daar sta je naast veel andere zalen. Op je eigen site is alle aandacht voor jou."],
    ],
  },
  vak: {
    titel: "Wat koppels en bedrijven willen weten",
    tekst:
      "Wie een feest plant, kiest vaak een jaar op voorhand. Ze willen de zaal of het eten zien, weten hoeveel gasten er kunnen komen en of hun datum vrij is.",
    punten: [
      ["Je zaal of je formules", "Met foto’s, het aantal gasten en wat er inbegrepen is."],
      ["Je volzette data in beeld", "Geef ze door, ik werk je site bij."],
      ["Een aanvraag met datum en aantal gasten", "En het soort feest, zodat je meteen weet of het past."],
    ],
    aanvraag: {
      label: "Voorbeeld van een aanvraagformulier voor een feest op een gsm.",
      kop: "Vraag je feest aan",
      vraag: "Wat vier je?",
      keuzes: ["Huwelijk", "Verjaardag", "Bedrijfsfeest", "Iets anders"],
      velden: [
        ["Datum", "Zaterdag 12 juni 2027"],
        ["Aantal gasten", "120"],
      ],
    },
  },
  caseTekst: "Ze organiseren ook proeverijen en events. Hun site toont de wijnen en de sfeer, in een eigen stijl die ook op gsm goed werkt.",
  vragen: {
    titel: "Vragen van zalen en cateraars",
    lijst: [
      [
        "Kan ik nieuwe menu’s of formules laten zetten?",
        "Ja. Stuur me de nieuwe versie, ik zet ze erop binnen vijf werkdagen. Dat valt onder de kleine aanpassingen in je maandbedrag.",
      ],
      ["Hoe houden we de vrije data bij?", "Je stuurt me de data die volzet zijn, bijvoorbeeld als korte lijst per maand. Ik werk je site bij."],
      ["Kan ik een brochure of prijslijst aanbieden?", "Ja, als pdf om te downloaden op je site."],
      vastzitten,
    ],
  },
  slot: ["Benieuwd hoe jouw feesten", "online kunnen staan?"],
};

export const vakken: Vak[] = [maatwerk, tuinaanleg, interieurarchitecten, feest];
