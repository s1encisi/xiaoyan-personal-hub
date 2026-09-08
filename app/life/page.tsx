/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation and local assets. */
import { ArrowRight, Clapperboard, Coffee, MapPin, Utensils } from "lucide-react";
import { AmbientScene } from "../_components/ambient-scene";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { lifeCategories } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({path:"/life",title:"生活记录｜小闫",description:"关于动画、味道、咖啡、散步与日常好物，慢慢收集具体的喜欢。"});
const icons = [Utensils,Coffee,MapPin,Clapperboard];
const summaries = ["一餐一味，记住食物与地方的关系。","一杯饮品，把日常的速度放慢一点。","用脚步感受一座城市，也留意沿途的小事。","读过、看过与反复喜欢的作品和物品。"];

export default function LifePage() {
  return (
    <main id="main-content" className="life-home" tabIndex={-1}>
      <section className="life-hero" aria-labelledby="life-title">
        <Breadcrumbs items={[{label:"首页",href:"/"},{label:"生活记录"}]} />
        <div className="life-hero__inner"><div className="life-hero__copy"><h1 id="life-title">把日子，<span>过成具体的喜欢。</span></h1><p>咖啡与茶、散步与风味，<br />还有值得记住的小事。</p><a href="#life-index">翻开日常 <ArrowRight aria-hidden="true" /></a></div><aside className="life-hero__caption">在平凡的日常里，<br />收集柔软的时刻，<br />让生活成为持续生长的灵感。<small>好好生活，<br />也是一种研究。</small></aside><figure><div className="life-media-window"><picture><source media="(max-width: 760px)" srcSet="/images/celestial/life-window-768.webp" /><img src="/images/celestial/life-window.webp" width="1513" height="1040" alt="窗边木桌上的蓝釉咖啡杯、无字笔记本与自然光影" fetchPriority="high" /></picture><AmbientScene kind="life" /></div><figcaption>生活场景示意 · AI 生成</figcaption></figure></div>
      </section>
      <section className="life-index section-shell" id="life-index" aria-labelledby="life-index-title"><header className="u-reveal"><h2 id="life-index-title">研究之外，保持具体</h2><p>先为日常留一个位置。具体的体验记录随真实的地点、日期和感受慢慢补充。</p></header><div className="life-index__rows u-reveal">{lifeCategories.map((category,index)=>{const Icon=icons[index];return <a href={`/life/${category.slug}`} key={category.slug} data-navigation="document"><span><Icon size={21} aria-hidden="true" /></span><h3>{category.title}</h3><p>{summaries[index]}</p><ArrowRight aria-hidden="true" /></a>;})}</div></section>
      <section className="life-anime-entry section-shell u-reveal" aria-label="生活中的动画"><a className="beyond-anime" href="/life/animation" data-navigation="document"><picture><source media="(max-width: 760px)" srcSet="/images/celestial/anime-coast-768.webp" /><img src="/images/celestial/anime-coast.webp" width="1600" height="916" loading="lazy" alt="黄昏海岸上的灯火与远方列车，原创动画场景插画" /></picture><div className="beyond-anime__copy"><span>生活里的一束光</span><h3>还有那些，想再看一遍的故事。</h3><p>动画、原文影评与多年积累的观看记录。</p><b>进入动画观测站 <ArrowRight aria-hidden="true" /></b></div></a><p className="image-provenance">原创海岸场景为 AI 生成插画。</p></section>
    </main>
  );
}
