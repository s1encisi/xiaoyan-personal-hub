"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionEnabled } from "./motion-settings";

export function HorizonScene() {
  const element = useRef<HTMLPictureElement>(null);
  const enabled = useMotionEnabled();
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(true);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const node = element.current;
    const visibility = () => setForeground(!document.hidden);
    const openingState = () => setOpening(document.documentElement.dataset.opening === "playing");
    visibility(); openingState();
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("xiaoyan-opening-change", openingState);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (node) observer.observe(node);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("xiaoyan-opening-change", openingState); };
  }, []);

  return <picture ref={element} className="celestial-hero__media horizon-scene" data-running={enabled && visible && foreground && !opening}>
    <source media="(max-width: 760px)" srcSet="/images/celestial/earth-horizon-960.webp" />
    <img src="/images/celestial/earth-horizon-1920.webp" srcSet="/images/celestial/earth-horizon-1920.webp 1920w, /images/celestial/earth-horizon-2560.webp 2560w" sizes="100vw" width="1920" height="1078" alt="国际空间站视角下，晨光沿着地球大气层展开" fetchPriority="high" />
  </picture>;
}
