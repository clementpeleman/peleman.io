import type { CSSProperties, ReactNode } from "react";
import { Img, staticFile } from "remotion";
import h16Desktop from "../../public/beeld/cases/h16-desktop.jpg";
import h16Gsm from "../../public/beeld/cases/h16-gsm.jpg";
import lvqDesktop from "../../public/beeld/cases/lvq-desktop.jpg";
import lvqGsm from "../../public/beeld/cases/lvq-gsm.jpg";
import tourageDesktop from "../../public/beeld/cases/tourage-desktop.jpg";
import tourageGsm from "../../public/beeld/cases/tourage-gsm.jpg";
import type { Scherm } from "../inhoud.ts";
import { Pil } from "./merk";
import type { Uitsnede } from "./Ribbelglas";

// Schermafdrukken uit lib/cases.ts (gsm 780×1688, desktop 2000×1250) of uit `npm run schermen` (390 px breed, dubbele
// resolutie). `fotos` is het deel van het desktopscherm met alleen foto's: daar mag het ribbelglas over. `video` is hoeveel
// gsm-schermen de schermvideo naar onder scrolt. `kleur` is de achtergrond bovenaan de pagina, voor de statusbalk.
type SchermBeelden = { beeld: string; desktop?: string; fotos?: Uitsnede; video?: number; kleur: string; eigenConcept: boolean };

export const schermen: Record<Scherm, SchermBeelden> = {
  h16: { beeld: h16Gsm, desktop: h16Desktop, fotos: { x: 0.1, y: 0.5, breedte: 0.46, hoogte: 0.5 }, video: 1.2, kleur: "#f6f6f3", eigenConcept: false },
  "h16-project": { beeld: staticFile("schermen/h16-project.png"), video: 0.75, kleur: "#f6f6f3", eigenConcept: false },
  lvq: { beeld: lvqGsm, desktop: lvqDesktop, fotos: { x: 0.04, y: 0.66, breedte: 0.92, hoogte: 0.34 }, video: 1.15, kleur: "#ffffff", eigenConcept: false },
  tourage: { beeld: tourageGsm, desktop: tourageDesktop, fotos: { x: 0.48, y: 0.22, breedte: 0.45, hoogte: 0.46 }, kleur: "#ffffff", eigenConcept: true },
  aanvraag: { beeld: staticFile("schermen/aanvraag.png"), kleur: "#fdfdfc", eigenConcept: false },
};

// Een desktopscherm zonder browserbalk of kanteling, met afgeronde hoeken en een dunne rand.
export function Desktop({ scherm, breedte, style }: { scherm: Scherm; breedte: number; style?: CSSProperties }) {
  const s = schermen[scherm];
  return (
    <div style={{ position: "absolute", width: breedte, borderRadius: 18, overflow: "hidden", border: "2px solid var(--pio-lijn)", background: "#fff", ...style }}>
      <Img src={s.desktop!} style={{ display: "block", width: "100%" }} />
      {s.eigenConcept && (
        <Pil grootte={22} style={{ position: "absolute", top: 24, right: 24 }}>
          Eigen concept
        </Pil>
      )}
    </div>
  );
}

// Maten van een gsm van 390 bij 844 punten met een statusbalk van 54 punten erboven.
const STATUS = 54;
const VIEWPORT = 844;

// Breedte en hoogte van het deel onder de statusbalk, voor een gsm van `breedte` pixels.
export function schermmaat(breedte: number) {
  const b = breedte * (1 - 2 * (0.011 + 0.02));
  return { breedte: b, hoogte: (b * VIEWPORT) / 390 };
}

