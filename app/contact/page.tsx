/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production uses native document navigation. */
import { PageHero } from "../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../_components/portfolio";
import { SocialLinks } from "../_components/social-links";
import { publicIdentity } from "../_data/profiles";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/contact", title: "联系与合作｜闫哲祯", description: "联系闫哲祯，交流机器学习、强化学习、智能体工程与博士研究机会。" });
export default function ContactPage() { return <main id="main-content" className="contact-page" tabIndex={-1}>
  <PageHero code="A2" eyebrow="CONTACT & OPPORTUNITIES" breadcrumbs={[{ label: "首页", href: "/" }, { label: "关于", href: "/about" }, { label: "联系与合作" }]} title={<>期待新的问题，<br /><span>也期待新的同行者。</span></>} description="我关注机器学习、强化学习与智能体工程方向的职业机会，也期待在环境 AI、安全强化学习和智能决策领域继续博士研究。" tone="dark" />
  <PortfolioSection id="email" code="GET IN TOUCH" title="通过邮箱联系我"><a className="pf-contact-email" href={"mailto:" + publicIdentity.email}>{publicIdentity.email}</a><p className="pf-status-note">闫哲祯 · 同济大学资源与环境硕士 · 预计 2027 年 6 月毕业</p></PortfolioSection>
  <PortfolioSection id="topics" code="CONVERSATION STARTERS" title="我们可以从这些方向开始"><div className="pf-reading-links"><a href="/projects"><small>机器学习与决策优化</small><h3>过程预测与优化决策</h3><p>工业表格建模、可解释分析、约束多目标优化和安全强化学习。</p><b>查看研究项目 ↗</b></a><a href="/projects/culab-agent-workbench"><small>AI Agent 与研究软件</small><h3>把工具组织为工作流程</h3><p>Python 服务、前端交互、数值工具、运行管理与可追溯的 Agent 诊断。</p><b>查看 CuLab ↗</b></a><a href="/publications"><small>博士研究与学术交流</small><h3>环境问题与智能方法</h3><p>工业与环境过程的资源效率、能耗建模和智能优化。</p><b>阅读论文与成果 ↗</b></a></div></PortfolioSection>
  <PortfolioSection id="platforms" code="ELSEWHERE" title="在别处找到我"><SocialLinks variant="editorial" /><RecordLinks items={[{ label: "完整个人介绍", href: "/about/profile" }, { label: "教育与实践", href: "/journey" }]} /></PortfolioSection>
</main>; }
