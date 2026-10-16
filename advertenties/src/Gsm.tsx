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

// Schermafdrukken uit lib/cases.ts (gsm 780×1688, desktop 2000×1250). `fotos` is het deel van het
// desktopscherm met alleen foto's: daar mag het ribbelglas over. Het aanvraagformulier komt uit `npm run schermen`.
// `video` is hoeveel gsm-schermen de schermvideo naar onder scrolt: tot waar de pagina nog mooi is.
type SchermBeelden = { beeld: string; desktop?: string; fotos?: Uitsnede; video?: number; eigenConcept: boolean };

export const schermen: Record<Scherm, SchermBeelden> = {
  h16: { beeld: h16Gsm, desktop: h16Desktop, fotos: { x: 0.1, y: 0.5, breedte: 0.46, hoogte: 0.5 }, video: 2, eigenConcept: false },
  lvq: { beeld: lvqGsm, desktop: lvqDesktop, fotos: { x: 0.04, y: 0.66, breedte: 0.92, hoogte: 0.34 }, video: 1.15, eigenConcept: false },
  tourage: { beeld: tourageGsm, desktop: tourageDesktop, fotos: { x: 0.48, y: 0.22, breedte: 0.45, hoogte: 0.46 }, eigenConcept: true },
  aanvraag: { beeld: staticFile("schermen/aanvraag.png"), eigenConcept: false },
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

// Een rechte gsm: geen kanteling, geen grote schaduw, geen browserbalk (19-menselijke pass).
export function Gsm({ breedte, style, children }: { breedte: number; style?: CSSProperties; children: ReactNode }) {
  const rand = Math.round(breedte * 0.026);
  const straal = Math.round(breedte * 0.15);
  return (
    <div style={{ position: "absolute", width: breedte, padding: rand, borderRadius: straal, background: "#18201c", ...style }}>
      <div style={{ position: "relative", borderRadius: straal - rand, overflow: "hidden", background: "#fff", aspectRatio: "780 / 1688" }}>{children}</div>
    </div>
  );
}

export function GsmMetScherm({ scherm, breedte, style }: { scherm: Scherm; breedte: number; style?: CSSProperties }) {
  const s = schermen[scherm];
  return (
    <Gsm breedte={breedte} style={style}>
      <Img src={s.beeld} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      {s.eigenConcept && (
        <Pil grootte={22} style={{ position: "absolute", top: 24, right: 24 }}>
          Eigen concept
        </Pil>
      )}
    </Gsm>
  );
}
