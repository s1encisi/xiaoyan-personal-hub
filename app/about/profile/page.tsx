/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../../_components/page-hero";
import { RequirementNotice } from "../../_components/requirement-notice";
import { SectionHeading } from "../../_components/section-heading";
import { animationArchiveCount } from "../../_data/animation/archive";
import { animationReviews } from "../../_data/animation/reviews";
import { profileRequirements } from "../../_data/editorial";
import { createFixedPageMetadata } from "../../_data/metadata";
import { focusAreas, siteInfo } from "../../_data/site";

export const metadata = createFixedPageMetadata({
  path: "/about/profile",
  title: "个人介绍｜关于小闫",
  description: "了解小闫的个人定位、研究对象、方法关注、研究准则与当前阶段。",
});

const researchPrinciples = [
  {
    index: "01",
    title: "从真实问题出发",
    text: "先明确对象、数据边界、目标变量与决策场景，再选择适合的方法。",
  },
  {
    index: "02",
    title: "让评价匹配场景",
    text: "不仅观察平均指标，也检查约束、风险、重复性、边界工况和失败代价。",
  },
  {
    index: "03",
    title: "让结论保持克制",
    text: "区分预测关联、模型解释与因果作用，不让结论越过数据和研究设计。",
  },
];

const researchConnections = [
  { code: "01", title: "过程对象", text: "铜电积与电解液净化提供真实的变量耦合、操作约束和决策语境。" },
  { code: "02", title: "模型层", text: "代理模型让高成本过程能够被更快分析，但必须同时说明误差与可信域。" },
  { code: "03", title: "决策层", text: "多目标优化与安全强化学习处理冲突目标、约束和动态策略。" },
  { code: "04", title: "审查层", text: "可解释与因果机器学习帮助区分模型关联、机制假设和干预结论。" },
];

export default function ProfilePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="A1"
        eyebrow="PERSONAL PROFILE"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "关于", href: "/about" },
          { label: "个人介绍" },
        ]}
        title={<>从工业过程出发，<br /><span>理解可信智能如何进入真实决策。</span></>}
        description="从过程对象、建模任务到决策边界，集中呈现我的研究定位与工作准则。"
        aside={
          <div className="identity-panel" aria-label="研究命题">
            <span>研究命题</span>
            <strong>复杂过程</strong>
            <small>建模 · 优化 · 可信决策</small>
          </div>
        }
      />

      <section className="about-narrative section-shell" aria-labelledby="profile-position-title">
        <div className="section-kicker">
          <p className="micro-label">POSITION / 个人定位</p>
          <h2 id="profile-position-title">把模型放回工艺、约束与决策现场。</h2>
        </div>
        <div className="about-narrative-copy">
          <p className="lead">你好，我是{siteInfo.name}，{siteInfo.role}。</p>
          <p>我的关注位于工业过程、机器学习与优化决策的交叉处，当前主要围绕铜电积与电解液净化展开。</p>
          <p>工作的起点不是先选择复杂算法，而是明确研究对象、数据边界、评价方式，以及模型最终要支持的决策。</p>
        </div>
      </section>

      <section className="about-facts section-shell" aria-labelledby="profile-focus-title">
        <div className="section-kicker split-kicker">
          <div>
            <p className="micro-label">RESEARCH FOCUS / 研究关注</p>
            <h2 id="profile-focus-title">从过程对象到方法与决策</h2>
          </div>
          <p>四个坐标共同回答研究什么、如何建模、支持何种决策，以及怎样判断结论是否可信。</p>
        </div>
        <dl className="profile-facts">
          <div><dt>过程对象</dt><dd>铜电积 · 电解液净化</dd></div>
          <div><dt>建模任务</dt><dd>代理模型 · 误差结构 · 适用边界</dd></div>
          <div><dt>决策任务</dt><dd>多目标优化 · 约束处理 · 安全控制</dd></div>
          <div><dt>可信要求</dt><dd>关联、解释与因果作用明确区分</dd></div>
        </dl>
        <div className="focus-cloud" aria-label="方法关注方向">
          {focusAreas.map((area) => <span key={area}>{area}</span>)}
        </div>
      </section>

      <section className="profile-connection section-shell" aria-labelledby="profile-connection-title">
        <SectionHeading
          id="profile-connection-title"
          eyebrow="WHY THESE DIRECTIONS CONNECT / 研究结构"
          title="这些方向不是并列标签，而是同一条问题链"
          description={<p>公开资料目前可以确认研究关注之间的逻辑关系；真正影响这些选择的个人经历和转折，还需要完整第一人称材料。</p>}
        />
        <ol>
          {researchConnections.map((item) => <li key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}
        </ol>
      </section>

      <section className="principle-section" aria-labelledby="profile-principles-title">
        <div className="section-shell">
          <div className="section-kicker section-kicker-light">
            <p className="micro-label">RESEARCH PRINCIPLES / 研究准则</p>
            <h2 id="profile-principles-title">方法服务于问题，结论服从于证据</h2>
          </div>
          <ol className="principle-list">
            {researchPrinciples.map((principle) => (
              <li key={principle.index}>
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-facts section-shell" aria-labelledby="profile-stage-title">
        <div className="section-kicker split-kicker">
          <div>
            <p className="micro-label">CURRENT FOCUS / 当前关注</p>
            <h2 id="profile-stage-title">连接过程、模型与决策</h2>
          </div>
          <p>目前处于硕士研究阶段，重点梳理能够进入真实工业决策的可信方法链。</p>
        </div>
        <dl className="profile-facts">
          <div><dt>过程与数据</dt><dd>理解工况、采样机制与数据边界</dd></div>
          <div><dt>模型与优化</dt><dd>连接代理建模与多目标方案搜索</dd></div>
          <div><dt>智能与安全</dt><dd>把约束、风险和回退机制放进评价流程</dd></div>
          <div><dt>解释与决策</dt><dd>说明模型能回答什么，也说明不能回答什么</dd></div>
        </dl>
      </section>

      <section className="profile-outside section-shell" aria-labelledby="profile-outside-title">
        <SectionHeading
          id="profile-outside-title"
          eyebrow="BEYOND RESEARCH / 研究之外"
          title="长期兴趣也会塑造观察与表达"
          description={<p>动画是目前资料最完整的生活专题：从 2017 年开始持续记录，既保留片单，也保留多年后重看作品时判断如何变化。</p>}
        />
        <a href="/life/animation">
          <div><strong>{animationReviews.length}</strong><span>篇影评与文章</span></div>
          <div><strong>{animationArchiveCount.toLocaleString("zh-CN")}</strong><span>条番剧总表记录</span></div>
          <p>从观看偏好、叙事判断到长期记录，进入动画观测站阅读原文与时间索引。</p>
          <b>进入专题 ↗</b>
        </a>
      </section>

      <RequirementNotice
        groups={profileRequirements}
        title="要把研究定位补成完整个人叙事，需要这些材料"
        intro="学校、导师和时间线只是身份信息；更重要的是补足选择当前问题的原因、真实转折、承担过的工作和未来计划。"
      />

      <section className="section-actions section-shell" aria-label="个人介绍相关入口">
        <div>
          <p className="micro-label">NEXT / 继续浏览</p>
          <h2>回到关于总览，或查看联系与合作</h2>
        </div>
        <div>
          <a className="text-link" href="/about">返回关于总览 <span>←</span></a>
          <a className="primary-action" href="/contact">前往联系与合作 <span>→</span></a>
        </div>
      </section>
    </main>
  );
}
