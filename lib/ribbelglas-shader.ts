// Alleen wat het ribbelglas nodig heeft, zodat de bundler de andere shaders weglaat (het pakket heeft geen side effects).
// Ook gebruikt door de advertentiestudio in advertenties/, zodat het glas daar hetzelfde is als op de site.
import {
  ShaderMount,
  flutedGlassFragmentShader,
  GlassDistortionShapes,
  GlassGridShapes,
  getShaderColorFromString,
  ShaderFitOptions,
} from "@paper-design/shaders";

export { ShaderMount, flutedGlassFragmentShader };

// Merkinstelling uit merkboek/glas.js (Paper Shaders 0.0.81, Apache-2.0).
export const merkinstelling = {
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

// Per beeld verschillen alleen de marges: daar blijft de foto scherp.
export type Marges = { marginLeft?: number; marginRight?: number; marginTop?: number; marginBottom?: number };

export function ribbelglasUniforms(beeld: HTMLImageElement, marges: Marges = {}) {
  return {
    u_image: beeld,
    u_colorBack: getShaderColorFromString("#00000000"),
    u_colorShadow: getShaderColorFromString(merkinstelling.colorShadow),
    u_colorHighlight: getShaderColorFromString(merkinstelling.colorHighlight),
    u_shadows: merkinstelling.shadows,
    u_size: merkinstelling.size,
    u_angle: 0,
    u_distortion: merkinstelling.distortion,
    u_shift: 0,
    u_blur: merkinstelling.blur,
    u_edges: merkinstelling.edges,
    u_stretch: 0,
    u_distortionShape: GlassDistortionShapes[merkinstelling.distortionShape],
    u_highlights: merkinstelling.highlights,
    u_shape: GlassGridShapes[merkinstelling.shape],
    u_marginLeft: marges.marginLeft ?? 0,
    u_marginRight: marges.marginRight ?? 0,
    u_marginTop: marges.marginTop ?? 0,
    u_marginBottom: marges.marginBottom ?? 0,
    u_grainMixer: 0,
    u_grainOverlay: 0,
    u_fit: ShaderFitOptions.cover,
    u_scale: 1,
    u_rotation: 0,
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
  };
}
