"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

// Ribbelglas van peleman.io (Paper Shaders 0.0.81, Apache-2.0), met de merkinstelling uit merkboek/glas.js.
// Per beeld verschillen alleen de marges: daar blijft de foto scherp.
const merkinstelling = {
  shape: "lines",
  distortionShape: "prism",
  size: 0.56,
  distortion: 0.62,
  shadows: 0.32,
  colorShadow: "#133D2C",
  highlights: 0.12,
  colorHighlight: "#FFFFFF",
  edges: 0.25,
  blur: 0,
} as const;

type Marges = { marginLeft?: number; marginRight?: number; marginTop?: number; marginBottom?: number };

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  marges?: Marges;
  className?: string;
};

export function RibbelglasFoto({ src, alt, sizes, priority, marges = {}, className }: Props) {
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
        const glas = await import(
          /* webpackExports: ["ShaderMount", "flutedGlassFragmentShader", "GlassDistortionShapes", "GlassGridShapes", "getShaderColorFromString", "ShaderFitOptions"] */
          "@paper-design/shaders"
        );
        if (gestopt) return;
        mount = new glas.ShaderMount(
          el,
          glas.flutedGlassFragmentShader,
          {
            u_image: img,
            u_colorBack: glas.getShaderColorFromString("#00000000"),
            u_colorShadow: glas.getShaderColorFromString(merkinstelling.colorShadow),
            u_colorHighlight: glas.getShaderColorFromString(merkinstelling.colorHighlight),
            u_shadows: merkinstelling.shadows,
            u_size: merkinstelling.size,
            u_angle: 0,
            u_distortion: merkinstelling.distortion,
            u_shift: 0,
            u_blur: merkinstelling.blur,
            u_edges: merkinstelling.edges,
            u_stretch: 0,
            u_distortionShape: glas.GlassDistortionShapes[merkinstelling.distortionShape],
            u_highlights: merkinstelling.highlights,
            u_shape: glas.GlassGridShapes[merkinstelling.shape],
            u_marginLeft: marges.marginLeft ?? 0,
            u_marginRight: marges.marginRight ?? 0,
            u_marginTop: marges.marginTop ?? 0,
            u_marginBottom: marges.marginBottom ?? 0,
            u_grainMixer: 0,
            u_grainOverlay: 0,
            u_fit: glas.ShaderFitOptions.cover,
            u_scale: 1,
            u_rotation: 0,
            u_offsetX: 0,
            u_offsetY: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_worldWidth: 0,
            u_worldHeight: 0,
          },
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
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
