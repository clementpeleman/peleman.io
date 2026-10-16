"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import type { Marges } from "@/lib/ribbelglas-shader";

// Ribbelglas van peleman.io (Paper Shaders 0.0.81, Apache-2.0). De merkinstelling staat in lib/ribbelglas-shader.ts.
// Per beeld verschillen alleen de marges: daar blijft de foto scherp.
type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  preload?: boolean;
  marges?: Marges;
  className?: string;
};

export function RibbelglasFoto({ src, alt, sizes, preload, marges = {}, className }: Props) {
  const vak = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = vak.current;
    const img = el?.querySelector("img");
    if (!el || !img) return;
    let gestopt = false;
    let mount: { dispose: () => void } | null = null;

    // Pas starten als de pagina geladen is en de browser vrij is: de foto staat er al, het glas komt erover.
    const wachtOpRust = () =>
      new Promise<void>((klaar) => {
        const start = () => ("requestIdleCallback" in window ? window.requestIdleCallback(() => klaar(), { timeout: 3000 }) : setTimeout(klaar, 1200));
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
      });

    (async () => {
      try {
        if (!img.complete || !img.naturalWidth) {
          await new Promise((klaar, fout) => {
            img.addEventListener("load", klaar, { once: true });
            img.addEventListener("error", fout, { once: true });
          });
        }
        await wachtOpRust();
        const glas = await import("@/lib/ribbelglas-shader");
        if (gestopt) return;
        mount = new glas.ShaderMount(
          el,
          glas.flutedGlassFragmentShader,
          glas.ribbelglasUniforms(img, marges),
          undefined,
          0,
          0,
          2,
          undefined,
          ["u_image"],
        );
        setLive(true);
      } catch {
        // Geen WebGL of het beeld laadt niet: de gewone foto blijft staan.
      }
    })();

    return () => {
      gestopt = true;
      mount?.dispose();
    };
    // De marges liggen per beeld vast.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={vak} className={["ribbelglas", live && "is-live", className].filter(Boolean).join(" ")}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
    </div>
  );
}