// Een rechte gsm zoals een echte: kader in grafiet, dunne zwarte rand, camera-eiland, statusbalk in de kleur van de site,
// knoppen aan de zijkant en een rustige schaduw. Geen kanteling en geen browserbalk (19-menselijke pass).
// `children` vult het deel onder de statusbalk (390 × 844 punten).
export function Gsm({ breedte, kleur = "#ffffff", style, children }: { breedte: number; kleur?: string; style?: CSSProperties; children: ReactNode }) {
  const kader = breedte * 0.011;
  const rand = breedte * 0.02;
  const straal = breedte * 0.155;
  const pt = schermmaat(breedte).breedte / 390;
  const knop = (top: number, hoogte: number, kant: "links" | "rechts") => (
    <span
      style={{
        position: "absolute",
        top: breedte * top,
        [kant === "links" ? "left" : "right"]: -breedte * 0.007,
        width: breedte * 0.009,
        height: breedte * hoogte,
        borderRadius: breedte * 0.004,
        background: "linear-gradient(90deg, #3c423f, #1f2321)",
      }}
    />
  );
  return (
    <div style={{ position: "absolute", width: breedte, ...style }}>
      {knop(0.36, 0.08, "links")}
      {knop(0.5, 0.15, "links")}
      {knop(0.69, 0.15, "links")}
      {knop(0.52, 0.24, "rechts")}
      <div
        style={{
          position: "relative",
          padding: kader,
          borderRadius: straal,
          background: "linear-gradient(140deg, #5a605c 0%, #2a2f2c 22%, #1b1f1d 60%, #3a403c 100%)",
          boxShadow: `0 ${breedte * 0.09}px ${breedte * 0.16}px -${breedte * 0.07}px rgba(6, 28, 18, .42), 0 ${breedte * 0.02}px ${breedte * 0.04}px -${breedte * 0.02}px rgba(6, 28, 18, .3)`,
        }}
      >
        <div style={{ padding: rand, borderRadius: straal - kader, background: "#050606", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)" }}>
          <div style={{ position: "relative", borderRadius: straal - kader - rand, overflow: "hidden", background: kleur, aspectRatio: `390 / ${STATUS + VIEWPORT}` }}>
            <Statusbalk pt={pt} kleur={kleur} />
            <div style={{ position: "absolute", left: 0, right: 0, top: STATUS * pt, bottom: 0, overflow: "hidden" }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Statusbalk({ pt, kleur }: { pt: number; kleur: string }) {
  const donker = "#111";
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: STATUS * pt, background: kleur, zIndex: 1 }}>
      <span style={{ position: "absolute", left: 0, width: 130 * pt, top: 19 * pt, textAlign: "center", font: `600 ${17 * pt}px/1 -apple-system, system-ui, sans-serif`, letterSpacing: "-0.01em", color: donker }}>
        9:41
      </span>
      <span style={{ position: "absolute", left: ((390 - 125) / 2) * pt, top: 11 * pt, width: 125 * pt, height: 37 * pt, borderRadius: 20 * pt, background: "#000" }} />
      <svg viewBox="0 0 78 14" style={{ position: "absolute", right: 22 * pt, top: 21 * pt, width: 78 * pt, height: 14 * pt }} aria-hidden="true">
        <g fill={donker}>
          <rect x="0" y="9" width="3.2" height="4" rx="0.8" />
          <rect x="4.8" y="6.5" width="3.2" height="6.5" rx="0.8" />
          <rect x="9.6" y="4" width="3.2" height="9" rx="0.8" />
          <rect x="14.4" y="1" width="3.2" height="12" rx="0.8" />
          <path d="M31 3.2a11 11 0 0 1 14 0l-1.6 1.7a8.6 8.6 0 0 0-10.8 0zM33.6 6a7.2 7.2 0 0 1 8.8 0l-1.6 1.7a4.8 4.8 0 0 0-5.6 0zM36.2 8.8a3.4 3.4 0 0 1 3.6 0L38 10.8z" />
          <rect x="52" y="1" width="22" height="12" rx="3.6" fill="none" stroke={donker} strokeOpacity=".4" strokeWidth="1.2" />
          <rect x="54" y="3" width="18" height="8" rx="2" />
          <path d="M75.5 5v4c.9-.3 1.5-1.1 1.5-2s-.6-1.7-1.5-2z" fillOpacity=".4" />
        </g>
      </svg>
    </div>
  );
}

export function GsmMetScherm({ scherm, breedte, style }: { scherm: Scherm; breedte: number; style?: CSSProperties }) {
  const s = schermen[scherm];
  return (
    <Gsm breedte={breedte} kleur={s.kleur} style={style}>
      <Img src={s.beeld} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      {s.eigenConcept && (
        <Pil grootte={22} style={{ position: "absolute", top: 24, right: 24 }}>
          Eigen concept
        </Pil>
      )}
    </Gsm>
  );
}
