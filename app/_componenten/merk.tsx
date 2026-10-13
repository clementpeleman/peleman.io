import Link from "next/link";

export function Woordmerk({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="woordmerk" aria-label="peleman.io, naar de homepage">
      peleman<span>.io</span>
    </Link>
  );
}

export function Pijl() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Vinkje() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const lijn = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function IcoonEuro() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" {...lijn} />
      <path d="M15 9.2a3.7 3.7 0 1 0 0 5.6M7.6 11h5.6M7.6 13.2h5.6" {...lijn} />
    </svg>
  );
}

export function IcoonOog() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" {...lijn} />
      <circle cx="12" cy="12" r="2.8" {...lijn} />
    </svg>
  );
}

export function IcoonPersoon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8.5" r="3.6" {...lijn} />
      <path d="M4.8 19.5c1.3-3.3 4-5 7.2-5s5.9 1.7 7.2 5" {...lijn} />
    </svg>
  );
}

export function IcoonSleutel() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="8" cy="12" r="3.8" {...lijn} />
      <path d="M11.8 12h9M17.6 12v3M20.6 12v2.4" {...lijn} />
    </svg>
  );
}

type KnopProps = {
  href?: string;
  children?: React.ReactNode;
  variant?: "groen" | "wit" | "rand";
  klein?: boolean;
  className?: string;
};

export function Knop({ href = "/aanvraag", children = "Gratis voorbeeld", variant = "groen", klein, className }: KnopProps) {
  const klassen = ["knop", variant === "wit" && "knop--wit", variant === "rand" && "knop--rand", klein && "knop--klein", className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={klassen}>
      {children}
      <Pijl />
    </Link>
  );
}
