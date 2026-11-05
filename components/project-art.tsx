import type { CSSProperties } from "react";
import type { ProjectArtName } from "@/content/portfolio";
import { Play } from "./icons";

/**
 * Animated illustrations for the project cards. They're decorative stand-ins:
 * add `image` to a project in content/portfolio.ts to show a real screenshot instead.
 */
export function ProjectArt({ name }: { name: ProjectArtName }) {
  const Art = artwork[name];
  return <Art />;
}

const EQ_BARS = [0.45, 0.8, 0.35, 0.95, 0.6, 0.3, 0.75, 1, 0.5, 0.85, 0.4, 0.7, 0.55, 0.9, 0.35, 0.65, 0.8, 0.45];

function BeatflowArt() {
  return (
    <div className="art art-beat" aria-hidden="true">
      <div className="beat-glow" />
      <span className="beat-brand">
        <i /> BeatFlow
      </span>
      <div className="beat-copy">
        Feel every
        <br />
        beat.
        <span className="beat-chip" />
      </div>

      <svg className="beat-phones" viewBox="0 0 200 190">
        <defs>
          <linearGradient id="phones-band" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dfe7ea" />
            <stop offset="1" stopColor="#38afa9" />
          </linearGradient>
          <linearGradient id="phones-cup" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5cc9c2" />
            <stop offset="0.55" stopColor="#1b8a84" />
            <stop offset="1" stopColor="#12343c" />
          </linearGradient>
        </defs>
        <path d="M34 116V94a66 66 0 0 1 132 0v22" fill="none" stroke="url(#phones-band)" strokeWidth="11" strokeLinecap="round" />
        <rect x="16" y="98" width="42" height="74" rx="20" fill="url(#phones-cup)" />
        <rect x="142" y="98" width="42" height="74" rx="20" fill="url(#phones-cup)" />
        <rect x="42" y="108" width="16" height="54" rx="8" fill="#0f2229" />
        <rect x="142" y="108" width="16" height="54" rx="8" fill="#0f2229" />
      </svg>

      <div className="beat-player">
        <span className="beat-play">
          <Play size={10} />
        </span>
        <span className="beat-eq">
          {EQ_BARS.map((height, index) => (
            <i key={index} style={{ "--h": height, "--n": index } as CSSProperties} />
          ))}
        </span>
        <span className="beat-time">2:41</span>
      </div>
    </div>
  );
}

const artwork = { beatflow: BeatflowArt };
