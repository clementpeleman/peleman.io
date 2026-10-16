// Zet de goedgekeurde beelden van de huidige campagne in public/advertenties/<campagne>/, zodat ze na een deploy
// op https://peleman.io/advertenties/... staan. Daar haalt de Meta-connector ze op (die leest alleen openbare URL's).
// robots.txt houdt de map uit Google. Draai eerst `npm run beelden`.
import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { advertenties, campagne, type Advertentie } from "../inhoud.ts";

const map = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const doel = path.resolve(map, "../public/advertenties", campagne);

export function bestanden(a: Advertentie) {
  if (a.sjabloon === "schermvideo") return [`${a.id}-verhaal.mp4`];
  if (a.sjabloon === "stappen") return a.kaarten!.map((_, i) => `${a.id}-kaart-${i + 1}.png`);
  return a.formaten.map((f) => `${a.id}-${f}.png`);
}

await mkdir(doel, { recursive: true });
let totaal = 0;
for (const a of advertenties) {
  for (const bestand of bestanden(a)) {
    const bron = path.join(map, "uit", bestand);
    await copyFile(bron, path.join(doel, bestand)).catch(() => {
      throw new Error(`${bestand} ontbreekt in uit/. Draai eerst \`npm run beelden\`.`);
    });
    totaal += (await stat(bron)).size;
    console.log(`https://peleman.io/advertenties/${campagne}/${bestand}`);
  }
}
console.log(`\n${(totaal / 1048576).toFixed(1)} MB in ${path.relative(process.cwd(), doel)}`);
