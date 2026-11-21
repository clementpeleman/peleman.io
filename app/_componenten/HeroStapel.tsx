"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import h16 from "@/public/beeld/h16-landing.jpg";
import lvq from "@/public/beeld/cases/lvq-desktop.jpg";
import tourage from "@/public/beeld/cases/tourage-desktop.jpg";

// Drie sites op een stapel in de hero. Je veegt de bovenste weg en de volgende komt tevoorschijn.
// Een klik op de bovenste opent de site; na het slepen telt de klik niet.
// Tourage heet altijd 'eigen concept'. H16 mag hier bij naam staan (zie geheugen, 16 oktober 2026).
type Kaart = {
  domein: string;
  beeld: StaticImageData;
  url: string;
  alt: string;
};

const kaarten: Kaart[] = [
  {
    domein: "h16.be",
    url: "https://h16.be",
    beeld: h16,
    alt: "De website van H16, bouwcoördinatie en projectontwikkeling, met foto’s van twee realisaties.",
  },
  {
    domein: "lvq.wine",
    url: "https://lvq.wine",
    beeld: lvq,
    alt: "De website van Le Vin Quotidien, een wijnimporteur, met foto’s van wijn en een proeverij.",
  },
  {
    domein: "tourage.peleman.io",
    url: "https://tourage.peleman.io",
    beeld: tourage,
    alt: "De landingspagina van Tourage met een kaart van een route van Lyon naar Antwerpen.",
  },
];

const UIT_MS = 320;

export function HeroStapel({ children }: { children: React.ReactNode }) {
  const [volgorde, setVolgorde] = useState(() => kaarten.map((_, i) => i));
  const [sleep, setSleep] = useState(0);
  const [sleept, setSleept] = useState(false);
  const [uit, setUit] = useState<1 | -1 | null>(null);
  const [terug, setTerug] = useState<number | null>(null);
  const [wenk, setWenk] = useState(false);
  const aangeraakt = useRef(false);
  const start = useRef<{
    x: number;
    y: number;
    t: number;
    id: number;
    actief: boolean;
  } | null>(null);
  const stapel = useRef<HTMLDivElement>(null);
  const gesleept = useRef(false);

  const boven = volgorde[0];

  function volgende(richting: 1 | -1) {
    if (uit !== null) return;
    aangeraakt.current = true;
    setWenk(false);
    setUit(richting);
  }

  function vorige() {
    if (uit !== null) return;
    aangeraakt.current = true;
    setWenk(false);
    // De onderste kaart komt terug bovenop.
    setVolgorde((v) => [v[v.length - 1], ...v.slice(0, -1)]);
  }

  // Na het wegvliegen schuift de kaart onderaan de stapel en vervaagt ze daar terug in.
  useEffect(() => {
    if (uit === null) return;
    const t = window.setTimeout(() => {
      setTerug(boven);
      setVolgorde((v) => [...v.slice(1), v[0]]);
      setUit(null);
      setSleep(0);
    }, UIT_MS);
    return () => window.clearTimeout(t);
  }, [uit, boven]);

  useEffect(() => {
    if (terug === null) return;
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTerug(null)),
    );
    return () => cancelAnimationFrame(r);
  }, [terug]);

  // Eén kleine wenk na het laden, zodat je ziet dat de kaart beweegt. Niet bij minder beweging.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const aan = window.setTimeout(
      () => !aangeraakt.current && setWenk(true),
      1600,
    );
    const af = window.setTimeout(() => setWenk(false), 2500);
    return () => {
      window.clearTimeout(aan);
      window.clearTimeout(af);
    };
  }, []);

  function neer(e: React.PointerEvent) {
    if (uit !== null || e.button !== 0) return;
    gesleept.current = false;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      t: e.timeStamp,
      id: e.pointerId,
      actief: false,
    };
  }

  function beweeg(e: React.PointerEvent<HTMLDivElement>) {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.actief) {
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
      s.actief = true;
      gesleept.current = true;
      aangeraakt.current = true;
      setWenk(false);
      setSleept(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setSleep(dx);
  }

  function los(e: React.PointerEvent) {
    const s = start.current;
    start.current = null;
    if (!s || !s.actief) return;
    setSleept(false);
    const dx = e.clientX - s.x;
    const snelheid = Math.abs(dx) / Math.max(1, e.timeStamp - s.t);
    const breedte = stapel.current?.offsetWidth ?? 400;
    if (
      Math.abs(dx) > Math.min(110, breedte * 0.25) ||
      (snelheid > 0.6 && Math.abs(dx) > 30)
    ) {
      setUit(dx > 0 ? 1 : -1);
    } else {
      setSleep(0);
    }
  }

  function afgebroken() {
    start.current = null;
    setSleept(false);
    setSleep(0);
  }

  return (
    <>
      <figure className="beeld">
        {children}
        <div
          ref={stapel}
          className="stapel"
          data-sleept={sleept || undefined}
          onPointerDown={neer}
          onPointerMove={beweeg}
          onPointerUp={los}
          onPointerCancel={afgebroken}
          role="group"
          aria-roledescription="stapel"
          aria-label="Sites die ik maakte. Veeg de bovenste weg om de volgende te zien."
        >
          {kaarten.map((k, i) => {
            const plek = volgorde.indexOf(i);
            const isBoven = plek === 0;
            // Terwijl de bovenste wegvliegt, schuiven de andere al een plek op.
            const zicht = uit !== null && !isBoven ? plek - 1 : plek;
            let transform = `translateY(${-zicht * 14}px) scale(${1 - zicht * 0.05})`;
            if (isBoven && uit !== null)
              transform = `translateX(${uit * 125}%) rotate(${uit * 9}deg)`;
            else if (isBoven && sleep !== 0)
              transform = `translateX(${sleep}px) rotate(${sleep * 0.025}deg)`;
            return (
              <a
                key={k.domein}
                className="stapel-kaart"
                href={isBoven ? k.url : undefined}
                target="_blank"
                rel="noopener"
                draggable={false}
                aria-label={isBoven ? `Bekijk ${k.domein}` : undefined}
                onClick={(e) => {
                  if (gesleept.current || !isBoven) e.preventDefault();
                }}
                data-plek={zicht}
                data-uit={(isBoven && uit !== null) || undefined}
                data-terug={terug === i || undefined}
                data-wenk={(isBoven && wenk) || undefined}
                aria-hidden={!isBoven}
                style={{
                  zIndex: kaarten.length - plek,
                  transform,
                  ["--plek" as string]: zicht,
                }}
              >
                <div className="browserbalk" aria-hidden="true">
                  <span>{k.domein}</span>
                </div>
                <div className="stapel-scherm">
                  <Image
                    src={k.beeld}
                    alt={k.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1100px) 520px, (min-width: 640px) 52vw, 84vw"
                    loading={i === 0 ? "eager" : undefined}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </figure>
      <div className="stapel-onder">
        <div className="stapel-knoppen">
          <span className="stapel-teller" aria-live="polite">
            {boven + 1} / {kaarten.length}
          </span>
          <button type="button" onClick={vorige} aria-label="Vorige site">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => volgende(1)}
            aria-label="Volgende site"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
