export type VerificationStatus = "verified" | "topic" | "placeholder";

export type ContentStatusLabel = "已确认" | "研究主题" | "资料待完善" | "暂不公开";

const nonPublicStatusLabels: ReadonlySet<ContentStatusLabel> = new Set([
  "资料待完善",
  "暂不公开",
]);

/** 资料尚未完善的详情页只允许预览，不进入搜索索引或站点地图。 */
export function isNonPublicStatus(status: ContentStatusLabel) {
  return nonPublicStatusLabels.has(status);
}

export type ProjectRecord = {
  slug: string;
  index: string;
  title: string;
  englishTitle: string;
  category: string;
  summary: string;
  question: string;
  status: VerificationStatus;
  tags: string[];
  facts: { label: string; value: string }[];
  route: { step: string; title: string; text: string }[];
  evaluation: string[];
  boundaries: string[];
  relatedSkills: string[];
};

// TODO(content): 在小闫确认正式项目名称、周期、个人职责、数据与结果后，
// 将对应条目的 status 改为 verified，并补充可公开的事实字段。
export const projects: ProjectRecord[] = [
  {
    slug: "copper-electrowinning-surrogate",
    index: "01",
    title: "铜电积过程的代理建模",
    englishTitle: "SURROGATE MODELING FOR COPPER ELECTROWINNING",
    category: "过程建模",
    summary: "面向计算代价高、变量耦合强的铜电积过程，探索能够服务于后续优化与决策的代理模型。",
    question: "如何在有限数据与复杂工艺耦合下，得到既准确、又知道自身适用边界的过程近似？",
    status: "topic",
    tags: ["Surrogate Model", "Process Data", "Uncertainty"],
    facts: [
      { label: "内容类型", value: "研究主题" },
      { label: "工艺场景", value: "铜电积" },
      { label: "完善案例需要", value: "项目周期、职责、数据来源与样本说明" },
      { label: "结果部分需要", value: "评价指标、对比结果与可公开证据" },
    ],
    route: [
      { step: "01", title: "定义过程边界", text: "明确输入、输出、工况范围与模型将支持的决策任务。" },
      { step: "02", title: "审查数据", text: "检查采样机制、异常、漂移与潜在泄漏，再建立可信的数据划分。" },
      { step: "03", title: "构建代理模型", text: "比较适合有限样本与非线性过程的建模路径，而不是默认选择最复杂的模型。" },
      { step: "04", title: "评估不确定性", text: "同时观察平均性能、边界工况、失败案例与模型置信程度。" },
      { step: "05", title: "连接优化", text: "让模型输出能够被后续多目标优化与方案筛选安全使用。" },
    ],
    evaluation: ["训练、验证与正式测试严格隔离", "报告重复实验与不确定性", "检验边界工况与外推风险", "保留失败案例与误差结构"],
    boundaries: ["当前页面描述研究问题与方法框架，不代表已经取得特定性能结果。", "数据来源、样本量、模型对比与数值指标将在核实后补充。"],
    relatedSkills: ["industrial-process-modeling", "explainable-causal-ml"],
  },
  {
    slug: "electrolyte-purification-optimization",
    index: "02",
    title: "电解液净化的多目标优化",
    englishTitle: "MULTI-OBJECTIVE ELECTROLYTE PURIFICATION",
    category: "优化决策",
    summary: "面向质量、能耗、安全和操作约束，研究多目标折中与可解释的方案选择方法。",
    question: "当目标彼此冲突时，如何找到可行、透明，并能被工程人员理解的折中方案？",
    status: "topic",
    tags: ["Multi-objective", "Constraints", "Decision Making"],
    facts: [
      { label: "内容类型", value: "研究主题" },
      { label: "工艺场景", value: "电解液净化" },
      { label: "决策重点", value: "多目标权衡" },
      { label: "结果部分需要", value: "目标定义、约束、Pareto 结果与方案依据" },
    ],
    route: [
      { step: "01", title: "刻画目标", text: "把质量、资源消耗、安全与运行稳定性转化为清晰的评价对象。" },
      { step: "02", title: "表达约束", text: "区分必须满足的工艺边界与可在方案间权衡的软目标。" },
      { step: "03", title: "搜索可行域", text: "用多目标方法寻找一组有代表性的非支配方案，而非单一最优点。" },
      { step: "04", title: "审查稳健性", text: "观察方案对数据误差、工况变化与模型不确定性的敏感程度。" },
      { step: "05", title: "支持选择", text: "用可解释比较帮助决策者理解每种折中的收益与代价。" },
    ],
    evaluation: ["可行解比例与约束违反程度", "Pareto 前沿的覆盖与稳定性", "多次运行的一致性", "方案选择的可解释性"],
    boundaries: ["没有真实目标函数、约束与数值结果前，不展示虚构 Pareto 曲线。", "最终方案仍需结合工艺知识与现场验证。"],
    relatedSkills: ["multi-objective-optimization", "industrial-process-modeling"],
  },
  {
    slug: "safe-reinforcement-learning",
    index: "03",
    title: "约束场景下的安全强化学习",
    englishTitle: "SAFE REINFORCEMENT LEARNING UNDER CONSTRAINTS",
    category: "安全控制",
    summary: "关注智能体在探索与控制过程中如何满足安全边界，并把离线评估、风险度量与部署约束纳入同一流程。",
    question: "如何让策略在学习收益的同时，不把试错成本转移给真实工业系统？",
    status: "topic",
    tags: ["Safe RL", "Risk", "Industrial Control"],
    facts: [
      { label: "内容类型", value: "方法研究主题" },
      { label: "核心对象", value: "约束策略学习" },
      { label: "评价重点", value: "收益与风险并列" },
      { label: "结果部分需要", value: "环境设置、基线、约束违反率与稳定性结果" },
    ],
    route: [
      { step: "01", title: "建立安全定义", text: "明确状态、动作、奖励、成本与不可越过的运行边界。" },
      { step: "02", title: "选择验证环境", text: "在可控仿真或离线数据中先验证策略，不让真实系统承担探索风险。" },
      { step: "03", title: "学习约束策略", text: "比较惩罚、拉格朗日、安全层等不同约束处理逻辑。" },
      { step: "04", title: "开展风险评估", text: "同时报告期望收益、违规概率、尾部风险与最坏情形。" },
      { step: "05", title: "设置部署门槛", text: "定义回退策略、监控机制与人工接管条件。" },
    ],
    evaluation: ["累计收益与约束成本分开报告", "多随机种子重复实验", "尾部风险与最坏情形", "策略失效与回退场景"],
    boundaries: ["仿真安全不等同于真实过程安全。", "没有经过现场验证的策略不能被表述为可直接部署。"],
    relatedSkills: ["safe-reinforcement-learning", "multi-objective-optimization"],
  },
  {
    slug: "causal-explainable-industrial-ai",
    index: "04",
    title: "可解释与因果工业智能",
    englishTitle: "EXPLAINABLE & CAUSAL INDUSTRIAL INTELLIGENCE",
    category: "可信智能",
    summary: "区分预测关联、模型解释与因果效应，探索面向工业决策的可信解释与模型审计方法。",
    question: "模型为什么这样判断，与改变某个变量会带来什么结果，究竟是不是同一个问题？",
    status: "topic",
    tags: ["XAI", "Causal ML", "Model Audit"],
    facts: [
      { label: "内容类型", value: "研究主题" },
      { label: "方法边界", value: "关联 ≠ 因果" },
      { label: "关注对象", value: "解释与审计" },
      { label: "结果部分需要", value: "解释方法、验证方式、案例与适用边界" },
    ],
    route: [
      { step: "01", title: "明确解释对象", text: "区分全局规律、局部预测、群体差异与决策问题。" },
      { step: "02", title: "检查模型可靠性", text: "解释之前先确认数据、预测与评价设计本身是否可信。" },
      { step: "03", title: "分析模型关联", text: "使用 SHAP、PDP、ICE 等方法描述模型行为，并说明适用范围。" },
      { step: "04", title: "建立因果假设", text: "只有在研究设计与识别条件成立时，才讨论干预或因果效应。" },
      { step: "05", title: "形成审计结论", text: "记录解释稳定性、敏感性、失败案例与不能回答的问题。" },
    ],
    evaluation: ["解释对数据与模型扰动的稳定性", "关联结论与因果结论明确分栏", "领域知识一致性检查", "异常与反例分析"],
    boundaries: ["SHAP、PDP 与 ICE 解释模型关联，不自动证明控制规律。", "因果结论强度不能超过数据与研究设计。"],
    relatedSkills: ["explainable-causal-ml", "industrial-process-modeling"],
  },
];

