import type { CSSProperties, ReactNode, SVGProps } from "react";
import { brands, type Brand, type BrandName } from "./brands";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);
export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);
export const ArrowDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Stroke>
);
export const Download = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </Stroke>
);
export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" />
  </Stroke>
);
export const Send = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" />
  </Stroke>
);
export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Stroke>
);
export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Stroke>
);
export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
);
export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);
export const Heart = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8 2.9c0 6.1-8 11-8 11Z" />
  </Stroke>
);
export const Briefcase = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
    <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 13h18M12 12v2" />
  </Stroke>
);
export const GraduationCap = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 4.5 10 5-10 5-10-5 10-5Z" />
    <path d="M6 11.7v4.8c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.8M22 9.5V15" />
  </Stroke>
);
export const BookOpen = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" />
  </Stroke>
);
export const School = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
    <path d="m18 10 3.45 1.72a1 1 0 0 1 .55.9V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.38a1 1 0 0 1 .55-.9L6 10" />
    <path d="M18 5v17M6 5v17M4 6l7.1-3.55a2 2 0 0 1 1.8 0L20 6" />
    <circle cx="12" cy="9" r="2" />
  </Stroke>
);
export const Code = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
  </Stroke>
);
export const Puzzle = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3 19.5 7.5v9L12 21l-7.5-4.5v-9L12 3Z" />
    <circle cx="12" cy="12" r="2.75" />
  </Stroke>
);
export const Bolt = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M13 3 5 13.5h6L10.5 21 19 10h-6l0-7Z" />
  </Stroke>
);
export const Users = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M2.5 20c.5-3.6 3.1-5.5 6.5-5.5s6 1.9 6.5 5.5M16 5.3a3.5 3.5 0 0 1 0 6.4M18 14.9c2 .7 3.2 2.4 3.5 5.1" />
  </Stroke>
);
export const Play = (p: IconProps) => (
  <svg width={p.size ?? 12} height={p.size ?? 12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </svg>
);

export const LayoutPanels = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="3" width="18" height="7" rx="1" />
    <rect x="3" y="14" width="9" height="7" rx="1" />
    <rect x="16" y="14" width="5" height="7" rx="1" />
  </Stroke>
);

export const Server = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </Stroke>
);

export const Database = (p: IconProps) => (
  <Stroke {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </Stroke>
);

export const Wrench = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Stroke>
);

export const Lightbulb = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6M10 22h4" />
  </Stroke>
);

export const traitIcons = { code: Code, puzzle: Puzzle, bolt: Bolt, users: Users };

export const techIcons = {
  layout: LayoutPanels,
  server: Server,
  database: Database,
  wrench: Wrench,
  lightbulb: Lightbulb,
  cap: GraduationCap,
};

export function BrandIcon({ name, size = 24 }: { name: BrandName; size?: number }) {
  const brand: Brand = brands[name];
  const style = {
    "--brand": brand.color ?? "currentColor",
    "--brand-light": brand.colorLight ?? "currentColor",
  } as CSSProperties;

  return (
    <svg
      className="brand-icon"
      width={size}
      height={size}
      viewBox={brand.viewBox ?? "0 0 24 24"}
      fill="currentColor"
      style={style}
      aria-hidden="true"
    >
      {/* Sits behind the JS mark's cut-out letters so they stay dark on either theme. */}
      {name === "javascript" && <rect x="0.5" y="0.5" width="23" height="23" rx="1" fill="#17130a" />}
      {brand.path ? <path d={brand.path} /> : null}
      {brand.parts?.map((part) =>
        part.outline ? (
          <path key={part.d} d={part.d} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path key={part.d} d={part.d} fill={part.fill} />
        ),
      )}
    </svg>
  );
}
