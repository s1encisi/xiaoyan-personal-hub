/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/outputs",
  title: "成果中心｜小闫",
  description: "成果档案与证据要求总览；未经核实的论文、项目结果和公开链接不作推断。",
});

const evidenceChain = [
  { code: "01", title: "身份", description: "题名、时间、机构、合作者与成果状态先构成一条唯一记录。" },
  { code: "02", title: "过程", description: "问题、数据、方法、约束和关键选择解释成果如何形成。" },
  { code: "03", title: "贡献", description: "个人负责的代码、实验、分析与写作必须和团队工作区分。" },
  { code: "04", title: "结果", description: "数值、对比、失败案例和限制共同界定成果能够说明什么。" },
  { code: "05", title: "证明", description: "论文、仓库、报告、数据或官方页面让记录能够被外部核查。" },
];

export default function OutputsPortalPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="03"
        eyebrow="OUTPUTS CENTER"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果中心" }]}
        title={<>成果不只是一行标题，<br /><span>而是一条完整证据链。</span></>}
        description="这里把论文、项目产出与可公开证据连接起来。没有核实的题名、数值或成果状态不会被补写，现阶段公开的是档案结构与明确的资料边界。"
        tone="dark"
        aside={<div className="publication-axis" aria-hidden="true"><span>CONTEXT</span><i /><span>CONTRIBUTION</span><i /><span>PROOF</span></div>}
      />

      <section className="output-architecture section-shell" aria-labelledby="output-architecture-title">
        <SectionHeading
          eyebrow="EVIDENCE ARCHITECTURE / 成果结构"
          id="output-architecture-title"
          title="别人真正需要知道的，不只是“做过什么”"
          description={<p>一条可信成果记录应让读者看见问题从哪里来、我承担了什么、结果如何验证，以及哪些结论仍有限制。</p>}
          density="editorial"
        />
        <ol className="evidence-chain">
          {evidenceChain.map((item) => (
            <li key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.description}</p></li>
          ))}
        </ol>
      </section>

      <section className="output-portals section-shell" aria-labelledby="outputs-portals-title">
        <SectionHeading
          eyebrow="EXPLORE / 成果导航"
          id="outputs-portals-title"
          title="两条互补的阅读路径"
          description={<p>论文页按题录和学术贡献组织；项目成果页按研究议题、阶段产出与验证证据组织。两者最终会通过同一研究项目互相连接。</p>}
        />
        <div className="output-portal-ledger">
          <a href="/publications"><span>O1</span><div><small>PUBLICATIONS</small><h3>论文与公开成果</h3><p>查看题录结构、成果状态、主要贡献与公开链接需要怎样被完整记录。</p></div><b>进入论文档案 ↗</b></a>
          <a href="/outputs/project-results"><span>O2</span><div><small>PROJECT RESULTS</small><h3>项目成果与验证记录</h3><p>沿四条研究议程查看预期产出、证据缺口与将来可公开的结果层级。</p></div><b>进入成果索引 ↗</b></a>
        </div>
      </section>

      <RequirementNotice
        id="outputs-requirements-title"
        groups={globalContentRequirements.publications}
        title="建立第一条可公开成果记录，需要这些材料"
        intro="可以从一篇论文、一个报告或一个项目产出开始，不必一次补齐全部档案；但每条记录至少要能说明身份、个人贡献和可核查出处。"
      />
    </main>
  );
}