export type SkillRecord = {
  slug: string;
  index: string;
  title: string;
  englishTitle: string;
  summary: string;
  principle: string;
  layers: { title: string; description: string }[];
  checks: string[];
  relatedProjects: string[];
};

export const skills: SkillRecord[] = [
  {
    slug: "industrial-process-modeling",
    index: "A",
    title: "工业过程建模",
    englishTitle: "INDUSTRIAL PROCESS MODELING",
    summary: "围绕复杂耦合、有限数据与高成本实验，建立能够支持分析和决策的过程模型。",
    principle: "模型首先要服务于清晰的问题边界，而不是追求脱离场景的复杂度。",
    layers: [
      { title: "问题与变量", description: "定义对象、目标变量、干预边界和部署场景。" },
      { title: "数据审查", description: "处理泄漏、漂移、缺失、异常与采样偏差。" },
      { title: "模型比较", description: "用可复现基线比较精度、稳定性和成本。" },
      { title: "失效边界", description: "说明模型不知道什么，以及何时需要回退。" },
    ],
    checks: ["预处理只在训练数据或训练折拟合", "正式测试集不参与选择与调参", "报告不确定性与失败案例", "区分插值表现与外推能力"],
    relatedProjects: ["copper-electrowinning-surrogate", "causal-explainable-industrial-ai"],
  },
  {
    slug: "multi-objective-optimization",
    index: "B",
    title: "多目标优化",
    englishTitle: "MULTI-OBJECTIVE OPTIMIZATION",
    summary: "研究多个冲突目标和真实操作约束下的折中解，并帮助决策者理解方案差异。",
    principle: "好的优化不是给出一个神秘答案，而是让收益、代价与约束一目了然。",
    layers: [
      { title: "目标建模", description: "区分性能、资源、安全和稳定性目标。" },
      { title: "约束表达", description: "把物理边界、操作规则和安全要求纳入搜索。" },
      { title: "方案搜索", description: "寻找具有代表性的 Pareto 折中方案。" },
      { title: "决策支持", description: "比较稳健性、敏感性与不同偏好下的选择。" },
    ],
    checks: ["不以单次最好结果代替稳定表现", "同时报告可行性与目标质量", "比较基线和消融", "解释决策偏好如何影响最终方案"],
    relatedProjects: ["electrolyte-purification-optimization", "safe-reinforcement-learning"],
  },
  {
    slug: "safe-reinforcement-learning",
    index: "C",
    title: "安全强化学习",
    englishTitle: "SAFE REINFORCEMENT LEARNING",
    summary: "关注约束满足、风险度量、离线评估，以及策略进入真实工业系统前的安全门槛。",
    principle: "在工业场景中，探索不是免费的，失败也不能只用平均奖励掩盖。",
    layers: [
      { title: "MDP / CMDP", description: "定义状态、动作、奖励、成本和约束。" },
      { title: "安全学习", description: "在策略更新中显式处理风险与边界。" },
      { title: "离线评估", description: "用仿真和历史数据降低真实探索风险。" },
      { title: "运行保障", description: "设计监控、回退和人工接管机制。" },
    ],
    checks: ["收益和安全指标并列", "使用多个随机种子", "报告违规分布和尾部风险", "明确仿真到真实的差距"],
    relatedProjects: ["safe-reinforcement-learning"],
  },
  {
    slug: "explainable-causal-ml",
    index: "D",
    title: "可解释与因果机器学习",
    englishTitle: "EXPLAINABLE & CAUSAL MACHINE LEARNING",
    summary: "理解模型如何使用信息，同时严格区分预测关联、模型解释与因果作用。",
    principle: "解释可以帮助审查模型，但不能越过研究设计替代因果证据。",
    layers: [
      { title: "预测审计", description: "先检查模型和评价设计是否可靠。" },
      { title: "关联解释", description: "用 SHAP、PDP、ICE 等描述模型行为。" },
      { title: "因果识别", description: "明确处理、结果、混杂与识别假设。" },
      { title: "决策边界", description: "把可回答的问题与不能回答的问题分开。" },
    ],
    checks: ["不把特征重要性写成控制规律", "验证解释稳定性", "陈述因果识别假设", "结论强度不超过研究设计"],
    relatedProjects: ["causal-explainable-industrial-ai", "copper-electrowinning-surrogate"],
  },
];

