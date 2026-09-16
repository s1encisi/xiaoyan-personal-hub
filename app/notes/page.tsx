import { PageHero } from "../_components/page-hero";
import { PortfolioSection } from "../_components/portfolio";
import { knowledge } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/notes", title: "方法与知识笔记｜闫哲祯", description: "结合铜电积、污水能耗、空间生态和 CuLab 实践，整理研究、建模、写作和软件工程方法。" });
export default function NotesPage() { return <main id="main-content" className="notes-index" tabIndex={-1}><PageHero code="I1" eyebrow="METHOD NOTES" breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "知识库" }]} title={<>把项目中的理解，<br /><span>整理成可以继续使用的方法。</span></>} description="从自己的研究与工程实践出发，记录问题如何定义、模型如何连接决策，以及成果如何被表达和接续。" tone="dark" /><PortfolioSection id="notes" code="FOUR PERSPECTIVES" title="研究、建模、写作与工程"><div className="pf-reading-links">{knowledge.map(record => <a key={record.slug} href={"/notes/" + record.slug}><small>{record.code}</small><h3>{record.title}</h3><p>{record.summary}</p><b>阅读笔记 ↗</b></a>)}</div></PortfolioSection></main>; }
