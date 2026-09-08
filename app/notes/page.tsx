import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { knowledge } from "../_data/content";

export const metadata = createFixedPageMetadata({
  path: "/notes",
  title: "知识库｜小闫",
  description: "研究方法、建模优化、论文表达与可复现工程的个人知识索引。",
});

export default function NotesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="I1"
        eyebrow="KNOWLEDGE BASE"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "知识库" }]}
        title={<>把零散知识，<br /><span>整理成可复用的方法。</span></>}
        description="这里不是链接仓库，而是把正在理解、验证与实践的内容重新组织成一套持续迭代的研究索引。"
        tone="dark"
        aside={<div className="knowledge-console" aria-hidden="true"><span>INDEX</span><strong>{String(knowledge.length).padStart(2, "0")}</strong><small>TOPIC CLUSTERS</small></div>}
      />

      <section className="knowledge-index section-shell" aria-labelledby="knowledge-index-title">
        <div className="section-kicker split-kicker">
          <div><p className="micro-label">LIBRARY / 知识索引</p><h2 id="knowledge-index-title">{knowledge.length} 组持续更新的主题</h2></div>
          <p>每组内容用问题、检查项和边界组织，方便在下一次研究中真正复用。</p>
        </div>
        <div className="knowledge-index-grid">
          {knowledge.map((entry) => (
            <a key={entry.slug} href={`/notes/${entry.slug}`}>
              <span>{entry.code}</span><small>TOPIC</small><h3>{entry.title}</h3><p>{entry.summary}</p><b aria-hidden="true">打开索引 ↗</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
