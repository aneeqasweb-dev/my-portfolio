import type { CSSProperties } from "react";

const DEPTH_LAYERS = 9;
const LAYER_GAP_PX = 3.4;

function GlyphPaths() {
  return (
    <>
      <path d="M72 30 22 75l50 45" />
      <path d="M134 12 106 138" />
      <path d="M168 30l50 45-50 45" />
    </>
  );
}

/** The hero's `</>` symbol, extruded from stacked layers and circled by two orbits. */
export function CodeScene() {
  return (
    <div className="scene" data-scene aria-hidden="true">
      <div className="scene-glow" />
      <div className="scene-float">
        <div className="scene-rig">
          <Orbit className="orbit-a" tiltX="70deg" tiltY="-16deg" duration="13s" />
          <Orbit className="orbit-b" tiltX="74deg" tiltY="24deg" duration="19s" reverse />

          {Array.from({ length: DEPTH_LAYERS }, (_, index) => {
            const depth = DEPTH_LAYERS - index;
            const style = {
              "--z": `${-depth * LAYER_GAP_PX}px`,
              stroke: `color-mix(in oklab, var(--depth-near), var(--depth-far) ${(depth / DEPTH_LAYERS) * 100}%)`,
            } as CSSProperties;
            return (
              <svg key={index} className="glyph" viewBox="0 0 240 150" style={style}>
                <GlyphPaths />
              </svg>
            );
          })}

          <svg className="glyph" viewBox="0 0 240 150" stroke="url(#glyph-face)">
            <defs>
              <linearGradient id="glyph-face" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="200" y2="150">
                <stop offset="0" stopColor="#62c6c1" />
                <stop offset="0.45" stopColor="#38afa9" />
                <stop offset="1" stopColor="#a8701f" />
              </linearGradient>
            </defs>
            <GlyphPaths />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Orbit({
  className,
  tiltX,
  tiltY,
  duration,
  reverse,
}: {
  className: string;
  tiltX: string;
  tiltY: string;
  duration: string;
  reverse?: boolean;
}) {
  const style = {
    "--tilt-x": tiltX,
    "--tilt-y": tiltY,
    "--dur": duration,
    "--dir": reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={`orbit ${className}`} style={style}>
      <div className="orbit-spin">
        <span className="orbit-dot" />
      </div>
    </div>
  );
}
