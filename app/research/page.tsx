/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { projects, skills } from "../_data/content";

const researchMethod = [
  ["01", "理解过程", "明确对象、变量、数据与约束"],
  ["02", "建立模型", "比较预测、代理与不确定性"],
  ["03", "搜索方案", "处理多目标、可行域与稳健性"],
  ["04", "审查决策", "检验安全、解释与部署边界"],
];

export const metadata = createFixedPageMetadata({
  path: "/research",
  title: "研究中心｜小闫",
  description: "从工业问题、研究专题到技术方法的小闫研究中心。",
});

export default function ResearchPortalPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="02"
        eyebrow="RESEARCH CENTER"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究中心" }]}
        title={<>从问题出发，<br /><span>沿证据链深入。</span></>}
        description="这里是研究内容的总入口：先理解我关注的工业问题，再进入具体研究专题与技术方向。完整项目案例需要项目周期、职责、数据、方法、结果与公开证据。"
        tone="dark"
        aside={<div className="hero-aside-count"><strong>{String(projects.length).padStart(2, "0")}</strong><span>RESEARCH<br />TOPICS</span></div>}
      />

      <section className="portal-section section-shell" aria-labelledby="research-portals-title">
        <div className="section-kicker split-kicker">
          <div><p className="micro-label">EXPLORE / 研究导航</p><h2 id="research-portals-title">选择阅读路径</h2></div>
          <p>专题页解释“正在研究什么”，能力页说明“如何开展研究”。二者通过详情页互相连接。</p>
        </div>
        <div className="portal-grid">
          <a className="portal-card" href="/projects">
            <span>01 / RESEARCH AGENDAS</span><strong>研究专题</strong><p>查看研究问题、方法路线、评价重点与公开边界。</p><b>{projects.length} 个专题 ↗</b>
          </a>
          <a className="portal-card" href="/skills">
            <span>02 / CAPABILITIES</span><strong>技术能力</strong><p>查看工业过程建模、优化、安全决策与可信解释的方法体系。</p><b>{skills.length} 个方向 ↗</b>
          </a>
        </div>
      </section>

      <section className="research-method section-shell" aria-labelledby="research-method-title">
        <div className="section-kicker split-kicker">
          <div><p className="micro-label">METHOD / 研究工作链</p><h2 id="research-method-title">从过程理解到决策审查</h2></div>
          <p>四个步骤构成共同的方法骨架；具体问题、评价和边界进入项目与能力详情页阅读。</p>
        </div>
        <ol className="research-method-track">
          {researchMethod.map(([step, title, description]) => (
            <li key={step}><span>{step}</span><strong>{title}</strong><p>{description}</p></li>
          ))}
        </ol>
      </section>
    </main>
  );
}
