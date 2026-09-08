export function EmptyState({ code, title, description, actionHref, actionLabel }: {
  code: string;
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-title">
      <div className="empty-state-visual" aria-hidden="true"><span>{code}</span><i /><i /><i /></div>
      <div>
        <p className="micro-label">CONTENT STATUS / 内容状态</p>
        <h2 id="empty-state-title">{title}</h2>
        <p>{description}</p>
        <a className="text-link" href={actionHref}>{actionLabel} <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
