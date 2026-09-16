import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getExperience, experienceRecords } from "../../_data/content";
import { PhotoGallery } from "../../_components/field-notes";
import { experiencePhotos } from "../../_data/field-notes";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return experienceRecords.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getExperience(slug); if (!record) return { title: "经历未找到｜闫哲祯" }; return { title: record.title + "｜闫哲祯", description: record.summary, alternates: { canonical: "/experience/" + slug }, openGraph: { title: record.title, description: record.summary, images: [] }, twitter: { card: "summary", title: record.title, description: record.summary, images: [] } }; }
export default async function ExperienceDetailPage({ params }: Props) { const { slug } = await params; const record = getExperience(slug); if (!record) notFound(); const photos = experiencePhotos[slug]; const isVisit = record.type === "行业参访"; return <main id="main-content" className="record-page experience-detail" tabIndex={-1}>
  <PageHero code={record.code} eyebrow={record.type + " / " + record.period} breadcrumbs={[{ label: "首页", href: "/" }, { label: "科研与实践", href: "/experience" }, { label: record.title }]} title={record.title} description={record.summary} tone="dark" density="detail" />
  <div className="record-content section-shell"><PortfolioSection density="chapter" id="role" code="01 / CONTEXT" title="经历与角色"><dl className="pf-facts"><div><dt>机构</dt><dd>{record.organization}</dd></div><div><dt>角色</dt><dd>{record.role}</dd></div><div><dt>时间</dt><dd>{record.period}</dd></div><div><dt>地点</dt><dd>{record.location}</dd></div></dl></PortfolioSection>
  <PortfolioSection density="chapter" id="contribution" code={isVisit ? "02 / FIELD VISIT" : "02 / MY WORK"} title={isVisit ? "参访与观察" : "我承担的工作"}><ol className="pf-result-list">{record.responsibilities.map(item => <li key={item}>{item}</li>)}</ol>{photos && <PhotoGallery photos={photos} />}</PortfolioSection>
  <PortfolioSection density="chapter" id="outputs" code={isVisit ? "03 / PERSPECTIVE" : "03 / DELIVERED"} title={isVisit ? "从产品现场回看研究" : "交付与积累"}><div className="pf-prose">{record.outputs.map(item => <p key={item}>{item}</p>)}</div><RecordLinks items={[...(isVisit ? [{ label: "参访之后的杭州周末", href: "/life/travel-walks#hangzhou-weekend" }] : []), { label: "全部科研与实践", href: "/experience" }, { label: "个人介绍", href: "/about/profile" }]} /></PortfolioSection>
</div></main>; }
