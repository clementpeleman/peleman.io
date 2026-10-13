"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { legBronVast } from "@/lib/bron";
import { leesToestemming, meetIds, type Toestemming } from "@/lib/toestemming";

type Venster = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void; push?: unknown };
  _fbq?: unknown;
};

function laadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function wisCookies(patroon: RegExp) {
  for (const deel of document.cookie.split(";")) {
    const naam = deel.split("=")[0].trim();
    if (!patroon.test(naam)) continue;
    const domein = window.location.hostname.split(".").slice(-2).join(".");
    for (const d of ["", `; domain=${domein}`, `; domain=.${domein}`]) {
      document.cookie = `${naam}=; Max-Age=0; path=/${d}`;
    }
  }
}

function startGa(w: Venster, t: Toestemming) {
  if (!w.gtag) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("js", new Date());
    laadScript(`https://www.googletagmanager.com/gtag/js?id=${meetIds.ga}`);
    w.gtag("config", meetIds.ga);
  }
  const reclame = t.marketing ? "granted" : "denied";
  w.gtag("consent", "update", { analytics_storage: "granted", ad_storage: reclame, ad_user_data: reclame, ad_personalization: reclame });
}

function startMeta(w: Venster) {
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    } as NonNullable<Venster["fbq"]>;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = fbq;
    laadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("consent", "grant");
    fbq("init", meetIds.meta);
    fbq("track", "PageView");
    return;
  }
  w.fbq("consent", "grant");
}

let vorigPad: string | null = null;

// Laadt GA4 en de Meta-pixel pas na toestemming, en legt de herkomst van de bezoeker vast voor het formulier.
export function Meting() {
  const pad = usePathname();

  useEffect(() => {
    legBronVast();
    const w = window as Venster;

    function pasToe(t: Toestemming | null) {
      if (meetIds.ga) {
        if (t?.analyse) startGa(w, t);
        else if (w.gtag) {
          w.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
          wisCookies(/^_ga/);
        }
      }
      if (meetIds.meta) {
        if (t?.marketing) startMeta(w);
        else if (w.fbq) {
          w.fbq("consent", "revoke");
          wisCookies(/^_fb/);
        }
      }
      window.dispatchEvent(new Event("pio-meting-klaar"));
    }

    pasToe(leesToestemming());
    const luister = (e: Event) => pasToe((e as CustomEvent<Toestemming>).detail);
    window.addEventListener("pio-toestemming", luister);
    return () => window.removeEventListener("pio-toestemming", luister);
  }, []);

  // GA4 volgt paginawissels zelf; de Meta-pixel krijgt een PageView per nieuwe pagina.
  useEffect(() => {
    const nieuw = vorigPad !== null && vorigPad !== pad;
    vorigPad = pad;
    if (!nieuw) return;
    const w = window as Venster;
    if (w.fbq && leesToestemming()?.marketing) w.fbq("track", "PageView");
  }, [pad]);

  return null;
}

let aanvraagGemeten = false;

export function meetAanvraag() {
  if (aanvraagGemeten) return;
  aanvraagGemeten = true;
  const w = window as Venster;
  const t = leesToestemming();
  if (t?.analyse && w.gtag) w.gtag("event", "generate_lead", { form: "gratis_voorbeeld" });
  if (t?.marketing && w.fbq) w.fbq("track", "Lead");
}
