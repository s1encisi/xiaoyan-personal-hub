"use client";
/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- Local assets and native document navigation. */
import { Component, lazy, Suspense, useState, useCallback, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffectSurface, useFinePointer } from "./use-effect-surface";
import { aiCapabilities, aiToolNames } from "../../_data/ai-practice";
import type { NotionChapter } from "../../_data/notion-library";
import "./effects.css";

const Galaxy = lazy(() => import("../react-bits-v2/Galaxy"));
const GlowCursor = lazy(() => import("../react-bits-v2/GlowCursor"));
const MaskedHeading = lazy(() => import("../react-bits-v2/MaskedHeading"));
const ParticleText = lazy(() => import("../react-bits-v2/ParticleText"));
const LogoLoop = lazy(() => import("../react-bits-v2/LogoLoop"));
import MagicBento from "../react-bits-v2/MagicBento";
const ScrollExpand = lazy(() => import("../react-bits-v2/ScrollExpand"));
const PixelSwap = lazy(() => import("../react-bits-v2/PixelSwap"));
const ClickSpark = lazy(() => import("../react-bits-v2/ClickSpark"));
const Strands = lazy(() => import("../react-bits-v2/Strands"));
const DepthCarousel = lazy(() => import("../react-bits-v2/DepthCarousel"));
const DriftWall = lazy(() => import("../react-bits-v2/DriftWall"));
const OptionWheel = lazy(() => import("../react-bits-v2/OptionWheel"));

class EffectBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}
function SafeEffect({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return <EffectBoundary fallback={fallback}><Suspense fallback={fallback}>{children}</Suspense></EffectBoundary>;
}

export function CosmosVisual() {
  const { ref, active } = useEffectSurface();
  return <div ref={ref} className="ai-cosmos" data-effect="Galaxy" data-effect-active={active} aria-hidden="true"><picture><source media="(max-width:760px)" srcSet="/images/ai/cosmos-768.webp" /><img src="/images/ai/cosmos-1672.webp" srcSet="/images/ai/cosmos-1200.webp 1200w, /images/ai/cosmos-1672.webp 1672w" sizes="100vw" width={1672} height={941} alt="深蓝星云、光尘与遥远的行星" fetchPriority="high" /></picture>{active && <SafeEffect><div className="ai-cosmos__stars"><Galaxy density={0.48} glowIntensity={0.12} starSpeed={0.07} speed={0.15} twinkleIntensity={0.12} rotationSpeed={0.015} mouseInteraction={false} mouseRepulsion={false} transparent /></div></SafeEffect>}</div>;
}
export function HeroHeading() {
  const { ref, active } = useEffectSurface();
  const fallback = <h1 id="celestial-title" className="ai-home-heading">让模型学会理解，<br /><span>让智能走向行动。</span></h1>;
  return <div ref={ref} data-effect="Masked Heading" data-effect-active={active} className="ai-heading-wrap">{active ? <SafeEffect fallback={fallback}><MaskedHeading id="celestial-title" tag="h1" text="让模型学会理解， 让智能走向行动。" src="/images/ai/learning-1200.webp" align="left" reveal="rise" trigger="mount" duration={0.85} parallax={5} drift={5} brightness={1.7} saturation={0.35} textScale={0.12} weight={600} className="ai-home-heading" /></SafeEffect> : fallback}</div>;
}
export function HeroGlow({ children }: { children: ReactNode }) {
  const { ref, active: moving } = useEffectSurface();
  const finePointer = useFinePointer();
  const active = moving && finePointer;
  return <div ref={ref} className="ai-glow-stage" data-effect="Glow Cursor" data-effect-active={active}>{active ? <SafeEffect fallback={<div>{children}</div>}><GlowCursor enabled className="hero-glow-render" color="#90d5f4" secondaryColor="#b3a0ef" trailLength={18} trailWidth={9} glowIntensity={0.4} brightness={0.7} opacity={0.24} maxDevicePixelRatio={1} idleTimeout={350}>{children}</GlowCursor></SafeEffect> : <div className="hero-glow-static">{children}</div>}</div>;
}
export function OpeningParticleName({ text }: { text: string }) {
  return <div className="opening-particles" data-effect="Particle Text"><SafeEffect fallback={<span>{text}</span>}><ParticleText text={text} fontSize="clamp(60px, 13vw, 156px)" fontWeight={500} color="#edf5ff" highlightColor="#95cfea" density={5} particleSize={1.5} gatherDuration={1.25} scatter={1.2} stagger={0.18} idleDrift={0.25} pointerRepel={0} glow={false} /></SafeEffect></div>;
}
export function MotionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, enabled, active } = useEffectSurface();
  return <motion.div ref={ref} className={className} initial={false} animate={{ opacity: enabled && !active ? 0.72 : 1, y: enabled && !active ? 14 : 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function ToolLoop() {
  const { ref, active } = useEffectSurface();
  const fallback = <ul className="ai-tool-static">{aiToolNames.map(name => <li key={name}>{name}</li>)}</ul>;
  return <div ref={ref} data-effect="Logo Loop" data-effect-active={active} className="ai-tools-loop">{active ? <SafeEffect fallback={fallback}><LogoLoop logos={aiToolNames.map(name => ({ node: <span className="ai-tool-wordmark">{name}</span>, title: name }))} logoHeight={30} gap={64} speed={30} pauseOnHover fadeOut fadeOutColor="#081326" ariaLabel="熟练使用的开发与智能体工具" /></SafeEffect> : fallback}</div>;
}
export function CapabilitiesBento() {
  const { ref, active } = useEffectSurface();
  const fallback = <div className="ai-capability-static">{aiCapabilities.map(c => <article key={c.title}><small>{c.label}</small><h3><a href={c.href}>{c.title}</a></h3><p>{c.description}</p></article>)}</div>;
  return <div ref={ref} data-effect="Magic Bento" data-effect-active={active} className="ai-bento"><SafeEffect fallback={fallback}><MagicBento items={aiCapabilities} textAutoHide={false} enableStars={false} enableSpotlight={active} enableBorderGlow={active} enableTilt={active} disableAnimations={!active} enableMagnetism={false} clickEffect={false} glowColor="104, 179, 224" spotlightRadius={220} /></SafeEffect></div>;
}
export function ResearchExpand() {
  const { ref, enabled } = useEffectSurface();
  return <div ref={ref} className="ai-expand" data-effect="Scroll Expand" data-effect-active={enabled}><SafeEffect fallback={<img src="/images/ai/decisions-1672.webp" width={1672} height={941} alt="光路穿越山脊与透明曲面的决策空间意象" />}><ScrollExpand src="/images/ai/decisions-1672.webp" alt="光路穿越山脊与透明曲面的决策空间意象" enabled={enabled} useWindowScroll startWidth={86} startHeight={82} startRadius={24} endRadius={0} mediaZoom={1.12} scrollDistance={0.55} holdDistance={0} overlayScrim={0.2}><div className="ai-expand__copy"><p>强化学习与多目标决策</p><h2>在可能性之间，<br />找到可行的行动。</h2><a href="/projects/safe-reinforcement-learning">查看策略学习研究 <ArrowUpRight size={20} /></a></div></ScrollExpand></SafeEffect></div>;
}
export function ProjectImageSwap() {
  const { ref, active } = useEffectSurface();
  const [showResult, setShowResult] = useState(false);
  const first = <img src="/images/projects/commerce-pending.webp" width={1280} height={720} alt="电商合成演示：退货申请等待审批" loading="lazy" />;
  const second = <img src="/images/projects/commerce-completed.webp" width={1280} height={720} alt="电商合成演示：已确认的订单与退货回执" loading="lazy" />;
  const button = <button type="button" aria-pressed={showResult} onClick={() => setShowResult(v => !v)}>{showResult ? "查看等待审批" : "查看确认回执"}<ArrowRight size={18} /></button>;
  return <div ref={ref} className="project-image-swap" data-effect="Pixel Swap" data-effect-active={active}>{active ? <SafeEffect fallback={showResult ? second : first}><PixelSwap firstContent={first} secondContent={second} trigger="manual" active={showResult} pattern="left-to-right" pixelSize={64} duration={0.65} pixelDuration={0.3} aspectRatio="16 / 9" /></SafeEffect> : <div className="project-image-swap__static">{showResult ? second : first}</div>}<div className="project-image-swap__action" data-effect="Click Spark" data-effect-active={active}>{active ? <SafeEffect fallback={button}><ClickSpark sparkColor="#60a8d3" sparkCount={7} sparkRadius={20} duration={360}>{button}</ClickSpark></SafeEffect> : button}<p>{showResult ? "确认后显示业务回执" : "审批发生在业务写入之前"} · 本地合成演示</p></div></div>;
}
export function TopicStrands() {
  const { ref, active } = useEffectSurface();
  return <div ref={ref} className="topic-strands" data-effect="Strands" data-effect-active={active} aria-hidden="true">{active && <SafeEffect><Strands colors={["#6facd4", "#a4a0df", "#d7e6ef"]} count={5} speed={0.12} amplitude={0.65} thickness={0.025} glow={0.25} intensity={0.55} opacity={0.55} /></SafeEffect>}</div>;
}
export type GalleryItem = { image: string; title: string; href: string };
export function StoryDepthCarousel({ items }: { items: GalleryItem[] }) {
  const { ref, active } = useEffectSurface();
  const [index, setIndex] = useState(0);
  const change = useCallback((next: number) => setIndex(next), []);
  const fallback = <div className="effect-gallery-static">{items.map(item => <a key={item.href} href={item.href}><img src={item.image} alt={item.title} width={400} height={570} loading="lazy" /><span>{item.title}</span></a>)}</div>;
  return <div ref={ref} className="story-depth" data-effect="Depth Carousel" data-effect-active={active}>{active ? <SafeEffect fallback={fallback}><div className="story-depth__stage"><DepthCarousel items={items.map(item => ({ image: item.image, alt: item.title }))} cardWidth={240} cardHeight={342} depth={130} spread={220} tilt={-9} blur={0} autoplay={false} onChange={change} showControls showIndicators /></div></SafeEffect> : fallback}<a className="story-depth__link" href={items[index].href}>阅读《{items[index].title}》<ArrowUpRight size={18} /></a></div>;
}
export function LifeDriftWall({ items }: { items: GalleryItem[] }) {
  const { ref, active } = useEffectSurface();
  const fallback = <div className="life-wall-static">{items.slice(0,6).map(item => <a key={item.image} href={item.href}><img src={item.image} alt={item.title} width={600} height={400} loading="lazy" /></a>)}</div>;
  return <div ref={ref} className="life-drift" data-effect="Drift Wall" data-effect-active={active}>{active ? <SafeEffect fallback={fallback}><DriftWall items={items} columns={4} tileWidth={245} tileHeight={170} gap={16} tilt={8} turn={-6} speed={17} parallax={0.18} pauseOnHover grayscale={false} dim={0.9} fade={0.2} overlayColor="rgba(0,0,0,0)" radius={6} /></SafeEffect> : fallback}</div>;
}
export function KnowledgeWheel({ chapters }: { chapters: NotionChapter[] }) {
  const { ref, active } = useEffectSurface();
  const [index, setIndex] = useState(0);
  const change = useCallback((next: number) => setIndex(next), []);
  const selected = chapters[index];
  const fallback = <div className="knowledge-wheel-static">{chapters.map((chapter, i) => <a key={chapter.slug} href={`#${chapter.slug}`} aria-current={index === i ? "true" : undefined} onFocus={() => setIndex(i)}>{chapter.title}</a>)}</div>;
  return <div ref={ref} className="knowledge-wheel" data-effect="Option Wheel" data-effect-active={active}><div className="knowledge-wheel__control">{active ? <SafeEffect fallback={fallback}><OptionWheel items={chapters.map(c => c.title)} defaultSelected={index} onChange={change} fontSize={1.5} activeColor="#e8f4ff" textColor="#a4bbcc" curve={0.45} tilt={4} blur={0.45} minOpacity={0.3} inset={24} loop soundVolume={0} /></SafeEffect> : fallback}</div><div className="knowledge-wheel__preview"><span>沿着一个主题继续</span><h2>{selected.title}</h2><p>{selected.summary}</p><a href={`#${selected.slug}`}>进入章节导引 <ArrowRight size={18} /></a></div></div>;
}
