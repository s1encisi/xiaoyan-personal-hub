/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation and optimized local imagery. */
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AmbientScene } from "../../_components/ambient-scene";
import { AnimationModuleLinks } from "../../_components/animation-module-links";
import { AnimationPoster } from "../../_components/animation-poster";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { animationRecommendationYears } from "../../_data/animation/recommendations";
import { animationReviews } from "../../_data/animation/reviews";
import { bangumiSnapshot, publicAnimationEssays } from "../../_data/profiles";
import { createFixedPageMetadata } from "../../_data/metadata";
import { FieldHighlights } from "../../_components/field-notes";
import { getFieldNote } from "../../_data/field-notes";

export const metadata = createFixedPageMetadata({path:"/life/animation",title:"动画观测站｜动画与影评｜小闫",description:"从 2017 年开始的动画档案：年度推荐、影评原文、番剧总表，以及 Bilibili 与 Bangumi 的公开记录。"});

export default function AnimationPage() {
  const featured = animationReviews.find(review=>review.featured) ?? animationReviews[0];
  const aria = animationReviews.find(review=>review.slug === "aria-the-animation-farewell") ?? animationReviews[1];
  const visibleReviews = animationReviews.filter(review=>review.slug !== featured.slug).slice(0,6);
  return (
    <main id="main-content" className="anime-home" tabIndex={-1}>
      <section className="anime-hero" aria-labelledby="anime-title">
        <picture className="anime-hero__backdrop"><source media="(max-width: 760px)" srcSet="/images/celestial/anime-coast-768.webp" /><img src="/images/celestial/anime-coast.webp" width="1600" height="916" alt="原创动画风格的黄昏海岸与驶向远方的列车" fetchPriority="high" /></picture>
        <AmbientScene kind="anime" />
        <Breadcrumbs items={[{label:"首页",href:"/"},{label:"生活",href:"/life"},{label:"动画观测站"}]} />
        <div className="anime-hero__inner">
          <div className="anime-hero__copy"><h1 id="anime-title">让故事，<span>在心里继续。</span></h1><p>从 2017 年开始看动画，也开始记录。<br />收藏喜欢的片刻，留下作品带来的回声。</p><div className="anime-hero__links"><a className="universe-action" href="/life/animation/reviews" data-navigation="document">翻开影评 <ArrowRight aria-hidden="true" /></a><a href={bangumiSnapshot.href} target="_blank" rel="noopener noreferrer">我的 Bangumi <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
          <div className="anime-frame-stack">{[aria,featured].map((review,index)=><a href={`/life/animation/${review.slug}`} key={review.slug} aria-label={`阅读《${review.workTitle}》影评`} data-navigation="document"><AnimationPoster poster={review.poster} title={review.workTitle} eager={index === 0} /></a>)}</div>
        </div>
        <p className="anime-credit">海岸场景为 AI 生成插画 · 作品海报来源见影评详情</p>
      </section>
      <AnimationModuleLinks />
      <section className="anime-editorial section-shell" aria-labelledby="anime-editorial-title">
        <header className="anime-editorial__heading u-reveal"><h2 id="anime-editorial-title">影评档案</h2><a href="/life/animation/reviews">全部 {animationReviews.length} 篇 <ArrowRight size={18} aria-hidden="true" /></a></header>
        <article className="anime-feature u-reveal"><AnimationPoster poster={featured.poster} posters={featured.posters} title={featured.workTitle} /><div><p className="anime-feature__meta">{featured.year} · {featured.lens}</p><h3>{featured.title}</h3><p>{featured.summary}</p><a href={`/life/animation/${featured.slug}`} data-navigation="document">阅读完整影评 <ArrowUpRight size={20} aria-hidden="true" /></a></div></article>
        <div className="anime-review-rows u-reveal">{visibleReviews.map(review=><a key={review.slug} href={`/life/animation/${review.slug}`} data-navigation="document"><AnimationPoster poster={review.poster} posters={review.posters} title={review.workTitle} /><div><small>{review.year}</small><h3>{review.workTitle}</h3><p>{review.lens}</p></div></a>)}</div>
        <nav className="anime-years" aria-label="年度推荐"><span>回到某一年</span>{animationRecommendationYears.map(year=><a href={`/life/animation/recommendations/${year.year}`} key={year.year} data-navigation="document">{year.year}</a>)}</nav>
      </section>
      <section className="anime-editorial section-shell" aria-labelledby="anime-live-title"><header className="anime-editorial__heading"><h2 id="anime-live-title">从作品，走到现场</h2><a href="/life/culture-objects">现场图文 <ArrowRight size={18} aria-hidden="true" /></a></header><FieldHighlights notes={[getFieldNote("bilibiliworld-2025"), getFieldNote("wuthering-waves-live"), getFieldNote("bilibili-anniversary")]} /></section>
      <section className="anime-external section-shell u-reveal" aria-labelledby="anime-external-title"><header className="anime-editorial__heading"><h2 id="anime-external-title">写在 Bilibili 的原文</h2><a href="https://space.bilibili.com/103442064" target="_blank" rel="noopener noreferrer">个人空间 <ArrowUpRight size={18} aria-hidden="true" /></a></header><div className="external-essay-list">{publicAnimationEssays.map(essay=><article key={essay.href}><div><small>{essay.subject}</small><h3><a href={essay.href} target="_blank" rel="noopener noreferrer">{essay.title}<ArrowUpRight size={18} aria-hidden="true" /></a></h3></div><a href={essay.localHref} className="essay-local-link">站内阅读 <ArrowRight size={16} aria-hidden="true" /></a></article>)}</div></section>
      <section className="bangumi-observation section-shell u-reveal" aria-label="Bangumi 公开观看记录"><div><h2>观看仍在继续</h2><p>在 Bangumi，留下每一部作品的坐标。</p></div><dl><div><dt><a href={bangumiSnapshot.watchedHref} target="_blank" rel="noopener noreferrer">标记看过 ↗</a></dt><dd>{bangumiSnapshot.watched.toLocaleString("zh-CN")}</dd></div><div><dt><a href={bangumiSnapshot.watchingHref} target="_blank" rel="noopener noreferrer">在看 ↗</a></dt><dd>{bangumiSnapshot.watching}</dd></div><div><dt><a href={bangumiSnapshot.wishHref} target="_blank" rel="noopener noreferrer">想看 ↗</a></dt><dd>{bangumiSnapshot.wish}</dd></div></dl><p className="bangumi-source">来源：<a href={bangumiSnapshot.href} target="_blank" rel="noopener noreferrer">Bangumi 公开主页</a> · {bangumiSnapshot.verifiedAt} 核验。平台计数与站内番剧总表分别统计，不相加。</p></section>
    </main>
  );
}
