import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, cancelRender, continueRender, delayRender } from "remotion";
import type { Formaat } from "../inhoud.ts";
import "./merk.css";

// Tweede kopregel en .io op groen, zoals in app/opengraph-image.tsx.
export const OP_GROEN_ZACHT = "#9fbcae";

export type Op = "licht" | "donker";

// Waar tekst mag staan. Bij 9:16 houden we de bovenste 14% en de onderste 35% vrij voor de knoppen van Meta.
export function vlak(formaat: Formaat) {
  if (formaat === "verhaal") return { top: 270, right: 76, bottom: 672, left: 76 };
  if (formaat === "vierkant") return { top: 72, right: 72, bottom: 72, left: 72 };
  return { top: 80, right: 80, bottom: 80, left: 80 };
}

function useMerkletters() {
  const [wacht] = useState(() => delayRender("Merkletters laden"));
  useEffect(() => {
    Promise.all(
      ['600 80px "Bricolage Grotesque"', '700 80px "Bricolage Grotesque"', '400 40px "DM Sans"', '500 40px "DM Sans"', '600 40px "DM Sans"'].map((f) =>
        document.fonts.load(f),
      ),
    ).then(
      () => continueRender(wacht),
      (fout) => cancelRender(fout),
    );
  }, [wacht]);
}

export function Kader({ achtergrond, formaat, veiligeZone, children }: { achtergrond: string; formaat?: Formaat; veiligeZone?: boolean; children: ReactNode }) {
  useMerkletters();
  return (
    <AbsoluteFill style={{ background: achtergrond, fontFamily: "var(--pio-font-body)", color: "var(--pio-tekst)", overflow: "hidden" }}>
      {children}
      {veiligeZone && formaat && <VeiligeZone formaat={formaat} />}
    </AbsoluteFill>
  );
}

function VeiligeZone({ formaat }: { formaat: Formaat }) {
  const v = vlak(formaat);
  const rood = "rgba(220, 38, 38, .28)";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, borderStyle: "solid", borderColor: rood, borderWidth: `${v.top}px ${v.right}px ${v.bottom}px ${v.left}px` }} />
    </AbsoluteFill>
  );
}

export function Woordmerk({ grootte = 44, op = "licht", style }: { grootte?: number; op?: Op; style?: CSSProperties }) {
  return (
    <span className="woordmerk" style={{ fontSize: grootte, color: op === "donker" ? "var(--pio-wit)" : undefined, ...style }}>
      peleman<span style={op === "donker" ? { color: OP_GROEN_ZACHT } : undefined}>.io</span>
    </span>
  );
}

export function Kop({ regels, op = "licht", grootte, style }: { regels: [string, string?]; op?: Op; grootte: number; style?: CSSProperties }) {
  return (
    <h1
      style={{
        fontSize: grootte,
        lineHeight: 1.04,
        letterSpacing: "-0.035em",
        color: op === "donker" ? "var(--pio-wit)" : "var(--pio-groen)",
        textWrap: "balance",
        ...style,
      }}
    >
      {/* Kleur per regel: de site geeft elke span in een h1 de tweede kopkleur. */}
      <span style={{ display: "block", color: op === "donker" ? "var(--pio-wit)" : "var(--pio-groen)" }}>{regels[0]}</span>
      {regels[1] && <span style={{ display: "block", color: op === "donker" ? OP_GROEN_ZACHT : "var(--pio-kop-2)" }}>{regels[1]}</span>}
    </h1>
  );
}

export function Pil({ children, op = "licht", grootte = 26, style }: { children: ReactNode; op?: Op; grootte?: number; style?: CSSProperties }) {
  return (
    <span
      className="pil"
      style={{
        fontSize: grootte,
        padding: `${grootte * 0.4}px ${grootte * 0.85}px`,
        background: op === "donker" ? "#fdfdfc1f" : "var(--pio-groen)",
        color: "var(--pio-wit)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// Zelfde opbouw als .knop op de site, op advertentiegrootte.
export function Knop({ op = "licht", children = "Gratis voorbeeld" }: { op?: Op; children?: ReactNode }) {
  return (
    <span className={op === "donker" ? "knop knop--wit" : "knop"} style={{ fontSize: 30, minHeight: 84, padding: "0 38px", gap: 16, borderRadius: 16 }}>
      {children}
      <Pijl grootte={24} />
    </span>
  );
}

export function Voet({ op = "licht", knop = true }: { op?: Op; knop?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Woordmerk op={op} />
      {knop && <Knop op={op} />}
    </div>
  );
}

// Zelfde lijnen als Pijl en Vinkje in app/_componenten/merk.tsx (dat bestand gebruikt next/link en laadt hier niet).
export function Pijl({ grootte }: { grootte: number }) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" style={{ width: grootte, height: grootte }}>
      <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Vinkje({ grootte }: { grootte: number }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={{ width: grootte, height: grootte, flex: "none" }}>
      <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Lijst({ regels, op = "licht", grootte = 36 }: { regels: string[]; op?: Op; grootte?: number }) {
  return (
    <ul style={{ display: "grid", gap: grootte * 0.5 }}>
      {regels.map((regel) => (
        <li key={regel} style={{ display: "flex", alignItems: "center", gap: grootte * 0.5, fontSize: grootte, fontWeight: 500, color: op === "donker" ? "var(--pio-wit)" : "var(--pio-tekst)" }}>
          <span style={{ color: op === "donker" ? OP_GROEN_ZACHT : "var(--pio-groen)", display: "flex" }}>
            <Vinkje grootte={grootte * 0.85} />
          </span>
          {regel}
        </li>
      ))}
    </ul>
  );
}
