"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bewaarToestemming, leesToestemming, meetActief, meetIds, openCookieInstellingen } from "@/lib/toestemming";

export function CookieKnop() {
  if (!meetActief) return null;
  return (
    <button type="button" className="voet-knop" onClick={openCookieInstellingen}>
      Cookie-instellingen
    </button>
  );
}

export function Toestemming() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analyse, setAnalyse] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!meetActief) return;
    if (!leesToestemming()) setOpen(true);
    const heropen = () => {
      const t = leesToestemming();
      setAnalyse(Boolean(t?.analyse));
      setMarketing(Boolean(t?.marketing));
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener("pio-toestemming-open", heropen);
    return () => window.removeEventListener("pio-toestemming-open", heropen);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-toestemming-open", open);
  }, [open]);

  if (!open) return null;

  const kies = (keuze: { analyse: boolean; marketing: boolean }) => {
    bewaarToestemming(keuze);
    setOpen(false);
  };

  return (
    <section className="toestemming" role="dialog" aria-labelledby="toestemming-titel" aria-describedby="toestemming-tekst">
      <h2 id="toestemming-titel">Cookies</h2>
      <p id="toestemming-tekst">
        We meten graag hoe bezoekers onze site gebruiken en welke advertenties werken. Daarvoor plaatsen we cookies, maar alleen als
        jij dat goed vindt. Meer in ons <Link href="/cookies">cookiebeleid</Link>.
      </p>

      {details && (
        <div className="toestemming-keuzes">
          {meetIds.ga && (
            <label className="keuze">
              <input type="checkbox" checked={analyse} onChange={(e) => setAnalyse(e.target.checked)} />
              <span>
                <b>Meten</b> Google Analytics: welke pagina’s bezocht worden.
              </span>
            </label>
          )}
          {meetIds.meta && (
            <label className="keuze">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              <span>
                <b>Advertenties</b> Meta: welke advertenties tot een aanvraag leiden.
              </span>
            </label>
          )}
        </div>
      )}

      <div className="toestemming-knoppen">
        <button type="button" className="knop knop--klein" onClick={() => kies({ analyse: false, marketing: false })}>
          Alles weigeren
        </button>
        {details ? (
          <button type="button" className="knop knop--klein knop--rand" onClick={() => kies({ analyse, marketing })}>
            Bewaar mijn keuze
          </button>
        ) : (
          <button type="button" className="knop knop--klein knop--rand" onClick={() => setDetails(true)}>
            Instellingen
          </button>
        )}
        <button type="button" className="knop knop--klein" onClick={() => kies({ analyse: true, marketing: true })}>
          Alles aanvaarden
        </button>
      </div>
    </section>
  );
}
