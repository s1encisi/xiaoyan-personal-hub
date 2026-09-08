import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { ScrollRevealController } from "../../_components/scroll-reveal-controller";
import { getKnowledge, knowledge } from "../../_data/content";
import { knowledgeEditorialDetails } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledge.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getKnowledge(slug);
  if (!entry) return { title: "知识主题未找到｜小闫" };
  const canonicalPath = `/notes/${slug}`;
  return {
    title: `${entry.title}｜知识库｜小闫`,
    description: entry.intro,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${entry.title}｜知识库`,
      description: entry.intro,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${entry.title}｜知识库`, description: entry.intro, images: [] },
  };
}

export default async function NoteDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const entry = getKnowledge(slug);
  if (!entry) notFound();
  const index = knowledge.findIndex((item) => item.slug === slug);
  const previous = knowledge[index - 1];
  const next = knowledge[index + 1];
  const editorial = knowledgeEditorialDetails[entry.slug];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="note-detail">
        <ScrollRevealController />
        <header className="note-detail-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "知识库", href: "/notes" }, { label: entry.title }]} />
          <div><p className="micro-label">{entry.code} / KNOWLEDGE NOTE</p><h1>{entry.title}</h1><p>{entry.intro}</p></div>
          <span className="note-status">持续整理</span>
        </header>
        <div className="note-body section-shell">
          <section className="note-core-question scroll-reveal" aria-labelledby="note-question-title">
            <p className="micro-label">CORE QUESTION / 核心问题</p>
            <h2 id="note-question-title">{editorial.question}</h2>
          </section>

          <section className="note-thesis scroll-reveal" aria-labelledby="note-thesis-title">
            <p className="micro-label">01 / WORKING UNDERSTANDING</p>
            <h2 id="note-thesis-title">当前理解</h2>
            <div>{editorial.thesis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          <section className="note-relations scroll-reveal" aria-labelledby="note-relations-title">
            <p className="micro-label">02 / RELATIONSHIPS</p>
            <h2 id="note-relations-title">概念之间怎样连接</h2>
            <ol>
              {editorial.relationships.map((relation, relationIndex) => (
                <li key={relation.title}><span>{String(relationIndex + 1).padStart(2, "0")}</span><h3>{relation.title}</h3><p>{relation.description}</p></li>
              ))}
            </ol>
          </section>

          {entry.sections.map((section, sectionIndex) => (
            <section key={section.title} className="scroll-reveal">
              <div><span>0{sectionIndex + 3}</span><h2>{section.title}</h2></div>
              <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}

          <section className="note-application scroll-reveal" aria-labelledby="note-application-title">
            <p className="micro-label">05 / WHEN TO USE</p>
            <h2 id="note-application-title">什么时候拿出来使用</h2>
            <ul>{editorial.whenToUse.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="note-misconceptions scroll-reveal" aria-labelledby="note-misconceptions-title">
            <p className="micro-label">06 / COMMON ERRORS</p>
            <h2 id="note-misconceptions-title">常见误区</h2>
            <dl>
              {editorial.misconceptions.map((item) => <div key={item.claim}><dt>{item.claim}</dt><dd>{item.correction}</dd></div>)}
            </dl>
          </section>

          <section className="note-practice scroll-reveal" aria-labelledby="note-practice-title">
            <p className="micro-label">07 / PRACTICE CHECKLIST</p>
            <h2 id="note-practice-title">下一次研究可以直接使用的动作</h2>
            <ol>{editorial.practice.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
          </section>
          <aside className="note-disclaimer"><strong>说明</strong><p>当前页面是个人知识索引，不替代正式教材、原始论文或专业规范；具体方法需结合任务数据与研究设计判断。</p></aside>
        </div>
        <RequirementNotice
          groups={editorial.requirements}
          title="把这篇工作笔记完善为可引用的知识文章"
          intro="当前内容用于表达方法理解与检查思路；真实案例、图表、来源和更新时间齐备后，再升级为完整文章。"
        />
        <DetailNavigation
          back={{ title: "返回知识库", href: "/notes" }}
          previous={previous ? { title: previous.title, href: `/notes/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/notes/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
