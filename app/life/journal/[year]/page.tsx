import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../../_components/page-hero";
import { JournalStory, JournalYearNav } from "../../../_components/journal";
import { journalEntries, journalYears } from "../../../_data/journal";
import "../journal.css";

type Props={params:Promise<{year:string}>};
export function generateStaticParams(){return journalYears.map(year=>({year}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {year}=await params;if(!journalYears.includes(year))return {title:"日常记录未找到｜闫哲祯"};const title=`${year} 日常图文｜闫哲祯`;const description=`${year} 年的校园、旅行、演出与日常记录。`;return {title,description,alternates:{canonical:`/life/journal/${year}`},openGraph:{title,description,url:`/life/journal/${year}`,images:[]},twitter:{card:"summary",title,description,images:[]}};}
export default async function JournalYearPage({params}:Props){const {year}=await params;if(!journalYears.includes(year))notFound();const entries=journalEntries.filter(entry=>entry.year===year);
  return <main id="main-content" className="journal-page journal-year-page" tabIndex={-1}>
    <PageHero code="L / JOURNAL" eyebrow={`${year} / MOMENTS`} breadcrumbs={[{label:"首页",href:"/"},{label:"生活",href:"/life"},{label:"日常图文",href:"/life/journal"},{label:year}]} title={<>这一年，<span>{year}。</span></>} description={`${entries.length} 则记录。日期表示写下这段文字的时间，照片保留当时的现场与观看记录。`} density="detail" />
    <div className="section-shell journal-year-content"><JournalYearNav current={year} />
      <details className="journal-index-details" id="year-directory"><summary>这一年的目录 <span>{entries.length} 则记录</span></summary><nav className="journal-directory" aria-label={`${year} 年图文目录`}>{entries.map(entry=><a href={`#entry-${entry.slug}`} key={entry.slug}><time dateTime={entry.date}>{entry.date.slice(5).replace("-",".")}</time><span>{entry.title}</span></a>)}</nav></details>
      {entries.map(entry=><JournalStory entry={entry} key={entry.slug} />)}
    </div>
  </main>;
}
