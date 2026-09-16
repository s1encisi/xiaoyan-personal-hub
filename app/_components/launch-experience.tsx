"use client";
// Reuses the responsive home artwork for the opening sequence.

import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionEnabled } from "./motion-settings";
import { siteInfo } from "../_data/site";
import "./launch-experience.css";

const viewedKey = "xiaoyan:opening:orbit-1";
const durationMs = 3200;
const cinematicEase = [0.22, 1, 0.36, 1] as const;

function LaunchFilm({ onFinish }: { onFinish: () => void }) {
  const layer = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    const previousScroll = { left: window.scrollX, top: window.scrollY };
    const background = Array.from(document.body.children).filter((element): element is HTMLElement => element instanceof HTMLElement && element !== layer.current);
    const previousInert = background.map(element => element.inert);
    for (const element of background) element.inert = true;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.opening = "playing";
    window.dispatchEvent(new Event("xiaoyan-opening-change"));
    skip.current?.focus({ preventScroll: true });

    const timer = window.setTimeout(onFinish, durationMs);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onFinish(); }
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    };
    const handleVisibility = () => { if (document.hidden) onFinish(); };
    window.addEventListener("keydown", handleKey);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.body.style.overflow = oldOverflow;
      window.scrollTo({ ...previousScroll, behavior: "instant" });
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      delete document.documentElement.dataset.opening;
      window.dispatchEvent(new Event("xiaoyan-opening-change"));
      const destination = previousFocus instanceof HTMLElement && previousFocus !== document.body && !previousFocus.matches(":disabled") ? previousFocus : document.getElementById("main-content");
      destination?.focus({ preventScroll: true });
    };
  }, [onFinish]);

  return <m.div ref={layer} className="launch-sequence" role="dialog" aria-modal="true" aria-labelledby="launch-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}>
    <div className="launch-space" aria-hidden="true">
      <m.div className="launch-aperture" initial={{ clipPath: "circle(6% at 72% 50%)" }} animate={{ clipPath: "circle(140% at 72% 50%)" }} transition={{ duration: 1.65, ease: cinematicEase }}>
        <m.img src="/images/celestial/celestial-planet.webp" srcSet="/images/celestial/celestial-planet-768.webp 768w, /images/celestial/celestial-planet.webp 1586w" sizes="100vw" width="1586" height="992" alt="" fetchPriority="high" onError={onFinish} initial={{ scale: 1.85, opacity: 0.4 }} animate={{ scale: [1.85, 1.16, 1], opacity: [0.4, 1, 0.76] }} transition={{ duration: 3.15, times: [0, 0.55, 1], ease: cinematicEase }} />
      </m.div>
      <div className="launch-shade" />
      <m.div className="launch-light" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1.25], opacity: [0, 0.9, 0] }} transition={{ duration: 2, times: [0, 0.4, 1], ease: cinematicEase }} />
    </div>
    <div className="launch-caption"><span>RESEARCH / ENGINEERING / LIFE</span><span>个人星图</span></div>
    <div className="launch-identity">
      <m.p className="launch-eyebrow" initial={{ opacity: 0, y: 6 }} animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -6] }} transition={{ delay: 0.35, duration: 2.65, times: [0, 0.18, 0.85, 1] }}>以好奇为起点</m.p>
      <p id="launch-name" className="launch-name" aria-label={siteInfo.name}>{Array.from(siteInfo.name).map((letter, index) => <span className="launch-letter-mask" key={index} aria-hidden="true"><m.span initial={{ y: "105%" }} animate={{ y: ["105%", "0%", "0%", "-105%"] }} transition={{ delay: 0.45 + index * 0.08, duration: 2.55 - index * 0.08, times: [0, 0.22, 0.86, 1], ease: cinematicEase }}>{letter}</m.span></span>)}</p>
      <m.p className="launch-english" initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }} transition={{ delay: 0.75, duration: 2.2, times: [0, 0.2, 0.86, 1] }}>{siteInfo.englishName}</m.p>
    </div>
    <div className="launch-bottom"><p>从复杂过程，到可信决策。</p><button ref={skip} type="button" onClick={onFinish}>跳过开场 <ArrowRight size={17} aria-hidden="true" /><kbd>Esc</kbd></button></div>
    <m.div className="launch-timeline" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: durationMs / 1000, ease: "linear" }} />
  </m.div>;
}

export function LaunchExperience() {
  const enabled = useMotionEnabled();
  const [playing, setPlaying] = useState(false);
  const attempted = useRef(false);
  const finish = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    if (!enabled || attempted.current) return;
    const frame = window.requestAnimationFrame(() => {
      if (attempted.current) return;
      attempted.current = true;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (location.hash || window.scrollY > 80 || navigation?.type === "back_forward" || document.querySelector(".mobile-navigation-shell.is-open, .mega-navigation")) return;
      try {
        if (sessionStorage.getItem(viewedKey)) return;
        sessionStorage.setItem(viewedKey, "seen");
      } catch { /* The in-memory guard still limits automatic playback to this page mount. */ }
      setPlaying(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [enabled]);

  return <>
    <button className="launch-replay" type="button" disabled={!enabled} onClick={() => setPlaying(true)} title={enabled ? "重播星空开场" : "开启动态效果后可重播"}><Play size={14} aria-hidden="true" />重播开场</button>
    {enabled && createPortal(<LazyMotion features={domAnimation} strict><AnimatePresence>{playing && <LaunchFilm key="opening" onFinish={finish} />}</AnimatePresence></LazyMotion>, document.body)}
  </>;
}
