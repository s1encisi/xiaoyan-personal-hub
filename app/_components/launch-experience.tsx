"use client";
// Reuses the responsive home artwork for the opening sequence.

import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionEnabled } from "./motion-settings";
import { OpeningParticleName } from "./effects/ai-effects";
import { siteInfo } from "../_data/site";
import "./launch-experience.css";

const viewedKey = "xiaoyan:opening:cosmos-3";
const durationMs = 4100;
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

  return <m.div ref={layer} className="launch-sequence launch-cosmos" role="dialog" aria-modal="true" aria-labelledby="launch-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
    <div className="launch-space" aria-hidden="true">
      <m.div className="launch-aperture" initial={{ clipPath: "circle(4% at 66% 45%)" }} animate={{ clipPath: "circle(125% at 66% 45%)" }} transition={{ duration: 1.7, ease: cinematicEase }}>
        <m.img src="/images/ai/cosmos-1672.webp" srcSet="/images/ai/cosmos-768.webp 768w, /images/ai/cosmos-1200.webp 1200w, /images/ai/cosmos-1672.webp 1672w" sizes="100vw" width="1672" height="941" alt="" fetchPriority="high" onError={onFinish} initial={{ scale: 1.18, y: "8%", rotate: -2, opacity: 0.4 }} animate={{ scale: 1.025, y: "0%", rotate: 0, opacity: 1 }} transition={{ duration: 3.45, ease: cinematicEase }} />
      </m.div>
      <div className="launch-shade" />
    </div>
    <div className="launch-caption"><span>MACHINE LEARNING / REINFORCEMENT LEARNING / AGENTS</span><span>FROM LEARNING TO ACTION</span></div>
    <div className="launch-identity">
      <m.p className="launch-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: [0, 1, 1], y: [12, 0, 0] }} transition={{ delay: 0.6, duration: 2.2, times: [0, 0.3, 1] }}>以好奇开始，让想法成为现实</m.p>
      <div id="launch-name" className="launch-name" aria-label={siteInfo.name}><OpeningParticleName text={siteInfo.name} /></div>
      <m.p className="launch-english" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.8 }}>{siteInfo.englishName}</m.p>
    </div>
    <div className="launch-bottom"><p>机器学习 · 强化学习 · 智能体工程</p><button ref={skip} type="button" onClick={onFinish}>跳过开场 <ArrowRight size={17} aria-hidden="true" /><kbd>Esc</kbd></button></div>
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
