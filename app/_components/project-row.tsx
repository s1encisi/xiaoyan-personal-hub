import type { ProjectRecord } from "../_data/content";
import { StatusBadge } from "./status-badge";

export function ProjectRow({ project }: { project: ProjectRecord }) {
  return (
    <article className="project-index-row">
      <a className="project-index-link" href={`/projects/${project.slug}`} aria-label={`查看研究主题：${project.title}`}>
        <span className="project-index-number">{project.index}</span>
        <div className="project-index-copy">
          <div className="project-index-meta">
            <span>{project.category}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <blockquote>{project.question}</blockquote>
          <div className="tag-line">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <span className="project-index-arrow" aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
