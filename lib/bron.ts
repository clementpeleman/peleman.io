// Herkomst van de bezoeker (UTM-parameters, eerste pagina, verwijzende site). Alleen in het geheugen van deze
// browsertab, niets op het toestel: het gaat mee met een aanvraag en is weg bij een nieuwe pagina-lading.
let bron: Record<string, string> | null = null;

export function legBronVast() {
  if (bron) return;
  bron = {};
  const parameters = new URLSearchParams(window.location.search);
  for (const sleutel of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const waarde = parameters.get(sleutel);
    if (waarde) bron[sleutel] = waarde.slice(0, 120);
  }
  bron.landing = window.location.pathname;
  try {
    const verwijzer = document.referrer ? new URL(document.referrer) : null;
    if (verwijzer && verwijzer.origin !== window.location.origin) bron.referrer = verwijzer.hostname;
  } catch {
    // Ongeldige verwijzer: niets bijhouden.
  }
}

export function leesBron() {
  return bron ?? {};
}
