export const aiToolNames = ["Codex", "Claude Code", "OpenCode", "Hermes", "Coze"];

export const aiCapabilities = [
  { title: "机器学习", label: "MODELS", description: "表格数据建模、模型比较与解释分析，把数据中的规律转化为可检验的预测。", href: "/skills/industrial-process-modeling", color: "#0d2039" },
  { title: "强化学习", label: "DECISIONS", description: "从状态、动作和奖励出发，研究策略优化、约束满足与多目标决策。", href: "/projects/safe-reinforcement-learning", color: "#112640" },
  { title: "智能体工程", label: "AGENTS", description: "关注工具调用、工作流、记忆与上下文，以及有副作用任务的可靠执行。", href: "/projects/reliable-commerce-agents", color: "#14203d" },
  { title: "大模型学习", label: "LEARNING", description: "持续学习预训练、后训练、模型微调与 RLHF，理解模型能力如何形成与对齐。", href: "/notes#machine-learning", color: "#14253a" },
  { title: "开发协作", label: "BUILDING", description: "熟练使用 Codex、Claude Code、OpenCode、Hermes 与 Coze，组织从需求到验证的开发流程。", href: "/skills/agent-engineering", color: "#17243e" },
  { title: "前沿跟进", label: "CURIOSITY", description: "积极跟进大模型与智能体的新方向，结合文档、开源实现和实际项目持续学习。", href: "/notes", color: "#0e2432" },
];

export const featuredAIProjects = [
  { slug: "reliable-commerce-agents", title: "电商智能体的可靠执行", type: "智能体工程 · 开源项目升级", image: "/images/ai/agents-1200.webp", description: "让退货申请经过审批、提交与结果核实，补强工具调用之后的执行可靠性。" },
  { slug: "safe-reinforcement-learning", title: "约束下的策略学习", type: "强化学习 · 多目标决策", image: "/images/ai/decisions-1200.webp", description: "以 CMDP、行为克隆与 PPO-Lagrangian 连接目标偏好和约束决策。" },
  { slug: "wastewater-energy-tabpfn", title: "有限样本中的预测", type: "机器学习 · TabPFN", image: "/images/ai/learning-1200.webp", description: "比较表格模型与样本规模，分析污水处理能耗的预测表现和变量响应。" },
  { slug: "culab-agent-workbench", title: "面向研究的工具工作台", type: "智能体工具 · 工程实现", image: "/images/ai/agents-1200.webp", description: "把建模、优化、数值诊断与结果展示组织为可追溯的研究流程。" },
];
