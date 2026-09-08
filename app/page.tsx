/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native document navigation and optimized local assets. */
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Viewport } from "next";
import { AmbientScene } from "./_components/ambient-scene";
import { SocialLinks } from "./_components/social-links";
import { projects } from "./_data/content";
import { animationReviews } from "./_data/animation/reviews";
import { animationRecommendationYears } from "./_data/animation/recommendations";

const researchTitles = ["代理建模", "多目标优化", "安全强化学习", "可解释与因果智能"];
const researchLines = ["", "在相互牵制的目标之间，寻找可审阅的折中。", "将过程约束与风险，纳入序贯决策。", "区分预测关联与因果证据，理解决策依据。"];
const recommendationCount = animationRecommendationYears.reduce((sum, year) => sum + year.entries.length, 0);

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#060c18" };

export default function Home() {
  return (
    <main id="main-content" className="celestial-home" tabIndex={-1}>
      <section className="celestial-hero" aria-labelledby="celestial-title">
        <picture className="celestial-hero__media">
          <source media="(max-width: 760px)" srcSet="/images/celestial/celestial-planet-768.webp" />
          <img src="/images/celestial/celestial-planet.webp" width="1586" height="992" alt="深蓝星海中，一颗被青蓝与金色弧光照亮的暗色行星" fetchPriority="high" />
        </picture>
        <AmbientScene kind="cosmic" />
        <div className="cosmic-orbit" aria-hidden="true"><svg viewBox="0 0 800 800"><ellipse cx="400" cy="400" rx="362" ry="167" transform="rotate(-24 400 400)" /><ellipse cx="400" cy="400" rx="350" ry="183" transform="rotate(-17 400 400)" /><circle cx="697" cy="220" r="3" /></svg></div>
        <span className="shooting-star" aria-hidden="true" /><span className="shooting-star shooting-star--second" aria-hidden="true" />
        <div className="celestial-hero__content">
          <h1 id="celestial-title"><span>从复杂过程，</span><span>到可信决策。</span></h1>
          <p className="celestial-hero__intro">我是小闫。研究工业过程，也认真收藏动画与日常。</p>
          <div className="celestial-hero__actions">
            <a className="universe-action" href="/research" data-navigation="document">探索研究 <ArrowRight aria-hidden="true" /></a>
            <a className="universe-action universe-action--outline" href="/about/profile" data-navigation="document">认识我 <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="celestial-hero__bottom">
          <SocialLinks />
          <small className="celestial-hero__credit">天体场景 · AI 生成</small>
          <a className="celestial-scroll" href="#research-agenda" aria-label="向下阅读研究议程"><span>继续探索</span><ArrowDown size={16} aria-hidden="true" /><i aria-hidden="true" /></a>
        </div>
      </section>
      <section className="home-research section-shell" id="research-agenda" aria-labelledby="home-research-title">
        <header className="universe-section-title u-reveal"><h2 id="home-research-title">研究议程</h2><p>围绕工业过程，探索可验证、可解释的决策方法。<br />这里记录研究问题与方法路径，成果随证据完善。</p></header>
        <div className="research-feature u-reveal">
          <figure>
            <img src="/copper-electrowinning-hero.webp" srcSet="/copper-electrowinning-hero-768.webp 768w, /copper-electrowinning-hero-1200.webp 1200w, /copper-electrowinning-hero.webp 1568w" sizes="(max-width: 760px) 90vw, 48vw" width="1568" height="1003" loading="lazy" alt="铜电积槽中成列排列的铜阴极板与蓝绿色电解液" />
            <figcaption>铜电积场景示意 · AI 生成图像，仅作场景表达</figcaption>
          </figure>
          <div className="research-feature__copy"><span>01 / 过程建模</span><h3>{researchTitles[0]}</h3><p className="research-question">从过程数据出发，<br />建立可用的代理模型。</p><p>面向铜电积与电解液净化，关注预测、约束与模型在真实工况中的适用范围。</p><a href={`/projects/${projects[0].slug}`} data-navigation="document">查看研究方向 <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="research-ledger u-reveal">{projects.slice(1).map((project,index) => <a href={`/projects/${project.slug}`} key={project.slug} data-navigation="document"><span>{project.index}</span><h3>{researchTitles[index+1]}</h3><p>{researchLines[index+1]}</p><ArrowRight aria-hidden="true" /></a>)}</div>
        <nav className="research-next" aria-label="研究相关入口"><a href="/skills">技术能力地图 <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/outputs">论文与成果 <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/notes">方法与知识库 <ArrowUpRight size={17} aria-hidden="true" /></a></nav>
      </section>
      <section className="home-beyond" aria-labelledby="home-beyond-title"><div className="section-shell">
        <header className="universe-section-title u-reveal"><h2 id="home-beyond-title">研究之外</h2><p>给故事留一点时间，也给日常留一点光。</p></header>
        <a className="beyond-anime u-reveal" href="/life/animation" data-navigation="document">
          <picture><source media="(max-width: 760px)" srcSet="/images/celestial/anime-coast-768.webp" /><img src="/images/celestial/anime-coast.webp" width="1600" height="916" loading="lazy" alt="原创动画风格的黄昏海岸、云层与远方高架列车" /></picture>
          <div className="beyond-anime__copy"><span>动画专题</span><h3>让故事，在心里继续。</h3><p>{animationReviews.length} 篇影评与文章，{recommendationCount} 条年度推荐，留下每一次观看的回声。</p><b>进入动画专题 <ArrowRight aria-hidden="true" /></b></div>
        </a>
        <a className="beyond-life u-reveal" href="/life" data-navigation="document"><div><span>生活记录</span><h3>把日子，<br />过成具体的喜欢。</h3><p>味道、散步、咖啡与茶，<br />慢慢收集生活里的小事。</p><b>翻开生活记录 <ArrowRight aria-hidden="true" /></b></div><figure><picture><source media="(max-width: 760px)" srcSet="/images/celestial/life-window-768.webp" /><img src="/images/celestial/life-window.webp" width="1513" height="1040" loading="lazy" alt="自然光下的蓝釉咖啡杯、笔记本与枝叶光影" /></picture></figure></a>
        <p className="image-provenance">海岸插画与窗边静物为 AI 生成的场景表达。</p>
        <section className="home-social u-reveal" aria-labelledby="home-social-title"><h2 id="home-social-title">在别处找到我</h2><SocialLinks variant="editorial" /><nav className="home-more-links" aria-label="更多个人内容"><a href="/about">关于我</a><a href="/journey">教育与经历</a><a href="/thoughts">随想</a><a href="/contact">联系与合作</a></nav></section>
      </div></section>
    </main>
  );
}
