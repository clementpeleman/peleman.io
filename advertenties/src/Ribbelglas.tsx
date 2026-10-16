import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { ShaderMount, flutedGlassFragmentShader, ribbelglasUniforms, type Marges } from "../../lib/ribbelglas-shader.ts";

// Deel van het beeld, in fracties van de breedte en hoogte.
export type Uitsnede = { x: number; y: number; breedte: number; hoogte: number };

// Snijdt het beeld bij in een canvas en geeft het terug als beeld, want het glas leest alleen <img>.
async function snijBij(beeld: HTMLImageElement, u: Uitsnede) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(beeld.naturalWidth * u.breedte);
  canvas.height = Math.round(beeld.naturalHeight * u.hoogte);
  canvas.getContext("2d")!.drawImage(beeld, beeld.naturalWidth * u.x, beeld.naturalHeight * u.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  const deel = new Image();
  deel.src = canvas.toDataURL("image/png");
  await deel.decode();
  return deel;
}

// Het ribbelglas van de site, met dezelfde merkinstelling. Hoort over foto's, niet over tekst: daar wordt het rommelig.
// Lukt WebGL niet, dan stopt de render met een fout: liever dat dan een advertentie zonder glas die niemand opmerkt.
export function Ribbelglas({ src, marges, uitsnede, style }: { src: string; marges?: Marges; uitsnede?: Uitsnede; style: CSSProperties }) {
  const vak = useRef<HTMLDivElement>(null);
  const [wacht] = useState(() => delayRender("Ribbelglas tekenen"));

  useEffect(() => {
    const el = vak.current;
    if (!el) return;
    let mount: { dispose: () => void } | null = null;
    const beeld = new Image();
    beeld.src = src;
    beeld
      .decode()
      .then(() => (uitsnede ? snijBij(beeld, uitsnede) : beeld))
      .then((bron) => {
        mount = new ShaderMount(el, flutedGlassFragmentShader, ribbelglasUniforms(bron, marges), { preserveDrawingBuffer: true }, 0, 0, 2, undefined, ["u_image"]);
        // Het glas tekent pas nadat het de grootte van het vak gemeten heeft: drie beelden wachten.
        let n = 0;
        const tik = () => (++n < 3 ? requestAnimationFrame(tik) : continueRender(wacht));
        requestAnimationFrame(tik);
      })
      .catch((fout) => cancelRender(fout));
    return () => mount?.dispose();
    // Het beeld en de marges liggen per advertentie vast.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={vak} style={{ position: "absolute", overflow: "hidden", ...style }} />;
}
