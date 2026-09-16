import { PageHero } from "../_components/page-hero";
import { PortfolioSection, PortfolioStats, PublicationList, RecordLinks } from "../_components/portfolio";
import { publicationRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/outputs", title: "论文与项目成果｜闫哲祯", description: "从已发表论文、研究稿件到可运行的研究工作台，了解闫哲祯的研究与工程成果。" });
export default function OutputsPage() { return <main id="main-content" className="outputs-index" tabIndex={-1}>
  <PageHero code="03" eyebrow="RESEARCH OUTPUTS" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果" }]} title={<>让研究，<br /><span>留下可阅读、可使用的成果。</span></>} description="论文记录方法与发现，软件连接模型与使用者。从铜电积预测到约束优化，再到环境能耗分析，成果围绕真实问题持续展开。" tone="dark" />
  <PortfolioSection id="output-overview" code="SELECTED OUTPUTS" title="论文、算法与研究软件"><PortfolioStats items={[{ value: "1 篇", label: "第一作者期刊论文已发表" }, { value: "2 篇", label: "第一作者论文修回或在审" }, { value: "ESRL-CMO", label: "可解释安全强化学习研究" }, { value: "CuLab", label: "铜电积研究与 Agent 工作台" }]} /><RecordLinks items={[{ label: "全部论文与报告", href: "/publications" }, { label: "项目成果与交付", href: "/outputs/project-results" }]} /></PortfolioSection>
  <PortfolioSection id="selected-publications" code="PUBLICATIONS" title="代表性研究"><PublicationList items={publicationRecords.slice(0, 3)} /></PortfolioSection>
</main>; }
