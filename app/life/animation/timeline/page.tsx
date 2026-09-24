
import { ArrowUpRight } from "lucide-react";
import { AnimationModuleLinks } from "../../../_components/animation-module-links";
import { AnimationSectionHero } from "../../../_components/animation-section-hero";
import { animationLatestArchiveYear, animationRecommendationPeriod, animationTimeline } from "../../../_data/animation/overview";
import { createFixedPageMetadata } from "../../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/life/animation/timeline",
  title: "观看时间线｜动画观测站｜小闫",
  description: "从 2017 年入坑到 2025 年持续记录的动画观看与写作轨迹。",
});

export default function AnimationTimelinePage() {
  return (
    <main id="main-content" className="animation-section-page animation-timeline-page" tabIndex={-1}>
      <AnimationSectionHero
        code="04 / VIEWING TIMELINE"
        title="观看时间线"
        description="从最初入坑、持续补完，到重看与写作，沿着年份回顾我和动画相伴的经历。"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "观看时间线" }]}
        stats={[{ label: "起点", value: "2017-04-12" }, { label: "推荐时间线", value: animationRecommendationPeriod }, { label: "总表覆盖", value: `至 ${animationLatestArchiveYear}` }]}
      />

      <section className="animation-celestial-timeline" aria-label="动画观看时间线">
        {animationTimeline.map((node, index) => (
          <article key={node.year} style={{ "--timeline-index": index } as React.CSSProperties}>
            <div className="animation-timeline-node" aria-hidden="true"><i /><span>{node.year}</span></div>
            <div className="animation-timeline-copy">
              <small>{String(index + 1).padStart(2, "0")} / {node.year}</small>
              <h2>{node.title}</h2>
              <p>{node.description}</p>
              <ul>{node.works.map((work) => <li key={work}>{work}</li>)}</ul>
              <a href={node.href} data-navigation="document">进入这一年 <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </section>

      <AnimationModuleLinks />
    </main>
  );
}
