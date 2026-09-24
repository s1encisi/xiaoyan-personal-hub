"use client";
/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- Local portfolio media and document navigation. */

import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionEnabled } from "../motion-settings";
import { useEffectSurface } from "../effects/use-effect-surface";
import { SocialLinks } from "../social-links";
import ScrollExpand from "../react-bits-v2/ScrollExpand";

const viewedKey = "xiaoyan:opening:p3r-1";
const ease = [0.22, 1, 0.36, 1] as const;
const directions = [
  { name: "机器学习", code: "LEARN", text: "从有限样本里建立预测，理解模型如何得到答案。", href: "/projects/wastewater-energy-tabpfn", link: "阅读 TabPFN 研究" },
  { name: "强化学习", code: "DECIDE", text: "在目标与约束之间，学习可以检验的决策策略。", href: "/projects/safe-reinforcement-learning", link: "阅读策略学习研究" },
  { name: "智能体工程", code: "ACT", text: "把工具调用接到真实任务，让执行结果有据可查。", href: "/projects/reliable-commerce-agents", link: "阅读可靠执行案例" },
];

function BackgroundFilm() {
  const { ref, active } = useEffectSurface();
  return <div ref={ref} className="p3r-background" aria-hidden="true">
    <img src="/images/home-p3r/hero-1920.webp" srcSet="/images/home-p3r/hero-960.webp 960w, /images/home-p3r/hero-1920.webp 1920w" sizes="100vw" alt="P3R 蓝色水面与人物背景" width={1920} height={1080} fetchPriority="high" />
    {active && <video src="/media/p3r/loop.mp4" poster="/images/home-p3r/hero-1920.webp" autoPlay loop muted playsInline preload="metadata" onError={event => { event.currentTarget.hidden = true; }} />}
  </div>;
}

function Opening({ onFinish }: { onFinish: () => void }) {
  const layer = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    const previousScroll = { left: window.scrollX, top: window.scrollY };
    const background = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== layer.current);
    const inertBefore = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.opening = "playing";
    window.dispatchEvent(new Event("xiaoyan-opening-change"));
    skip.current?.focus({ preventScroll: true });
    const start = window.setTimeout(() => {
      const video = film.current;
      if (video) { video.playbackRate = 1.35; void video.play().catch(onFinish); }
    }, 500);
    // A stalled, missing or blocked video can never trap the visitor.
    const deadline = window.setTimeout(onFinish, 6500);
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onFinish(); }
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    };
    const visibility = () => { if (document.hidden) onFinish(); };
    window.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.clearTimeout(start); window.clearTimeout(deadline);
      window.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      document.body.style.overflow = oldOverflow;
      background.forEach((el, i) => { el.inert = inertBefore[i]; });
      delete document.documentElement.dataset.opening;
      window.dispatchEvent(new Event("xiaoyan-opening-change"));
      window.scrollTo({ ...previousScroll, behavior: "instant" });
      const destination = previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected ? previousFocus : document.getElementById("main-content");
      destination?.focus({ preventScroll: true });
    };
  }, [onFinish]);
  return <m.div ref={layer} className="p3r-opening" role="dialog" aria-modal="true" aria-labelledby="p3r-opening-title" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
    <video ref={film} src="/media/p3r/opening.mp4" muted playsInline preload="auto" aria-hidden="true" onEnded={onFinish} onError={onFinish} />
    <m.div className="p3r-opening__wave" aria-hidden="true" initial={{ y: "-16%" }} animate={{ y: "115%" }} transition={{ duration: 1.65, delay: 0.15, ease }}><svg viewBox="0 0 1440 180" preserveAspectRatio="none"><path opacity=".3" d="M0 45C250 130 370 0 620 24S1010 85 1220 25S1380 35 1440 20V180H0Z" /><path opacity=".55" d="M0 70C250 0 410 90 660 65S1020 10 1230 65S1360 85 1440 55V180H0Z" /><path d="M0 105C220 185 330 35 560 80S990 165 1180 95S1350 55 1440 85V180H0Z" /></svg></m.div>
    <m.div className="p3r-opening__thought" initial={{ opacity: 0, y: 18 }} animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -15] }} transition={{ duration: 2.3, times: [0, 0.22, 0.72, 1], delay: 0.55 }}><p>LET IDEAS TAKE SHAPE.</p><span>从好奇出发，让想法成为现实。</span></m.div>
    <m.div className="p3r-opening__identity" initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.8, duration: 0.7, ease }}><span>ZHEZHEN YAN</span><h2 id="p3r-opening-title">闫哲祯</h2><p>机器学习 · 强化学习 · 智能体工程</p></m.div>
    <button ref={skip} className="p3r-opening__skip" type="button" onClick={onFinish}>跳过开场 <ArrowRight size={18} /><kbd>Esc</kbd></button>
    <m.div className="p3r-opening__progress" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.95, ease: "linear" }} />
  </m.div>;
}

