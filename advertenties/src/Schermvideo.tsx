import { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Advertentie } from "../inhoud.ts";
import { Gsm, schermen } from "./Gsm";
import { Kader, OP_GROEN_ZACHT, Woordmerk, vlak } from "./merk";

export const fps = 30;
const perZin = 130;
const slotDuur = 60;

export function videoDuur(ad: Advertentie) {
  return ad.beeld.zinnen!.length * perZin + slotDuur;
}

// Een echte site die rustig scrolt op een gsm, met de zinnen als ondertitels. Werkt zonder geluid.
// Het scherm komt uit `npm run schermen` (publiek/schermen/<scherm>.png, 390 px breed op dubbele resolutie).
export function Schermvideo({ ad, veiligeZone }: { ad: Advertentie; veiligeZone?: boolean }) {
  const frame = useCurrentFrame();
  const { fps: beelden } = useVideoConfig();
  const v = vlak("verhaal");
  const zinnen = ad.beeld.zinnen!;
  const slotStart = zinnen.length * perZin;

  const [wacht] = useState(() => delayRender("Hoogte van het scherm"));
  const [hoogte, setHoogte] = useState<number | null>(null);
  useEffect(() => {
    if (hoogte) continueRender(wacht);
  }, [hoogte, wacht]);

  const breedte = 620;
  const rand = Math.round(breedte * 0.026);
  const schermBreedte = breedte - 2 * rand;
  const schermHoogte = (schermBreedte * 1688) / 780;
  const beeldHoogte = hoogte ? (hoogte * schermBreedte) / 780 : schermHoogte;
  // Niet de hele pagina: de bovenkant en een stuk inhoud, zodat het rustig blijft (zie `video` in Gsm.tsx).
  const afstand = Math.max(0, Math.min(beeldHoogte - schermHoogte, schermHoogte * (schermen[ad.scherm!].video ?? 1.5)));
  const scroll = interpolate(frame, [50, slotStart - 20], [0, afstand], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

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
      <Gsm breedte={breedte} style={{ left: (1080 - breedte) / 2, top: gsmTop }}>
        <Img
          src={staticFile(`schermen/${ad.scherm}.png`)}
          onLoad={(e) => setHoogte(e.currentTarget.naturalHeight)}
          style={{ position: "absolute", left: 0, top: -scroll, width: "100%" }}
        />
      </Gsm>
      <AbsoluteFill style={{ opacity: slot, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, paddingBottom: 380 }}>
        <Woordmerk op="donker" grootte={120} />
        <p style={{ font: "600 64px/1.1 var(--pio-font-display)", letterSpacing: "-0.03em", color: OP_GROEN_ZACHT, textAlign: "center", maxWidth: 820, textWrap: "balance" }}>{ad.beeld.slot}</p>
      </AbsoluteFill>
    </Kader>
  );
}
