import { Fragment, type CSSProperties, type ReactNode } from "react";

/** Spreads onto an element to fade it in on scroll. `order` staggers siblings. */
export const reveal = (order = 0) => ({
  "data-reveal": "",
  style: { "--d": order } as CSSProperties,
});

/**
 * Splits text into letters that slide in from the left, one after another, when the
 * nearest `data-reveal` parent scrolls into view. `start` continues the stagger from
 * earlier text. Screen readers get the plain text.
 */
export function Letters({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ").map((word, index, all) => ({
    word,
    offset: start + all.slice(0, index).reduce((sum, previous) => sum + previous.length, 0),
  }));

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, offset }, index) => (
          <Fragment key={index}>
            {index > 0 ? " " : null}
            <span className="ltr-word">
              {Array.from(word).map((letter, position) => (
                <span key={position} className="ltr" style={{ "--i": offset + position } as CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

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
        <Letters text={title} />{" "}
        {accent ? (
          <span className="sec-accent">
            <Letters text={accent} start={title.replace(/ /g, "").length} />
          </span>
        ) : null}
      </h2>
      {description ? <p className="sec-desc">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </header>
  );
}
