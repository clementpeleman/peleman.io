// Velden en controle van het aanvraagformulier (doc 13). Gedeeld door het formulier en de serveractie.

export const beroepen = [
  "Schrijnwerk of interieurbouw",
  "Keukens op maat",
  "Tuinaanleg",
  "Interieurarchitect",
  "Feestzaal",
  "Cateraar",
  "Advocaat",
  "Dierenarts",
  "Ander",
];

export const doelen = [
  "Beter tonen wat ik doe",
  "Betere aanvragen, met de juiste info",
  "Personeel vinden",
  "Ik heb nog geen website",
  "Iets anders",
];

export const bronSleutels = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "landing", "referrer"] as const;

export type Aanvraag = {
  zaak: string;
  beroep: string;
  hoofdberoep: "ja" | "nee";
  gemeente: string;
  doelen: string[];
  toelichting: string;
  huidig: string;
  naam: string;
  email: string;
  bron: Partial<Record<(typeof bronSleutels)[number], string>>;
};

type Veld = "zaak" | "beroep" | "hoofdberoep" | "gemeente" | "doel" | "naam" | "email";

export type Waarden = Omit<Aanvraag, "hoofdberoep" | "bron"> & { hoofdberoep: string };

export type FormStatus = {
  fouten?: Partial<Record<Veld, string>>;
  melding?: string;
  waarden?: Waarden;
};

const emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function tekst(gegevens: FormData, sleutel: string, max: number) {
  return String(gegevens.get(sleutel) ?? "").trim().slice(0, max);
}

export function leesAanvraag(gegevens: FormData): { aanvraag?: Aanvraag; status: FormStatus } {
  const waarden: Waarden = {
    zaak: tekst(gegevens, "zaak", 120),
    beroep: tekst(gegevens, "beroep", 60),
    hoofdberoep: tekst(gegevens, "hoofdberoep", 3),
    gemeente: tekst(gegevens, "gemeente", 80),
    doelen: gegevens.getAll("doel").map(String).filter((d) => doelen.includes(d)),
    toelichting: tekst(gegevens, "toelichting", 1000),
    huidig: tekst(gegevens, "huidig", 200),
    naam: tekst(gegevens, "naam", 80),
    email: tekst(gegevens, "email", 200),
  };

  const fouten: FormStatus["fouten"] = {};
  if (waarden.zaak.length < 2) fouten.zaak = "Vul de naam van je zaak in.";
  if (!beroepen.includes(waarden.beroep)) fouten.beroep = "Kies je beroep.";
  if (waarden.hoofdberoep !== "ja" && waarden.hoofdberoep !== "nee") fouten.hoofdberoep = "Laat weten of dit je hoofdberoep is.";
  if (waarden.gemeente.length < 2) fouten.gemeente = "Vul je gemeente of regio in.";
  if (waarden.doelen.length === 0) fouten.doel = "Kies minstens één optie.";
  if (waarden.naam.length < 2) fouten.naam = "Vul je naam in.";
  if (!emailPatroon.test(waarden.email)) fouten.email = "Vul een geldig e-mailadres in.";

  if (Object.keys(fouten).length > 0) return { status: { fouten, waarden } };

  const bron: Aanvraag["bron"] = {};
  for (const sleutel of bronSleutels) {
    const waarde = tekst(gegevens, `bron_${sleutel}`, 120);
    if (waarde) bron[sleutel] = waarde;
  }

  return {
    aanvraag: { ...waarden, hoofdberoep: waarden.hoofdberoep as "ja" | "nee", bron },
    status: { waarden },
  };
}

// Valkuil voor bots: het verborgen veld is ingevuld, of het formulier werd binnen drie seconden verstuurd.
export function lijktOpBot(gegevens: FormData) {
  if (String(gegevens.get("website") ?? "").trim()) return true;
  const geladen = Number(gegevens.get("geladen"));
  return Number.isFinite(geladen) && geladen > 0 && Date.now() - geladen < 3000;
}
