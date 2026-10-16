import type { ComponentType } from "react";
import { AbsoluteFill, Img } from "remotion";
import ribbelglasFoto from "../../public/beeld/ribbelglas.jpg";
import type { Advertentie, Formaat, Sjabloon } from "../inhoud.ts";
import { Desktop, GsmMetScherm, schermen } from "./Gsm";
import { Kader, Kop, Lijst, OP_GROEN_ZACHT, Pil, Voet, Woordmerk, vlak } from "./merk";
import { Ribbelglas } from "./Ribbelglas";

export type BeeldProps = { ad: Advertentie; formaat: Formaat; veiligeZone?: boolean };

const groen = "var(--pio-groen)";
const groengrijs = "var(--pio-groengrijs)";

// Ribbelglas over de foto's van een echte site, met die site scherp op een gsm ervoor. Kop op groen.
function Glas({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  const scherm = schermen[ad.scherm!];
  // De gsm komt op uit het groene vlak; het vlak ligt erover.
  const grens = verhaal ? 700 : 760;
  return (
    <Kader achtergrond={groen} formaat={formaat} veiligeZone={veiligeZone}>
      <Ribbelglas src={scherm.desktop!} uitsnede={scherm.fotos} style={verhaal ? { left: 0, right: 0, top: grens, bottom: 0 } : { left: 0, right: 0, top: 0, height: grens }} />
      {verhaal ? (
        <GsmMetScherm scherm={ad.scherm2 ?? ad.scherm!} breedte={560} style={{ left: 260, top: grens + 130 }} />
      ) : (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: grens, overflow: "hidden" }}>
          <GsmMetScherm scherm={ad.scherm2 ?? ad.scherm!} breedte={420} style={{ left: 330, top: 110 }} />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: v.left,
          right: v.right,
          ...(verhaal ? { top: v.top } : { top: grens + 72, bottom: v.bottom }),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        {verhaal && <Woordmerk op="donker" />}
        <Kop regels={ad.beeld.kop!} op="donker" grootte={verhaal ? 92 : 80} />
        {!verhaal && <Voet op="donker" />}
      </div>
    </Kader>
  );
}

// Een echte site op een rechte gsm. Met een tweede scherm staan er twee: dat tweede iets kleiner en erachter.
function GsmBeeld({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  const breedte = verhaal ? 600 : 500;
  return (
    <Kader achtergrond="var(--pio-wit)" formaat={formaat} veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", left: v.left, right: v.right, top: v.top, display: "grid", gap: 28 }}>
        <Woordmerk />
        <Kop regels={ad.beeld.kop!} grootte={verhaal ? 92 : 80} style={{ marginTop: 20 }} />
        <p style={{ fontSize: 34, lineHeight: 1.4, color: "var(--pio-zacht)", maxWidth: 780 }}>{ad.beeld.tekst}</p>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: verhaal ? 980 : 640, background: groengrijs }} />
      {ad.scherm2 ? (
        <>
          <GsmMetScherm scherm={ad.scherm2} breedte={breedte * 0.86} style={{ left: verhaal ? 90 : 110, top: verhaal ? 820 : 560 }} />
          <GsmMetScherm scherm={ad.scherm!} breedte={breedte} style={{ left: verhaal ? 420 : 470, top: verhaal ? 900 : 620 }} />
        </>
      ) : (
        <GsmMetScherm scherm={ad.scherm!} breedte={breedte} style={{ left: (1080 - breedte) / 2, top: verhaal ? 860 : 580 }} />
      )}
    </Kader>
  );
}

