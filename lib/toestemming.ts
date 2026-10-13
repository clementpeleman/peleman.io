// Toestemming voor cookies. Zonder meet-ID's verschijnt er geen banner en worden er geen cookies gezet.

export const meetIds = {
  ga: process.env.NEXT_PUBLIC_GA_ID || "",
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};

export const meetActief = Boolean(meetIds.ga || meetIds.meta);

export type Toestemming = { analyse: boolean; marketing: boolean; datum: string; versie: 1 };

const sleutel = "pio-toestemming";
const geldigheid = 182 * 24 * 60 * 60 * 1000; // zes maanden, daarna vragen we opnieuw

export function leesToestemming(): Toestemming | null {
  try {
    const t = JSON.parse(localStorage.getItem(sleutel) ?? "null") as Toestemming | null;
    if (t?.versie !== 1 || Date.now() - Date.parse(t.datum) > geldigheid) return null;
    return t;
  } catch {
    return null;
  }
}

export function bewaarToestemming(keuze: { analyse: boolean; marketing: boolean }) {
  const t: Toestemming = { ...keuze, datum: new Date().toISOString(), versie: 1 };
  try {
    localStorage.setItem(sleutel, JSON.stringify(t));
  } catch {
    // Opslag geblokkeerd: de keuze geldt dan alleen voor dit bezoek.
  }
  window.dispatchEvent(new CustomEvent<Toestemming>("pio-toestemming", { detail: t }));
}

export function openCookieInstellingen() {
  window.dispatchEvent(new Event("pio-toestemming-open"));
}
