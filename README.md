# peleman.io

De site van peleman.io: websites voor zelfstandigen, gebouwd en onderhouden voor een vaste prijs per maand. Gebouwd met Next.js 16 (App Router), React 19 en gewone CSS.

## Lokaal draaien

```bash
npm install
npm run dev
```

De site draait dan op http://localhost:3000. Zonder omgevingsvariabelen werkt alles. Het aanvraagformulier logt de aanvraag dan in de terminal in plaats van ze te versturen, en de cookiebanner en de meting blijven uit.

Een productiebuild draai je met `npm run build && npm start`.

## Pagina’s

| Pad | Inhoud |
| --- | --- |
| `/` | Homepage van het website-abonnement |
| `/maatwerk` | Landingspagina voor schrijnwerk, interieurbouw en keukens |
| `/cases` | H16, LVQ.wine en het eigen concept Tourage |
| `/aanvraag` | Aanvraagformulier voor het gratis voorbeeld, met `/aanvraag/bedankt` daarna |
| `/voorwaarden`, `/privacy`, `/cookies` | Juridische pagina’s |

Oude adressen van de vorige site (`/about`, `/contact`, `/case-studies`, …) sturen door via `next.config.js`.

## Waar wat staat

| Map of bestand | Inhoud |
| --- | --- |
| `lib/gegevens.ts` | Contactgegevens, pakketten en prijzen, overnameprijs, vergelijkingstabel, stappen en de eerstvolgende vrije week. Prijzen pas je hier aan. |
| `lib/cases.ts` | De cases en hun screenshots |
| `app/_secties/` | Onderdelen van de homepage en /maatwerk (functies, werkwijze, pakketten, vragen, …) |
| `app/_componenten/` | Navigatie en footer (`kader.tsx`), woordmerk en knoppen (`merk.tsx`), het ribbelglas, de cookiebanner en de meting |
| `app/aanvraag/` | Formulier en serveractie |
| `lib/formulier.ts`, `lib/aanvraag-server.ts` | Controle van het formulier, opslag in Twenty en de mails |
| `app/globals.css` | Merktokens en alle stijl |
| `public/beeld/` | Beelden van de site |

Het ribbelglas is een WebGL-effect van [Paper Shaders](https://shaders.paper.design/fluted-glass) (Apache-2.0). Zonder WebGL blijft de gewone foto staan.

## Omgevingsvariabelen

Kopieer `.env.example` naar `.env.local` en vul in wat je nodig hebt.

| Variabele | Waarvoor |
| --- | --- |
| `TWENTY_API_URL`, `TWENTY_API_KEY` | Aanvragen bewaren in Twenty |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Melding van een nieuwe aanvraag en bevestiging aan de aanvrager |
| `AANVRAAG_NAAR` | Adres dat de melding krijgt (standaard clement@peleman.io) |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Meting, alleen na toestemming. Leeg betekent geen cookiebanner en geen meting. |

In productie moet minstens Twenty of SMTP ingesteld zijn. Anders krijgt de bezoeker een foutmelding met het telefoonnummer en het e-mailadres.

## Hosten

De site wordt zelf gehost op Coolify als gewone Next.js-app (`npm run build`, daarna `npm start`). `sharp` staat in de dependencies voor de beeldoptimalisatie van Next.js.
