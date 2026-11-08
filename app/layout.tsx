import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Beweging } from "./_componenten/Beweging";
import { Meting } from "./_componenten/Meting";
import { Toestemming } from "./_componenten/Toestemming";

const bricolage = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-600.woff", weight: "600" },
    { path: "./fonts/bricolage-grotesque-700.woff", weight: "700" },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

// Absans (Collletttivo, OFL) heeft maar één gewicht. Het bereik 100–900 voorkomt dat de browser een nep-vet maakt.
const absans = localFont({
  src: [{ path: "./fonts/absans-regular.woff2", weight: "100 900" }],
  variable: "--font-absans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peleman.io"),
  title: {
    default: "peleman.io | Websites voor zelfstandigen en kmo's",
    template: "%s | peleman.io",
  },
  description:
    "Ik maak websites voor zelfstandigen en kmo's. Voor je iets beslist, krijg je gratis een voorbeeld van je homepage. Vanaf €1.500, daarna €29 per maand.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: "peleman.io",
    url: "./",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fdfdfc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE" data-scroll-behavior="smooth" className={`${bricolage.variable} ${absans.variable}`}>
      <body>
        {children}
        <Beweging />
        <Toestemming />
        <Meting />
        {/* Umami op analytics.peleman.io: zonder cookies. Alleen in productie, zodat lokale bezoeken niet meetellen. */}
        {process.env.NODE_ENV === "production" && (
          <Script defer src="https://analytics.peleman.io/script.js" data-website-id="9c2f83d8-3c33-480b-b81d-d048f3332b8c" />
        )}
      </body>
    </html>
  );
}
