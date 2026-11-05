"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 3600;

export function RotatingTitle({ titles }: { titles: string[] }) {
  // `previous` lets only the outgoing title play its exit animation.
  const [{ current, previous }, setIndex] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setIndex(({ current }) => ({ current: (current + 1) % titles.length, previous: current }));
    }, HOLD_MS);
    return () => clearInterval(timer);
  }, [titles.length]);

  return (
    <p className="rt">
      <span className="rt-mark" aria-hidden="true" />
      <span className="sr-only">{titles.join(" and ")}</span>
      <span className="rt-stack" aria-hidden="true">
        {titles.map((title, index) => (
          <span
            key={title}
            className="rt-line"
            data-state={index === current ? "in" : index === previous ? "out" : "idle"}
          >
            {title}
          </span>
        ))}
      </span>
    </p>
  );
}
