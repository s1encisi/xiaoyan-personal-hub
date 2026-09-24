/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native document navigation and local artwork. */
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Viewport } from "next";
import { SocialLinks } from "./_components/social-links";
import { ToolLoop, CapabilitiesBento, MotionReveal, ProjectImageSwap } from "./_components/effects/ai-effects";
import { P3RHero, AgentFeature } from "./_components/home/p3r-experience";
import { featuredAIProjects } from "./_data/ai-practice";
import { FieldHighlights } from "./_components/field-notes";
import { getFieldNote } from "./_data/field-notes";
import "./ai-home.css";
import "./p3r-home.css";

const abstracts: Record<string, { src: string; alt: string }> = {
  "reliable-commerce-agents": { src: "/images/home-p3r/commerce-abstract.webp", alt: "电商可靠执行图形摘要：申请、校验、人工审批、原子提交与业务回执，以及不确定结果的核实路径" },
  "safe-reinforcement-learning": { src: "/images/home-p3r/policy-abstract.webp", alt: "约束策略学习图形摘要：状态与偏好输入策略，在代理环境中获得奖励与约束反馈" },
  "wastewater-energy-tabpfn": { src: "/images/home-p3r/tabpfn-abstract.webp", alt: "TabPFN 图形摘要：表格数据经过模型分别预测总电耗和单位水量电耗，并进行评价" },
  "culab-agent-workbench": { src: "/images/home-p3r/culab-abstract.webp", alt: "CuLab 图形摘要：组织建模、优化和诊断工具，通过运行记录连接输入与可追溯的结果" },
};
export const viewport: Viewport = { colorScheme: "light", themeColor: "#0055ed" };
export default function Home() {
  return <main id="main-content" className="celestial-home ai-home p3r-home" tabIndex={-1}>
    <P3RHero />
    <section id="ai-practice" className="ai-practice section-shell" aria-labelledby="ai-practice-title"><MotionReveal><div className="ai-section-heading"><h2 id="ai-practice-title">从模型理解，<br />到工程落地。</h2><p>研究如何学习，也关心如何行动。<br />用实际项目连接预测、决策与可靠执行。</p></div><CapabilitiesBento /></MotionReveal><div className="ai-tools-intro"><p>熟练使用的开发与智能体工具</p><span>需求梳理 · 工具编排 · 实现验证</span></div><ToolLoop /></section>
    <section className="ai-projects section-shell" id="research-agenda" aria-labelledby="ai-projects-title"><MotionReveal><header className="ai-section-heading"><div><p className="p3r-section-label">SELECTED WORK</p><h2 id="ai-projects-title">研究与工程</h2></div><p>机器学习、强化学习与智能体，<br />在不同问题里形成具体工作。</p></header><div className="ai-project-grid">{featuredAIProjects.map(project => <a key={project.slug} className="ai-project-card" href={`/projects/${project.slug}`}><div className="ai-project-card__image"><img src={abstracts[project.slug].src} alt={abstracts[project.slug].alt} width={1672} height={941} loading="lazy" /></div><div><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><span>阅读案例 <ArrowUpRight size={19} aria-hidden="true" /></span></div></a>)}</div></MotionReveal><a className="ai-all-projects" href="/projects">全部项目与应用案例 <ArrowRight size={20} /></a></section>
    <AgentFeature />
    <section className="ai-commerce section-shell" aria-labelledby="commerce-title"><MotionReveal><div className="ai-section-heading"><h2 id="commerce-title">工具调用之后，<br />事情真的完成了吗？</h2><p>在开源电商多智能体平台中，<br />围绕退货申请补强审批、提交与结果确认。</p></div><ProjectImageSwap /><div className="ai-commerce__foot"><p>基于开源平台的可靠性升级，清楚保留上游与个人增量的边界。</p><a href="/projects/reliable-commerce-agents">了解完整工程案例 <ArrowUpRight size={19} /></a></div></MotionReveal></section>
    <section className="ai-about-band section-shell"><div><h2>有方法，也有真实场景。</h2><p>环境工程与工业研究是我的专业起点。铜电积、污水能耗和电商售后，是检验模型与系统的不同场景。我的关注始终沿着机器学习、决策优化与智能体工程展开。</p></div><nav aria-label="个人背景与成果"><a href="/publications">论文与研究成果 <ArrowUpRight size={18} /></a><a href="/journey">教育与实践 <ArrowUpRight size={18} /></a><a href="/notes">知识库与持续学习 <ArrowUpRight size={18} /></a></nav></section>
    <section className="ai-life section-shell" aria-labelledby="ai-life-title"><MotionReveal><header className="ai-section-heading"><h2 id="ai-life-title">对世界的好奇，<br />也留在生活里。</h2><p>动画、游戏、旅行、天文和音乐，<br />是研究之外同样具体的喜欢。</p></header><FieldHighlights notes={[getFieldNote("astronomy-and-dishui"),getFieldNote("wuthering-waves-live"),getFieldNote("hangzhou-weekend")]} /><nav className="ai-life-links" aria-label="生活与兴趣"><a href="/life/animation">动画与影评 <ArrowUpRight size={18} /></a><a href="/life/gaming">游戏足迹 <ArrowUpRight size={18} /></a><a href="/life/journal">日常图文 <ArrowUpRight size={18} /></a><a href="/life">更多生活记录 <ArrowUpRight size={18} /></a></nav></MotionReveal></section>
    <section className="ai-connect section-shell" aria-labelledby="ai-connect-title"><p className="p3r-section-label">LET US CONNECT</p><h2 id="ai-connect-title">从一个问题，<br />开始新的交流。</h2><p>欢迎交流机器学习、强化学习、智能体工程与相关研究机会。</p><a className="ai-connect__mail" href="mailto:2431509@tongji.edu.cn">2431509@tongji.edu.cn <ArrowUpRight size={26} /></a><SocialLinks variant="editorial" /></section>
  </main>;
}
