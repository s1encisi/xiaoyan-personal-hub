import { PageHero } from "../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../_components/portfolio";
import { educationRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/education", title: "教育经历｜闫哲祯", description: "同济大学资源与环境硕士，大连理工大学环境工程本科。" });
export default function EducationPage() { return <main id="main-content" className="education-index" tabIndex={-1}>
  <PageHero code="J1" eyebrow="EDUCATION" breadcrumbs={[{ label: "首页", href: "/" }, { label: "履历", href: "/journey" }, { label: "教育经历" }]} title={<>从环境工程，<br /><span>走向工业智能。</span></>} description="在大连建立环境过程与空间分析基础，在同济把机器学习、优化与软件工程接入真实工业问题。" tone="dark" />
  <PortfolioSection id="education" code="2020—2027" title="两段学习经历，一条持续深入的问题线"><ol className="pf-timeline">{educationRecords.map(record => <li key={record.slug}><span className="pf-period">{record.period}</span><div><p className="pf-role">{record.school} · {record.level}</p><h3><a href={"/education/" + record.slug}>{record.title}</a></h3><p>{record.summary}</p><ul>{record.details.slice(0, 2).map(detail => <li key={detail}>{detail}</li>)}</ul><RecordLinks items={[{ label: "了解这一阶段", href: "/education/" + record.slug }]} /></div></li>)}</ol></PortfolioSection>
</main>; }