// Prijs groot, btw eronder, over de foto van het ribbelglas.
function Prijs({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  const [vanaf, bedrag] = ad.beeld.kop!;
  return (
    <Kader achtergrond={groen} formaat={formaat} veiligeZone={veiligeZone}>
      <Img src={ribbelglasFoto} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #133d2c 42%, rgba(19,61,44,0.4))" }} />
      <div
        style={{
          position: "absolute",
          left: v.left,
          right: v.right,
          top: v.top,
          bottom: verhaal ? undefined : v.bottom,
          display: "flex",
          flexDirection: "column",
          gap: verhaal ? 44 : 0,
          justifyContent: "space-between",
        }}
      >
        {verhaal && <Woordmerk op="donker" />}
        <div>
          <Pil op="donker">{ad.beeld.pil}</Pil>
          <p style={{ marginTop: 56, fontSize: 40, color: "var(--pio-op-groen-zacht)" }}>{vanaf}</p>
          <p style={{ font: "600 280px/0.9 var(--pio-font-display)", letterSpacing: "-0.04em", color: "var(--pio-wit)" }}>{bedrag}</p>
          <p style={{ marginTop: 28, fontSize: 40, color: "var(--pio-op-groen-zacht)" }}>{ad.beeld.tekst}</p>
          <p style={{ marginTop: 6, fontSize: 30, color: OP_GROEN_ZACHT }}>{ad.beeld.voetnoot}</p>
        </div>
        <Lijst regels={ad.beeld.lijst!} op="donker" grootte={38} />
        {!verhaal && <Voet op="donker" />}
      </div>
    </Kader>
  );
}

// Het echte aanvraagformulier van peleman.io op een gsm, met de vraag wat de site beter moet doen.
function Aanvraag({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  const breedte = verhaal ? 620 : 520;
  return (
    <Kader achtergrond={groengrijs} formaat={formaat} veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", left: v.left, right: v.right, top: v.top, display: "grid", gap: 28 }}>
        <Woordmerk />
        <Kop regels={ad.beeld.kop!} grootte={verhaal ? 96 : 84} style={{ marginTop: 20 }} />
        <p style={{ fontSize: 34, lineHeight: 1.4, color: "var(--pio-zacht)", maxWidth: 760 }}>{ad.beeld.tekst}</p>
      </div>
      <GsmMetScherm scherm={ad.scherm!} breedte={breedte} style={{ left: (1080 - breedte) / 2, top: verhaal ? 880 : 600 }} />
    </Kader>
  );
}

// Een echte site op desktop, recht en tot over de rand.
function Scherm({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  return (
    <Kader achtergrond={groengrijs} formaat={formaat} veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", left: v.left, right: v.right, top: v.top, display: "grid", gap: 28 }}>
        <Woordmerk />
        <Kop regels={ad.beeld.kop!} grootte={verhaal ? 92 : 80} style={{ marginTop: 20 }} />
      </div>
      <Desktop scherm={ad.scherm!} breedte={verhaal ? 1500 : 1320} style={{ left: v.left, top: verhaal ? 800 : 620 }} />
    </Kader>
  );
}

// Het lanceringsaanbod met de kaart van Groei, zoals in de pakkettabel van de site.
function Lancering({ ad, formaat, veiligeZone }: BeeldProps) {
  const v = vlak(formaat);
  const verhaal = formaat === "verhaal";
  return (
    <Kader achtergrond="var(--pio-wit)" formaat={formaat} veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", left: v.left, right: v.right, top: v.top, bottom: verhaal ? undefined : v.bottom, display: "flex", flexDirection: "column", gap: 36 }}>
        {verhaal && <Woordmerk />}
        <div>
          <Pil>{ad.beeld.pil}</Pil>
          <Kop regels={ad.beeld.kop!} grootte={verhaal ? 88 : 78} style={{ marginTop: 32 }} />
          <p style={{ marginTop: 24, fontSize: 34, lineHeight: 1.4, color: "var(--pio-zacht)", maxWidth: 820 }}>{ad.beeld.tekst}</p>
        </div>
        <div style={{ position: "relative", borderRadius: 28, background: groen, padding: "44px 48px", overflow: "hidden", flex: verhaal ? undefined : 1 }}>
          <Img src={ribbelglasFoto} style={{ position: "absolute", top: 0, right: 0, height: "100%", width: 420, objectFit: "cover" }} />
          <AbsoluteFill style={{ background: "linear-gradient(90deg, #133d2c 55%, rgba(19,61,44,0.2))" }} />
          <div style={{ position: "relative", display: "grid", gap: 26 }}>
            <p style={{ font: "600 44px/1.1 var(--pio-font-display)", color: "var(--pio-wit)" }}>Groei</p>
            <Lijst regels={ad.beeld.lijst!} op="donker" grootte={32} />
            <p style={{ fontSize: 26, color: OP_GROEN_ZACHT }}>{ad.beeld.voetnoot}</p>
          </div>
        </div>
        {!verhaal && <Voet />}
      </div>
    </Kader>
  );
}

// Carrousel: één kaart per stap, 1:1.
export function Stappen({ ad, kaart: index, veiligeZone }: { ad: Advertentie; kaart: number; veiligeZone?: boolean }) {
  const v = vlak("vierkant");
  const kaart = ad.kaarten![index];
  const totaal = ad.kaarten!.filter((k) => k.nummer).length;
  if (!kaart.nummer) {
    return (
      <Kader achtergrond={groen} formaat="vierkant" veiligeZone={veiligeZone}>
        <Ribbelglas src={schermen[ad.scherm!].desktop!} uitsnede={schermen[ad.scherm!].fotos} style={{ top: 0, bottom: 0, right: 0, width: 560 }} />
        <AbsoluteFill style={{ background: "linear-gradient(90deg, #133d2c 52%, rgba(19,61,44,0))" }} />
        <div style={{ position: "absolute", inset: `${v.top}px ${v.right}px ${v.bottom}px ${v.left}px`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Woordmerk op="donker" />
          <Kop regels={kaart.titel} op="donker" grootte={96} style={{ maxWidth: 700 }} />
          <p style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 500, color: "var(--pio-op-groen-zacht)" }}>
            Veeg verder
            <svg viewBox="0 0 16 16" aria-hidden="true" style={{ width: 28, height: 28 }}>
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>
      </Kader>
    );
  }
  return (
    <Kader achtergrond={groengrijs} formaat="vierkant" veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", inset: `${v.top}px ${v.right}px ${v.bottom}px ${v.left}px`, display: "flex", flexDirection: "column" }}>
        <p style={{ font: "600 360px/0.8 var(--pio-font-display)", letterSpacing: "-0.04em", color: groen }}>{kaart.nummer}</p>
        <Kop regels={kaart.titel} grootte={76} style={{ marginTop: "auto" }} />
        <p style={{ marginTop: 28, fontSize: 38, lineHeight: 1.4, color: "var(--pio-tekst)", maxWidth: 860 }}>{kaart.tekst}</p>
        <div style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Woordmerk grootte={40} />
          <p style={{ fontSize: 28, fontWeight: 500, color: "var(--pio-zacht)" }}>
            {kaart.nummer} van {totaal}
          </p>
        </div>
      </div>
    </Kader>
  );
}

export const sjablonen: Partial<Record<Sjabloon, ComponentType<BeeldProps>>> = {
  glas: Glas,
  gsm: GsmBeeld,
  prijs: Prijs,
  aanvraag: Aanvraag,
  scherm: Scherm,
  lancering: Lancering,
};

// Profielbeeld voor Instagram en Facebook: de p uit het woordmerk, in dezelfde letter. Het hele woordmerk is op die
// grootte niet te lezen, en de naam staat er toch naast. Iets naar boven geschoven, omdat de staart van de p het
// zwaartepunt naar onder trekt.
export function Profielbeeld() {
  return (
    <Kader achtergrond={groen}>
      <AbsoluteFill style={{ display: "grid", placeItems: "center" }}>
        <span className="woordmerk" style={{ fontSize: 700, lineHeight: 1, letterSpacing: 0, color: "var(--pio-wit)", transform: "translate(-1%, -13%)" }}>
          p
        </span>
      </AbsoluteFill>
    </Kader>
  );
}

// Omslag van de Facebook-pagina. Facebook knipt op de gsm de zijkanten weg: de kop blijft in het midden.
export function Omslag() {
  return (
    <Kader achtergrond={groen}>
      <Img src={ribbelglasFoto} style={{ position: "absolute", top: 0, right: 0, height: "100%", width: 900, objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #133d2c 48%, rgba(19,61,44,0.35))" }} />
      <div style={{ position: "absolute", left: 300, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        <Kop regels={["Een website die even goed is", "als jouw werk."]} op="donker" grootte={72} style={{ maxWidth: 820 }} />
      </div>
    </Kader>
  );
}

