// Rendert alle advertenties naar uit/ en maakt uit/overzicht.html om ze goed te keuren.
// Alleen een deel: `npm run beelden -- even-goed zo-werkt-het` (begin van de compositie-id).
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { getCompositions, getVideoMetadata, renderMedia, renderStill } from "@remotion/renderer";
import { advertenties, bestemming, campagne, formaten, knoppen, url, type Advertentie } from "../inhoud.ts";
import { postId, posts } from "../posts.ts";
import { webpackOverride } from "../webpack.ts";

const map = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uit = path.join(map, "uit");
const chromiumOptions = { gl: "angle" as const };
const filter = process.argv.slice(2);

await mkdir(uit, { recursive: true });
for (const scherm of new Set(advertenties.map((a) => a.scherm).filter(Boolean))) {
  try {
    await access(path.join(map, "publiek/schermen", `${scherm}.png`));
  } catch {
    throw new Error(`Schermafdruk van ‘${scherm}’ ontbreekt. Draai eerst \`npm run schermen\`.`);
  }
}

console.log("Bundelen…");
const serveUrl = await bundle({ entryPoint: path.join(map, "src/index.ts"), webpackOverride, publicDir: path.join(map, "publiek") });
const composities = (await getCompositions(serveUrl, { chromiumOptions })).filter((c) => !filter.length || filter.some((f) => c.id.startsWith(f)));

const afmetingen: { id: string; verwacht: string; echt: string }[] = [];

for (const c of composities) {
  const video = c.durationInFrames > 1;
  const bestand = path.join(uit, `${c.id}.${video ? "mp4" : "png"}`);
  process.stdout.write(`${c.id}… `);
  if (video) {
    await renderMedia({ composition: c, serveUrl, codec: "h264", crf: 18, imageFormat: "jpeg", jpegQuality: 92, outputLocation: bestand, chromiumOptions });
    const meta = await getVideoMetadata(bestand);
    afmetingen.push({ id: c.id, verwacht: `${c.width}×${c.height}`, echt: `${meta.width}×${meta.height}, ${(meta.durationInSeconds ?? 0).toFixed(1)} s` });
  } else {
    await renderStill({ composition: c, serveUrl, output: bestand, imageFormat: "png", chromiumOptions });
    // Breedte en hoogte staan in de PNG-kop op byte 16 tot 24.
    const kop = (await readFile(bestand)).subarray(16, 24);
    afmetingen.push({ id: c.id, verwacht: `${c.width}×${c.height}`, echt: `${kop.readUInt32BE(0)}×${kop.readUInt32BE(4)}` });
  }
  console.log("klaar");
}

let fout = false;
for (const a of afmetingen) {
  const goed = a.echt.startsWith(a.verwacht);
  fout ||= !goed;
  console.log(`${goed ? "ok  " : "FOUT"}  ${a.id.padEnd(32)} ${a.echt}`);
}

await writeFile(path.join(uit, "overzicht.html"), overzicht());
// Bijschriften om te kopiëren, in de volgorde van plaatsen.
await writeFile(
  path.join(uit, "berichten.txt"),
  posts
    .slice()
    .sort((a, b) => a.volgorde - b.volgorde)
    .map((p) => `${p.volgorde}. ${postId(p)}.png\n\n${p.bijschrift}\n`)
    .join("\n------------------------------\n\n"),
);
console.log(`\nOverzicht: ${path.relative(process.cwd(), path.join(uit, "overzicht.html"))}`);
process.exitCode = fout ? 1 : 0;

function html(t: string) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function media(a: Advertentie) {
  if (a.sjabloon === "schermvideo") return `<video src="${a.id}-verhaal.mp4" controls muted loop playsinline class="beeld-verhaal"></video>`;
  if (a.sjabloon === "stappen") {
    return `<div class="carrousel">${a
      .kaarten!.map((k, i) => `<figure><img src="${a.id}-kaart-${i + 1}.png" alt=""><figcaption><b>${html(k.kop)}</b></figcaption></figure>`)
      .join("")}</div>`;
  }
  return `<img src="${a.id}-staand.png" alt="">`;
}

