import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { ScrollRevealController } from "../../_components/scroll-reveal-controller";
import { StatusBadge } from "../../_components/status-badge";
import { getProject, projects, skills } from "../../_data/content";
import { researchAgendaDetails } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "研究主题未找到｜小闫" };
  const canonicalPath = `/projects/${slug}`;
  return {
    title: `${project.title}｜研究主题｜小闫`,
    description: project.summary,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${project.title}｜研究主题`,
      description: project.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${project.title}｜研究主题`, description: project.summary, images: [] },
  };
}

export default async function ProjectDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const related = skills.filter((skill) => project.relatedSkills.includes(skill.slug));
  const agenda = researchAgendaDetails[project.slug];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="case-study">
        <ScrollRevealController />
        <header className="case-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "研究中心", href: "/research" }, { label: "研究专题", href: "/projects" }, { label: project.title }]} />
          <div className="case-hero-title">
            <div>
              <p className="micro-label">TOPIC {project.index} / {project.category}</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
            <div className="case-stamp" aria-hidden="true"><span>{project.index}</span><small>RESEARCH<br />AGENDA</small></div>
          </div>
          <div className="case-hero-meta">
            <StatusBadge status={project.status} />
            <span>{project.englishTitle}</span>
          </div>
        </header>

        <div className="case-layout section-shell">
          <aside className="case-toc">
            <p className="micro-label">ON THIS PAGE</p>
            <nav aria-label="本页目录">
              <a href="#question">核心问题</a>
              <a href="#context">问题语境</a>
              <a href="#scope">研究范围</a>
              <a href="#decisions">关键判断</a>
              <a href="#route">方法路线</a>
              <a href="#evidence">证据计划</a>
              <a href="#limits">边界与下一步</a>
            </nav>
          </aside>

          <div className="case-content">
            <section id="question" className="case-question scroll-reveal">
              <p className="micro-label">01 / CORE QUESTION</p>
              <blockquote>{project.question}</blockquote>
            </section>

            <section id="context" className="case-section case-narrative scroll-reveal">
              <div className="case-section-heading"><span>02</span><h2>为什么值得研究</h2></div>
              <div className="detail-prose">{agenda.position.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>

            <section id="scope" className="case-section scroll-reveal">
              <div className="case-section-heading"><span>03</span><h2>研究范围与公开状态</h2></div>
              <dl className="agenda-scope-ledger">
                {agenda.scope.map((item) => (
                  <div key={item.label}><dt>{item.label}</dt><dd><strong>{item.value}</strong><span>{item.description}</span></dd></div>
                ))}
              </dl>
            </section>

            <section id="decisions" className="case-section scroll-reveal">
              <div className="case-section-heading"><span>04</span><h2>开展这类研究需要作出的关键判断</h2></div>
              <div className="decision-ledger">
                {agenda.decisions.map((decision, decisionIndex) => (
                  <article key={decision.title}>
                    <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
                    <h3>{decision.title}</h3>
                    <blockquote>{decision.question}</blockquote>
                    <p>{decision.reasoning}</p>
                    <small><strong>取舍</strong>{decision.tradeoff}</small>
                  </article>
                ))}
              </div>
            </section>

            <section id="route" className="case-section scroll-reveal">
              <div className="case-section-heading"><span>05</span><h2>方法路线</h2></div>
              <ol className="method-flow">
                {project.route.map((item) => (
                  <li key={item.step}>
                    <span>{item.step}</span><div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="evidence" className="case-section scroll-reveal">
              <div className="case-section-heading"><span>06</span><h2>需要怎样的证据才能下结论</h2></div>
              <div className="evidence-plan-grid">
                {agenda.evidencePlan.map((group) => (
                  <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
                ))}
              </div>
              <div className="case-evaluation-strip">
                <strong>共同评价底线</strong>
                <ul>{project.evaluation.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>

            <section id="limits" className="case-section limit-section scroll-reveal">
              <div className="case-section-heading"><span>07</span><h2>局限、开放问题与下一步</h2></div>
              <div className="limit-statement">{project.boundaries.map((item) => <p key={item}>{item}</p>)}</div>
              <ol className="open-question-list">
                {agenda.nextQuestions.map((item, questionIndex) => <li key={item}><span>Q{questionIndex + 1}</span><p>{item}</p></li>)}
              </ol>
            </section>

            <section className="related-strip scroll-reveal" aria-labelledby="related-skills-title">
              <p className="micro-label">RELATED CAPABILITIES</p>
              <h2 id="related-skills-title">相关技术方向</h2>
              <div>{related.map((skill) => <a key={skill.slug} href={`/skills/${skill.slug}`}>{skill.title}<span>↗</span></a>)}</div>
            </section>

            <RequirementNotice
              groups={agenda.requirements}
              title="把研究议程升级为可验证项目记录，需要这些证据"
              intro="正式项目名称、个人职责、数据、实验与结果齐备后，这一页才会把“研究主题”更新为“项目案例”。"
              compact
            />
          </div>
        </div>

        <DetailNavigation
          back={{ title: "返回研究专题", href: "/projects" }}
          previous={previous ? { title: previous.title, href: `/projects/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/projects/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
