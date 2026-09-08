import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { ScrollRevealController } from "../../_components/scroll-reveal-controller";
import { getSkill, projects, skills } from "../../_data/content";
import { skillEditorialDetails } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: "技术方向未找到｜小闫" };
  const canonicalPath = `/skills/${slug}`;
  return {
    title: `${skill.title}｜技术能力｜小闫`,
    description: skill.summary,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${skill.title}｜技术能力`,
      description: skill.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${skill.title}｜技术能力`, description: skill.summary, images: [] },
  };
}

export default async function SkillDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const index = skills.findIndex((item) => item.slug === slug);
  const previous = skills[index - 1];
  const next = skills[index + 1];
  const related = projects.filter((project) => skill.relatedProjects.includes(project.slug));
  const editorial = skillEditorialDetails[skill.slug];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="skill-detail">
        <ScrollRevealController />
        <header className="skill-detail-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "研究中心", href: "/research" }, { label: "技术能力", href: "/skills" }, { label: skill.title }]} />
          <div className="skill-detail-code">{skill.index}</div>
          <p className="micro-label">{skill.englishTitle}</p>
          <h1>{skill.title}</h1>
          <p className="skill-detail-summary">{skill.summary}</p>
          <blockquote>{skill.principle}</blockquote>
        </header>

        <div className="skill-detail-body section-shell">
          <section className="skill-understanding scroll-reveal" aria-labelledby="skill-understanding-title">
            <div className="section-kicker"><p className="micro-label">01 / UNDERSTANDING</p><h2 id="skill-understanding-title">我怎样理解这项能力</h2></div>
            <div className="detail-prose">{editorial.understanding.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ul className="skill-use-cases" aria-label="适用问题">
              {editorial.useCases.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="scroll-reveal" aria-labelledby="skill-layers-title">
            <div className="section-kicker"><p className="micro-label">02 / METHOD MAP</p><h2 id="skill-layers-title">方法地图</h2></div>
            <ol className="skill-layer-list">
              {skill.layers.map((layer, layerIndex) => (
                <li key={layer.title}>
                  <span>0{layerIndex + 1}</span>
                  <div className="skill-layer-copy">
                    <h3>{layer.title}</h3>
                    <p>{layer.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="skill-workflow scroll-reveal" aria-labelledby="skill-workflow-title">
            <div className="section-kicker"><p className="micro-label">03 / WORKFLOW</p><h2 id="skill-workflow-title">从输入到可审查产物</h2></div>
            <ol>
              {editorial.workflow.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  <small><strong>产物</strong>{item.output}</small>
                </li>
              ))}
            </ol>
          </section>

          <section className="skill-risk-review scroll-reveal" aria-labelledby="skill-risk-title">
            <div className="section-kicker"><p className="micro-label">04 / FAILURE MODES</p><h2 id="skill-risk-title">常见失效方式与应对</h2></div>
            <dl>
              {editorial.failureModes.map((item) => <div key={item.risk}><dt>{item.risk}</dt><dd>{item.response}</dd></div>)}
            </dl>
          </section>

          <section className="skill-audit-panel scroll-reveal" aria-labelledby="skill-audit-title">
            <p className="micro-label">05 / EVALUATION BOUNDARY</p>
            <h2 id="skill-audit-title">共同审查底线</h2>
            <ul className="check-list">{skill.checks.map((check) => <li key={check}>{check}</li>)}</ul>
          </section>

          <section className="related-projects scroll-reveal" aria-labelledby="skill-projects-title">
            <div className="section-kicker"><p className="micro-label">06 / RELATED RESEARCH</p><h2 id="skill-projects-title">关联研究议程</h2></div>
            <div>
              {related.map((project) => <a key={project.slug} href={`/projects/${project.slug}`}><span>{project.index}</span><strong>{project.title}</strong><b>↗</b></a>)}
            </div>
          </section>

          <RequirementNotice
            groups={editorial.requirements}
            title="让方法理解成为可验证能力，需要这些材料"
            intro="工具名称不是能力证据。每一项技术都需要与真实任务、完成工作、结果产物和适用边界对应。"
            compact
          />
        </div>

        <DetailNavigation
          back={{ title: "返回能力地图", href: "/skills" }}
          previous={previous ? { title: previous.title, href: `/skills/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/skills/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