function kaart(a: Advertentie) {
  const kort = a.hoofdtekst.length > 125 ? a.hoofdtekst.slice(0, 125).trimEnd() : a.hoofdtekst;
  const rest = a.hoofdtekst.slice(kort.length);
  const verhaal = a.formaten.includes("verhaal") && a.sjabloon !== "schermvideo";
  return `
  <section class="advertentie">
    <header class="info">
      <h2>${html(a.hoek)}</h2>
      <p><code>${a.id}</code> · ${a.formaten.map((f) => formaten[f].naam).join(" · ")}</p>
      <p class="url">${html(url(a))}</p>
    </header>
    <div class="rij">
      <article class="feed">
        <div class="feed-kop"><img src="profielbeeld.png" alt=""><div><b>peleman.io</b><span>Gesponsord</span></div></div>
        <p class="feed-tekst">${html(kort)}${rest ? `<details><summary>… meer</summary>${html(rest)}</details>` : ""}</p>
        ${media(a)}
        <div class="feed-link"><div><span>PELEMAN.IO</span><b>${html(a.kop)}</b><small>${html(a.beschrijving)}</small></div><span class="feed-knop">${knoppen[a.knop]}</span></div>
      </article>
      ${verhaal ? `<figure class="verhaal"><div class="zone-houder"><img src="${a.id}-verhaal.png" alt=""><i class="zone"></i></div><figcaption>9:16 voor stories en reels</figcaption></figure>` : ""}
      ${a.sjabloon === "schermvideo" ? `<figure class="verhaal"><div class="zone-houder"><video src="${a.id}-verhaal.mp4" muted autoplay loop playsinline></video><i class="zone"></i></div><figcaption>Met de veilige zone</figcaption></figure>` : ""}
    </div>
  </section>`;
}

