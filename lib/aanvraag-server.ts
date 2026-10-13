import nodemailer from "nodemailer";
import { contact } from "./gegevens";
import type { Aanvraag } from "./formulier";

// Instellingen: zie .env.example. Zonder Twenty of SMTP wordt dat kanaal overgeslagen.
const twentyUrl = process.env.TWENTY_API_URL?.replace(/\/+$/, "");
const twentySleutel = process.env.TWENTY_API_KEY;
const smtpHost = process.env.SMTP_HOST;
const afzender = process.env.SMTP_FROM || process.env.SMTP_USER || contact.email;

export const kanalen = {
  twenty: Boolean(twentyUrl && twentySleutel),
  mail: Boolean(smtpHost),
};

function regels(a: Aanvraag): [string, string][] {
  const bron = Object.entries(a.bron).map(([k, v]) => `${k}=${v}`).join(", ");
  return [
    ["Zaak", a.zaak],
    ["Beroep", `${a.beroep} (hoofdberoep: ${a.hoofdberoep})`],
    ["Gemeente of regio", a.gemeente],
    ["Website moet beter", a.doelen.join(", ")],
    ["Toelichting", a.toelichting || "—"],
    ["Huidige site of sociale media", a.huidig || "—"],
    ["Naam", a.naam],
    ["E-mail", a.email],
    ["Bron", bron || "—"],
    ["Ontvangen", new Date().toLocaleString("nl-BE", { timeZone: "Europe/Brussels" })],
  ];
}

const enkeleRegel = (s: string) => s.replace(/[\r\n]+/g, " ");

// Twenty

async function twenty(methode: "GET" | "POST", pad: string, body?: unknown) {
  const antwoord = await fetch(`${twentyUrl}/rest/${pad}`, {
    method: methode,
    headers: { Authorization: `Bearer ${twentySleutel}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!antwoord.ok) throw new Error(`Twenty ${methode} ${pad}: ${antwoord.status} ${(await antwoord.text()).slice(0, 300)}`);
  return (await antwoord.json()) as { data?: Record<string, unknown> };
}

function id(antwoord: { data?: Record<string, unknown> }) {
  const record = Object.values(antwoord.data ?? {})[0] as { id?: string } | undefined;
  if (!record?.id) throw new Error("Twenty gaf geen id terug");
  return record.id;
}

async function bestaandePersoon(email: string) {
  try {
    const filter = encodeURIComponent(`emails.primaryEmail[eq]:"${email}"`);
    const antwoord = await twenty("GET", `people?filter=${filter}&limit=1`);
    const lijst = Object.values(antwoord.data ?? {})[0];
    return Array.isArray(lijst) && lijst[0]?.id ? (lijst[0].id as string) : null;
  } catch {
    return null;
  }
}

export async function bewaarInTwenty(a: Aanvraag) {
  const [voornaam, ...rest] = a.naam.split(/\s+/);
  const bedrijf = id(await twenty("POST", "companies", { name: a.zaak, address: { addressCity: a.gemeente, addressCountry: "Belgium" } }));
  const persoon =
    (await bestaandePersoon(a.email)) ??
    id(
      await twenty("POST", "people", {
        name: { firstName: voornaam, lastName: rest.join(" ") },
        emails: { primaryEmail: a.email },
        city: a.gemeente,
        jobTitle: a.beroep,
        companyId: bedrijf,
      }),
    );
  const kans = id(
    await twenty("POST", "opportunities", {
      name: `Gratis voorbeeld · ${a.zaak}`,
      stage: "NEW",
      companyId: bedrijf,
      pointOfContactId: persoon,
    }),
  );
  const notitie = id(
    await twenty("POST", "notes", {
      title: `Aanvraag van ${a.naam}`,
      bodyV2: { markdown: regels(a).map(([k, v]) => `**${k}:** ${v}`).join("\n\n") },
    }),
  );
  await twenty("POST", "noteTargets", { noteId: notitie, targetOpportunityId: kans });
}

// Mail

function vervoer() {
  const poort = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: smtpHost,
    port: poort,
    secure: poort === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export async function mailIntern(a: Aanvraag) {
  await vervoer().sendMail({
    from: { name: "peleman.io", address: afzender },
    to: process.env.AANVRAAG_NAAR || contact.email,
    replyTo: { name: a.naam, address: a.email },
    subject: enkeleRegel(`Nieuwe aanvraag: ${a.zaak} (${a.beroep})`),
    text: regels(a).map(([k, v]) => `${k}: ${v}`).join("\n"),
  });
}

// M1 uit doc 13.
export async function mailBevestiging(a: Aanvraag) {
  const voornaam = a.naam.split(/\s+/)[0];
  await vervoer().sendMail({
    from: { name: "Clément, peleman.io", address: afzender },
    to: { name: a.naam, address: a.email },
    replyTo: contact.email,
    subject: "We hebben je aanvraag",
    text: [
      `Dag ${voornaam},`,
      `Bedankt voor je aanvraag voor ${enkeleRegel(a.zaak)}. We bekijken ze en laten je binnen één werkdag weten of we een voorbeeld maken.`,
      "Clément, peleman.io",
    ].join("\n\n"),
  });
}
