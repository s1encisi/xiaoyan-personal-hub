import { PageHero } from "../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../_components/portfolio";
import { experienceRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
import { PageContents } from "../_components/page-contents";
export const metadata = createFixedPageMetadata({ path: "/experience", title: "科研与实践｜闫哲祯", description: "国家重点研发计划、企业与机关实习、图书馆服务、校园融媒体和学生组织经历。" });
export default function ExperiencePage() { const groups = [{ title: "科研、工程与实习", code: "01 / RESEARCH & INTERNSHIPS", slugs: ["masters-research", "jincheng-talent-internship", "dongdaor-internship"] }, { title: "组织、传播与公共服务", code: "02 / LEADERSHIP & SERVICE", slugs: ["tongji-library", "tongji-class-communication", "dut-student-affairs", "dut-sunshine-association", "dut-international-media", "nature-education"] }, { title: "走进技术现场", code: "03 / INDUSTRY VISITS", slugs: ["hangzhou-tech-visit"] }]; return <main id="main-content" tabIndex={-1}>
  <PageHero code="J2" eyebrow="EXPERIENCE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "履历", href: "/journey" }, { label: "科研与实践" }]} title={<>在真实任务中，<br /><span>建立分析、协作与交付能力。</span></>} description="既参与工业数据与算法研究，也经历企业实验、机关调研、读者服务与校园组织。不同场景共同训练我把问题理清、把事情推进、把结果讲明白。" tone="dark" />
  <div className="section-overview section-shell"><PageContents label="按经历浏览" items={groups.map((group, i) => ({ id: "experience-" + i, label: group.title }))} /></div>
  {groups.map((group, i) => <PortfolioSection key={group.title} id={"experience-" + i} code={group.code} title={group.title}><ol className="pf-timeline">{experienceRecords.filter(record => group.slugs.includes(record.slug)).map(record => <li key={record.slug}><span className="pf-period">{record.period}</span><div><p className="pf-role">{record.type} · {record.role}</p><h3><a href={"/experience/" + record.slug}>{record.title}</a></h3><p>{record.summary}</p><RecordLinks items={[{ label: record.type === "行业参访" ? "参访图文与思考" : "工作内容与交付", href: "/experience/" + record.slug }]} /></div></li>)}</ol></PortfolioSection>)}
</main>; }