function overzicht() {
  const nu = new Date().toLocaleString("nl-BE", { dateStyle: "long", timeStyle: "short" });
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Advertenties peleman.io</title>
<style>
@font-face { font-family: "DM Sans"; font-weight: 400; src: url("../../app/fonts/dm-sans-400.woff") format("woff"); }
@font-face { font-family: "DM Sans"; font-weight: 600; src: url("../../app/fonts/dm-sans-600.woff") format("woff"); }
@font-face { font-family: "Bricolage Grotesque"; font-weight: 600; src: url("../../app/fonts/bricolage-grotesque-600.woff") format("woff"); }
:root { --groen: #133d2c; --grijs: #edf2ee; --tekst: #26352e; --zacht: #5b6e64; --lijn: #133d2c24; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--grijs); color: var(--tekst); font: 400 15px/1.5 "DM Sans", system-ui, sans-serif; }
main { width: min(1100px, 100% - 32px); margin: 0 auto; padding: 40px 0 80px; }
h1, h2 { font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 600; letter-spacing: -.02em; color: var(--groen); margin: 0; }
h1 { font-size: 34px; }
h2 { font-size: 22px; }
.inleiding { display: flex; flex-wrap: wrap; gap: 16px 32px; align-items: end; justify-content: space-between; margin-bottom: 32px; }
.inleiding p { margin: 6px 0 0; color: var(--zacht); }
label { display: inline-flex; gap: 8px; align-items: center; font-weight: 600; cursor: pointer; }
.advertentie { padding: 32px 0; border-top: 1px solid var(--lijn); }
.info p { margin: 4px 0 0; color: var(--zacht); }
.url { font-size: 12px; word-break: break-all; }
.rij { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; margin-top: 20px; }
.feed { width: min(420px, 100%); background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 2px #0000001a; }
.feed-kop { display: flex; gap: 10px; align-items: center; padding: 12px 14px; }
.feed-kop img { width: 36px; height: 36px; border-radius: 50%; }
.feed-kop b { display: block; font-size: 14px; }
.feed-kop span { font-size: 12px; color: #65676b; }
.feed-tekst { margin: 0; padding: 0 14px 12px; font-size: 14px; }
.feed-tekst details { display: inline; }
.feed-tekst summary { display: inline; color: #65676b; cursor: pointer; }
.feed > img, .feed > video { display: block; width: 100%; }
.feed-link { display: flex; gap: 12px; align-items: center; justify-content: space-between; padding: 12px 14px; background: #f0f2f5; }
.feed-link span { display: block; font-size: 11px; color: #65676b; letter-spacing: .02em; }
.feed-link b { display: block; font-size: 15px; }
.feed-link small { display: block; color: #65676b; }
.feed-knop { flex: none; padding: 8px 12px; border-radius: 6px; background: #e4e6eb; font-weight: 600; font-size: 13px !important; color: #050505 !important; letter-spacing: 0 !important; }
.carrousel { display: flex; gap: 8px; overflow-x: auto; padding: 0 14px 4px; scroll-snap-type: x mandatory; }
.carrousel figure { flex: 0 0 78%; margin: 0; scroll-snap-align: start; border: 1px solid #dadde1; border-radius: 8px; overflow: hidden; }
.carrousel img { display: block; width: 100%; }
.carrousel figcaption { padding: 8px 10px; font-size: 13px; }
.verhaal { margin: 0; width: 240px; }
.verhaal figcaption { margin-top: 8px; font-size: 13px; color: var(--zacht); }
.zone-houder { position: relative; border-radius: 12px; overflow: hidden; }
.zone-houder img, .zone-houder video { display: block; width: 100%; }
.zone { display: none; position: absolute; inset: 0; border: solid rgba(220,38,38,.35); border-width: 14% 7% 35% 7%; border-width: calc(240px * 16 / 9 * .14) calc(240px * .07) calc(240px * 16 / 9 * .35); }
body.met-zone .zone { display: block; }
.extra { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; }
.bijschriften { flex: 1; min-width: 280px; margin: 0; padding-left: 20px; display: grid; gap: 16px; }
.bijschriften li { display: grid; grid-template-columns: 72px 1fr; gap: 12px; align-items: start; }
.bijschriften img { width: 72px; border-radius: 4px; }
.bijschriften p { margin: 0; font-size: 13px; }
.extra img { display: block; max-width: 100%; border-radius: 8px; }
.extra .rond { width: 160px; border-radius: 50%; }
</style>
</head>
<body>
<main>
  <div class="inleiding">
    <div>
      <h1>Advertenties, ronde 1</h1>
      <p>Campagne ${html(campagne)}, naar ${html(bestemming)}. Gemaakt op ${html(nu)}. Alleen echt beeld; namen van cases niet in de tekst.</p>
    </div>
    <label><input type="checkbox" onchange="document.body.classList.toggle('met-zone', this.checked)"> Veilige zone tonen</label>
  </div>
  ${advertenties.map(kaart).join("")}
  <section class="advertentie">
    <header class="info"><h2>Instagram: startraster</h2><p>Negen gewone berichten. Plaats ze van 1 tot 9; het laatste komt linksboven. Het raster toont ze als 3:4. Bijschriften staan ook in berichten.txt.</p></header>
    <div class="rij" style="margin-top:20px">
      <img src="berichten-raster.png" alt="" style="width:min(420px,100%);border-radius:8px">
      <ol class="bijschriften">${posts
        .slice()
        .sort((a, b) => a.volgorde - b.volgorde)
        .map((p) => `<li><a href="${postId(p)}.png"><img src="${postId(p)}.png" alt=""></a><p>${html(p.bijschrift).replace(/\n/g, "<br>")}</p></li>`)
        .join("")}</ol>
    </div>
  </section>
  <section class="advertentie">
    <header class="info"><h2>Profiel</h2><p>Profielbeeld voor Instagram en Facebook, omslag voor de Facebook-pagina.</p></header>
    <div class="extra" style="margin-top:20px"><img class="rond" src="profielbeeld.png" alt=""><img src="omslag-facebook.png" alt="" style="width:min(640px,100%)"></div>
  </section>
</main>
</body>
</html>
`;
}
