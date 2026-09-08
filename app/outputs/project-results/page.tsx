/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../../_components/page-hero";
import { RequirementNotice } from "../../_components/requirement-notice";
import { SectionHeading } from "../../_components/section-heading";
import { StatusBadge } from "../../_components/status-badge";
import { projects } from "../../_data/content";
import { researchAgendaDetails } from "../../_data/editorial";
import { createFixedPageMetadata } from "../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/outputs/project-results",
  title: "项目成果｜小闫",
  description: "小闫研究主题的成果索引；性能、论文、代码与工业验证仅在核实后公开。",
});

const resultLevels = [
  { code: "L1", title: "问题与方案", description: "研究对象、问题定义、方法路线和个人角色能够被说明。" },
  { code: "L2", title: "实验与比较", description: "数据、基线、配置、重复实验、失败案例和结果表完整。" },
  { code: "L3", title: "公开产物", description: "论文、报告、代码、数据或演示可以通过稳定链接核查。" },
  { code: "L4", title: "场景验证", description: "部署环境、约束、使用反馈和适用边界有真实记录。" },
];

export default function ProjectResultsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="O2"
        eyebrow="PROJECT RESULTS"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果中心", href: "/outputs" }, { label: "项目成果" }]}
        title={<>从研究议程，<br /><span>走向可核查成果。</span></>}
        description="四个方向目前公开的是研究问题、方法判断与验证计划，不等同于已经完成的项目。这里明确每个方向还缺少哪些事实，避免用概念性描述替代真实成果。"
        tone="dark"
        aside={<div className="publication-axis" aria-hidden="true"><span>TOPIC</span><i /><span>RESULT</span><i /><span>VALIDATION</span></div>}
      />

      <section className="result-standard section-shell" aria-labelledby="result-standard-title">
        <SectionHeading eyebrow="DISCLOSURE STANDARD / 公开标准" id="result-standard-title" title="成果要公开到哪一层，取决于证据走到了哪一步" description={<p>研究方向可以解释问题意识，项目成果必须进一步回答“我具体做了什么、得到什么、怎样确认”。下列四级不是荣誉排序，而是资料完整度。</p>} density="editorial" />
        <ol className="result-levels">
          {resultLevels.map((item) => <li key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}
        </ol>
      </section>

      <section className="project-evidence-index section-shell" aria-labelledby="project-results-title">
        <SectionHeading eyebrow="AGENDA INDEX / 研究方向" id="project-results-title" title="四条研究议程的证据准备状态" description={<p>点击可进入完整专题，查看问题背景、关键决策、方法路线、评价底线以及逐项资料清单。</p>} />
        <div className="project-evidence-list">
          {projects.map((project) => {
            const detail = researchAgendaDetails[project.slug];
            return (
              <article key={project.slug}>
                <div className="project-evidence-code"><span>{project.index}</span><StatusBadge status={project.status} /></div>
                <div><small>{project.category}</small><h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3><p>{project.question}</p><dl><div><dt>当前可读</dt><dd>{project.route.length} 步方法路线 · {detail.decisions.length} 个关键决策 · {detail.nextQuestions.length} 个开放问题</dd></div><div><dt>尚缺证据</dt><dd>{detail.requirements.flatMap((group) => group.items).length} 项项目身份、实验结果与个人贡献材料</dd></div></dl></div>
                <a className="text-link" href={`/projects/${project.slug}`}>查看专题与资料清单 <span>→</span></a>
              </article>
            );
          })}
        </div>
      </section>

      <RequirementNotice id="project-results-requirements-title" groups={researchAgendaDetails[projects[0].slug].requirements} title="把任一研究方向升级为真实项目成果，需要这些核心材料" intro="先选择一项最成熟的研究工作，提供项目身份、实验原始记录、个人贡献和公开产物；资料确认后再生成对应的成果详情页。" />

      <section className="section-actions section-shell" aria-label="项目成果导航"><div><p className="micro-label">NEXT / 继续浏览</p><h2>在研究问题与公开成果之间往返</h2></div><div><a className="text-link" href="/projects">查看研究专题 <span>→</span></a><a className="text-link" href="/publications">查看论文档案 <span>→</span></a></div></section>
    </main>
  );
}