export type KnowledgeRecord = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string;
  sections: { title: string; items: string[] }[];
};

export const knowledge: KnowledgeRecord[] = [
  {
    slug: "research-methods",
    code: "K01",
    title: "研究方法",
    summary: "从问题定义到可信结论",
    intro: "把容易被忽略的研究设计问题变成一份可以重复使用的检查清单。",
    sections: [
      { title: "问题边界", items: ["研究对象与决策场景", "目标变量与数据时间边界", "成功标准与失败代价"] },
      { title: "验证设计", items: ["数据拆分与泄漏检查", "基线、消融与敏感性", "重复实验与不确定性"] },
    ],
  },
  {
    slug: "modeling-optimization",
    code: "K02",
    title: "建模与优化",
    summary: "把算法放回真实约束里",
    intro: "整理代理建模、多目标优化和安全决策之间能够互相连接的方法结构。",
    sections: [
      { title: "模型", items: ["代理模型与混合建模", "误差结构与适用范围", "不确定性与稳健性"] },
      { title: "决策", items: ["多目标与约束", "方案选择与敏感性", "安全强化学习评估"] },
    ],
  },
  {
    slug: "academic-writing",
    code: "K03",
    title: "论文与表达",
    summary: "让研究逻辑经得起追问",
    intro: "把研究问题、方法、结果与结论组织成一致、克制而可核查的表达。",
    sections: [
      { title: "逻辑链", items: ["问题、方法、结果闭环", "创新点与证据对应", "结论边界与局限"] },
      { title: "投稿检查", items: ["图表公式与补充材料", "术语和数值一致性", "目标期刊指南适配"] },
    ],
  },
  {
    slug: "reproducibility",
    code: "K04",
    title: "工具与复现",
    summary: "把一次实验变成可靠流程",
    intro: "关注实验记录、代码结构、性能成本和失败案例，让工作能够被复查和继续。",
    sections: [
      { title: "实验", items: ["数据与版本管理", "随机种子与重复次数", "配置、日志与产物"] },
      { title: "工程", items: ["延迟、吞吐与成本", "缓存、重试与失败率", "p50 / p95 与稳定性"] },
    ],
  },
];

export type ReflectionRecord = {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  /** 兼容既有列表页，详情页正文请使用 body。 */
  text: string;
  body: string[];
  tags: string[];
  status: ContentStatusLabel;
};

export const reflections: ReflectionRecord[] = [
  {
    slug: "research-boundaries",
    topic: "关于研究",
    title: "复杂之前，先把边界说清楚",
    summary: "真正困难的往往不是找到更复杂的模型，而是把问题边界说清楚，并愿意对每一个结论负责。",
    text: "真正困难的往往不是找到更复杂的模型，而是把问题边界说清楚，并愿意对每一个结论负责。",
    body: [
      "真正困难的往往不是找到更复杂的模型，而是把问题边界说清楚，并愿意对每一个结论负责。",
      "研究对象、数据边界、目标变量和决策场景一旦含混，后续更漂亮的指标也很难自动补上逻辑缺口。先回答问题究竟是什么，才能判断方法是否合适、证据是否充分。",
    ],
    tags: ["研究设计", "问题边界", "证据责任"],
    status: "资料待完善",
  },
  {
    slug: "method-failure",
    topic: "关于方法",
    title: "比平均指标更重要的，是知道何时失效",
    summary: "好的方法不只在平均指标上胜出，还要知道它何时失效、为什么失效，以及失败的代价是什么。",
    text: "好的方法不只在平均指标上胜出，还要知道它何时失效、为什么失效，以及失败的代价是什么。",
    body: [
      "好的方法不只在平均指标上胜出，还要知道它何时失效、为什么失效，以及失败的代价是什么。",
      "在真实工业场景中，边界工况、约束违反、数据漂移和尾部风险不会因为平均表现良好而消失。记录失败案例，是理解方法适用范围的一部分。",
    ],
    tags: ["模型评价", "失败案例", "风险边界"],
    status: "资料待完善",
  },
  {
    slug: "life-curiosity",
    topic: "关于生活",
    title: "认真生活，也是保持判断力的方法",
    summary: "生活不是研究之外的留白。认真吃饭、走路、看世界，也是保持判断力与好奇心的方式。",
    text: "生活不是研究之外的留白。认真吃饭、走路、看世界，也是保持判断力与好奇心的方式。",
    body: [
      "生活不是研究之外的留白。认真吃饭、走路、看世界，也是保持判断力与好奇心的方式。",
      "具体的味道、路线、作品与相遇，让抽象思考重新回到真实经验。这里记录的不是标准答案，而是值得保存和再次回看的感受。",
    ],
    tags: ["生活记录", "好奇心", "具体经验"],
    status: "资料待完善",
  },
];

export type LifeSection = {
  title: string;
  items: string[];
};

