/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Vinext requires native navigation and serves optimized local WebP assets directly. */
import { knowledge, projects, skills } from "./_data/content";
import { animationArchiveCount } from "./_data/animation/archive";
import { animationRecommendationYears } from "./_data/animation/recommendations";
import { animationReviews } from "./_data/animation/reviews";
import { ProcessTrace } from "./_components/process-trace";
import { SectionHeading } from "./_components/section-heading";
import { siteInfo } from "./_data/site";

const researchLayers = [
  {
    code: "01",
    label: "INDUSTRIAL OBJECT",
    title: "从真实过程开始",
    description: "把铜电积与电解液净化中的变量、约束、采样和操作语境放回问题定义。",
  },
  {
    code: "02",
    label: "MODELING & SEARCH",
    title: "用模型连接方案",
    description: "把代理建模和多目标优化作为连接过程分析与方案搜索的候选方法，同时审查误差、可行域与偏好。",
  },
  {
    code: "03",
    label: "TRUST & DECISION",
    title: "让结论经得起追问",
    description: "用安全评估、解释审计和因果边界说明模型何时可用、何时必须停止。",
  },
];

const latestEntrances = [
  {
    code: "K",
    title: "知识库",
    description: "研究方法、建模优化、论文表达与复现检查的结构化索引。",
    href: "/notes",
  },
  {
    code: "T",
    title: "随想",
    description: "记录研究与生活中仍在缓慢生长的判断和问题。",
    href: "/thoughts",
  },
  {
    code: "L",
    title: "生活记录",
    description: "吃喝、旅行与文娱，保留研究之外真实而具体的部分。",
    href: "/life",
  },
];

const archiveFacts = [
  { value: String(projects.length).padStart(2, "0"), label: "研究议程", detail: "按问题、方法、评价与边界展开" },
  { value: String(knowledge.length).padStart(2, "0"), label: "知识主题", detail: "方法笔记与可复用检查框架" },
  { value: String(animationReviews.length).padStart(2, "0"), label: "动画文章", detail: "逐篇标明原稿、定稿或整理方式" },
  { value: animationArchiveCount.toLocaleString("zh-CN"), label: "总表条目", detail: "番剧总表中按原始顺序保存的条目" },
];

