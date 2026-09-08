"use client";

import { useEffect } from "react";

export function ScrollRevealController() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!elements.length) return;

    const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionAllowed || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const viewportThreshold = window.innerHeight * 0.9;
    const pendingElements = elements.filter(
      (element) => element.getBoundingClientRect().top > viewportThreshold,
    );

    elements.forEach((element) => {
      if (pendingElements.includes(element)) element.classList.add("is-reveal-ready");
      else element.classList.add("is-visible");
    });

    if (!pendingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    pendingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