export type LifeCategoryRecord = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string;
  tone: "copper" | "sand" | "blue" | "sage";
  sections: LifeSection[];
  relatedLinks?: { href: string; title: string; description: string }[];
  status: ContentStatusLabel;
};

export const lifeCategories: LifeCategoryRecord[] = [
  {
    slug: "local-flavors",
    code: "EAT",
    title: "地方风味与认真吃饭",
    summary: "记录值得专程去吃的一餐，也收藏巷子里那些没有标准答案的味道。",
    intro: "完善这一页需要提供真实到访的店铺名称、地点、日期、消费价格、推荐理由、注意事项与现场图片。",
    tone: "copper",
    sections: [
      { title: "需要提供", items: ["店铺名称、城市与具体地点", "到访日期、菜品名称与实际价格", "推荐理由、注意事项与现场图片"] },
      { title: "发布边界", items: ["只记录亲自体验过的内容", "营业时间与价格等时效信息会在发布时核实"] },
    ],
    status: "资料待完善",
  },
  {
    slug: "coffee-tea",
    code: "DRINK",
    title: "咖啡、茶与慢时刻",
    summary: "一间店、一只杯子，或者一段适合放空和整理思绪的下午。",
    intro: "完善这一页需要提供店铺或品牌、地点、到访日期、饮品与价格、空间感受及现场图片。",
    tone: "sand",
    sections: [
      { title: "需要提供", items: ["店铺或品牌名称与具体地点", "饮品名称、口味、环境与消费价格", "到访日期与现场图片"] },
      { title: "发布边界", items: ["个人体验与可核实信息分开呈现", "不使用未经体验的推荐内容"] },
    ],
    status: "资料待完善",
  },
  {
    slug: "travel-walks",
    code: "GO",
    title: "旅行、散步与临时起意",
    summary: "路线、交通、预算和避坑，也保留途中没有被计划的惊喜。",
    intro: "完善这一页需要提供目的地、出行日期、逐段路线、交通耗时、预算、预约事项、步行强度与现场图片。",
    tone: "blue",
    sections: [
      { title: "需要提供", items: ["目的地、出行日期与同行人数", "路线、交通方式、耗时与预算", "预约要求、步行强度、避坑信息与现场图片"] },
      { title: "发布边界", items: ["事实信息与个人感受明确区分", "路线建议标注适用时间和步行强度"] },
    ],
    status: "资料待完善",
  },
  {
    slug: "culture-objects",
    code: "ENJOY",
    title: "电影、动画、音乐与好东西",
    summary: "分享真正打动过我的作品，以及日常中反复使用、值得推荐的小物。动画与影评另设专题持续整理。",
    intro: "完善这一页需要提供作品或物品名称、体验时间与背景、推荐理由、官方链接及可公开图片；动画片单与影评已设独立专题。",
    tone: "sage",
    sections: [
      { title: "需要提供", items: ["作品或物品的准确名称", "观看、聆听或使用背景与推荐理由", "官方链接与可公开图片"] },
      { title: "发布边界", items: ["只分享真实观看、聆听或使用体验", "主观感受不包装成普遍结论"] },
    ],
    relatedLinks: [
      {
        href: "/life/animation",
        title: "动画与影评",
        description: "进入动画兴趣档案、番剧总表与影评手记。",
      },
    ],
    status: "资料待完善",
  },
];

export const animationInterest = {
  code: "ANIME",
  title: "动画、叙事与影评",
  summary: "从 2017 年正式入坑，到后来持续整理总表、季度片单和长短影评，动画已经成为我坚持时间最久、也最愿意反复回看的兴趣。",
  intro: "这里整理我的真实观看经历：入坑故事、反复重看的作品、年度片单，以及那些在多年后仍然想写下来的画面与感受。",
  stages: [
    { code: "01", title: "2017 · 入坑", description: "从《寻找失去的未来》开始，也是在 4 月 12 日第一次注册 B 站账号。" },
    { code: "02", title: "持续 · 记录", description: "用总表、新番评价和年度片单，留下作品与当时生活发生联系的方式。" },
    { code: "03", title: "多年后 · 重看", description: "二刷不是为了重复结论，而是看见经历变化后，自己如何重新理解作品。" },
  ],
  anchors: [
    {
      label: "入坑第一作",
      title: "寻找失去的未来",
      note: "总表中保留了两次观看记录；它也是后来持续看动画的起点。",
    },
    {
      label: "最喜欢的 TV 动画",
      title: "末日时在做什么？有没有空？可以来拯救吗？",
      note: "原始笔记写着“最后一集十几刷”，是个人偏好最明确的一部作品。",
    },
    {
      label: "最喜欢的动画电影",
      title: "你的名字。",
      note: "二刷之后继续收藏了原作、设定资料与相关读物。",
    },
    {
      label: "始终珍视的纯爱动画",
      title: "月色真美",
      note: "喜欢它朴素、自然的情感推进，也一直记得最后追逐列车的片段。",
    },
  ],
  yearShelves: [
    {
      year: "2022",
      label: "年度个人十选",
      note: "从当年新 TV 动画中整理的个人推荐，重点关注氛围、人物与完成度。",
      titles: ["向山进发 Next Summit", "赛博朋克：边缘行者", "街角魔族 2丁目", "辉夜大小姐想让我告白－究极浪漫－"],
    },
    {
      year: "2024",
      label: "重看与补完",
      note: "这一年的记录里，重看占了很大比重：有些作品越往后看，越能理解它的节奏。",
      titles: ["水星领航员（二刷）", "向山进发（二刷）", "攻壳机动队 S.A.C.", "葬送的芙莉莲"],
    },
    {
      year: "2025",
      label: "回看与新发现",
      note: "在旧作二刷与新番之间并行，留下了对青春、科研、日常和群像叙事的新观察。",
      titles: ["闪光的哈萨维（二刷）", "败犬女主太多了！（二刷）", "金牌得主", "琉璃的宝石"],
    },
  ],
} as const;

export type AnimationReviewRecord = {
  slug: string;
  code: string;
  title: string;
  englishTitle: string;
  lens: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  tags: string[];
  sourceNote: string;
  status: ContentStatusLabel;
};

