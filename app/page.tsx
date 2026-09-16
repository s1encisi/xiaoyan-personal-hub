/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native document navigation and optimized local assets. */
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Viewport } from "next";
import { AmbientScene } from "./_components/ambient-scene";
import { SocialLinks } from "./_components/social-links";
import { projects, publicationRecords } from "./_data/content";
import { PortfolioSection, PortfolioStats, PublicationList, RecordLinks } from "./_components/portfolio";
import { animationReviews } from "./_data/animation/reviews";
import { animationRecommendationYears } from "./_data/animation/recommendations";
import { FieldHighlights, FieldImage } from "./_components/field-notes";
import { getFieldNote } from "./_data/field-notes";
import { LaunchExperience } from "./_components/launch-experience";
import StarBorder from "./_components/react-bits/StarBorder";
import BlurText from "./_components/react-bits/BlurText";

const selectedResearch = [
  { slug: "electrolyte-purification-optimization", title: "约束多目标优化", text: "三类工况、九个代理模型，连接工艺目标与操作选择。" },
  { slug: "culab-agent-workbench", title: "CuLab 工作台", text: "模型、优化与证据诊断，组成可追溯的研究工作流。" },
  { slug: "wastewater-energy-tabpfn", title: "污水处理能耗预测", text: "用 TabPFN 研究有限数据下的总电耗与处理效率。" },
  { slug: "urban-rural-ecological-footprint", title: "省域生态足迹", text: "30 个省份、5 年数据，从城乡视角分析环境压力。" },
];
const recommendationCount = animationRecommendationYears.reduce((sum, year) => sum + year.entries.length, 0);

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#060c18" };

