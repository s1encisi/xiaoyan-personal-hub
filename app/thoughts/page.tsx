import { PageHero } from "../_components/page-hero";
import { PortfolioSection } from "../_components/portfolio";
import { reflections } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/thoughts", title: "个人随想｜闫哲祯", description: "关于研究选择、沟通协作，以及科幻、动画与长跑的个人记录。" });
export default function ThoughtsPage() { return <main id="main-content" className="thoughts-index" tabIndex={-1}><PageHero code="I2" eyebrow="PERSONAL ESSAYS" breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "随想" }]} title={<>在做过的事情里，<br /><span>看见自己的方向。</span></>} description="从本科研究到硕士实践，从一份报告到一段脚步，整理那些逐渐形成的方法、选择和感受。" /><PortfolioSection id="essays" code="WRITING / 2026.09" title="研究、协作与日常"><div className="pf-reading-links">{reflections.map(record => <a key={record.slug} href={"/thoughts/" + record.slug}><small>{record.topic}</small><h3>{record.title}</h3><p>{record.summary}</p><b>阅读全文 ↗</b></a>)}</div></PortfolioSection></main>; }