// 下列内容依据小闫保存在番剧总表、新番评价、年度记录与文章影评中的原稿整理。
// 只修正明显错字、断句与公开表达，不补写原稿中不存在的剧情事实或评价。
export const animationReviews: AnimationReviewRecord[] = [
  {
    slug: "anime-journey-since-2017",
    code: "AE01",
    title: "从《寻找失去的未来》开始",
    englishTitle: "MY ANIME JOURNEY SINCE 2017",
    lens: "入坑经历与长期兴趣",
    summary: "从小学暑假追完当时已更新的六百多集《海贼王》，到 2017 年 4 月 12 日正式入坑：这是一段动画如何成为长期爱好的个人记录。",
    facts: [
      { label: "内容类型", value: "个人观看史" },
      { label: "时间跨度", value: "小学 · 2017 · 至今" },
      { label: "剧透提示", value: "无核心剧情剧透" },
    ],
    sections: [
      {
        title: "第一次接触日本动画",
        paragraphs: [
          "真正开始看番以前，我接触最多的日本动画只有《海贼王》。小学六年级的一个暑假，我和弟弟在同学家偶然看到它，后来两个人用整个假期追完了当时已经更新的六百多集。那时还没有“入坑”的概念，只觉得原来一个故事可以长到陪人度过整个夏天。",
        ],
      },
      {
        title: "2017 年 4 月 12 日",
        paragraphs: [
          "2017 年初三时，我在视频网站首页偶然点开《寻找失去的未来》，很快又看了《政宗君的复仇》。同桌知道后，向我推荐《灼眼的夏娜》《未闻花名》，也第一次告诉我 B 站的存在。4 月 12 日晚上，我注册了账号；现在回头看，是那位同桌替我推开了动画世界的一扇门。",
          "随后我沿着当时的热门作品一路补番，也在 2017 年遇到了很多后来仍会想起的作品。《月色真美》尤其特别：没有夸张设定，感情推进像流水一样自然，最后追逐列车的片段至今仍留在记忆里。",
        ],
      },
      {
        title: "几部不会被轻易替代的作品",
        paragraphs: [
          "在早期总表里，《寻找失去的未来》被写成“入坑第一作”；《末日时在做什么？有没有空？可以来拯救吗？》旁边写着“最后一集十几刷”；《你的名字。》则是我最喜欢的动画电影之一，二刷以后还陆续收藏了原作和设定资料。它们未必构成一份客观榜单，却准确保存了我当时最直接的喜欢。",
          "动画后来逐渐变成我坚持最久的兴趣：我开始做总表、排新番日程、写年度推荐，也会在几年后重新看一部旧作。记录的意义并不只是证明看过多少，而是保存某部作品曾经怎样进入我的生活。",
        ],
      },
    ],
    tags: ["观看史", "2017", "长期兴趣"],
    sourceNote: "依据早期《番剧总结》和《总番剧列表》整理，保留原意，仅调整断句与明显错字。",
    status: "已确认",
  },
  {
    slug: "hibike-euphonium-rewatch",
    code: "AR02",
    title: "《吹响吧！上低音号》：一首青春交响曲",
    englishTitle: "HIBIKE! EUPHONIUM — A REWATCH",
    lens: "人物、音乐与镜头语言",
    summary: "二刷之后，我仍把《吹响吧！上低音号》看作京都动画最完整的作品之一：人物、音乐、色彩与分镜共同写出了一段青春。",
    facts: [
      { label: "内容类型", value: "二刷长评" },
      { label: "观看范围", value: "TV · 剧场版 · 利兹与青鸟" },
      { label: "剧透提示", value: "涉及人物关系与关键镜头" },
    ],
    sections: [
      {
        title: "二刷：像第一次重新认识它",
        paragraphs: [
          "那次重看，我把京都动画多年来的作品大致重新看了一遍，把《吹响吧！上低音号》放在最后。因为距离第一次观看已有几年，很多剧情只剩模糊印象，反而像重新认识这部作品。看完整个系列与《利兹与青鸟》后，我仍然认为它是京都动画在人物、音乐与演出上的一次集成。",
        ],
      },
      {
        title: "人物先从外形和姿态里出现",
        paragraphs: [
          "我很喜欢作品用细节区分人物状态：久美子和丽奈束发、散发时的气质变化，明日香成熟中带着俏皮，夏纪的慵懒、优子的活泼、霙近似小动物般的羞涩。造型没有替代人物塑造，却会在角色开口以前，先给观众一个可以继续验证的印象。",
          "明日香是整支吹奏部里最强势也最难被看透的人。她看上去几乎什么都能处理，因此更少有人相信她也会遇到无法解决的事。这个人物给我最深的提醒是：无论别人怎样评价，面对内心真正喜欢、真正想做的事，都不应该先欺骗自己。",
        ],
      },
      {
        title: "音乐、色彩和青春的情绪",
        paragraphs: [
          "古典音乐与比赛曲不仅服务演奏场景，也在帮助观众理解人物关系。大吉山的深蓝夜空、城市灯光与白色衣服，庙会桥上的烟花，以及河边练习时的黄昏，都把角色难以直接说出口的不安、迷茫和靠近转化成了视觉情绪。",
          "作品最动人的地方，是画面与音乐从不只负责“好看”和“好听”。当演奏持续数分钟，镜头仍会通过移动、环绕、人物特写和小物件维持节奏，让观众既听见乐曲，也看见每个人正处于怎样的状态。",
        ],
      },
      {
        title: "位置倒转，就是成长发生过的证据",
        paragraphs: [
          "第一季开头，久美子站在校门台阶下望向上方的明日香；第二季结尾，两人的位置发生了倒转。对我来说，这既是新旧交替，也是久美子在音乐、待人处事和自我理解上的成长。作品还会用不让角色同框、遮住正脸、蜘蛛网与飞走的蝴蝶等镜头传递关系变化，让很少的画面承载很高的信息密度。",
          "能写的地方还有太多。重看之后，我仍希望自己可以像吹奏部的大家一样，在最好的青春里，认真写下属于自己的那段旋律。",
        ],
      },
    ],
    tags: ["京都动画", "青春", "视听语言"],
    sourceNote: "依据《番剧评价》中的二刷长评整理；删去重复口语，保留人物与镜头判断。",
    status: "已确认",
  },
  {
    slug: "evangelion-thrice-upon-a-time",
    code: "AR03",
    title: "《EVA：终》：在不满与告别之间",
    englishTitle: "THRICE UPON A TIME — REVISITED",
    lens: "成长、和解与告别",
    summary: "“作为动画电影是优秀的，但作为 EVA 的结局是不及格的。”四年后在影院重看，我仍保留这个判断，也终于接受了它选择的告别。",
    facts: [
      { label: "内容类型", value: "影院重看短评" },
      { label: "观看背景", value: "BD 首看 · 四年后补票" },
      { label: "剧透提示", value: "包含结局与人物去向" },
    ],
    sections: [
      {
        title: "四年后，评价没有改变",
        paragraphs: [
          "第一次看 BD 时，我只给了它七分。四年后在线下补票，我的评价仍然是：作为一部动画电影，它是优秀的；但作为 EVA 的结局，它并不合格。作品用村落、家庭和种田生活引导丽，也让真嗣最终决定面对父亲与自己，以父子之间的理解收束整个系列。这是一种很强硬的成长，也是一种近乎背叛过去的和解。",
        ],
      },
      {
        title: "成为大人，然后呢？",
        paragraphs: [
          "《终》像是在对真嗣、对观众，也对曾经被 EVA 困住的一代人说：你们已经成为大人了。庵野秀明最终选择爱与和平，真嗣也终于长大；但接受和解结局的观众，是否真的接受了与自己的和解？当所有谜题都被关闭，EVA 似乎也失去了继续拒绝和解的空间。",
        ],
      },
      {
        title: "音乐响起以后",
        paragraphs: [
          "但当影院里《One Last Kiss》的前奏响起时，很多不满忽然散去了。这场横跨近三十年的斗争，对创作者、观众和作品本身也许都是一种折磨，是时候让它拥有一个结局。人会成长，但接受眼前的世界，并不意味着否定或忘记过去。",
          "《Beautiful World》结束时，我仿佛回到初中第一次看 EVA 的夏天。也许我没有像真嗣一样成为“大人”，所以仍会对结局感到不满；可那个让温暖春光照进残酷世界与观众内心的结尾，的确配得上一句：再见了，所有的 Evangelion。",
        ],
      },
    ],
    tags: ["EVA", "成长", "告别"],
    sourceNote: "依据影院重看后写下的《EVA终》短评整理，核心判断和情绪转折均保留原文。",
    status: "已确认",
  },
  {
    slug: "poppin-dream-five-years",
    code: "AR04",
    title: "Poppin’ Dream!：终于理解“心动与闪耀”",
    englishTitle: "POPPIN' DREAM! — FIVE YEARS LATER",
    lens: "作品陪伴与个人记忆",
    summary: "从高一暑假在上海 BW 偶然听见一首歌，到五年后看见成员一起抬头望向星空：我终于理解了这个企划反复谈起的“心动与闪耀”。",
    facts: [
      { label: "内容类型", value: "作品陪伴长评" },
      { label: "观看背景", value: "高一入坑 · 五年后重访" },
      { label: "剧透提示", value: "涉及剧场版演出片段" },
    ],
    sections: [
      {
        title: "从上海 BW 的一个展台开始",
        paragraphs: [
          "高一暑假，我去上海参加第二届 BW，在途中偶然遇到 Poppin'Party 的展台，只听了一首歌。回家后，我开始玩台服，也从那里逐渐了解 BanG Dream!。当时的我对偶像番和音游都没有太大兴趣，Poppin'Party 的歌却带来一种很难解释的吸引力。",
        ],
      },
      {
        title: "一个企划慢慢进入生活",
        paragraphs: [
          "后来我第一次研究怎样玩日服，也因为 BanG Dream! 接触到 Love Live!、偶像大师和更多偶像企划。它改变的不只是一份片单：我开始喜欢音游、偶像动画和现场文化，每天上线打几首歌，也逐渐成为生活里稳定的小习惯。",
          "五年时间里，我一直没能准确解释“kira kira doki doki”到底是什么，却隐约知道，那就是这个企划想传递给我的东西。",
        ],
      },
      {
        title: "并不完美，但那一分钟足够",
        paragraphs: [
          "从电影本身看，它并不完美：篇幅很短，剧情推进有牵强之处，其他乐队的加入也压缩了 Poppin'Party 自己的空间。但关于五位成员的互动、日常与舞台，我仍然非常喜欢。",
          "当第二首歌结束，香澄指向星空，所有人一起抬头的那一分钟，我第一次真正理解了“心动与闪耀”。当时脑中只有一个念头：我遇见 BanG Dream!，也许就是为了这一刻的感动。",
        ],
      },
    ],
    tags: ["BanG Dream!", "陪伴", "现场文化"],
    sourceNote: "依据《番剧评价》中的 Poppin’ Dream! 长评整理，保留个人经历与对影片优缺点的判断。",
    status: "已确认",
  },
  {
    slug: "aria-the-animation-farewell",
    code: "AR05",
    title: "《水星领航员》：温柔日常里的离别",
    englishTitle: "ARIA — GROWING UP AND PARTING",
    lens: "日常、成长与分别",
    summary: "它明明是一部极其温柔的日常动画，却让我在看完后像与老朋友分别一样难过：成长让每个人接近目标，也让曾经朝夕相处的人渐渐走远。",
    facts: [
      { label: "内容类型", value: "年度观看长评" },
      { label: "观看背景", value: "2022 年末 · 全系列补完" },
      { label: "剧透提示", value: "涉及第三季结局" },
    ],
    sections: [
      {
        title: "在年末遇见新威尼斯",
        paragraphs: [
          "第一季第一集的片头曲响起时，我就大概明白，这会是一个多么温柔的故事。按理说，单元剧形式的日常动画适合每天慢慢看一集，可我还是被新威尼斯、被灯里她们普通而温馨的生活不断吸引。",
          "奇怪的是，这部近乎纯粹的治愈动画，在结束后留给我的却不是轻松，而是与老朋友分别般的伤感。直到第三季最后，我才慢慢理解这种情绪来自哪里。",
        ],
      },
      {
        title: "梦想实现时，生活也开始分流",
        paragraphs: [
          "灯里成为正式领航员，也意味着艾莉西亚将离开原来的舞台。大家都成长了，都向着自己的目标前进；可走得越远，曾经可以天天见面、共同练习的人，也越容易被工作和生活隔开。",
          "这不是遥远的物理距离，也不是永远无法再见。恰恰因为“以后还可以见”，这种分别才更贴近真实生活：再见面的机会究竟还有多少？再见时，彼此又已经走到了哪里？",
        ],
      },
      {
        title: "不是怀念过去，而是珍惜仍在继续的现在",
        paragraphs: [
          "《水星领航员》的世界大多温暖、善良，甚至美好得近乎虚幻；只有这种随着成长逐渐分开的感觉，真实到让我每次听见最初的旋律，都会想起故事的结尾。",
          "它最终留下的不是“过去才是最好的”，而是一种更温柔的提醒：每个人都要继续自己的生活，保持向前看；曾经的快乐没有消失，而现在也仍然可以拥有新的快乐。",
        ],
      },
    ],
    tags: ["水星领航员", "治愈日常", "成长与离别"],
    sourceNote: "依据 2022 年年度记录中的《水星领航员》长评整理；将原稿中的长段落分节，保留核心情绪与判断。",
    status: "已确认",
  },
  {
    slug: "anime-picks-2022",
    code: "AL06",
    title: "2022 年动画个人推荐十选",
    englishTitle: "MY 2022 ANIME PICKS",
    lens: "年度片单与观看语境",
    summary: "这不是一份客观排名，而是 2022 年年末留下的个人观看切片：从登山、夜晚与日常，到赛博朋克、恋爱喜剧与太空歌剧。",
    facts: [
      { label: "内容类型", value: "年度个人片单" },
      { label: "记录时间", value: "2022 年末" },
      { label: "选择范围", value: "当年观看的新 TV 动画" },
    ],
    sections: [
      {
        title: "写在榜单前",
        paragraphs: [
          "2022 年末，我把当年看过的新动画做了一次个人向整理。那时每个季度都会稳定追不少新番，同时也不断补以前的作品。重看这份榜单，比“哪部最强”更有意思的，是它保存了当时最在意的东西：氛围、人物关系、完成度，以及一部作品能否把某种生活感留在屏幕之外。",
        ],
      },
      {
        title: "01—05",
        paragraphs: [
          "01｜《向山进发 Next Summit》——我在 2022 年最喜欢、也最期待的动画。稳定的作画、每集不同的片尾小故事，以及沿途的日本风景，让登山、友情与日常自然地连在一起。",
          "02｜《赛博朋克：边缘行者》——独特的画风、音乐和故事节奏，共同塑造了一个几乎注定走向悲剧的赛博朋克社会。",
          "03｜《街角魔族 2丁目》——主线与日常结合得非常自然，既保留轻松的生活节奏，也让人物关系持续向前。",
          "04｜《银河英雄传说 Die Neue These》——吸引我的并不是“太空”本身，而是作品不断摆出专制、民主、理想与现实之间难以简单回答的问题。",
          "05｜《辉夜大小姐想让我告白－究极浪漫－》——恋爱喜剧可以一季比一季更完整，也可以在让人开心的同时，把人物多年的犹豫推向真正的变化。",
        ],
      },
      {
        title: "06—10",
        paragraphs: [
          "06｜《86－不存在的战区－》——最后阶段的演出与氛围尤其出色；我也保留一个疑问：作品提出了人与 AI、种族与战争，却没有把每个问题都同样深入地讨论下去。",
          "07｜《孤独摇滚！》——表情、演出和音乐让“社恐”不只是一个标签，也变成了不断尝试走向他人的具体过程。",
          "08｜《彻夜之歌》——色彩与音乐搭出近乎理想化的夜晚氛围；看完以后，会让人也想在深夜走到街上。",
          "09｜《明日酱的水手服》——它把青春少女的活力直接铺满画面，观看时能感到一种很具体的年轻与明亮。",
          "10｜《相合之物》——没有夸张的作画与跌宕情节，依然可以依靠温馨、普通的日常，让人在忙碌一天后安静下来。",
        ],
      },
    ],
    tags: ["2022", "年度十选", "个人片单"],
    sourceNote: "依据 2022 年年末推荐榜整理；保留个人排序，删去会随时间变化的热度与平台数据。",
    status: "已确认",
  },
];

