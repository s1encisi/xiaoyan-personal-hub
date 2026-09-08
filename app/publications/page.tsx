import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { StatusBadge } from "../_components/status-badge";
import { publicationRecords } from "../_data/content";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/publications", title: "论文与报告｜小闫", description: "论文、报告与研究成果的档案框架；资料未完整的记录会直接列出所需信息。" });

const archiveFields = [
  { label: "题录", value: "题名、作者、年份、刊物与状态", note: "建立唯一、可引用的成果身份。" },
  { label: "内容", value: "问题、方法、关键结果与限制", note: "让摘要之外的贡献可以被理解。" },
  { label: "角色", value: "研究、代码、实验、分析与写作", note: "区分个人贡献与团队共同完成。" },
  { label: "链接", value: "DOI、预印本、代码、数据与报告", note: "提供可核查、可持续访问的出处。" },
];

export default function PublicationsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="O1" eyebrow="PUBLICATIONS & OUTPUTS" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果中心", href: "/outputs" }, { label: "论文与报告" }]} title={<>论文不是列表，<br /><span>而是研究贡献的索引。</span></>} description="这一档案只收录能够核实身份、状态和公开出处的论文、会议成果、预印本或报告。当前尚未获得可公开题录，因此不会制造论文名称、作者或 DOI。" tone="dark" aside={<div className="publication-axis" aria-hidden="true"><span>REF</span><i /><span>ROLE</span><i /><span>DOI</span></div>} />

      <section className="publication-schema section-shell" aria-labelledby="publication-schema-title">
        <SectionHeading eyebrow="ARCHIVE SCHEMA / 档案结构" id="publication-schema-title" title="每条成果记录会回答四组问题" description={<p>这样组织后，读者既可以快速浏览题录，也能进入详情理解研究语境、个人贡献和证据边界。</p>} />
        <dl className="publication-field-grid">
          {archiveFields.map((field, index) => <div key={field.label}><span>{String(index + 1).padStart(2, "0")}</span><dt>{field.label}</dt><dd><strong>{field.value}</strong><p>{field.note}</p></dd></div>)}
        </dl>
      </section>

      <section className="record-ledger section-shell" aria-labelledby="publication-ledger-title">
        <SectionHeading eyebrow="EVIDENCE PATHS / 资料入口" id="publication-ledger-title" title="尚无经过核实、可公开的论文题录" description={<p>下面分别列出建立论文记录与研究报告记录所需的材料，不代表真实成果，也不会被搜索引擎收录。</p>} density="editorial" />
        <div className="publication-draft-list">
          {publicationRecords.map((record) => <a key={record.slug} href={`/publications/${record.slug}`}><span>{record.code}</span><div><small>{record.type}</small><h3>{record.title}</h3><p>{record.summary}</p></div><StatusBadge status={record.status} /><b>查看所需资料 →</b></a>)}
        </div>
      </section>

      <RequirementNotice id="publication-requirements-title" groups={globalContentRequirements.publications} title="发布第一条正式成果记录，需要这些信息" intro="BibTeX、RIS、论文首页或 DOI 可以先解决题录；个人贡献、主要结果和局限需要另外提供，不能只从作者顺序推断。" />

      <section className="section-actions section-shell" aria-label="成果相关入口"><div><p className="micro-label">RELATED OUTPUTS</p><h2>从论文回到对应的研究问题与项目证据</h2></div><div><a className="text-link" href="/outputs">返回成果中心 <span>←</span></a><a className="text-link" href="/outputs/project-results">查看项目成果 <span>→</span></a></div></section>
    </main>
  );
}
