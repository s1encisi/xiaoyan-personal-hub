import type { ProjectRecord } from "./content";
export const commerceProject: ProjectRecord = {
  slug: "reliable-commerce-agents", index: "10", title: "电商智能体的可靠售后执行", englishTitle: "RELIABLE COMMERCE AGENTS", category: "智能体工程 · 开源项目升级", status: "verified",
  summary: "在 Microsoft Agent Framework 电商开源项目基础上，围绕 Python 退货申请补强统一规则、审批前置、幂等回执与故障恢复，让工具调用后的业务结果可以确认。",
  question: "当智能体调用了写入工具，如何确认业务被正确执行？",
  tags: ["Microsoft Agent Framework", "A2A", "FastAPI", "PostgreSQL", "HITL"],
  facts: [
    { label: "项目基础", value: "基于 nitin27may/e-commerce-agents 开源平台" },
    { label: "个人增量", value: "Python 售后规则、审批绑定、持久回执、恢复协议、故障评测与独立演示" },
    { label: "技术栈", value: "MAF、FastAPI、asyncpg、PostgreSQL；Next.js、React、TypeScript" },
    { label: "开发环境", value: "WSL Ubuntu · 前后端与独立合成演示环境" },
  ],
  route: [
    { step: "01", title: "统一可执行的业务规则", text: "将签收证据、期限、归属、订单状态和原因校验集中到可信服务层，工具、REST、审批与工作流复用同一套 returns-v1 规则。" },
    { step: "02", title: "把审批放在写入之前", text: "审批绑定用户、规范化参数、订单证据、政策版本与有效期。工作流恢复后重新校验，再执行退货申请。" },
    { step: "03", title: "让结果可以被重复确认", text: "浏览器预先持久化操作 UUID；退货申请、订单状态和操作回执在同一个 PostgreSQL 事务提交，重复意图返回已确认结果。" },
    { step: "04", title: "处理提交后的不确定性", text: "发生 COMMIT 回执丢失或进程退出时，以新连接等待写锁并核实相同操作。无法确认时保留 UNKNOWN，通过有界重试和恢复锁继续处理。" },
  ],
  evaluation: [
    "2026-09-16 项目评估记录覆盖 22 类受控场景，各重复 3 次：上游 B0 为 37/66，规则统一 B1 为 51/66，当前 B2 为 66/66。",
    "同一评估中，B2 的违规写入与重复业务效果均为 0；三个消融版本分别检验提交前复核、结果确认与重试预算。",
    "项目验证记录保留 Python 906 项通过、前端 179 项通过，以及申请—审批—回执的浏览器流程。本站整理时读取代码与记录，未重新运行该项目测试。",
  ],
  boundaries: ["六智能体、A2A、商城与基础编排继承自上游；这里展示售后可靠性升级。受控评测针对本地合成数据与 PostgreSQL，不等同于真实模型泛化、生产支付或跨系统退款。"],
  relatedSkills: ["agent-engineering", "industrial-process-modeling"],
};
