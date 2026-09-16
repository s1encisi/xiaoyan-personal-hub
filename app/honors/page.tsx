import { PageHero } from "../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../_components/portfolio";
import { honorRecords } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/honors", title: "奖学金与荣誉｜闫哲祯", description: "两次国家励志奖学金、学习优秀奖学金（二等）、文体活动奖学金和大连理工大学三好学生。" });
export default function HonorsPage() { return <main id="main-content" className="honors-index" tabIndex={-1}>
  <PageHero code="J3" eyebrow="HONORS" breadcrumbs={[{ label: "首页", href: "/" }, { label: "履历", href: "/journey" }, { label: "奖学金与荣誉" }]} title={<>持续投入，<br /><span>在学习与实践中获得认可。</span></>} description="本科期间连续两个学年获得国家励志奖学金，并获得学习优秀、文体活动奖学金及校三好学生荣誉。" tone="dark" />
  <PortfolioSection id="honors" code="AWARDS / 2021—2022" title="奖学金与荣誉记录"><table className="pf-awards"><caption>按证书授予时间整理</caption><thead><tr><th scope="col">授予时间</th><th scope="col">荣誉</th><th scope="col">级别</th></tr></thead><tbody>{honorRecords.map(record => <tr key={record.slug}><td>{record.date}</td><td><a href={"/honors/" + record.slug}>{record.title}</a></td><td>{record.level}</td></tr>)}</tbody></table><RecordLinks items={[{ label: "教育经历", href: "/education" }, { label: "校园组织与服务", href: "/experience#experience-1" }]} /></PortfolioSection>
</main>; }
