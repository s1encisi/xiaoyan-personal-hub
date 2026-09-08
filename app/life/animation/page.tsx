/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimationModuleLinks } from "../../_components/animation-module-links";
import { AnimationPoster } from "../../_components/animation-poster";
import { AnimationYearRail } from "../../_components/animation-year-rail";
import { animationOverview } from "../../_data/animation/overview";
import { animationRecommendationYears } from "../../_data/animation/recommendations";
import { animationReviews } from "../../_data/animation/reviews";
import { createFixedPageMetadata } from "../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/life/animation",
  title: "动画观测站｜动画与影评｜小闫",
  description: "小闫从 2017 年开始积累的动画档案、年度推荐、影评文章与番剧总表。",
});

export default function AnimationPage() {
  const featured = animationReviews.find((review) => review.featured) ?? animationReviews[0];
  const visibleReviews = animationReviews.filter((review) => review.slug !== featured.slug).slice(0, 6);
  const latestRecommendationYears = animationRecommendationYears.slice(0, 2).reverse();
  const reviewYears = animationReviews.map((review) => Number(review.year)).filter(Number.isFinite);
  const reviewPeriod = reviewYears.length > 0
    ? `${Math.min(...reviewYears)}—${Math.max(...reviewYears)}`
    : "原稿未标注";
  const heroSeparatorIndex = animationOverview.title.indexOf("，");
  const heroLead = heroSeparatorIndex >= 0
    ? animationOverview.title.slice(0, heroSeparatorIndex + 1)
    : animationOverview.title;
  const heroRest = heroSeparatorIndex >= 0
    ? animationOverview.title.slice(heroSeparatorIndex + 1)
    : "";

  return (
    <main id="main-content" className="animation-observatory" tabIndex={-1}>
      <div className="animation-observatory-grid">
        <AnimationYearRail />

        <div className="animation-observatory-main">
          <section className="animation-observatory-hero" aria-labelledby="animation-observatory-title">
            <nav className="animation-breadcrumbs" aria-label="面包屑">
              <ol>
                <li><a href="/" data-navigation="document">首页</a></li>
                <li><a href="/life" data-navigation="document">生活</a></li>
                <li><span aria-current="page">动画观测站</span></li>
              </ol>
            </nav>
            <div className="animation-observatory-copy">
              <p>动画观测站 / ANIMATION ARCHIVE</p>
              <h1 id="animation-observatory-title">{heroLead}{heroRest ? <span>{heroRest}</span> : null}</h1>
              <div>
                {animationOverview.description.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>
            <strong className="animation-observatory-period">{animationOverview.period}</strong>
          </section>

          <section className="animation-featured-review" aria-labelledby="animation-featured-title">
            <AnimationPoster poster={featured.poster} posters={featured.posters} title={featured.workTitle} eager className="animation-featured-poster" />
            <article>
              <div className="animation-featured-topline">
                <p>影评档案 · {featured.year}</p>
                <div aria-label="相邻年度">
                  {latestRecommendationYears.map((record, yearIndex) => (
                    <a key={record.year} href={`/life/animation/recommendations/${record.year}`} data-navigation="document">
                      {yearIndex === 0 ? <ChevronLeft aria-hidden="true" /> : null}{record.year}{yearIndex === 1 ? <ChevronRight aria-hidden="true" /> : null}
                    </a>
                  ))}
                </div>
              </div>
              <p className="animation-featured-code">{featured.code} / {featured.englishTitle}</p>
              <h2 id="animation-featured-title">{featured.title}</h2>
              <strong>{featured.lens}</strong>
              <p className="animation-featured-summary">{featured.summary}</p>
              <p className="animation-featured-excerpt">{featured.sections[0]?.paragraphs[0]}</p>
              <dl>
                {featured.facts.slice(0, 3).map((fact) => (
                  <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                ))}
                <div><dt>记录年份</dt><dd>{featured.year}</dd></div>
              </dl>
              <a className="animation-featured-action" href={`/life/animation/${featured.slug}`} data-navigation="document">
                阅读完整影评 <span aria-hidden="true">↗</span>
              </a>
            </article>
          </section>

          <section className="animation-review-horizon" aria-labelledby="animation-review-horizon-title">
            <header>
              <div><h2 id="animation-review-horizon-title">更多影评</h2><p>{reviewPeriod}</p></div>
              <a href="/life/animation/reviews" data-navigation="document">查看全部 <span aria-hidden="true">→</span></a>
            </header>
            <div className="animation-review-horizon-track">
              {visibleReviews.map((review) => (
                <a key={review.slug} href={`/life/animation/${review.slug}`} data-navigation="document">
                  <AnimationPoster poster={review.poster} posters={review.posters} title={review.workTitle} />
                  <small>{review.year}</small>
                  <strong>{review.workTitle}</strong>
                  <span>{review.lens}</span>
                </a>
              ))}
            </div>
          </section>

          <AnimationModuleLinks />
        </div>
      </div>
    </main>
  );
}
