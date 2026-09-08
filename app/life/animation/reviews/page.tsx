
import { ArrowUpRight } from "lucide-react";
import { AnimationModuleLinks } from "../../../_components/animation-module-links";
import { AnimationPoster } from "../../../_components/animation-poster";
import { AnimationSectionHero } from "../../../_components/animation-section-hero";
import { StatusBadge } from "../../../_components/status-badge";
import { animationReviews } from "../../../_data/animation/reviews";
import { createFixedPageMetadata } from "../../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/life/animation/reviews",
  title: "影评档案｜动画观测站｜小闫",
  description: "EVA 终、闪光的哈撒韦、年度推荐与番剧评价中的影评和相关文章，并逐篇标明整理边界。",
});

export default function AnimationReviewsPage() {
  const years = new Set<string>();
  let unlabeledCount = 0;
  for (const review of animationReviews) {
    if (/^20\d{2}$/.test(review.year)) years.add(review.year);
    else unlabeledCount += 1;
  }

  return (
    <main id="main-content" className="animation-section-page" tabIndex={-1}>
      <AnimationSectionHero
        code="02 / REVIEW ARCHIVE"
        title="影评档案"
        description="长评、短评、二刷与多年后重访。每篇文章都标明来源边界，只保留原稿中已经写下的判断。"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "影评档案" }]}
        stats={[{ label: "已整理文章", value: `${animationReviews.length} 篇` }, { label: "记录年份", value: `${years.size} 组` }, { label: "原稿未标注年份", value: `${unlabeledCount} 篇` }]}
      />

      <section className="animation-review-ledger" aria-label="全部动画影评">
        {animationReviews.map((review, index) => (
          <article key={review.slug}>
            <AnimationPoster poster={review.poster} posters={review.posters} title={review.workTitle} />
            <div className="animation-review-ledger-index"><span>{String(index + 1).padStart(2, "0")}</span><small>{review.year}</small></div>
            <div className="animation-review-ledger-copy">
              <p>{review.code} / {review.englishTitle}</p>
              <h2>{review.title}</h2>
              <p>{review.summary}</p>
              <ul aria-label="文章切面">{review.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <div className="animation-review-ledger-action">
              <StatusBadge status={review.status} />
              <a href={`/life/animation/${review.slug}`} data-navigation="document" aria-label={`阅读${review.title}`}><span>阅读全文</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </section>

      <AnimationModuleLinks />
    </main>
  );
}
