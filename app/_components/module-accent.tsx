"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionEnabled } from "./motion-settings";

export function ModuleAccent() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);
  return <div ref={ref} className="module-accent" data-in-view={visible} aria-hidden="true" />;
}