export type PublicationRecord = {
  slug: string;
  code: string;
  type: string;
  title: string;
  summary: string;
  year: string;
  venue: string;
  authors: string;
  doi: string | null;
  abstract: string;
  contribution: string;
  links: { label: string; href: string }[];
  status: ContentStatusLabel;
};

// TODO(content): 以下两个入口只说明建立正式论文/报告记录需要什么，不代表真实成果。
// 题名、作者、年份、刊物或发布机构、DOI 与公开链接等资料齐备后替换。
export const publicationRecords: PublicationRecord[] = [
  {
    slug: "publication-record-01",
    code: "P01",
    type: "论文条目资料清单",
    title: "建立正式论文记录需要什么",
    summary: "需要提供正式题名、作者顺序、年份、期刊或会议、发表状态、摘要、主要贡献、DOI 与公开链接。",
    year: "需要提供发表或投稿年份",
    venue: "需要提供期刊或会议名称",
    authors: "需要提供作者名单与顺序",
    doi: null,
    abstract: "需要提供摘要或可公开的内容概述",
    contribution: "需要提供承担的工作与主要贡献",
    links: [],
    status: "资料待完善",
  },
  {
    slug: "publication-record-02",
    code: "P02",
    type: "报告条目资料清单",
    title: "建立公开研究报告需要什么",
    summary: "需要提供报告题名、作者或团队、完成日期、发布机构、版本、关联项目、核心结论与可公开链接。",
    year: "需要提供完成或发布日期",
    venue: "需要提供发布机构、项目或使用场景",
    authors: "需要提供作者、团队与个人角色",
    doi: null,
    abstract: "需要提供执行摘要、研究范围与可公开结论",
    contribution: "需要提供负责的分析、实验、撰写或交付工作",
    links: [],
    status: "资料待完善",
  },
];

