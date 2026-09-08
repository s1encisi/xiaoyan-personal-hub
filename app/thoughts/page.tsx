import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { StatusBadge } from "../_components/status-badge";
import { reflections } from "../_data/content";

export const metadata = createFixedPageMetadata({
  path: "/thoughts",
  title: "随想｜小闫",
  description: "小闫关于研究、方法和生活的可预览随想草稿；资料需求会在页面中直接说明。",
});

export default function ThoughtsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="I2"
        eyebrow="THOUGHTS"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "记录与洞察", href: "/insights" }, { label: "随想" }]}
        title={<>一些仍在<br /><span>缓慢生长的想法。</span></>}
        description="研究教我追问证据，生活提醒我保留感受。这里收录可提前预览、仍在整理的随想草稿。"
        aside={<blockquote className="thought-hero-quote">“保持判断力，<br />也保留好奇心。”</blockquote>}
      />

      <section className="thought-editorial editorial-list section-shell" aria-labelledby="thoughts-index-title">
        <header className="section-kicker split-kicker">
          <div><p className="micro-label">THOUGHT INDEX / 随想索引</p><h2 id="thoughts-index-title">可预览随想草稿</h2></div>
          <p>每篇草稿需要最终标题、完整正文、写作日期、主题标签与公开范围；当前内容不作为学术结论。</p>
        </header>
        {reflections.map((reflection, index) => (
          <article key={reflection.slug}>
            <span>T{String(index + 1).padStart(2, "0")}</span><div><small>{reflection.topic}</small><StatusBadge status={reflection.status} /><h3><a href={`/thoughts/${reflection.slug}`}>{reflection.title}</a></h3><p>{reflection.summary}</p><div className="focus-cloud">{reflection.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><footer><a className="text-link" href={`/thoughts/${reflection.slug}`}>预览草稿 <span>→</span></a></footer>
          </article>
        ))}
      </section>
    </main>
  );
}
