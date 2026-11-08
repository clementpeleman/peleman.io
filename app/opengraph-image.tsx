import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { aanbod } from "@/lib/gegevens";

export const alt = "peleman.io: ik maak websites voor zelfstandigen en kmo's.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Deelbeeld() {
  const map = join(process.cwd(), "app/fonts");
  // Satori leest geen woff2, daarom de otf-versie van Absans.
  const [merk, tekst] = await Promise.all([
    readFile(join(map, "bricolage-grotesque-700.woff")),
    readFile(join(map, "absans-regular.otf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#133d2c", position: "relative" }}>
        {/* Ribbels zoals het ribbelglas: verticale banen die als PNG klein blijven. */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex" }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 30,
                height: "100%",
                backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.13) 45%, rgba(0,0,0,0.18))",
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", backgroundImage: "linear-gradient(90deg, #133d2c 30%, rgba(19,61,44,0.35))" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", position: "relative" }}>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 40, letterSpacing: -1.5, color: "#fdfdfc" }}>
            peleman<span style={{ color: "#9fbcae" }}>.io</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Absans", fontSize: 82, lineHeight: 1.04, letterSpacing: -2.5, color: "#fdfdfc" }}>
            <span>Ik maak websites voor</span>
            <span style={{ color: "#9fbcae" }}>zelfstandigen en kmo&apos;s.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "Absans", fontSize: 28, color: "#c9d9d1" }}>
            Eerst een gratis voorbeeld. Vanaf €{aanbod.site.toLocaleString("nl-BE")}, daarna €{aanbod.perMaand} per maand.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: merk, weight: 700, style: "normal" },
        { name: "Absans", data: tekst, weight: 400, style: "normal" },
      ],
    },
  );
}