export type EducationRecord = {
  slug: string;
  code: string;
  phase: string;
  level: string;
  title: string;
  institution: string;
  school: string;
  major: string;
  supervisor: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
  status: ContentStatusLabel;
};

export const educationRecords: EducationRecord[] = [
  {
    slug: "masters-stage",
    code: "EDU-01",
    phase: "CURRENT",
    level: "硕士研究生",
    title: "硕士研究阶段",
    institution: "需要提供学校名称",
    school: "需要提供学院或院系名称",
    major: "需要提供专业名称",
    supervisor: "需要提供导师姓名",
    period: "需要提供入学与毕业时间",
    location: "需要提供城市或校区",
    summary: "当前处于硕士研究阶段，关注工业过程建模、优化与可信智能。",
    details: ["需要提供学校、学院与专业信息", "需要提供导师、研究团队与起止时间", "需要提供核心课程、研究内容与阶段成果"],
    status: "资料待完善",
  },
];

export type ExperienceRecord = {
  slug: string;
  code: string;
  phase: string;
  type: string;
  title: string;
  description: string;
  summary: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  outputs: string[];
  /** 兼容既有时间轴。 */
  meta: string;
  status: ContentStatusLabel;
};

export const experienceRecords: ExperienceRecord[] = [
  {
    slug: "masters-research",
    code: "EXP-01",
    phase: "CURRENT",
    type: "科研经历",
    title: "硕士研究阶段",
    description: "围绕工业过程建模、优化与可信智能开展学习与研究。",
    summary: "关注铜电积、电解液净化、代理模型、多目标优化、安全强化学习，以及可解释与因果机器学习。",
    organization: "需要提供学校、实验室或机构名称",
    role: "需要提供角色或岗位",
    period: "需要提供起止时间",
    location: "需要提供城市或工作地点",
    responsibilities: ["需要提供承担的具体研究任务", "需要提供团队角色与协作内容"],
    outputs: ["需要提供可公开的项目、论文、报告、代码或其他成果"],
    meta: "需要提供：机构 · 角色 · 起止时间 · 地点",
    status: "资料待完善",
  },
];

