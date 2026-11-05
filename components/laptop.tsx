import type { CSSProperties } from "react";

const CODE = [
  <>
    <span className="lap-key">const</span> aneeqa = {"{"}
  </>,
  <>
    {"  "}focus: <span className="lap-str">&quot;full-stack&quot;</span>,
  </>,
  <>
    {"  "}writes: <span className="lap-str">&quot;clean code&quot;</span>,
  </>,
  <>
    {"  "}builds: <span className="lap-str">&quot;web apps&quot;</span>,
  </>,
  <>
    {"}"};<span className="lap-caret" />
  </>,
];

/** CSS 3D laptop whose lid opens when it scrolls into view (driven by data-in). */
export function Laptop({ style }: { style?: CSSProperties }) {
  return (
    <div className="laptop" data-reveal style={style} aria-hidden="true">
      <svg className="laptop-ribbon" viewBox="0 0 400 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lap-ribbon" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#38afa9" stopOpacity="0" />
            <stop offset="0.55" stopColor="#38afa9" stopOpacity="0.32" />
            <stop offset="1" stopColor="#a8701f" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lap-rim" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#38afa9" stopOpacity="0" />
            <stop offset="0.6" stopColor="#38afa9" stopOpacity="0.6" />
            <stop offset="1" stopColor="#a8701f" />
          </linearGradient>
          <linearGradient id="lap-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38afa9" />
            <stop offset="1" stopColor="#a8701f" />
          </linearGradient>
        </defs>
        <path
          fill="url(#lap-ribbon)"
          d="M14 270C120 300 306 292 362 176 386 124 376 58 352 18 346 92 318 160 252 202 180 246 90 262 14 270Z"
        />
        <path
          fill="none"
          stroke="url(#lap-rim)"
          strokeWidth="1.5"
          d="M14 270C120 300 306 292 362 176 386 124 376 58 352 18"
        />
      </svg>

      <div className="lap-shadow" />

      <div className="lap-rig">
        <div className="lap-base">
          <div className="lap-keys" />
          <div className="lap-pad" />
          <div className="lap-edge" />
        </div>
        <div className="lap-lid">
          <div className="lap-screen">
            {CODE.map((line, index) => (
              <span key={index} className="lap-line" style={{ "--i": index } as CSSProperties}>
                {line}
              </span>
            ))}
            <svg className="lap-mark" viewBox="0 0 240 150">
              <path d="M72 30 22 75l50 45" />
              <path d="M134 12 106 138" />
              <path d="M168 30l50 45-50 45" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
