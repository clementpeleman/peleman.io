import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
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

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-400.woff", weight: "400" },
    { path: "./fonts/dm-sans-500.woff", weight: "500" },
    { path: "./fonts/dm-sans-600.woff", weight: "600" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peleman.io"),
  title: {
    default: "peleman.io — Websites voor zelfstandigen",
    template: "%s — peleman.io",
  },
  description:
    "Een website die even goed is als jouw werk. Wij bouwen en onderhouden je website voor een vaste prijs per maand. Eerst zie je een gratis voorbeeld.",
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
    <html lang="nl-BE" data-scroll-behavior="smooth" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Toestemming />
        <Meting />
      </body>
    </html>
  );
}
