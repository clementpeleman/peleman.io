// Legt echte sites vast zoals op een gsm (390 px breed, dubbele resolutie).
// Gebruikt Google Chrome op deze computer, zodat Playwright geen eigen browser hoeft te downloaden.
// Het aanvraagformulier komt van de eigen site: start die eerst (`npm run build && npm start -- -p 3100` in de root),
// of geef een ander adres mee met SITE=https://peleman.io.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";
import type { Scherm } from "../inhoud.ts";

const map = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../publiek/schermen");
const site = process.env.SITE ?? "http://localhost:3100";

type Opname = { adres: string; volledig: boolean; voorbereiden?: (pagina: Page) => Promise<void> };

const opnames: Record<Scherm, Opname> = {
  // Over de hele lengte, voor de schermvideo.
  lvq: { adres: "https://lvq.wine", volledig: true },
  tourage: { adres: "https://tourage.peleman.io", volledig: true },
  // De echte vraag uit het formulier, met twee keuzes aangevinkt. Er wordt niets verstuurd.
  aanvraag: {
    adres: `${site}/aanvraag`,
    volledig: false,
    voorbereiden: async (pagina) => {
      await pagina.getByText("Beter tonen wat ik doe").click();
      await pagina.getByText("Betere aanvragen, met de juiste info").click();
      const vraag = pagina.getByText("Wat moet je website beter doen?");
      await vraag.evaluate((el) => window.scrollBy(0, el.getBoundingClientRect().top - 76));
    },
  },
};

await mkdir(map, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "nl-BE" });

for (const [naam, opname] of Object.entries(opnames)) {
  const pagina = await context.newPage();
  await pagina.goto(opname.adres, { waitUntil: "networkidle" });
  if (opname.volledig) {
    // Eerst naar onder scrollen, zodat beelden en animaties die pas bij het scrollen laden er ook staan.
    await pagina.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((klaar) => setTimeout(klaar, 150));
      }
      window.scrollTo(0, 0);
    });
  }
  await opname.voorbereiden?.(pagina);
  await pagina.waitForTimeout(1000);
  const bestand = path.join(map, `${naam}.png`);
  await pagina.screenshot({ path: bestand, fullPage: opname.volledig });
  console.log(`${naam}: ${opname.adres} → ${path.relative(process.cwd(), bestand)}`);
  await pagina.close();
}

await browser.close();
