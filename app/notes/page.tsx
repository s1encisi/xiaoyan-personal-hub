import { KnowledgeWheel } from "../_components/effects/ai-effects";
import { PageHero } from "../_components/page-hero";
import { PortfolioSection } from "../_components/portfolio";
import { knowledge } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
import { notionChapters } from "../_data/notion-library";
import "./library.css";

export const metadata = createFixedPageMetadata({ path: "/notes", title: "知识库与方法笔记｜闫哲祯", description: "计算机基础、机器学习、工业优化、软件工程与日常学习。按章节阅读导引，再到 Notion 查看完整资料。" });

export default function NotesPage() {
  return <main id="main-content" className="notes-index" tabIndex={-1}>
    <PageHero code="I1" eyebrow="NOTES & LIBRARY" breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "知识库" }]} title={<>从问题出发，<br /><span>把知识连起来。</span></>} description="从计算机基础、机器学习到工业优化。这里保留阅读导引与关键问题，完整章节在 Notion 中展开。" tone="dark" />
    <section className="section-shell library-section" aria-labelledby="library-title">
      <header className="library-heading"><div><p className="micro-label">READING MAP</p><h2 id="library-title">按主题开始阅读</h2></div><p>先读导引，再进入具体章节。<br />完整资料可直接在 Notion 中阅读。</p></header>
      <KnowledgeWheel chapters={notionChapters} />
      <nav className="library-directory" aria-label="知识库主题目录">{notionChapters.map(chapter => <a key={chapter.slug} href={`#${chapter.slug}`}><span>{chapter.code}</span>{chapter.title}</a>)}</nav>
      <div className="library-chapters">{notionChapters.map(chapter => <section className="library-chapter" id={chapter.slug} key={chapter.slug} aria-labelledby={`${chapter.slug}-title`}>
        <div className="library-chapter__intro"><span className="library-code">{chapter.code}</span><h3 id={`${chapter.slug}-title`}>{chapter.title}</h3><p>{chapter.summary}</p><ul>{chapter.points.map(point => <li key={point}>{point}</li>)}</ul></div>
        <div className="library-articles">{chapter.articles.map(article => <a key={article.href} href={article.href} target="_blank" rel="noopener noreferrer"><span>{article.title}</span><small>在 Notion 阅读 <b aria-hidden="true">↗</b></small></a>)}</div>
      </section>)}</div>
    </section>
    <PortfolioSection id="notes" code="FROM PRACTICE" title="研究、建模、写作与工程" intro="从自己的研究与工程实践出发，记录问题如何定义、模型如何连接决策，以及成果如何被表达和接续。"><div className="pf-reading-links">{knowledge.map(record => <a key={record.slug} href={"/notes/" + record.slug}><small>{record.code}</small><h3>{record.title}</h3><p>{record.summary}</p><b>阅读笔记 ↗</b></a>)}</div></PortfolioSection>
  </main>;
}
