import Image, { type StaticImageData } from "next/image";

// Een iPhone (15 Pro-verhoudingen: scherm 393 × 852 pt, hoeken 55 pt) rond een gsm-screenshot.
// Alle maten staan in punten en schalen mee met de breedte van het element (container query-eenheden).
// Statusbalk-iconen naar Apples iOS UI-kit (signaal, wifi, batterij).

type Props = {
  src: StaticImageData;
  domein: string;
  sizes: string;
  statusKleur?: string;
};

export function Iphone({ src, domein, sizes, statusKleur = "#ffffff" }: Props) {
  return (
    <div className="iphone" aria-hidden="true">
      <span className="iphone-knop iphone-knop--actie" />
      <span className="iphone-knop iphone-knop--op" />
      <span className="iphone-knop iphone-knop--neer" />
      <span className="iphone-knop iphone-knop--aan" />
      <div className="iphone-body">
        <div className="iphone-glas">
          <div className="iphone-scherm" style={{ "--status": statusKleur } as React.CSSProperties}>
            <div className="iphone-status">
              <span className="iphone-uur">9:41</span>
              <span className="iphone-iconen">
                <svg viewBox="0 0 20.33 13.67">
                  {[6.33, 8.67, 11, 13.67].map((h, i) => (
                    <rect key={i} x={i * 5.667} y={13.67 - h} width={3.333} height={h} rx={1.667} fill="currentColor" />
                  ))}
                </svg>
                <svg viewBox="0 0 19.33 14.33">
                  <path
                    fill="currentColor"
                    d="M.42 5.54c.49.5 1.24.42 1.86-.13A10.9 10.9 0 0 1 9.67 2.64c2.83 0 5.38.97 7.4 2.77.6.56 1.35.62 1.85.13.5-.52.57-1.29.06-1.83A13.3 13.3 0 0 0 9.67 0C6 0 2.49 1.53.36 3.72c-.52.53-.46 1.3.06 1.83Zm3.53 3.6c.56.54 1.27.48 1.9-.03a6.2 6.2 0 0 1 3.82-1.36c1.4 0 2.77.54 3.82 1.37.63.52 1.37.55 1.91 0 .53-.54.62-1.37.06-1.89a8.4 8.4 0 0 0-5.78-2.12c-2.3 0-4.4.87-5.77 2.12-.49.46-.59 1.25.04 1.9Zm4.78 4.75c.61.59 1.25.59 1.87 0l1.16-1.11c.61-.6.74-1.36.04-1.88a3.6 3.6 0 0 0-2.13-.69c-.8 0-1.56.27-2.13.7-.7.5-.56 1.27.06 1.86l1.13 1.12Z"
                  />
                </svg>
                <svg viewBox="0 0 29.33 13.67">
                  <rect width="26.33" height="13.67" rx="4.3" fill="currentColor" />
                  <path fill="currentColor" d="M27.33 4.33v5c.6-.14 2-1.25 2-2.5s-1.4-2.36-2-2.5Z" />
                </svg>
              </span>
            </div>
            <Image className="iphone-pagina" src={src} alt="" sizes={sizes} />
            <span className="iphone-eiland" />
            <span className="iphone-adres">
              <svg viewBox="0 0 10 13">
                <path fill="currentColor" d="M2 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 10 6.5v5A1.5 1.5 0 0 1 8.5 13h-7A1.5 1.5 0 0 1 0 11.5v-5A1.5 1.5 0 0 1 1.5 5H2Zm1.3 0h3.4V3.5a1.7 1.7 0 0 0-3.4 0V5Z" />
              </svg>
              {domein}
            </span>
            <span className="iphone-home" />
          </div>
        </div>
      </div>
    </div>
  );
}
