import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getEducation, educationRecords } from "../../_data/content";
import { RecordReading } from "../../_components/record-reading";
import { educationReading } from "../../_data/portfolio-reading";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return educationRecords.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getEducation(slug); if (!record) return { title: "教育经历未找到｜闫哲祯" }; return { title: record.title + "｜闫哲祯", description: record.summary, alternates: { canonical: "/education/" + slug }, openGraph: { title: record.title, description: record.summary, images: [] }, twitter: { card: "summary", title: record.title, description: record.summary, images: [] } }; }
export default async function EducationDetailPage({ params }: Props) { const { slug } = await params; const record = getEducation(slug); if (!record) notFound(); return <main id="main-content" className="record-page education-detail" tabIndex={-1}>
  <PageHero code={record.code} eyebrow={record.period} breadcrumbs={[{ label: "首页", href: "/" }, { label: "教育经历", href: "/education" }, { label: record.institution }]} title={record.title} description={record.summary} tone="dark" density="detail" />
  <div className="record-content section-shell"><PortfolioSection density="chapter" id="education-profile" code="01 / PROFILE" title="培养与研究背景"><dl className="pf-facts">{[{ label: "学校", value: record.institution }, { label: "院系", value: record.school }, { label: "专业", value: record.major }, { label: "指导教师", value: record.supervisor }, { label: "时间", value: record.period }, { label: "城市", value: record.location }].map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></PortfolioSection>
  <PortfolioSection density="chapter" id="education-work" code="02 / LEARNING & RESEARCH" title="这一阶段的学习与成果"><ol className="pf-result-list">{record.details.map(item => <li key={item}>{item}</li>)}</ol><RecordLinks items={slug === "masters-stage" ? [{ label: "硕士科研与工程经历", href: "/experience/masters-research" }, { label: "论文与报告", href: "/publications" }] : [{ label: "本科毕业研究", href: "/projects/urban-rural-ecological-footprint" }, { label: "校园组织经历", href: "/experience/dut-sunshine-association" }]} /></PortfolioSection>
  <RecordReading prefix="education-reading" sections={educationReading[slug]} />
</div></main>; }
