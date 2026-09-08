/* eslint-disable @next/next/no-img-element -- Optimized public profile avatar. */
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../_components/page-hero";
import { SocialLinks } from "../_components/social-links";
import { SectionHeading } from "../_components/section-heading";
import { publicIdentity, publicProfiles } from "../_data/profiles";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({path:"/contact",title:"联系与合作｜小闫",description:"通过小闫的 Bilibili、GitHub 和 Bangumi 公开主页，继续关于研究、技术与动画的交流。"});
const conversationPaths = [
  {href:"/projects/copper-electrowinning-surrogate",title:"过程建模",description:"铜电积、有限数据代理模型、误差与外推边界。"},
  {href:"/projects/electrolyte-purification-optimization",title:"优化决策",description:"电解液净化、多目标权衡、约束与方案选择。"},
  {href:"/projects/safe-reinforcement-learning",title:"安全学习",description:"约束强化学习、风险评估与安全决策。"},
  {href:"/projects/causal-explainable-industrial-ai",title:"可信智能",description:"模型审计、关联解释与因果边界。"},
];
export default function ContactPage() {
  return <main id="main-content" tabIndex={-1}>
    <PageHero code="A2" eyebrow="CONTACT" breadcrumbs={[{label:"首页",href:"/"},{label:"关于",href:"/about"},{label:"联系与合作"}]} title={<>在这里，<br /><span>继续对话。</span></>} description="从一个具体问题、一段代码，或一部喜欢的作品开始。下面三个公开主页，分别记录研究之外的不同侧面。" tone="dark" />
    <section className="contact-platforms section-shell" aria-labelledby="contact-platforms-title"><header className="universe-section-title u-reveal"><h2 id="contact-platforms-title">在别处找到我</h2><p>选一个熟悉的平台，认识更多一点的小闫。</p></header><SocialLinks variant="editorial" /><div className="public-identity u-reveal"><img src="/images/celestial/github-avatar.webp" alt="Zhezhen Yan 的 GitHub 公开头像" width="90" height="90" loading="lazy" /><div><h3>{publicIdentity.englishName}</h3><p>{publicIdentity.affiliation} · {publicIdentity.city}</p><p><a href={publicIdentity.source} target="_blank" rel="noopener noreferrer">GitHub 公开资料 <ArrowUpRight size={13} aria-hidden="true" /></a></p></div></div><p className="public-source-note">公开主页于 {publicIdentity.verifiedAt} 核验。站点保留公开资料的表述，未补写院系、导师和联系方式。</p></section>
    <section className="contact-paths section-shell" aria-labelledby="contact-paths-title"><SectionHeading eyebrow="RESEARCH" id="contact-paths-title" title="从共同关注的问题开始" description={<p>这些研究专题记录了问题、方法路径与需要进一步验证的边界。</p>} /><div className="contact-path-list">{conversationPaths.map((item,index)=><a href={item.href} key={item.href}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight aria-hidden="true" /></a>)}</div></section>
    <section className="contact-extra section-shell"><details><summary>其他联系资料</summary><p>常用邮箱、ORCID、Google Scholar 和公开简历尚未提供。当前可用入口为 {publicProfiles.map(profile=>profile.name).join("、")}；不会生成未经核实的邮箱或外链。</p></details></section>
  </main>;
}
