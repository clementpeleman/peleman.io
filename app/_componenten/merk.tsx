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

type KnopProps = {
  href?: string;
  children?: React.ReactNode;
  variant?: "groen" | "wit";
  klein?: boolean;
  className?: string;
};

export function Knop({ href = "/aanvraag", children = "Gratis voorbeeld", variant = "groen", klein, className }: KnopProps) {
  const klassen = ["knop", variant === "wit" && "knop--wit", klein && "knop--klein", className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={klassen}>
      {children}
      <Pijl />
    </Link>
  );
}
