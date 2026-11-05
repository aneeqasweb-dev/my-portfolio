"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "./icons";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const readTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = () => "dark" as const;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  const choose = (next: Theme, event: MouseEvent<HTMLButtonElement>) => {
    if (next === theme) return;
    const root = document.documentElement;

    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage can be blocked; the theme still applies for this visit.
      }
    };

    const instant =
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant) return apply();

    // The new theme opens as a circle centred on the button that was pressed.
    const box = event.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${box.left + box.width / 2}px`);
    root.style.setProperty("--vt-y", `${box.top + box.height / 2}px`);
    document.startViewTransition(apply);
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme" data-value={theme}>
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        onClick={(event) => choose("light", event)}
      >
        <Sun size={17} />
      </button>
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        onClick={(event) => choose("dark", event)}
      >
        <Moon size={17} />
      </button>
    </div>
  );
}
