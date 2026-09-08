/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { StatusBadge } from "../_components/status-badge";
import { knowledge, reflections } from "../_data/content";

export const metadata = createFixedPageMetadata({
  path: "/insights",
  title: "记录与洞察｜小闫",
  description: "浏览小闫的知识索引与仍在整理的随想草稿。",
});

export default function InsightsPortalPage() {
  const entryCount = knowledge.length + reflections.length;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="05"
        eyebrow="INSIGHTS & NOTES"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察" }]}
        title={<>按主题整理方法，<br /><span>按条目保存思考。</span></>}
        description="这里汇集知识索引与可预览的随想草稿：知识库面向可复用的方法，随想保留仍在整理的判断与经验。"
        tone="dark"
        aside={<div className="knowledge-console" aria-hidden="true"><span>INDEX</span><strong>{String(entryCount).padStart(2, "0")}</strong><small>PREVIEW ENTRIES</small></div>}
      />

      <section className="magazine-grid section-shell" aria-labelledby="insights-grid-title">
        <div className="section-kicker split-kicker"><div><p className="micro-label">CHANNELS / 内容导航</p><h2 id="insights-grid-title">两种互补的记录方式</h2></div><p>知识库整理可复用的方法，随想保留尚在形成中的判断。</p></div>
        <div className="magazine-grid-list">
          <a className="magazine-feature" href="/notes"><span>K / KNOWLEDGE</span><strong>知识库</strong><p>研究方法、建模优化、论文表达与可复现工程。</p><b>{knowledge.length} 个条目 ↗</b></a>
          <a href="/thoughts"><span>T / THOUGHTS</span><strong>随想</strong><p>关于研究、方法、失败与生活的个人思考。</p><b>{reflections.length} 个条目 ↗</b></a>
        </div>
      </section>

      <section className="editorial-list section-shell" aria-labelledby="insights-reading-title">
        <div className="section-kicker"><p className="micro-label">CONTENT INDEX / 内容索引</p><h2 id="insights-reading-title">知识条目与可预览草稿</h2></div>
        <div>
          {knowledge.map((record) => <a key={record.slug} href={`/notes/${record.slug}`}><span>{record.code} / NOTE</span><div><strong>{record.title}</strong><p>{record.summary}</p></div><b aria-hidden="true">↗</b></a>)}
          {reflections.map((record, index) => <a key={record.slug} href={`/thoughts/${record.slug}`}><span>T{String(index + 1).padStart(2, "0")} / 随想提纲</span><div><strong>{record.title}</strong><p>{record.summary}</p></div><div className="ledger-status"><StatusBadge status={record.status} /><b aria-hidden="true">↗</b></div></a>)}
        </div>
      </section>
    </main>
  );
}
