"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pijl } from "../_componenten/merk";

// Vaste aanvraagknop onderaan op gsm, zichtbaar tussen de hero-knop en het slot van de pagina.
export function GsmBalk() {
  const [heroInBeeld, setHeroInBeeld] = useState(true);
  const [eindeInBeeld, setEindeInBeeld] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-knop]");
    const einde = document.querySelectorAll("[data-einde]");
    const zichtbaarEinde = new Set<Element>();

    const kijker = new IntersectionObserver((items) => {
      for (const item of items) {
        if (item.target === hero) {
          setHeroInBeeld(item.isIntersecting || item.boundingClientRect.top > 0);
        } else {
          if (item.isIntersecting) zichtbaarEinde.add(item.target);
          else zichtbaarEinde.delete(item.target);
          setEindeInBeeld(zichtbaarEinde.size > 0);
        }
      }
    });
    if (hero) kijker.observe(hero);
    einde.forEach((el) => kijker.observe(el));
    return () => kijker.disconnect();
  }, []);

  const zichtbaar = !heroInBeeld && !eindeInBeeld;

  return (
    <div className="gsm-balk" data-zichtbaar={zichtbaar} aria-hidden={!zichtbaar}>
      <p>
        Eerst een gratis voorbeeld
        <span>Je beslist daarna</span>
      </p>
      <Link href="/aanvraag" className="knop knop--klein" tabIndex={zichtbaar ? undefined : -1}>
        Vraag aan
        <Pijl />
      </Link>
    </div>
  );
}
