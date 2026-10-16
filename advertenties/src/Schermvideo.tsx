import { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Advertentie, Scherm } from "../inhoud.ts";
import { Gsm, schermen, schermmaat } from "./Gsm";
import { Kader, OP_GROEN_ZACHT, Woordmerk, vlak } from "./merk";

export const fps = 30;
const perZin = 130;
const slotDuur = 60;
const overgang = 14;

export function videoDuur(ad: Advertentie) {
  return ad.beeld.zinnen!.length * perZin + slotDuur;
}

// Een echte site die rustig scrolt op een gsm, met de zinnen als ondertitels. Werkt zonder geluid. Met een tweede scherm
// gaat de video halverwege over naar die pagina, zoals een bezoeker die doorklikt naar een project.
// De schermen komen uit `npm run schermen` (publiek/schermen/<scherm>.png, 390 px breed op dubbele resolutie).
export function Schermvideo({ ad, veiligeZone }: { ad: Advertentie; veiligeZone?: boolean }) {
  const frame = useCurrentFrame();
  const { fps: beelden } = useVideoConfig();
  const v = vlak("verhaal");
  const zinnen = ad.beeld.zinnen!;
  const slotStart = zinnen.length * perZin;
  const reeks = [ad.scherm, ad.scherm2].filter((s): s is Scherm => Boolean(s));

  const [wacht] = useState(() => delayRender("Hoogte van de schermen"));
  const [hoogtes, setHoogtes] = useState<Record<number, number>>({});
  useEffect(() => {
    if (Object.keys(hoogtes).length === reeks.length) continueRender(wacht);
  }, [hoogtes, reeks.length, wacht]);

  const breedte = 620;
  const maat = schermmaat(breedte);
  const begin = 50;
  const stuk = (slotStart - 20 - begin) / reeks.length;

  const binnen = spring({ frame: frame - 8, fps: beelden, config: { damping: 200 } });
  const weg = spring({ frame: frame - slotStart, fps: beelden, config: { damping: 200 } });
  const gsmTop = interpolate(binnen, [0, 1], [1920, 760]) + interpolate(weg, [0, 1], [0, 1200]);
  const slot = interpolate(frame, [slotStart + 6, slotStart + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const merk = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  return (
    <Kader achtergrond="var(--pio-groen)" formaat="verhaal" veiligeZone={veiligeZone}>
      <div style={{ position: "absolute", left: v.left, top: v.top, opacity: merk * (1 - slot) }}>
        <Woordmerk op="donker" />
      </div>
      {zinnen.map((zin, i) => {
        const t = frame - i * perZin;
        const zichtbaar = interpolate(t, [0, 8, perZin - 8, perZin], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <p
            key={zin}
            style={{
              position: "absolute",
              left: v.left,
              right: v.right,
              top: v.top + 90,
              opacity: zichtbaar,
              transform: `translateY(${(1 - zichtbaar) * 24}px)`,
              font: "600 76px/1.06 var(--pio-font-display)",
              letterSpacing: "-0.035em",
              color: "var(--pio-wit)",
              textWrap: "balance",
            }}
          >
            {zin}
          </p>
        );
      })}
      <Gsm breedte={breedte} kleur={schermen[reeks[0]].kleur} style={{ left: (1080 - breedte) / 2, top: gsmTop }}>
        {reeks.map((scherm, i) => {
          const van = begin + i * stuk;
          const tot = van + stuk;
          const beeldHoogte = hoogtes[i] ? (hoogtes[i] * maat.breedte) / 780 : maat.hoogte;
          // Niet de hele pagina: de bovenkant en een stuk inhoud, zodat het rustig blijft (zie `video` in Gsm.tsx).
          const afstand = Math.max(0, Math.min(beeldHoogte - maat.hoogte, maat.hoogte * (schermen[scherm].video ?? 1.5)));
          const scroll = interpolate(frame, [van + (i > 0 ? overgang : 0), tot - (i < reeks.length - 1 ? overgang : 0)], [0, afstand], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
          });
          const zichtbaar =
            i === 0
              ? interpolate(frame, [tot - overgang, tot], [1, reeks.length > 1 ? 0 : 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              : interpolate(frame, [van - overgang, van], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <Img
              key={scherm}
              src={staticFile(`schermen/${scherm}.png`)}
              onLoad={(e) => {
                const h = e.currentTarget.naturalHeight;
                setHoogtes((oud) => ({ ...oud, [i]: h }));
              }}
              style={{ position: "absolute", left: 0, top: -scroll, width: "100%", opacity: zichtbaar }}
            />
          );
        })}
      </Gsm>
      <AbsoluteFill style={{ opacity: slot, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, paddingBottom: 380 }}>
        <Woordmerk op="donker" grootte={120} />
        <p style={{ font: "600 64px/1.1 var(--pio-font-display)", letterSpacing: "-0.03em", color: OP_GROEN_ZACHT, textAlign: "center", maxWidth: 820, textWrap: "balance" }}>{ad.beeld.slot}</p>
      </AbsoluteFill>
    </Kader>
  );
}
