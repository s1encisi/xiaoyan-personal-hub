import { PageHero } from "../_components/page-hero";
import { PortfolioSection, PortfolioStats, PublicationList } from "../_components/portfolio";
import { publicationRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/publications", title: "论文与报告｜闫哲祯", description: "闫哲祯的已发表论文、修回与在审研究、学术会议展示和本科毕业论文。" });
export default function PublicationsPage() { return <main id="main-content" className="publication-index" tabIndex={-1}>
  <PageHero code="O1" eyebrow="PUBLICATIONS & RESEARCH" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果", href: "/outputs" }, { label: "论文与报告" }]} title={<>从研究问题，<br /><span>走向具体成果。</span></>} description="围绕工业预测、资源高效回收与环境能耗，持续完成模型研究、实验分析和学术表达。" tone="dark" />
  <PortfolioSection id="publication-overview" code="AT A GLANCE" title="第一作者研究成果"><PortfolioStats items={[{ value: "1 篇", label: "期刊论文已发表" }, { value: "1 篇", label: "Journal of Cleaner Production 修回中" }, { value: "1 篇", label: "Water Environment Research 在审" }, { value: "2025", label: "学术会议海报展示" }]} /><p className="pf-status-note">论文状态更新于 2026 年 9 月 10 日。</p></PortfolioSection>
  <PortfolioSection id="papers" code="01 / JOURNAL RESEARCH" title="期刊论文与研究稿件"><PublicationList items={publicationRecords.slice(0, 3)} /></PortfolioSection>
  <PortfolioSection id="other-outputs" code="02 / THESIS & PRESENTATION" title="学位论文与学术展示"><PublicationList items={publicationRecords.slice(3)} /></PortfolioSection>
</main>; }
