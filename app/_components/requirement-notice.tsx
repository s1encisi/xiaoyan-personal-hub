import type { RequirementGroup } from "../_data/editorial";

type RequirementNoticeProps = {
  groups: RequirementGroup[];
  title?: string;
  intro?: string;
  id?: string;
  compact?: boolean;
};

export function RequirementNotice({
  groups,
  title = "把这一部分变成可核实记录，需要以下资料",
  intro = "资料齐备后，页面会把身份、过程、贡献、结果和证据连接起来；在此之前不补写未经核实的经历或结论。",
  id,
  compact = false,
}: RequirementNoticeProps) {
  return (
    <section className={`requirement-notice${compact ? " requirement-notice-compact" : ""}`} aria-labelledby={id}>
      <header>
        <p className="micro-label">EVIDENCE REQUEST / 资料清单</p>
        <h2 id={id}>{title}</h2>
        <p>{intro}</p>
      </header>
      <div className="requirement-groups" data-count={groups.length}>
        {groups.map((group, index) => (
          <article key={group.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            {group.preferredFormat ? <p><strong>建议形式</strong>{group.preferredFormat}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
