import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { getReflection, isNonPublicStatus, reflections } from "../../_data/content";
import { reflectionEditorialDetails } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reflections.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getReflection(slug);
  if (!record) return { title: "随想未找到｜小闫" };
  const canonicalPath = `/thoughts/${slug}`;
  return {
    title: `${record.title}｜随想｜小闫`,
    description: record.summary,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜随想`,
      description: record.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${record.title}｜随想`, description: record.summary, images: [] },
  };
}

export default async function ThoughtDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getReflection(slug);
  if (!record) notFound();
  const editorial = reflectionEditorialDetails[slug];
  const index = reflections.findIndex((item) => item.slug === slug);
  const previous = reflections[index - 1];
  const next = reflections[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="detail-shell detail-thought">
        <header className="detail-shell-hero detail-shell-editorial">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "随想", href: "/thoughts" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">THOUGHT / {record.topic}</p><h1>{record.title}</h1><p>{record.summary}</p></div>
            <StatusBadge status={record.status} />
          </div>
        </header>

        <div className="detail-shell-body editorial-reading section-shell">
          <section className="thought-proposition" aria-labelledby="thought-proposition-title">
            <div className="section-kicker"><p className="micro-label">CORE PROPOSITION</p><h2 id="thought-proposition-title">当前命题</h2></div>
            <blockquote>{editorial.proposition}</blockquote>
            <p>这是一篇仍在形成中的个人随想，不作为学术结论或专业建议。</p>
          </section>

          <section aria-labelledby="thought-body-title">
            <div className="section-kicker"><p className="micro-label">CURRENT NOTES / 当前记录</p><h2 id="thought-body-title">现有正文</h2></div>
            <div className="detail-prose">{record.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          <section className="thought-questions" aria-labelledby="thought-questions-title">
            <div className="section-kicker"><p className="micro-label">QUESTIONS</p><h2 id="thought-questions-title">完整文章还需要回答</h2></div>
            <ol>{editorial.questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></li>)}</ol>
          </section>

          <section className="record-story-map" aria-labelledby="thought-structure-title">
            <div className="section-kicker"><p className="micro-label">ARTICLE STRUCTURE</p><h2 id="thought-structure-title">建议展开结构</h2></div>
            <ol>{editorial.structure.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
          </section>

          <section aria-labelledby="thought-tags-title">
            <div className="section-kicker"><p className="micro-label">TAGS</p><h2 id="thought-tags-title">主题标签</h2></div>
            <div className="focus-cloud">{record.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>

          <RequirementNotice id="thought-detail-requirements-title" groups={editorial.requirements} title="把这篇随想发展为完整文章，需要以下材料" intro="保留原稿语气和真实经历，只做结构、断句与公开表达整理；不会代写不存在的个人记忆或感受。" />
        </div>

        <DetailNavigation
          back={{ title: "返回随想列表", href: "/thoughts" }}
          previous={previous ? { title: previous.title, href: `/thoughts/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/thoughts/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
