/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { StatusBadge } from "../_components/status-badge";
import { animationInterest, lifeCategories } from "../_data/content";
import { animationReviews } from "../_data/animation/reviews";

export const metadata = createFixedPageMetadata({
  path: "/life",
  title: "生活记录｜小闫",
  description: "小闫关于动画与影评、味道、咖啡、旅行和日常好物的生活记录。",
});

export default function LifePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="06"
        eyebrow="LIFE NOTES"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活" }]}
        title={<>认真吃饭，<br /><span>也认真看世界。</span></>}
        description="吃过的味道、走过的地方、看过的动画与愿意反复回想的故事，都构成了我理解世界的另一种方式。"
        aside={
          <div className="life-category-overview" aria-label="五个生活记录专题">
            <span>LIFE INDEX</span>
            <strong>{lifeCategories.length + 1}</strong>
            <small>{[...lifeCategories.map((category) => category.code), animationInterest.code].join(" · ")}</small>
          </div>
        }
      />

      <section className="life-editorial section-shell" aria-labelledby="life-editorial-title">
        <div className="section-kicker split-kicker">
          <div><p className="micro-label">FIELD NOTES / 生活分类</p><h2 id="life-editorial-title">研究之外，保持具体</h2></div>
          <p>动画是我最重要的兴趣之一；其余栏目需要提供真实体验记录，包括地点、日期、价格、路线、推荐理由与图片。</p>
        </div>
        <a className="life-animation-feature" href="/life/animation">
          <div className="life-animation-frame" aria-hidden="true">
            <span>ANIMATION ARCHIVE</span>
            <strong>24</strong>
            <small>FPS · FRAMES / STORIES / FEELINGS</small>
          </div>
          <div className="life-animation-copy">
            <p className="micro-label">MAJOR INTEREST / 动画专题</p>
            <h3>{animationInterest.title}</h3>
            <p>{animationInterest.summary}</p>
            <div className="focus-cloud" aria-label="专题内容">
              <span>2017 入坑史</span><span>年度片单</span><span>{animationReviews.length} 篇文章与影评</span>
            </div>
            <b>进入动画专题 <span aria-hidden="true">→</span></b>
          </div>
        </a>
        <div className="life-editorial-grid">
          {lifeCategories.map((category, index) => (
            <article className={`life-entry life-entry-${category.tone}`} key={category.code}>
              <span>0{index + 1} / {category.code}</span>
              <div className="life-swatch" aria-hidden="true"><small>{category.code}</small><strong>{category.title.charAt(0)}</strong></div>
              <h3><a href={`/life/${category.slug}`}>{category.title}</a></h3><p>{category.summary}</p><StatusBadge status={category.status} /><a className="text-link" href={`/life/${category.slug}`}>进入分类详情 <span>→</span></a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
