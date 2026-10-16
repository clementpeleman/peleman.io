# Advertentiestudio

Advertenties voor Meta, gemaakt in code met [Remotion](https://www.remotion.dev): dezelfde letters, kleuren en hetzelfde ribbelglas als de site, en alleen echt beeld. Stilstaande beelden en video komen uit dezelfde React-onderdelen. Remotion is gratis voor een eenmanszaak (tot drie medewerkers).

De studio heeft een eigen `package.json`, zodat de site op Coolify er niet zwaarder van wordt. `next build` slaat deze map over (`tsconfig.json`).

## Gebruiken

```bash
cd advertenties
npm install
npm run schermen   # echte schermen vastleggen zoals op een gsm (gebruikt Google Chrome)
npm run controle   # teksten nakijken
npm run beelden    # alles renderen naar uit/, met uit/overzicht.html
npm run publiceer  # goedgekeurde beelden naar public/advertenties/<campagne>/ voor de Meta-connector
```

`npm run schermen` haalt ook het echte aanvraagformulier op. Laat de site daarvoor draaien op poort 3100 (`npm run build && npm start -- -p 3100` in de root), of geef een ander adres mee met `SITE=…`.

Alleen een deel renderen: `npm run beelden -- even-goed zo-werkt-het`. Live bijwerken en bekijken: `npm run studio`.

Het overzicht toont elke advertentie zoals in de feed, met de 9:16-versie ernaast en een knop voor de veilige zone. Open het via een lokale server vanuit de root van de repo (`python3 -m http.server 8767`, daarna `/advertenties/uit/overzicht.html`), want het laadt de letters uit `app/fonts`.

## Waar wat staat

| Bestand | Inhoud |
| --- | --- |
| `inhoud.ts` | Alle advertenties: hoek, sjabloon, formaten, tekst in en rond het beeld, knop. De id is ook de `utm_content`. Campagne en bestemming staan bovenaan. |
| `src/sjablonen.tsx` | De sjablonen: glas, gsm, prijs, aanvraag, scherm, lancering, de carrousel en het profielbeeld en de omslag |
| `src/Schermvideo.tsx` | Video van een echte site die scrolt op een gsm, met ondertitels |
| `src/merk.tsx`, `src/merk.css` | Woordmerk, kop, knop, lijst, kader en de veilige zone. Haalt `app/globals.css` en de letters van de site binnen. |
| `src/Ribbelglas.tsx` | Het glas, met de merkinstelling uit `lib/ribbelglas-shader.ts` |
| `src/Gsm.tsx` | Gsm en desktopscherm, met de schermafdrukken uit `public/beeld/cases` |
| `scripts/` | `schermen`, `controle`, `beelden` en `publiceer` |
| `uit/` | Renders en overzicht (niet in git) |

Prijzen komen uit `lib/gegevens.ts`, zodat een advertentie nooit een andere prijs toont dan de site.

## Afspraken

- Alleen echt beeld: echte sites en schermen, het ribbelglas, geen AI-beeld, geen nagemaakte schermen en geen verzonnen klanten.
- Het ribbelglas hoort over foto’s, niet over tekst. Over tekst wordt het rommelig.
- Namen van cases niet in de tekst; in een scherm mogen ze zichtbaar zijn. Tourage krijgt in beeld altijd ‘eigen concept’. H16 hoort niet in advertenties.
- Teksten volgen de merkstem: ‘wij’, ‘je’, kort, mild, geen uitroeptekens of gedachtestreepjes, prijzen met ‘excl. btw’. `npm run controle` kijkt dat na.
- Bij 9:16 blijft tekst uit de bovenste 14% en de onderste 35%: daar liggen de knoppen van Meta.
- In Meta staat alles eerst op pauze. Aanzetten doet Clément zelf.
