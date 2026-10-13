import type { StaticImageData } from "next/image";
import h16Desktop from "@/public/beeld/cases/h16-desktop.jpg";
import h16Gsm from "@/public/beeld/cases/h16-gsm.jpg";
import lvqDesktop from "@/public/beeld/cases/lvq-desktop.jpg";
import lvqGsm from "@/public/beeld/cases/lvq-gsm.jpg";
import tourageDesktop from "@/public/beeld/cases/tourage-desktop.jpg";
import tourageGsm from "@/public/beeld/cases/tourage-gsm.jpg";

// Alleen echt werk. Tourage is fictief en heet altijd ‘eigen concept’. H16 alleen in de hero en op /cases (13 oktober 2026).
export type Case = {
  naam: string;
  soort: "Klant" | "Eigen concept";
  wie: string;
  intro: string;
  punten: [string, string][];
  noot?: string;
  url: string;
  domein: string;
  desktop: StaticImageData;
  gsm: StaticImageData;
  alt: string;
};

const h16: Case = {
  naam: "H16",
  soort: "Klant",
  wie: "Bouwcoördinatie en projectontwikkeling in Gent",
  intro: "H16 is een klein familiebedrijf uit Oosterzele dat bouwprojecten van begin tot eind begeleidt, van renovatie tot nieuwbouw.",
  punten: [
    ["Hun projecten krijgen ruimte", "Grote foto’s van echte realisaties, met het adres en het jaar erbij."],
    ["Duidelijke diensten", "Bouwcoördinatie en projectontwikkeling, elk met een eigen uitleg."],
    ["Contact zonder zoeken", "Een knop voor vrijblijvend advies en een klikbaar telefoonnummer, meteen bovenaan."],
  ],
  url: "https://h16.be",
  domein: "h16.be",
  desktop: h16Desktop,
  gsm: h16Gsm,
  alt: "De website van H16 op desktop en gsm, met de titel Bouwcoördinatie en projectontwikkeling en foto’s van realisaties.",
};

export const lvq: Case = {
  naam: "LVQ.wine",
  soort: "Klant",
  wie: "Le Vin Quotidien, wijnimporteur in Oosterzele",
  intro: "Le Vin Quotidien importeert wijn van kleine Franse domeinen en organiseert proeverijen en events.",
  punten: [
    ["Een eigen, rustige stijl", "Passend bij wijnen van kleine domeinen, met foto’s die sfeer geven."],
    ["Een webshop met filters", "Wit, rood en mousserend, zodat klanten snel vinden wat ze zoeken."],
    ["Even sterk op gsm", "Met het adres en de contactgegevens meteen in beeld."],
  ],
  url: "https://lvq.wine",
  domein: "lvq.wine",
  desktop: lvqDesktop,
  gsm: lvqGsm,
  alt: "De website van Le Vin Quotidien op desktop en gsm, met foto’s van wijn en een proeverij.",
};

const tourage: Case = {
  naam: "Tourage",
  soort: "Eigen concept",
  wie: "Eén dossier voor pech in het buitenland",
  intro:
    "Bij een panne over de grens kijken vijf partijen naar dezelfde wagen. Tourage brengt ze samen in één dossier; de landingspagina legt dat idee uit.",
  punten: [
    ["Eén verhaal, stap voor stap", "Een scrollverhaal volgt één panne, van melding tot thuiskomst."],
    ["Een kaart die meteen uitlegt", "Route en status in één beeld, zonder lange uitleg."],
    ["Eén duidelijke volgende stap", "Alles leidt naar één vraag: start een pilot."],
  ],
  noot: "Tourage is een eigen concept, geen klant.",
  url: "https://tourage.peleman.io",
  domein: "tourage.peleman.io",
  desktop: tourageDesktop,
  gsm: tourageGsm,
  alt: "De landingspagina van Tourage op desktop en gsm, met een kaart van een route van Lyon naar Antwerpen.",
};

export const cases: Case[] = [h16, lvq, tourage];
