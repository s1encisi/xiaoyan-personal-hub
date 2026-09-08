
import { ArrowUpRight } from "lucide-react";
import { AnimationModuleLinks } from "../../../_components/animation-module-links";
import { AnimationPoster } from "../../../_components/animation-poster";
import { AnimationSectionHero } from "../../../_components/animation-section-hero";
import { animationRecommendationPeriod } from "../../../_data/animation/overview";
import { animationRecommendationYears } from "../../../_data/animation/recommendations";
import { createFixedPageMetadata } from "../../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/life/animation/recommendations",
  title: "年度推荐｜动画观测站｜小闫",
  description: "按年份阅读小闫完整保留的年度片单，以及其中已经写下的原文评价。",
});

export default function AnimationRecommendationsPage() {
  const total = animationRecommendationYears.reduce((sum, record) => sum + record.entries.length, 0);

  return (
    <main id="main-content" className="animation-section-page" tabIndex={-1}>
      <AnimationSectionHero
        code="01 / EDITORS’ PICKS"
        title="年度推荐"
        description="不是试图说服所有人的客观榜单，而是每一年真实留下的观看切片。原稿记录了几部，这里就完整保留几部。"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "年度推荐" }]}
        stats={[{ label: "时间范围", value: animationRecommendationPeriod }, { label: "年度档案", value: `${animationRecommendationYears.length} 组` }, { label: "当前收录", value: `${total} 条` }]}
      />

      <section className="animation-recommendation-timeline" aria-label="年度推荐索引">
        {animationRecommendationYears.map((record) => (
          <article key={record.year}>
            <div className="animation-recommendation-year">
              <span>{record.year}</span>
              <small>{record.label}</small>
            </div>
            <div className="animation-recommendation-preview" aria-hidden="true">
              {record.entries.slice(0, 3).map((item, index) => (
                <AnimationPoster key={`${record.year}-${item.title}`} poster={item.poster} title={item.title} className={`is-stack-${index + 1}`} />
              ))}
            </div>
            <div className="animation-recommendation-copy">
              <p>{String(record.entries.length).padStart(2, "0")} WORKS / {record.label}</p>
              <h2>{record.title}</h2>
              <p>{record.summary}</p>
              <ul aria-label={`${record.year} 年部分作品`}>
                {record.entries.slice(0, 4).map((item) => <li key={item.title}>{item.title}</li>)}
              </ul>
            </div>
            <a className="animation-recommendation-link" href={`/life/animation/recommendations/${record.year}`} data-navigation="document" aria-label={`进入 ${record.year} 年完整推荐`}>
              <span>完整阅读</span><ArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>

      <AnimationModuleLinks />
    </main>
  );
}
