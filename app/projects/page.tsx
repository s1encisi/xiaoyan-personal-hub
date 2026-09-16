import { PageHero } from "../_components/page-hero";
import { PortfolioSection, ProjectTiles, RecordLinks } from "../_components/portfolio";
import { projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/projects", title: "研究与项目｜闫哲祯", description: "铜电积预测与优化、CuLab Agent 工作台、污水处理能耗预测，以及本科生态足迹和遥感研究。" });
export default function ProjectsPage() {
  return <main id="main-content" className="projects-index" tabIndex={-1}>
    <PageHero code="R1" eyebrow="RESEARCH & ENGINEERING" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究", href: "/research" }, { label: "研究与项目" }]} title={<>把复杂过程，<br /><span>变成可用的模型与方案。</span></>} description="从区域生态分析走向工业智能：以真实数据建立预测模型，以优化方法生成操作方案，再用软件把分析、比较和解释连接起来。" tone="dark" />
    <PortfolioSection id="featured-projects" code="01 / SELECTED WORK" title="工业智能与工程系统" intro="围绕铜电积与污水处理，呈现研究问题、本人承担的工作、方法及结果。"><ProjectTiles items={projects.filter(project => ["copper-electrowinning-surrogate", "electrolyte-purification-optimization", "culab-agent-workbench", "wastewater-energy-tabpfn"].includes(project.slug))} /></PortfolioSection>
    <PortfolioSection id="method-studies" code="02 / METHODS" title="把方法展开讲清楚" intro="这两篇方法专题展开铜电积与能耗研究中的策略学习和解释分析。"><ProjectTiles variant="rows" items={projects.filter(project => ["safe-reinforcement-learning", "causal-explainable-industrial-ai"].includes(project.slug))} /></PortfolioSection>
    <PortfolioSection id="early-research" code="03 / FOUNDATION" title="本科研究与科研训练"><ProjectTiles variant="rows" items={projects.slice(6)} /><RecordLinks items={[{ label: "论文与报告", href: "/publications" }, { label: "技术能力", href: "/skills" }, { label: "科研与实践经历", href: "/experience" }]} /></PortfolioSection>
  </main>;
}
