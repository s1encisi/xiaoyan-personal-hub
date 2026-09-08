const stages = [
  { code: "01", label: "观测", detail: "明确过程与数据边界" },
  { code: "02", label: "建模", detail: "连接机理与数据证据" },
  { code: "03", label: "优化", detail: "在约束内搜索方案" },
  { code: "04", label: "审查", detail: "验证安全与适用范围" },
];

export function ProcessTrace() {
  return (
    <aside className="process-instrument" aria-label="研究路径：观测、建模、优化与审查">
      <p className="process-route-label"><span>研究路径</span><small>PROCESS ROUTE</small></p>
      <ol className="process-stages">
        {stages.map((stage) => (
          <li key={stage.code}>
            <span>{stage.code}</span>
            <div><strong>{stage.label}</strong><small>{stage.detail}</small></div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
