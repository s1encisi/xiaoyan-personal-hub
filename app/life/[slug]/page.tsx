import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { getLifeCategory, isNonPublicStatus, lifeCategories } from "../../_data/content";
import { lifeEditorialDetails } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lifeCategories.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getLifeCategory(slug);
  if (!record) return { title: "生活记录未找到｜小闫" };
  const canonicalPath = `/life/${slug}`;
  return {
    title: `${record.title}｜生活记录｜小闫`,
    description: record.intro,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜生活记录`,
      description: record.intro,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${record.title}｜生活记录`, description: record.intro, images: [] },
  };
}

export default async function LifeDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getLifeCategory(slug);
  if (!record) notFound();
  const editorial = lifeEditorialDetails[slug];
  const index = lifeCategories.findIndex((item) => item.slug === slug);
  const previous = lifeCategories[index - 1];
  const next = lifeCategories[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className={`detail-shell detail-life detail-life-${record.tone}`}>
        <header className="detail-shell-hero detail-shell-magazine">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">{record.code} / LIFE NOTE</p><h1>{record.title}</h1><p>{record.intro}</p></div>
            <StatusBadge status={record.status} />
          </div>
          <div className="life-detail-visual" aria-hidden="true">
            <span>{record.code}</span>
            <strong>{record.title.charAt(0)}</strong>
            <small>PERSONAL FIELD NOTES</small>
          </div>
        </header>

        <div className="detail-shell-body section-shell">
          <section className="life-editorial-position" aria-labelledby="life-position-title">
            <div className="section-kicker"><p className="micro-label">01 / EDITORIAL POSITION</p><h2 id="life-position-title">这部分准备怎样记录</h2></div>
            <div className="detail-prose">{editorial.editorialPosition.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          <section className="life-reading-path" aria-labelledby="life-reading-path-title">
            <div className="section-kicker"><p className="micro-label">02 / READING PATH</p><h2 id="life-reading-path-title">未来条目的阅读顺序</h2></div>
            <ol>{editorial.readingPath.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
          </section>

          <section className="life-entry-blueprint" aria-labelledby="life-entry-blueprint-title">
            <div className="section-kicker"><p className="micro-label">03 / ENTRY BLUEPRINT</p><h2 id="life-entry-blueprint-title">每条记录至少包含</h2></div>
            <dl>{editorial.entryBlueprint.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.description}</dd></div>)}</dl>
          </section>

          {record.sections.filter((section) => section.title === "发布边界").map((section, sectionIndex) => (
            <section key={section.title} aria-labelledby={`life-section-${sectionIndex}`}>
              <div className="section-kicker"><p className="micro-label">04 / PUBLISHING RULES</p><h2 id={`life-section-${sectionIndex}`}>{section.title}</h2></div>
              <ul className="editorial-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
          {record.relatedLinks?.length ? (
            <section aria-labelledby="life-related-title">
              <div className="section-kicker"><p className="micro-label">RELATED / 相关专题</p><h2 id="life-related-title">继续浏览</h2></div>
              <div className="life-related-topics">
                {record.relatedLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    <strong>{link.title}</strong>
                    <span>{link.description}</span>
                    <b aria-hidden="true">→</b>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
          <RequirementNotice id="life-detail-requirements-title" groups={editorial.requirements} title={`建立第一条“${record.title}”记录，需要以下资料`} intro="只使用真实体验和获授权图片；价格、营业时间、交通等时效信息在发布时重新核验，并标注核验日期。" />
        </div>

        <DetailNavigation
          back={{ title: "返回生活列表", href: "/life" }}
          previous={previous ? { title: previous.title, href: `/life/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/life/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
