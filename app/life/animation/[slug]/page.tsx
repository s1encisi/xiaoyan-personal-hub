/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimationPoster } from "../../../_components/animation-poster";
import { StatusBadge } from "../../../_components/status-badge";
import { isNonPublicStatus } from "../../../_data/content";
import { animationReviews, getAdjacentAnimationReviews, getAnimationReview } from "../../../_data/animation/reviews";
import { SITE_ORIGIN } from "../../../_data/metadata";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return animationReviews.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getAnimationReview(slug);
  if (!record) return { title: "动画影评未找到｜小闫" };
  const canonicalPath = `/life/animation/${slug}`;
  const image = record.poster ? `${SITE_ORIGIN}${record.poster.src}` : undefined;
  return {
    title: `${record.title}｜动画观测站｜小闫`,
    description: record.summary,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜动画观测站`,
      description: record.summary,
      url: canonicalPath,
      images: image ? [image] : [],
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: `${record.title}｜动画观测站`, description: record.summary, images: image ? [image] : [] },
  };
}

export default async function AnimationReviewPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getAnimationReview(slug);
  if (!record) notFound();
  const { previous, next } = getAdjacentAnimationReviews(slug);

  return (
    <main id="main-content" className="animation-review-detail" tabIndex={-1}>
      <article>
        <header className="animation-review-detail-hero">
          <nav className="animation-breadcrumbs" aria-label="面包屑">
            <ol>
              <li><a href="/" data-navigation="document">首页</a></li>
              <li><a href="/life" data-navigation="document">生活</a></li>
              <li><a href="/life/animation" data-navigation="document">动画观测站</a></li>
              <li><a href="/life/animation/reviews" data-navigation="document">影评档案</a></li>
              <li><span aria-current="page">{record.workTitle}</span></li>
            </ol>
          </nav>

          <div className="animation-review-detail-grid">
            <div className="animation-review-detail-heading">
              <div className="animation-review-detail-topline">
                <p>{record.code} / {record.englishTitle}</p>
                <StatusBadge status={record.status} />
              </div>
              <h1>{record.title}</h1>
              <strong>{record.lens}</strong>
              <p>{record.summary}</p>
              <dl>
                {record.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
                <div><dt>记录年份</dt><dd>{record.year}</dd></div>
              </dl>
            </div>
            <AnimationPoster poster={record.poster} posters={record.posters} title={record.workTitle} eager showCredit />
          </div>
        </header>

        <div className="animation-review-detail-body">
          <aside>
            <p>CONTENTS / 阅读目录</p>
            <nav aria-label="本文目录">
              {record.sections.map((section, index) => (
                <a key={`${record.slug}-toc-${index}`} href={`#review-section-${index + 1}`}>{String(index + 1).padStart(2, "0")} {section.title}</a>
              ))}
            </nav>
            <a href="/life/animation/reviews" data-navigation="document">返回影评档案 <ArrowLeft aria-hidden="true" /></a>
          </aside>

          <div className="animation-review-article">
            {record.sections.map((section, sectionIndex) => (
              <section key={`${record.slug}-section-${sectionIndex}`} id={`review-section-${sectionIndex + 1}`}>
                <header><span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{section.title}</h2></header>
                <div>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${record.slug}-${sectionIndex}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <aside className="animation-review-source-boundary">
              <strong>来源与公开边界</strong>
              <p>{record.sourceNote}</p>
            </aside>
          </div>
        </div>

        <nav className="animation-review-adjacent" aria-label="相邻影评">
          {previous ? (
            <a href={`/life/animation/${previous.slug}`} data-navigation="document"><ArrowLeft aria-hidden="true" /><span><small>上一篇</small>{previous.title}</span></a>
          ) : <span />}
          {next ? (
            <a href={`/life/animation/${next.slug}`} data-navigation="document"><span><small>下一篇</small>{next.title}</span><ArrowRight aria-hidden="true" /></a>
          ) : (
            <a href="/life/animation/reviews" data-navigation="document"><span><small>返回</small>影评档案</span><ArrowRight aria-hidden="true" /></a>
          )}
        </nav>
      </article>
    </main>
  );
}
