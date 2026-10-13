"use client";

import { useEffect } from "react";
import { meetAanvraag } from "../../_componenten/Meting";

// Telt een ingediende aanvraag als conversie, zodra de meting (met toestemming) klaarstaat.
export function Conversie() {
  useEffect(() => {
    let gemeten = false;
    const meet = () => {
      if (gemeten) return;
      gemeten = true;
      meetAanvraag();
    };
    const w = window as Window & { gtag?: unknown; fbq?: unknown };
    if (w.gtag || w.fbq) meet();
    else window.addEventListener("pio-meting-klaar", meet, { once: true });
    return () => window.removeEventListener("pio-meting-klaar", meet);
  }, []);
  return null;
}
