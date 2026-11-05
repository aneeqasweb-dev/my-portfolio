import type { CSSProperties, ReactNode } from "react";

/** Spreads onto an element to fade it in on scroll. `order` staggers siblings. */
export const reveal = (order = 0) => ({
  "data-reveal": "",
  style: { "--d": order } as CSSProperties,
});

export function SectionHeading({
  index,
  title,
  accent,
  description,
  action,
  centered,
}: {
  index: string;
  title: string;
  /** The end of the heading, picked out in amber. */
  accent?: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
}) {
  return (
    <header className={`sec-head ${centered ? "sec-head--center" : ""}`} {...reveal(0)}>
      <p className="sec-index" aria-hidden="true">
        {index}
      </p>
      <h2 className="sec-title">
        {title} {accent ? <span className="sec-accent">{accent}</span> : null}
      </h2>
      {description ? <p className="sec-desc">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </header>
  );
}
