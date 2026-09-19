import { PageHero } from "../_components/page-hero";
import { PortfolioSection, ProjectTiles, RecordLinks } from "../_components/portfolio";
import { projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/projects", title: "研究与项目｜闫哲祯", description: "电商智能体可靠性、强化学习与约束决策、机器学习建模和研究软件，连接多种实际应用。" });
export default function ProjectsPage() {
  return <main id="main-content" className="projects-index" tabIndex={-1}>
    <PageHero code="R1" eyebrow="RESEARCH & ENGINEERING" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究", href: "/research" }, { label: "研究与项目" }]} title={<>把智能方法，<br /><span>做成可运行的系统。</span></>} description="从机器学习预测到强化学习决策，再到智能体执行与研究软件。每个案例都呈现具体问题、个人工作和结果依据。" tone="dark" />
    <PortfolioSection id="featured-projects" code="01 / SELECTED WORK" title="机器学习与智能体工程" intro="方法如何被实现、运行与验证，是这些项目共同的主线。"><ProjectTiles items={projects.filter(project => ["reliable-commerce-agents", "safe-reinforcement-learning", "culab-agent-workbench", "wastewater-energy-tabpfn"].includes(project.slug))} /></PortfolioSection>
    <PortfolioSection id="method-studies" code="02 / METHODS" title="从方法进入应用场景" intro="铜电积与能耗研究为预测、约束优化和解释分析提供了具体的应用问题。"><ProjectTiles variant="rows" items={projects.filter(project => ["copper-electrowinning-surrogate", "electrolyte-purification-optimization", "causal-explainable-industrial-ai"].includes(project.slug))} /></PortfolioSection>
    <PortfolioSection id="early-research" code="03 / FOUNDATION" title="本科研究与科研训练"><ProjectTiles variant="rows" items={projects.filter(project => ["urban-rural-ecological-footprint", "land-use-gee", "biochar-arsenic-adsorption"].includes(project.slug))} /><RecordLinks items={[{ label: "论文与报告", href: "/publications" }, { label: "技术能力", href: "/skills" }, { label: "科研与实践经历", href: "/experience" }]} /></PortfolioSection>
  </main>;
}
