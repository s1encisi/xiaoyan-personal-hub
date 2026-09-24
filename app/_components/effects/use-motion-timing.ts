"use client";

import { useEffect, useState } from "react";

const defaults = { fast: 0.16, base: 0.28, slow: 0.52 };

/** Seconds for Motion/GSAP; CSS remains the source of the timing scale. */
export function useMotionTiming() {
  const [timing, setTiming] = useState(defaults);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const style = getComputedStyle(document.documentElement);
      const read = (key: keyof typeof defaults) => {
        const raw = style.getPropertyValue(`--motion-${key}`).trim();
        const value = Number.parseFloat(raw);
        return Number.isFinite(value) && value >= 0 ? value / (raw.endsWith("ms") ? 1000 : 1) : defaults[key];
      };
      setTiming({ fast: read("fast"), base: read("base"), slow: read("slow") });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return timing;
}
