"use client";

import { useEffect } from "react";

/**
 * Page-wide motion, run from one place so the sections can stay Server Components:
 *  - [data-reveal]   fades and rises in when scrolled into view
 *  - [data-card]     has a spotlight that follows the pointer
 *  - [data-tilt]     tilts in 3D towards the pointer (value = max degrees)
 *  - [data-magnetic] leans gently towards the pointer
 *  - [data-scene]    the hero's 3D code symbol, which turns to follow the pointer
 *
 * Sections off screen also get [data-offscreen], which pauses their CSS animations.
 */
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    // Tells the inline script in layout.tsx that reveals are being handled.
    root.dataset.fxReady = "true";

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
      }
    });
    document.querySelectorAll("section[id], footer").forEach((el) => visibility.observe(el));

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = document.querySelector<HTMLElement>("[data-scene]");

    let activeCard: HTMLElement | null = null;
    let activeMagnet: HTMLElement | null = null;
    let lastEvent: PointerEvent | null = null;
    let frame = 0;

    const clearCard = (el: HTMLElement | null) => {
      if (!el) return;
      el.removeAttribute("data-hover");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const clearMagnet = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    const trackSpotlight = (el: HTMLElement, event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.setAttribute("data-hover", "");

      if (el.dataset.tilt && !reducedMotion.matches) {
        const max = Number(el.dataset.tilt) || 5;
        el.style.setProperty("--ry", `${(x / box.width - 0.5) * 2 * max}deg`);
        el.style.setProperty("--rx", `${(y / box.height - 0.5) * -2 * max}deg`);
      }
    };

    const update = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;

      const card = target?.closest<HTMLElement>("[data-card]") ?? null;
      if (card !== activeCard) clearCard(activeCard);
      activeCard = card;
      if (card) trackSpotlight(card, event);

      if (reducedMotion.matches) return;

      const magnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet !== activeMagnet) clearMagnet(activeMagnet);
      activeMagnet = magnet;
      if (magnet) {
        const box = magnet.getBoundingClientRect();
        magnet.style.setProperty("--tx", `${(event.clientX - box.left - box.width / 2) * 0.16}px`);
        magnet.style.setProperty("--ty", `${(event.clientY - box.top - box.height / 2) * 0.28}px`);
      }

      if (scene) {
        scene.style.setProperty("--px", ((event.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        scene.style.setProperty("--py", ((event.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      // Touch has no hover, so tilt and spotlight would only stick after a tap.
      if (event.pointerType !== "mouse" || !canHover.matches) return;
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointerLeave = () => {
      clearCard(activeCard);
      clearMagnet(activeMagnet);
      activeCard = activeMagnet = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect();
      visibility.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
