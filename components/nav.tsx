"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/content/portfolio";
import { Close, Download, Menu } from "./icons";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const READING_LINE_PX = 190;
const JUMP_SETTLE_MS = 200;

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll spy: the active section is the last one whose top has passed a line just
  // under the header, or the final section once the page can't scroll any further.
  // A clicked link stays highlighted until the jump ends and the visitor scrolls again,
  // because the last sections are short enough that a jump can stop at the page bottom.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
    let frame = 0;
    let clicked: HTMLElement | undefined;
    let jumpEnded = false;
    let jumpTimer = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const current =
        clicked ??
        (atBottom
          ? sections.at(-1)
          : sections.findLast((section) => section.getBoundingClientRect().top <= READING_LINE_PX));
      if (current) setActive(current.id);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const waitForJumpEnd = (delay: number) => {
      window.clearTimeout(jumpTimer);
      jumpTimer = window.setTimeout(() => {
        jumpEnded = true;
      }, delay);
    };

    const onScroll = () => {
      if (clicked) {
        if (jumpEnded) clicked = undefined;
        else waitForJumpEnd(JUMP_SETTLE_MS);
      }
      schedule();
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      clicked = sections.find((section) => section.id === id);
      jumpEnded = false;
      waitForJumpEnd(JUMP_SETTLE_MS * 2);
      schedule();
    };

    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(jumpTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Slides the underline to the active link, including after a resize or font swap.
  useEffect(() => {
    const list = linksRef.current;
    if (!list) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>("[aria-current]");
      if (!link) return;
      list.style.setProperty("--x", `${link.offsetLeft}px`);
      list.style.setProperty("--w", `${link.offsetWidth}px`);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="site-nav" data-scrolled={scrolled || menuOpen || undefined}>
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#home" className="flex min-h-11 items-center gap-2.5 rounded-lg font-display font-semibold tracking-tight" aria-label={`${profile.fullName}, back to top`}>
          <Logo />
          <span className="text-[0.98rem]">{profile.fullName}</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul ref={linksRef} className="nav-links flex items-center">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-indicator" aria-hidden="true" />
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-primary btn-sm hidden sm:inline-flex" data-magnetic>
            Resume <Download size={16} />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-[var(--surface-2)] shadow-[inset_0_0_0_1px_var(--line)] xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu mx-4 rounded-3xl p-3 sm:mx-6 xl:hidden"
        data-open={menuOpen}
      >
        <ul className="grid">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded-2xl px-4 py-3 font-medium hover:bg-[var(--surface-2)] aria-[current]:text-[var(--accent-ink)]"
                aria-current={active === item.id ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--line)] px-1 pt-3 sm:hidden">
          <ThemeToggle />
          <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-ghost btn-sm">
            Resume <Download size={16} />
          </a>
        </div>
      </div>

      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