function OpeningControl() {
  const enabled = useMotionEnabled();
  const [playing, setPlaying] = useState(false);
  const attempted = useRef(false);
  const finish = useCallback(() => setPlaying(false), []);
  useEffect(() => {
    if (!enabled || attempted.current) return;
    const frame = requestAnimationFrame(() => {
      if (attempted.current) return;
      attempted.current = true;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (location.hash || window.scrollY > 80 || navigation?.type === "back_forward" || document.querySelector(".mobile-navigation-shell.is-open, .mega-navigation")) return;
      try { if (sessionStorage.getItem(viewedKey)) return; sessionStorage.setItem(viewedKey, "seen"); } catch { /* In-memory guard still applies. */ }
      setPlaying(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [enabled]);
  return <><button className="p3r-replay" type="button" disabled={!enabled} onClick={() => setPlaying(true)} title={enabled ? "重播开场" : "开启动态效果后可重播"}><Play size={14} />重播开场</button>{enabled && createPortal(<LazyMotion features={domAnimation} strict><AnimatePresence>{playing && <Opening onFinish={finish} />}</AnimatePresence></LazyMotion>, document.body)}</>;
}

export function P3RHero() {
  const [selected, setSelected] = useState(2);
  const direction = directions[selected];
  return <section className="p3r-hero" aria-labelledby="celestial-title">
    <BackgroundFilm />
    <div className="p3r-hero__content">
      <p className="p3r-eyebrow">闫哲祯 <span>同济大学 · 硕士研究生</span></p>
      <div className="p3r-wordmark" aria-hidden="true"><span>ZHEZHEN</span><strong>YAN<span className="p3r-wordmark__line" /></strong></div>
      <h1 id="celestial-title">让模型学会理解，<br />让智能走向行动。</h1>
      <p className="p3r-hero__intro">关注机器学习、强化学习与智能体工程，<br />把模型、工具与真实任务连接起来。</p>
      <div className="p3r-hero__actions"><a href="#research-agenda" className="p3r-button">探索我的项目 <ArrowDown size={18} /></a><a href="/about/profile" className="p3r-text-link">认识我 <ArrowUpRight size={18} /></a></div>
      <div className="p3r-directions"><div className="p3r-directions__buttons" role="group" aria-label="选择研究方向">{directions.map((item, i) => <button key={item.code} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}><span>{item.code}</span>{item.name}</button>)}</div><div className="p3r-directions__detail" aria-live="polite"><p>{direction.text}</p><a href={direction.href}>{direction.link} <ArrowUpRight size={15} /></a></div></div>
    </div>
    <div className="p3r-hero__rail"><SocialLinks /><div className="p3r-hero__controls"><OpeningControl /><a href="#ai-practice">SCROLL <ArrowDown size={15} /></a></div></div>
    <a className="p3r-credit" href="https://asia.sega.com/p3r/cht/" target="_blank" rel="noopener noreferrer">背景 · PERSONA 3 RELOAD ©ATLUS / SEGA</a>
  </section>;
}

export function AgentFeature() {
  const { ref, enabled } = useEffectSurface();
  return <section ref={ref} className="p3r-agent-feature" aria-labelledby="agent-feature-title" data-effect="Scroll Expand" data-effect-active={enabled}>
    <ScrollExpand src="/images/home-p3r/stargazing-generated.png" imageWidth={1672} imageHeight={941} alt="深蓝星空下，一位站在草坡上的人抬手指向星光" enabled={enabled} useWindowScroll startWidth={92} startHeight={100} startRadius={0} endRadius={0} mediaZoom={1} scrollDistance={0.3} holdDistance={0} overlayScrim={0.08}>
      <div className="p3r-agent-feature__copy"><p>AGENT ENGINEERING / 智能体工程</p><h2 id="agent-feature-title">从一个想法，<br />走向真实的行动。</h2><p>让模型理解任务，让工具承担执行，<br />让每一次结果都可以核实。</p><a className="p3r-button" href="/projects/reliable-commerce-agents">探索智能体工程 <ArrowUpRight size={18} /></a></div>
    </ScrollExpand>
  </section>;
}
