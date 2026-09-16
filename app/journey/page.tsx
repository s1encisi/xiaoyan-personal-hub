/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production uses native document navigation. */
import { PageHero } from "../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../_components/portfolio";
import { educationRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/journey", title: "教育与成长经历｜闫哲祯", description: "从大连理工大学到同济大学，从区域生态分析到工业智能研究，连接教育、实践与个人成长。" });
export default function JourneyPage() { return <main id="main-content" className="journey-index" tabIndex={-1}>
  <PageHero code="04" eyebrow="JOURNEY" breadcrumbs={[{ label: "首页", href: "/" }, { label: "教育与成长" }]} title={<>不断走进问题，<br /><span>也不断走近人。</span></>} description="从本科的区域生态与校园实践，到硕士的工业智能与工程协作，我持续训练两种能力：把复杂问题分析清楚，把共同的事情推进下去。" tone="dark" />
  <PortfolioSection id="education" code="01 / EDUCATION" title="从大连到上海"><ol className="pf-timeline">{[...educationRecords].reverse().map(record => <li key={record.slug}><span className="pf-period">{record.period}</span><div><p className="pf-role">{record.school}</p><h3><a href={"/education/" + record.slug}>{record.title}</a></h3><p>{record.summary}</p></div></li>)}</ol></PortfolioSection>
  <PortfolioSection id="practice" code="02 / EXPERIENCE" title="课堂之外的训练"><div className="pf-reading-links"><a href="/experience/masters-research"><small>研究与工程</small><h3>把模型连接到工业问题</h3><p>国家重点研发计划中的生产数据、预测模型、优化方案与系统协同。</p><b>查看科研经历 ↗</b></a><a href="/experience/jincheng-talent-internship"><small>实习与调研</small><h3>把材料整理成可用的信息</h3><p>企业实验、机关调研、资料核验与公文写作，连接专业分析和真实组织。</p><b>查看实习经历 ↗</b></a><a href="/experience/dut-sunshine-association"><small>组织与传播</small><h3>把想法组织成共同体验</h3><p>社团管理、校园融媒体、阅读推广和自然教育，持续积累协作与表达。</p><b>查看组织经历 ↗</b></a></div><RecordLinks items={[{ label: "完整实践经历", href: "/experience" }, { label: "奖学金与荣誉", href: "/honors" }, { label: "研究之外", href: "/life" }]} /></PortfolioSection>
</main>; }
