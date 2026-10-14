import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { laagstePrijs } from "@/lib/gegevens";

export const alt = "peleman.io: een website die even goed is als jouw werk.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Deelbeeld() {
  const map = join(process.cwd(), "app/fonts");
  const [titel, tekst] = await Promise.all([
    readFile(join(map, "bricolage-grotesque-600.woff")),
    readFile(join(map, "dm-sans-500.woff")),
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
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 82, lineHeight: 1.04, letterSpacing: -3, color: "#fdfdfc" }}>
            <span>Een website die even goed is</span>
            <span style={{ color: "#9fbcae" }}>als jouw werk.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "DM Sans", fontSize: 28, color: "#c9d9d1" }}>
            Eerst een gratis voorbeeld, daarna vanaf €{laagstePrijs} per maand
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: titel, weight: 600, style: "normal" },
        { name: "DM Sans", data: tekst, weight: 500, style: "normal" },
      ],
    },
  );
}
