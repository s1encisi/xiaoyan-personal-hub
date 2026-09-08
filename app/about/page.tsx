import { PageHero } from "../_components/page-hero";
import { SectionHeading } from "../_components/section-heading";
import { createFixedPageMetadata } from "../_data/metadata";

const aboutQuestions = [
  ["01", "过程里真正需要回答什么？", "先确定工艺对象、变量、时间尺度和决策场景。"],
  ["02", "数据能够支持到哪里？", "检查采样、泄漏、漂移、边界工况与外推风险。"],
  ["03", "方法为何适合这个问题？", "比较基线、复杂度、计算成本与可复现性。"],
  ["04", "结论怎样进入真实决策？", "说明约束、风险、解释、回退和人工判断。"],
];

export const metadata = createFixedPageMetadata({
  path: "/about",
  title: "关于我｜小闫",
  description: "了解小闫的研究命题、工作准则与当前关注方向。",
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="01"
        eyebrow="ABOUT"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "关于我" }]}
        title={<>我关注工业问题与<br /><span>可信智能的交叉。</span></>}
        description="关注真实工业过程中的建模、优化与安全决策：既追求方法有效，也关心它为何有效、何时失效。"
        aside={<div className="identity-panel"><span>研究命题</span><strong>可信决策</strong><small>真实过程 · 明确边界</small></div>}
      />

      <section className="about-facts section-shell" aria-labelledby="about-facts-title">
        <SectionHeading id="about-facts-title" eyebrow="RESEARCH POSITION / 研究定位" title="一个研究命题，四个观察坐标" description={<p>从过程对象、建模任务、决策约束和证据边界理解我的研究关注。</p>} />
        <dl className="profile-facts">
          <div><dt>研究命题</dt><dd>理解复杂系统，构建可信决策</dd></div>
          <div><dt>过程对象</dt><dd>铜电积 · 电解液净化</dd></div>
          <div><dt>方法路径</dt><dd>代理建模 · 多目标优化 · 安全强化学习</dd></div>
          <div><dt>判断标准</dt><dd>可解释 · 可验证 · 可复现</dd></div>
        </dl>
      </section>

      <section className="about-question-field section-shell" aria-labelledby="about-question-title">
        <SectionHeading id="about-question-title" eyebrow="HOW TO FRAME A PROBLEM / 问题框架" title="在选择算法之前，这一框架先追问四件事" description={<p>这些问题把研究从方法名称拉回证据链，也构成研究专题、方法和知识页面的共同结构。</p>} />
        <ol>
          {aboutQuestions.map(([index, title, text]) => <li key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </section>

      <section className="section-actions section-shell" aria-label="关于栏目子页面">
        <div>
          <p className="micro-label">EXPLORE / 继续了解</p>
          <h2>继续查看个人档案、研究准则与合作方向</h2>
        </div>
        <div>
          <a className="primary-action" href="/about/profile">查看研究定位与准则 <span>→</span></a>
          <a className="text-link" href="/contact">前往联系与合作 <span>↗</span></a>
        </div>
      </section>

    </main>
  );
}
