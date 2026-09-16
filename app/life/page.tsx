/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation and local assets. */
import { ArrowRight, Clapperboard, BookOpen, MapPin, Footprints } from "lucide-react";
import { AmbientScene } from "../_components/ambient-scene";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { lifeCategories } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
import { FieldHighlights, FieldImage } from "../_components/field-notes";
import { PortfolioSection } from "../_components/portfolio";
import { getFieldNote } from "../_data/field-notes";

export const metadata = createFixedPageMetadata({path:"/life",title:"生活记录｜闫哲祯",description:"长跑、科幻阅读、城市观察、摄影与动画，构成研究之外的闫哲祯。"});
const icons = [Footprints,BookOpen,MapPin,Clapperboard];

export default function LifePage() {
  return (
    <main id="main-content" className="life-home" tabIndex={-1}>
      <section className="life-hero" aria-labelledby="life-title">
        <Breadcrumbs items={[{label:"首页",href:"/"},{label:"生活记录"}]} />
        <div className="life-hero__inner"><div className="life-hero__copy"><h1 id="life-title">把日子，<span>过成具体的喜欢。</span></h1><p>看一场现场，沿着海岸散步，<br />也去天文馆，把目光投向更远的地方。</p><a href="#life-scenes">翻开日常 <ArrowRight aria-hidden="true" /></a></div><aside className="life-hero__caption">从大连到上海，<br />从西湖的红叶到青岛的海，<br />把喜欢的风景留在镜头里。<small>让兴趣，<br />成为亲自经历过的事。</small></aside><figure><div className="life-media-window"><FieldImage id="qingdao-sea" priority sizes="(max-width: 760px) 90vw, 72vw" /><AmbientScene kind="life" /></div><figcaption>青岛 · 2026 年 6 月 · 我的旅行照片</figcaption></figure></div>
      </section>
      <section className="life-index section-shell" id="life-index" aria-labelledby="life-index-title"><header className="u-reveal"><h2 id="life-index-title">研究之外，保持具体</h2><p>读过的作品、参与过的活动和走过的城市，让兴趣成为具体的经历。</p></header><div className="life-index__rows u-reveal">{lifeCategories.map((category,index)=>{const Icon=icons[index];return <a href={`/life/${category.slug}`} key={category.slug} data-navigation="document"><span><Icon size={21} aria-hidden="true" /></span><h3>{category.title}</h3><p>{category.summary}</p><ArrowRight aria-hidden="true" /></a>;})}</div></section>
      <PortfolioSection id="life-scenes" code="MY PHOTO JOURNAL" title="那些亲自到过的现场" intro="一组照片，一段当时的心情。天文、旅行、音乐和共同的兴趣，在这里留下具体的时间与地点。"><FieldHighlights notes={["astronomy-and-dishui", "qingdao-coast", "milet-first-live", "jiaxing-waterways", "wuthering-waves-live", "bilibili-anniversary"].map(getFieldNote)} /></PortfolioSection>
      <section className="life-anime-entry section-shell u-reveal" aria-label="生活中的动画"><a className="beyond-anime" href="/life/animation" data-navigation="document"><picture><source media="(max-width: 760px)" srcSet="/images/celestial/anime-coast-768.webp" /><img src="/images/celestial/anime-coast.webp" width="1600" height="916" loading="lazy" alt="黄昏海岸上的灯火与远方列车，原创动画场景插画" /></picture><div className="beyond-anime__copy"><span>生活里的一束光</span><h3>还有那些，想再看一遍的故事。</h3><p>动画、原文影评与多年积累的观看记录。</p><b>进入动画观测站 <ArrowRight aria-hidden="true" /></b></div></a><p className="image-provenance">原创海岸场景为 AI 生成插画。</p></section>
    </main>
  );
}
