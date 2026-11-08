"use client";

import { useEffect, useState } from "react";

const START_MS = 900; // waits for the hero to finish fading in
const TYPE_MS = 85;
const DELETE_MS = 45;
const HOLD_MS = 1900;
const GAP_MS = 450;
const SWAP_MS = 3600; // reduced motion: whole titles swap at this pace

/** Types each title out letter by letter, holds it, deletes it, then types the next. */
export function RotatingTitle({ titles }: { titles: string[] }) {
  const [{ index, length, typing }, setShown] = useState({ index: 0, length: 0, typing: false });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let letters = 0;
    let deleting = false;
    let timer = 0;

    const show = (isTyping: boolean) => setShown({ index: current, length: letters, typing: isTyping });
    const next = (delay: number) => {
      timer = window.setTimeout(step, delay);
    };

    function step() {
      const full = titles[current].length;

      if (reduceMotion) {
        letters = full;
        show(false);
        current = (current + 1) % titles.length;
        return next(SWAP_MS);
      }

      if (!deleting && letters < full) {
        letters += 1;
        show(true);
        next(TYPE_MS);
      } else if (!deleting) {
        deleting = true;
        show(false);
        next(HOLD_MS);
      } else if (letters > 0) {
        letters -= 1;
        show(true);
        next(DELETE_MS);
      } else {
        deleting = false;
        current = (current + 1) % titles.length;
        show(false);
        next(GAP_MS);
      }
    }

    next(reduceMotion ? 0 : START_MS);
    return () => window.clearTimeout(timer);
  }, [titles]);

  return (
    <p className="rt" data-typing={typing ? "" : undefined}>
      <span className="sr-only">{titles.join(" and ")}</span>
      <span className="rt-typed" aria-hidden="true">
        {titles[index].slice(0, length)}
        <span className="rt-caret" />
      </span>
      <span className="rt-static" aria-hidden="true">
        {titles[0]}
      </span>
    </p>
  );
}