export type HonorRecord = {
  slug: string;
  code: string;
  category: string;
  title: string;
  description: string;
  issuer: string;
  level: string;
  date: string;
  scope: string;
  role: string;
  contribution: string;
  proofUrl: string | null;
  status: ContentStatusLabel;
};

export const honorRecords: HonorRecord[] = [
  {
    slug: "academic-research",
    code: "H01",
    category: "学术与科研",
    title: "学术与科研记录",
    description: "完善这条记录需要提供奖项名称、等级、授予机构、日期、参评范围、承担角色、主要贡献与证明材料。",
    issuer: "需要提供授予机构",
    level: "需要提供奖项等级或名次",
    date: "需要提供获奖日期",
    scope: "需要提供参评或评选范围",
    role: "需要提供个人或团队角色",
    contribution: "需要提供承担工作与主要贡献",
    proofUrl: null,
    status: "资料待完善",
  },
  {
    slug: "competition-practice",
    code: "H02",
    category: "竞赛与实践",
    title: "竞赛与实践记录",
    description: "完善这条记录需要提供竞赛名称、成绩、主办方、日期、参赛范围、团队角色、个人贡献与证明材料。",
    issuer: "需要提供主办或授予机构",
    level: "需要提供奖项等级或成绩",
    date: "需要提供参赛或获奖日期",
    scope: "需要提供竞赛级别与参赛范围",
    role: "需要提供个人或团队角色",
    contribution: "需要提供承担工作与主要贡献",
    proofUrl: null,
    status: "资料待完善",
  },
  {
    slug: "growth-service",
    code: "H03",
    category: "成长与服务",
    title: "成长与服务记录",
    description: "完善这条记录需要提供奖学金、学生工作或志愿经历的名称、机构、日期、职责、贡献与证明材料。",
    issuer: "需要提供授予或组织机构",
    level: "需要提供类别、等级或服务性质",
    date: "需要提供发生日期或时间范围",
    scope: "需要提供活动或评选范围",
    role: "需要提供承担角色",
    contribution: "需要提供主要工作、贡献与结果",
    proofUrl: null,
    status: "资料待完善",
  },
];

/** 兼容既有荣誉列表页；新页面应优先使用 honorRecords。 */
export const honorGroups = honorRecords;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getSkill(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}

export function getKnowledge(slug: string) {
  return knowledge.find((entry) => entry.slug === slug);
}

export function getPublication(slug: string) {
  return publicationRecords.find((record) => record.slug === slug);
}

export function getEducation(slug: string) {
  return educationRecords.find((record) => record.slug === slug);
}

export function getExperience(slug: string) {
  return experienceRecords.find((record) => record.slug === slug);
}

export function getHonor(slug: string) {
  return honorRecords.find((record) => record.slug === slug);
}

export function getReflection(slug: string) {
  return reflections.find((record) => record.slug === slug);
}

export function getLifeCategory(slug: string) {
  return lifeCategories.find((record) => record.slug === slug);
}

export function getAnimationReview(slug: string) {
  return animationReviews.find((record) => record.slug === slug);
}
