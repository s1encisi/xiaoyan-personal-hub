import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { ProjectRow } from "../_components/project-row";
import { projects } from "../_data/content";

export const metadata = createFixedPageMetadata({
  path: "/projects",
  title: "研究专题｜小闫",
  description: "小闫围绕工业过程建模、多目标优化、安全强化学习与可信工业智能开展的研究主题。",
});

const systemSteps = [
  ["01", "理解过程", "对象、变量、数据与约束"],
  ["02", "建立模型", "预测、代理与不确定性"],
  ["03", "搜索方案", "多目标、可行域与稳健性"],
  ["04", "审查决策", "安全、解释与部署边界"],
];

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="R1"
        eyebrow="RESEARCH AGENDAS"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究中心", href: "/research" }, { label: "研究专题" }]}
        title={<>围绕真实问题，<br /><span>建立可验证的研究链路。</span></>}
        description="当前页面首先呈现我的研究主题。正式项目名称、时间、职责、数据来源和结果仅在核实后公开。"
        tone="dark"
        aside={<div className="hero-aside-count"><strong>{String(projects.length).padStart(2, "0")}</strong><span>RESEARCH<br />TOPICS</span></div>}
      />

      <section className="system-route section-shell" aria-labelledby="system-route-title">
        <div className="section-kicker">
          <p className="micro-label">RESEARCH SYSTEM / 研究路径</p>
          <h2 id="system-route-title">从过程数据到可信决策</h2>
        </div>
        <ol className="system-route-track">
          {systemSteps.map(([step, title, text]) => (
            <li key={step}>
              <span>{step}</span><strong>{title}</strong><p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="project-index section-shell" aria-labelledby="project-index-title">
        <div className="section-kicker split-kicker">
          <div>
            <p className="micro-label">INDEX / 研究专题</p>
            <h2 id="project-index-title">{projects.length} 个相互连接的方向</h2>
          </div>
          <p>每个详情页都按“问题、方法、评价、边界”展开，避免只展示漂亮的结果。</p>
        </div>
        <div className="project-index-list">
          {projects.map((project) => <ProjectRow key={project.slug} project={project} />)}
        </div>
      </section>
    </main>
  );
}