export default function Home() {
  return (
    <main id="main-content" className="celestial-home" tabIndex={-1}>
      <section className="celestial-hero" aria-labelledby="celestial-title">
        <picture className="celestial-hero__media">
          <source media="(max-width: 760px)" srcSet="/images/celestial/celestial-planet-768.webp" />
          <img src="/images/celestial/celestial-planet.webp" width="1586" height="992" alt="深蓝星海中，一颗被青蓝与金色弧光照亮的暗色行星" fetchPriority="high" />
        </picture>
        <AmbientScene kind="cosmic" />
        <div className="cosmic-orbit" aria-hidden="true"><svg viewBox="0 0 800 800"><ellipse cx="400" cy="400" rx="362" ry="167" transform="rotate(-24 400 400)" /><ellipse cx="400" cy="400" rx="350" ry="183" transform="rotate(-17 400 400)" /><circle cx="697" cy="220" r="3" /></svg></div>
        <span className="shooting-star" aria-hidden="true" /><span className="shooting-star shooting-star--second" aria-hidden="true" />
        <div className="celestial-hero__content">
          <BlurText text="研究 · 工程 · 生活" className="celestial-kicker" animateBy="words" delay={30} stepDuration={0.12} animationFrom={{ opacity: 0.7, y: 4, filter: "blur(0px)" }} animationTo={[{ opacity: 1, y: 0, filter: "blur(0px)" }]} />
          <h1 id="celestial-title"><span>从复杂过程，</span><span>到可信决策。</span></h1>
          <p className="celestial-hero__intro">我是闫哲祯，同济大学资源与环境硕士。<br />连接工业过程、机器学习与优化决策。</p>
          <div className="celestial-hero__actions">
            <StarBorder as="a" className="hero-star-action" href="/research" data-navigation="document" color="var(--sky)" backgroundColor="var(--universe)" borderColor="#52758b" speed="8s">探索研究 <ArrowRight aria-hidden="true" /></StarBorder>
            <a className="universe-action universe-action--outline" href="/about/profile" data-navigation="document">认识我 <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="celestial-hero__bottom">
          <SocialLinks />
          <small className="celestial-hero__credit">天体场景 · AI 生成</small>
          <LaunchExperience />
          <a className="celestial-scroll" href="#research-agenda" aria-label="向下阅读研究议程"><span>继续探索</span><ArrowDown size={16} aria-hidden="true" /><i aria-hidden="true" /></a>
        </div>
      </section>
      <section className="pf-home-intro" aria-label="个人背景与成果概览"><div className="section-shell"><PortfolioStats items={[{ value: "2027 届", label: "同济大学资源与环境硕士" }, { value: "4.66 / 5", label: "硕士 GPA" }, { value: "1 篇", label: "第一作者期刊论文已发表" }, { value: "2 篇", label: "第一作者论文修回或在审" }]} /></div></section>
      <section className="home-research section-shell" id="research-agenda" aria-labelledby="home-research-title">
        <header className="universe-section-title u-reveal"><h2 id="home-research-title">研究与工程</h2><p>参与国家重点研发计划，从工业数据出发，<br />把预测、优化与软件实现连接起来。</p></header>
        <div className="research-feature u-reveal">
          <figure>
            <img src="/copper-electrowinning-hero.webp" srcSet="/copper-electrowinning-hero-768.webp 768w, /copper-electrowinning-hero-1200.webp 1200w, /copper-electrowinning-hero.webp 1568w" sizes="(max-width: 760px) 90vw, 48vw" width="1568" height="1003" loading="lazy" alt="铜电积槽中成列排列的铜阴极板与蓝绿色电解液" />
            <figcaption>铜电积场景示意 · AI 生成图像，仅作场景表达</figcaption>
          </figure>
          <div className="research-feature__copy"><span>01 / 已发表研究</span><h3>铜电积预测建模</h3><p className="research-question">从生产记录，<br />走向可解释的预测。</p><p>比较 10 种机器学习模型，建立电压与出液铜浓度预测器。第一作者成果发表于《有色金属（冶炼部分）》。</p><a href={`/projects/${projects[0].slug}`} data-navigation="document">阅读项目与结果 <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="research-ledger u-reveal">{selectedResearch.map((project,index) => <a href={`/projects/${project.slug}`} key={project.slug} data-navigation="document"><span>0{index + 2}</span><h3>{project.title}</h3><p>{project.text}</p><ArrowRight aria-hidden="true" /></a>)}</div>
        <nav className="research-next" aria-label="研究相关入口"><a href="/skills">技术能力地图 <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/outputs">论文与成果 <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/notes">方法与知识库 <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/experience/hangzhou-tech-visit">走进科技企业 <ArrowUpRight size={17} aria-hidden="true" /></a></nav>
      </section>
      <div className="pf-home-publications"><PortfolioSection id="home-publication" code="SELECTED PUBLICATION" title="代表性论文"><PublicationList items={[publicationRecords[0]]} /><RecordLinks items={[{ label: "全部论文与研究稿件", href: "/publications" }, { label: "教育与实践经历", href: "/journey" }, { label: "联系交流", href: "/contact" }]} /></PortfolioSection></div>
      <section className="home-beyond" aria-labelledby="home-beyond-title"><div className="section-shell">
        <header className="universe-section-title u-reveal"><h2 id="home-beyond-title">研究之外</h2><p>给故事留一点时间，也给日常留一点光。</p></header>
        <a className="beyond-anime u-reveal" href="/life/animation" data-navigation="document">
          <picture><source media="(max-width: 760px)" srcSet="/images/celestial/anime-coast-768.webp" /><img src="/images/celestial/anime-coast.webp" width="1600" height="916" loading="lazy" alt="原创动画风格的黄昏海岸、云层与远方高架列车" /></picture>
          <div className="beyond-anime__copy"><span>动画专题</span><h3>让故事，在心里继续。</h3><p>{animationReviews.length} 篇影评与文章，{recommendationCount} 条年度推荐，留下每一次观看的回声。</p><b>进入动画专题 <ArrowRight aria-hidden="true" /></b></div>
        </a>
        <a className="beyond-life u-reveal" href="/life" data-navigation="document"><div><span>生活记录</span><h3>把日子，<br />过成具体的喜欢。</h3><p>去天文馆看宇宙，在海边散步，<br />也为喜欢的音乐奔赴现场。</p><b>翻开生活记录 <ArrowRight aria-hidden="true" /></b></div><figure><FieldImage id="qingdao-sea" /></figure></a>
        <p className="image-provenance">青岛海边 · 2026 年 6 月的旅行照片。上方动画海岸为 AI 生成插画。</p>
        <section className="home-field-notes" aria-labelledby="home-field-title"><header><h2 id="home-field-title">研究之外，也在现场</h2><a href="/life">全部生活记录 <ArrowRight size={17} aria-hidden="true" /></a></header><FieldHighlights notes={[getFieldNote("astronomy-and-dishui"), getFieldNote("wuthering-waves-live"), getFieldNote("hangzhou-weekend")]} /></section>
        <section className="home-social u-reveal" aria-labelledby="home-social-title"><h2 id="home-social-title">在别处找到我</h2><SocialLinks variant="editorial" /><nav className="home-more-links" aria-label="更多个人内容"><a href="/about">关于我</a><a href="/journey">教育与经历</a><a href="/thoughts">随想</a><a href="/contact">联系与合作</a></nav></section>
      </div></section>
    </main>
  );
}