const recommendationCount = animationRecommendationYears.reduce((total, year) => total + year.entries.length, 0);

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-hero-kicker">{siteInfo.role}</p>
          <h1>
            <span>从复杂过程，</span>
            <span>到可信决策。</span>
          </h1>
          <p className="hero-summary">
            我关注铜电积与电解液净化场景中的过程建模、优化与安全决策，也持续追问模型为什么有效、何时失效，以及能否被可信地用于真实系统。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="/research">研究方向 <span aria-hidden="true">↗</span></a>
            <a className="text-action" href="/projects">研究专题 <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="home-hero-media">
          <img
            src="/copper-electrowinning-hero.webp"
            srcSet="/copper-electrowinning-hero-768.webp 768w, /copper-electrowinning-hero-1200.webp 1200w, /copper-electrowinning-hero.webp 1568w"
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 58vw, 700px"
            width="1568"
            height="1003"
            alt="铜电积槽上方成列排列的铜阴极板与蓝绿色电解液"
            fetchPriority="high"
          />
          <figcaption>铜电积过程视觉示意 · AI 生成图像，仅作场景表达</figcaption>
        </figure>
        <ProcessTrace />
      </section>

      <section className="fact-band" aria-label="个人事实概览">
        <dl>
          <div><dt>当前身份</dt><dd>硕士研究生</dd></div>
          <div><dt>研究主线</dt><dd>工业过程建模</dd></div>
          <div><dt>决策方法</dt><dd>多目标优化</dd></div>
          <div><dt>可信边界</dt><dd>安全与解释</dd></div>
        </dl>
      </section>

      <section className="home-research-thesis section-shell" aria-labelledby="home-thesis-title">
        <SectionHeading
          id="home-thesis-title"
          eyebrow="RESEARCH THESIS / 研究命题"
          title="研究不是一串算法名称，而是一条从对象到责任的链路"
          description={<p>我把研究问题组织成三个层次：先理解过程，再建立模型和搜索方案，最后审查风险、解释与可用边界。</p>}
          density="editorial"
        />
        <ol className="home-thesis-track">
          {researchLayers.map((layer) => (
            <li key={layer.code}>
              <span>{layer.code}</span>
              <small>{layer.label}</small>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-project-overview section-shell" aria-labelledby="home-project-title">
        <SectionHeading
          id="home-project-title"
          eyebrow="RESEARCH AGENDA / 研究议程"
          title="四条主线，围绕同一个问题展开"
          description={<p>怎样把复杂工业过程转化为可验证、可优化、可解释且有安全边界的决策？当前公开内容是研究议程，不冒充已经完成的项目结果。</p>}
        />
        <div className="home-case-list">
          <a className="home-case-feature" href={`/projects/${projects[0].slug}`}>
            <figure>
              <img src="/copper-process-detail.webp" width="1440" height="960" loading="lazy" alt="铜阴极表面、取样设备与蓝绿色电解液的工艺细节" />
              <figcaption>工艺细节视觉示意 · AI 生成图像，仅作场景表达</figcaption>
            </figure>
            <div><small>{projects[0].index} / {projects[0].category}</small><h3>{projects[0].title}</h3><p>{projects[0].summary}</p><span>打开研究专题 <b aria-hidden="true">↗</b></span></div>
          </a>
          {projects.slice(1).map((project) => (
            <a className="home-case-secondary" href={`/projects/${project.slug}`} key={project.slug}>
              <span>{project.index}</span>
              <div><small>{project.category}</small><h3>{project.title}</h3><p>{project.question}</p></div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <div className="section-actions">
          <a className="section-more-link" href="/projects">全部研究主题 <span>→</span></a>
          <a className="section-more-link" href="/skills">技术能力地图 <span>→</span></a>
        </div>
      </section>

      <section className="home-method-band" aria-labelledby="home-method-title">
        <div className="section-shell">
          <SectionHeading
            id="home-method-title"
            eyebrow="WORKING METHOD / 能力组织"
            title="能力要落在研究流程里，才有意义"
            description={<p>这里不使用熟练度百分比。四个方向分别说明能解决什么问题、如何开展、常见失败方式，以及还需要哪些项目证据来支撑。</p>}
          />
          <div className="home-capability-ledger">
            {skills.map((skill) => (
              <a href={`/skills/${skill.slug}`} key={skill.slug}>
                <span>{skill.index}</span>
                <div><small>{skill.englishTitle}</small><h3>{skill.title}</h3><p>{skill.principle}</p></div>
                <b>查看方法与边界 <i aria-hidden="true">↗</i></b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-archive section-shell" aria-labelledby="home-archive-title">
        <SectionHeading
          id="home-archive-title"
          eyebrow="PUBLIC EVIDENCE / 当前可读内容"
          title="能核实的内容，用数字与原文说话"
          description={<p>研究、教育、论文和荣誉只公开已确认资料；动画档案则已有较完整的原文、海报与时间索引，可直接进入阅读。</p>}
        />
        <dl className="home-archive-facts">
          {archiveFacts.map((fact) => (
            <div key={fact.label}>
              <dt><strong>{fact.value}</strong><span>{fact.label}</span></dt>
              <dd>{fact.detail}</dd>
            </div>
          ))}
        </dl>
        <a className="home-animation-story" href="/life/animation">
          <div>
            <p className="micro-label">ANIMATION OBSERVATORY / 动画观测站</p>
            <h3>从 2017 年开始，把观看变成一份可以回看的个人档案</h3>
            <p>年度推荐收录 {recommendationCount} 条作品条目：已有文字按来源保留，只有标题的条目明确说明还需要哪些内容；影评与番剧总表分别进入独立页面。</p>
          </div>
          <span>进入动画专题 <b aria-hidden="true">↗</b></span>
        </a>
      </section>

      <section className="home-records section-shell" aria-labelledby="home-records-title">
        <SectionHeading
          id="home-records-title"
          eyebrow="MORE OF THE PERSON / 继续认识"
          title="研究之外，也保持具体"
          description={<p>知识整理展示方法如何沉淀，随想保留判断形成的过程，生活记录则让兴趣、选择和日常经验拥有自己的位置。</p>}
        />
        <div className="home-record-links">
          {latestEntrances.map((entry) => (
            <a key={entry.href} href={entry.href}>
              <span>{entry.code}</span>
              <div><h3>{entry.title}</h3><p>{entry.description}</p></div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="home-record-status section-shell" aria-labelledby="home-record-status-title">
        <SectionHeading
          id="home-record-status-title"
          eyebrow="RECORD STATUS / 履历与成果"
          title="不把缺失资料包装成经历"
          description={<p>教育、科研经历、论文成果与荣誉已有独立页面和字段结构。资料齐备前，页面只列出形成完整记录所需的事实与证明。</p>}
          density="compact"
        />
        <nav aria-label="履历与成果页面">
          <a href="/journey"><span>01</span><strong>教育与经历</strong><small>学校、阶段、职责与成长路径</small><b>↗</b></a>
          <a href="/outputs"><span>02</span><strong>论文与成果</strong><small>题录、贡献、结果与公开链接</small><b>↗</b></a>
          <a href="/honors"><span>03</span><strong>竞赛与荣誉</strong><small>奖项事实、个人角色与证明材料</small><b>↗</b></a>
        </nav>
      </section>

      <section className="home-contact-band" aria-labelledby="home-contact-title">
        <div>
          <p>联系与合作</p>
          <h2 id="home-contact-title">把好问题带到同一张桌前</h2>
        </div>
        <p>完善联系入口需要提供常用邮箱、GitHub 或学术主页，以及希望公开的合作方向。</p>
        <a href="/contact">进入联系页 <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
