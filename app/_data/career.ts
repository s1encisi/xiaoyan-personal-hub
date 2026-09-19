import { commerceProject } from "./commerce-project";
import type { EducationRecord, ExperienceRecord, HonorRecord, ProjectRecord, PublicationRecord, SkillRecord } from "./content";

/** Curated for the public portfolio from owner-provided material. Source ledger stays local. */
export const careerUpdatedAt = "2026-09-10";
export const publishedPaperUrl = "https://mete.cbpt.cnki.net/portal/journal/portal/client/paper/3b2ce24d8c313cdca1e389ce42a036fe";
const steps = (items: [string, string][]) => items.map(([title, text], index) => ({ step: String(index + 1).padStart(2, "0"), title, text }));
const facts = (items: [string, string][]) => items.map(([label, value]) => ({ label, value }));

export const careerProjects: ProjectRecord[] = [
  commerceProject,
  {
    slug: "copper-electrowinning-surrogate", index: "01", title: "铜电积过程的机器学习预测", englishTitle: "LEARNING THE ELECTROWINNING PROCESS", category: "工业预测 · 已发表研究", status: "verified",
    summary: "把企业生产数据转化为槽电压与出液铜浓度预测模型，比较 10 种算法，并用 SHAP 解释关键工艺变量的预测贡献。研究以第一作者发表于《有色金属（冶炼部分）》。",
    question: "让难以直接掌握的过程状态，成为可预测、可解释的决策信息。",
    tags: ["XGBoost", "GBR", "SHAP", "工业数据"],
    facts: facts([["项目背景", "国家重点研发计划 · 铜砷分离数字调控"], ["研究阶段", "2024—2025 · 期刊论文已发表"], ["个人工作", "数据建模、模型比较、解释分析与论文写作"], ["预测对象", "槽电压与出液铜离子浓度"]]),
    route: steps([["整理过程数据", "从电积时间、进液铜浓度、温度、电流和流量等变量建立预测输入，整理生产记录与模型特征。"], ["比较十种算法", "建立统一的模型比较流程，以 R²、误差指标和优化后的表现选择适合两类目标的模型。"], ["分别优化预测器", "采用 GBR 预测电压，采用 XGBoost 预测出液铜浓度，结合贝叶斯优化与网格搜索完成参数调整。"], ["解释模型响应", "通过 SHAP 比较变量贡献，把电流、电积时间等模型响应与工艺知识联系起来，支持结果讨论。"]]),
    evaluation: ["电压预测：GBR 的 R² 为 0.79，MSE 为 1.25。", "出液铜浓度预测：XGBoost 的 R² 为 0.87，MSE 为 5.58。", "完成 10 种模型比较，成果发表于 2025 年第 9 期，13—24 页。"],
    boundaries: ["指标对应论文中的数据与评价设置。解释分析描述模型关联，为工艺诊断与后续参数优化提供依据。"],
    relatedSkills: ["industrial-process-modeling", "explainable-causal-ml"],
  },
  {
    slug: "electrolyte-purification-optimization", index: "02", title: "铜电积的约束多目标优化", englishTitle: "RESOURCE-EFFICIENT COPPER RECOVERY", category: "智能优化 · ESRL-CMO", status: "verified",
    summary: "将铜回收、砷控制、能耗与净收益放入同一个决策框架，以分工况代理模型连接历史生产数据与 PPO-Lagrangian，生成不同偏好下的可行操作方案。",
    question: "面对相互牵制的工艺目标，给出一组可以比较和选择的操作方案。",
    tags: ["ExtraTrees", "NSGA-II", "PPO-Lagrangian", "Pareto"],
    facts: facts([["项目背景", "国家重点研发计划 · 铜电解液净化"], ["研究规模", "1,978 条历史记录 · 3 类工况 · 9 个代理模型"], ["决策结构", "4 项优化目标 · 5 类工艺约束"], ["成果进展", "Journal of Cleaner Production · 修回中"]]),
    route: steps([["建立分工况代理环境", "对三类运行配置分别建模，预测出液铜浓度、出液砷浓度与系统电压，保留工况间的结构差异。"], ["定义目标与约束", "把铜、砷、能耗和净收益转化为可比较目标，将浓度、电流密度、电压与铜砷比等要求写入约束。"], ["学习偏好条件策略", "使用 PPO-Lagrangian 处理约束，以不同偏好权重搜索操作方案，输出可行的 Pareto 解集。"], ["比较决策价值", "与 NSGA-II 和历史操作比较，分析不同进液条件及能耗门槛下的资源效率与经济权衡。"]]),
    evaluation: ["代理模型的随机留出测试 R²：铜浓度约 0.83、砷浓度约 0.84、电压约 0.90。", "工况 2、进液铜浓度 50—55 g/L 的代理环境比较中，相对所评估的 NSGA-II 配置，能耗降幅最高达到 43.1%。", "研究报告的 Pareto 候选解满足五类约束，并提供不同目标偏好的选择空间。"],
    boundaries: ["优化结果来自历史数据支持的离线代理环境；上述降幅对应明确工况与比较配置。项目把候选方案交给工艺分析与人工审核流程。"],
    relatedSkills: ["multi-objective-optimization", "safe-reinforcement-learning", "industrial-process-modeling"],
  },
  {
    slug: "safe-reinforcement-learning", index: "03", title: "ESRL-CMO：面向工艺约束的策略学习", englishTitle: "SAFE REINFORCEMENT LEARNING", category: "方法专题 · 约束策略优化", status: "verified",
    summary: "承担铜电积优化中的策略建模与算法实现，把连续参数调整建模为 CMDP，结合行为克隆预训练、拉格朗日约束与偏好采样，连接优化算法和实际决策需求。",
    question: "把工艺限制写入策略学习，让优化过程围绕可行解展开。",
    tags: ["CMDP", "PPO", "Cost Critic", "Behavior Cloning"],
    facts: facts([["所属研究", "铜电积约束多目标优化 · ESRL-CMO"], ["个人工作", "状态与动作设计、训练流程、基线比较与结果分析"], ["策略输入", "过程状态与目标偏好"], ["策略输出", "连续操作参数的调整方案"]]),
    route: steps([["把过程问题写成 CMDP", "围绕浓度、温度、电流与流量构建状态，以操作参数增量表达连续动作，并分别定义收益与约束成本。"], ["用已有可行解启动学习", "采用 NSGA-II 解集进行行为克隆预训练，为策略提供有结构的初始行为。"], ["协调异质约束", "通过拉格朗日更新处理约束成本，结合多头 Cost Critic 与训练调度组织策略优化。"], ["覆盖多种决策偏好", "将偏好权重作为策略条件，检查解集分布、可行性与不同工况下的结果，形成可解释的参数选择依据。"]]),
    evaluation: ["完成与 NSGA-II 等基线的方案比较。", "从目标质量、约束满足与 Pareto 解集分布共同评价策略。", "研究软件包含训练、验证、稳健性分析与可视化模块。"],
    boundaries: ["本页展开 ESRL-CMO 的算法模块，与铜电积多目标优化案例属于同一研究工作。"],
    relatedSkills: ["safe-reinforcement-learning", "multi-objective-optimization"],
  },
  {
    slug: "causal-explainable-industrial-ai", index: "04", title: "工业模型解释与诊断", englishTitle: "EXPLAINABLE INDUSTRIAL MODELS", category: "模型分析 · 工艺解释", status: "verified",
    summary: "在铜电积与污水能耗研究中使用 SHAP、PDP 和 ICE，将预测结果展开为变量贡献与响应关系，让模型分析能够进入工艺讨论。",
    question: "除了预测数值，还要说清模型使用了哪些信息、为什么这样响应。",
    tags: ["SHAP", "PDP", "ICE", "Model Diagnostics"],
    facts: facts([["应用场景", "铜电积预测 · 污水处理能耗预测"], ["分析对象", "特征贡献、非线性响应与工况差异"], ["个人工作", "解释分析、图表组织与工程语境下的结果讨论"], ["关联成果", "已发表铜电积论文与在审能耗研究"]]),
    route: steps([["从预测任务确定解释对象", "分别解释电压、出液浓度、日总能耗与单位水量能耗，避免把不同目标混为一谈。"], ["比较总体与单样本贡献", "用 SHAP 梳理关键变量的贡献分布，检查不同工况、样本与目标之间的差异。"], ["读取模型响应曲线", "结合 PDP 与 ICE 观察变量变化下的预测响应，识别非线性、平台区间和个体差异。"], ["回到工程问题", "围绕电流、过程时间、处理流量等变量解释预测器的行为，把分析结果用于数据核验和候选方案讨论。"]]),
    evaluation: ["铜电积研究识别出电流与时间在相应预测任务中的主要贡献。", "污水能耗研究比较总量与单位水量两个目标对处理流量的不同响应。", "同一套解释流程支持论文表达、模型诊断与工程沟通。"],
    boundaries: ["模型解释描述预测关联；关于干预效果的判断需要对应的实验或因果研究设计。"],
    relatedSkills: ["explainable-causal-ml", "industrial-process-modeling"],
  },
  {
    slug: "culab-agent-workbench", index: "05", title: "CuLab：铜电积研究与 Agent 工作台", englishTitle: "CULAB RESEARCH WORKBENCH", category: "工程系统 · AI Agent", status: "verified",
    summary: "将模型训练、预测、优化、方案选择与结果诊断组织为研究工作台。以 FastAPI 和 React 承接交互，并让诊断 Agent 调用数值工具、引用运行证据、记录调用成本。",
    question: "把散落的研究脚本，组织成可以运行、比较、追溯与解释的工作流程。",
    tags: ["FastAPI", "React", "TypeScript", "Tool Calling", "Python"],
    facts: facts([["项目类型", "工业研究软件 · 2026"], ["系统组成", "训练与预测、约束优化、运行管理、数值诊断"], ["交互方式", "React 工作台 + FastAPI 服务"], ["Agent 设计", "工具调用、证据引用、预算控制与运行追踪"]]),
    route: steps([["建立统一运行入口", "通过 API 组织事件、模型、实验和运行记录，让训练、优化与结果选择使用一致的数据结构。"], ["把数值能力变成工具", "提供运行检查、约束探测、响应探测与分辨率比较四类诊断工具，对参数进行类型与范围验证。"], ["要求判断能够回溯", "Agent 报告引用工具返回的证据编号，结果与原运行、模型版本和探测过程关联。"], ["组织可维护的交互", "前端展示运行状态、预测结果与候选方案；调用记录保留 token、耗时、缓存、重试与预算信息。"]]),
    evaluation: ["实现四类可调用的数值诊断工具，并使用结构化参数校验。", "运行结果、模型版本与诊断证据关联保存，支持结果导出与复查。", "将研究算法、后端服务和前端交互连接为完整工作流。"],
    boundaries: ["工厂数据、内部工艺配置与模型工件在受控环境使用。网站展示软件结构和个人工程实践。"],
    relatedSkills: ["agent-engineering", "industrial-process-modeling", "multi-objective-optimization"],
  },
  {
    slug: "wastewater-energy-tabpfn", index: "06", title: "有限样本下的污水处理能耗预测", englishTitle: "DATA-EFFICIENT WASTEWATER ENERGY PREDICTION", category: "环境 AI · 在审研究", status: "verified",
    summary: "用 TabPFN 同时预测污水处理日总能耗与单位水量能耗，结合传统模型对比、训练样本缩减及输入扰动，研究有限数据条件下的能效评估。",
    question: "在历史记录有限时，同时看清一座污水厂的总电耗与单位处理效率。",
    tags: ["TabPFN", "CatBoost", "XGBoost", "Robustness", "SHAP"],
    facts: facts([["成果状态", "Water Environment Research · 在审"], ["个人角色", "第一作者 · 建模、实验分析与论文写作"], ["预测目标", "日总能耗 TOEC · 单位水量能耗 SEC"], ["评价设计", "基线比较、样本缩减、噪声、缺失与异常输入"]]),
    route: steps([["区分总量与效率", "将 TOEC 与 SEC 作为互补目标，分别支持用电需求评估和单位水量能效分析。"], ["建立模型比较", "以 TabPFN 建立表格预测模型，与 CatBoost、XGBoost、随机森林、支持向量回归和 MLP 比较。"], ["检查数据条件变化", "逐步缩减训练数据，并设置噪声、缺失值与异常值，观察模型对样本数量和输入质量的响应。"], ["解释运行变量", "使用 SHAP、PDP 与 ICE 分析处理流量、温度等变量的预测贡献，将结果转化为能效诊断信息。"]]),
    evaluation: ["当前研究稿件的留出测试中，TOEC 的 R² 为 0.70，SEC 的 R² 为 0.87。", "对应 MAPE 分别为 5.33% 与 5.56%。", "训练样本缩减至研究设置的 40% 时，两项目标的 R² 分别为 0.60 与 0.85。"],
    boundaries: ["结果对应该研究数据集与实验划分。论文当前处于在审阶段。"],
    relatedSkills: ["industrial-process-modeling", "explainable-causal-ml"],
  },
  {
    slug: "urban-rural-ecological-footprint", index: "07", title: "城乡视角下的省域生态足迹", englishTitle: "MAPPING ENVIRONMENTAL PRESSURE", category: "空间分析 · 本科毕业论文", status: "verified",
    summary: "以 30 个省份、2015—2019 年数据和 22 类消费项目为基础，核算总体、城镇与农村生态足迹，结合空间统计和 GTWR 分析区域差异。",
    question: "从城乡两个视角，解释环境压力在时间和空间上的分布。",
    tags: ["Python", "ArcGIS", "GTWR", "Ecological Footprint"],
    facts: facts([["完成阶段", "大连理工大学本科毕业论文 · 2024"], ["研究范围", "30 个省份 · 2015—2019 年"], ["核算结构", "22 类消费项目 · 生物资源与能源账户"], ["指导教师", "马书明副教授"]]),
    route: steps([["整理区域统计数据", "围绕人口、消费和能源等统计口径，建立跨年份、省份与城乡类型的数据表。"], ["核算生态足迹", "依据 Wackernagel 综合核算方法构建生物资源与能源账户，比较总体、城镇及农村人均生态足迹。"], ["描述时空分布", "结合核密度、趋势分析和标准差椭圆，分析空间集聚、方向变化与地区差异。"], ["分析异质性关联", "使用 GTWR 分析城镇化和居民消费等社会经济因素与生态足迹之间的时空异质性关系。"]]),
    evaluation: ["完成 30 个省份、5 年、城乡三个口径的生态足迹核算。", "研究观察到人均生态足迹的“北高南低、东高西低”空间分布，并比较了城乡差异的演变。", "形成毕业论文、空间分析图和区域比较结果。"],
    boundaries: ["研究结论适用于论文覆盖的省域与统计年份。GTWR 结果用于描述空间异质性关联。"],
    relatedSkills: ["spatial-environmental-analysis", "industrial-process-modeling"],
  },
  {
    slug: "land-use-gee", index: "08", title: "辽西地区土地利用时空变化", englishTitle: "LAND-USE CHANGE WITH EARTH ENGINE", category: "遥感实践 · 环境创新班", status: "verified",
    summary: "在环境创新班项目中使用 Google Earth Engine 与随机森林开展土地利用分类，参与千余块地物样本选取、精度核验及成果展示。",
    question: "把遥感影像中的地物变化，转化为可读的区域演变信息。",
    tags: ["Google Earth Engine", "Random Forest", "Remote Sensing"],
    facts: facts([["项目时间", "2021.06—2022.04"], ["研究区域", "辽西地区"], ["个人工作", "地物样本选取、分类精度计算与答辩展示"], ["项目状态", "已结项"]]),
    route: steps([["组织研究区域", "按照市区两级行政边界组织辽西地区土地利用分析。"], ["建立地物样本", "利用 Google Earth Engine 选取不同类型地物样本，为分类任务准备训练与核验依据。"], ["分析分类与变化", "配合随机森林分类结果开展精度核算，整理土地利用的时空变化。"], ["完成成果表达", "参与区域演变动态图、调研报告与答辩展示的组织。"]]),
    evaluation: ["参与选取 1,000 余块不同类型地物样本。", "完成精度计算与答辩展示工作，项目形成区域变化图与调研报告。"],
    boundaries: ["项目由环境创新班团队共同完成，个人负责样本、核验与展示环节。"],
    relatedSkills: ["spatial-environmental-analysis"],
  },
  {
    slug: "biochar-arsenic-adsorption", index: "09", title: "酸洗去灰与生物炭砷吸附", englishTitle: "BIOCHAR AND ARSENIC REMOVAL", category: "科研训练 · 大学生创新项目", status: "verified",
    summary: "围绕酸洗去灰对生物炭性质与砷吸附的影响参与大学生创新研究，承担文献梳理、开题与结项报告撰写，以及答辩表达。",
    question: "从材料处理、性质变化与吸附表现之间建立可检验的研究路径。",
    tags: ["Biochar", "Arsenic Adsorption", "Literature Review"],
    facts: facts([["项目时间", "2022.07—2023.04"], ["研究对象", "酸洗与水洗处理后的生物炭"], ["个人工作", "文献梳理、报告撰写与答辩材料"], ["项目状态", "已结项"]]),
    route: steps([["梳理研究依据", "阅读生物炭去灰和砷吸附相关文献，明确处理方式、材料性质与吸附之间的研究问题。"], ["组织对照方案", "围绕不同生物炭的酸洗、水洗处理及模拟含砷废液吸附，梳理团队实验逻辑。"], ["完成研究报告", "组织开题与结项内容，将文献依据、实验方案和团队结果串联为完整报告。"], ["面向评审表达", "制作开题答辩材料，把研究目标、方法与结果讲清楚。"]]),
    evaluation: ["承担 20 余篇文献梳理与 6,000 余字开题、结项报告工作。", "完成项目答辩材料，形成从问题梳理到成果写作的科研训练。"],
    boundaries: ["吸附实验为团队工作，个人贡献集中在文献、报告与答辩表达。"],
    relatedSkills: ["spatial-environmental-analysis"],
  },
];

export const careerPublications: PublicationRecord[] = [
  {
    slug: "publication-record-01", code: "P01", type: "第一作者 · 期刊论文", status: "已发表", year: "2025",
    title: "基于机器学习的铜电解精炼电积过程电压及出液铜离子浓度预测模型研究",
    venue: "有色金属（冶炼部分），2025(9): 13—24",
    authors: "闫哲祯，卢金成，程寒，廖嘉琪，徐夫元，段宁",
    doi: "10.20237/j.issn.1007-7545.2025.09.002",
    summary: "从企业电积数据建立电压与出液铜浓度预测器，完成十种模型比较与 SHAP 解释分析。",
    abstract: "面向电积出口浓度波动与过程状态预测，构建多参数机器学习模型。优化后的 GBR 电压预测 R² 为 0.79，XGBoost 铜浓度预测 R² 为 0.87；结合 SHAP 分析变量贡献，为工艺诊断及后续优化提供模型依据。",
    contribution: "承担数据建模、模型比较与解释分析，并以第一作者完成论文写作和修改。",
    links: [{ label: "期刊正式页面", href: publishedPaperUrl }, { label: "研究案例", href: "/projects/copper-electrowinning-surrogate" }],
  },
  {
    slug: "publication-record-02", code: "P02", type: "第一作者 · 研究论文", status: "修回中", year: "2026",
    title: "Cleaner and resource-efficient copper recovery in industrial electrowinning through explainable safe reinforcement learning",
    venue: "Journal of Cleaner Production", authors: "Zhezhen Yan, Jincheng Lu, Han Cheng, Jiaqi Liao, BaoJun Ma, Ning Duan, Fuyuan Xu", doi: null,
    summary: "提出 ESRL-CMO，将分工况代理模型、可解释分析与安全强化学习连接起来，协调铜回收、砷控制、用电与经济目标。",
    abstract: "基于 1,978 条生产记录建立三类工况的九个 ExtraTrees 代理模型，并将过程优化表达为由 PPO-Lagrangian 求解的 CMDP。研究比较不同偏好与工况下的 Pareto 候选方案，检查五类工艺约束，并分析资源效率、能耗和净收益的权衡。",
    contribution: "承担代理建模、约束策略学习、基线比较、解释分析与研究稿件写作；持续完善实验验证和修回材料。",
    links: [{ label: "多目标优化案例", href: "/projects/electrolyte-purification-optimization" }, { label: "策略学习方法", href: "/projects/safe-reinforcement-learning" }],
  },
  {
    slug: "wastewater-energy-tabpfn", code: "P03", type: "第一作者 · 研究论文", status: "在审", year: "2026",
    title: "Dual-target energy-consumption prediction in wastewater treatment under limited data and controlled input degradation using TabPFN",
    venue: "Water Environment Research", authors: "Zhezhen Yan, Yiwen Chen, Kang Lu, Yong Liu, Jincheng Lu", doi: null,
    summary: "围绕日总能耗与单位水量能耗建立双目标预测流程，研究有限训练数据和输入质量变化下的模型表现。",
    abstract: "将 TabPFN 与 CatBoost、XGBoost 等模型比较，结合样本缩减和噪声、缺失、异常输入实验，分析数据条件变化对预测的影响。通过 SHAP、PDP 与 ICE 解释运行变量的预测贡献，连接能耗预测与能效诊断。",
    contribution: "承担预测建模、基线与扰动实验、可解释分析及第一作者论文写作。",
    links: [{ label: "能耗预测案例", href: "/projects/wastewater-energy-tabpfn" }],
  },
  {
    slug: "urban-rural-ecological-footprint", code: "P04", type: "本科毕业论文", status: "已完成", year: "2024",
    title: "城乡视角下中国省域生态足迹时空特征分析", venue: "大连理工大学 · 环境工程本科毕业论文", authors: "闫哲祯；指导教师：马书明", doi: null,
    summary: "核算 2015—2019 年 30 个省份的生态足迹，用城乡视角和时空统计解释区域环境压力。",
    abstract: "选取 22 类消费项目建立生物资源与能源账户，核算总体、城镇与农村人均生态足迹；结合核密度、趋势、标准差椭圆与 GTWR 分析区域分布及社会经济关联。",
    contribution: "完成数据整理、生态足迹核算、空间统计分析、图表与毕业论文写作。",
    links: [{ label: "本科研究案例", href: "/projects/urban-rural-ecological-footprint" }],
  },
  {
    slug: "urban-water-poster-2025", code: "P05", type: "学术会议海报", status: "会议展示", year: "2025",
    title: "Research on Prediction Model for Voltage and Effluent Copper Ion Concentration in Copper Electrolytic Refining and Electrowinning Process Based on Machine Learning",
    venue: "Sustainable Urban Water Systems: Resilient, Inclusive & Smart Water Futures · 上海", authors: "Zhezhen Yan, Jincheng Lu, Han Cheng, et al.", doi: null,
    summary: "以海报形式展示铜电积预测研究，将模型方法、工艺背景和解释分析组织为面向学术交流的成果。",
    abstract: "围绕铜电积的电压与出液铜浓度预测，介绍机器学习模型比较和变量解释，面向城市水系统与资源环境研究交流。",
    contribution: "参与研究成果的海报组织与学术展示。",
    links: [{ label: "对应期刊论文", href: "/publications/publication-record-01" }],
  },
];

export const careerEducation: EducationRecord[] = [
  {
    slug: "masters-stage", code: "EDU-01", phase: "CURRENT", level: "硕士", title: "同济大学 · 资源与环境硕士", institution: "同济大学", school: "环境科学与工程学院", major: "资源与环境", supervisor: "徐夫元教授", period: "2024.09—2027.06（预计）", location: "上海", status: "已确认",
    summary: "在环境工程与人工智能的交叉处开展研究，参与国家重点研发计划，推进铜电积的预测建模、约束优化与工程系统协同。",
    details: ["GPA 4.66/5.00，平均成绩 89.59/100，学位课平均分 89.75/100。", "研究聚焦工业过程建模、多目标优化、安全强化学习与可解释分析。", "相关课程包括最优化方法、人工智能导论、数据处理与实验设计、污水处理理论与技术。", "第一作者完成已发表铜电积预测论文，并开展 ESRL-CMO 与污水能耗预测研究。"],
  },
  {
    slug: "undergraduate-stage", code: "EDU-02", phase: "FOUNDATION", level: "工学学士", title: "大连理工大学 · 环境工程本科", institution: "大连理工大学", school: "环境学院", major: "环境工程", supervisor: "马书明副教授", period: "2020.09—2024.06", location: "大连", status: "已确认",
    summary: "以环境过程与区域生态问题建立专业基础，在遥感分类、生态足迹核算、实验研究与团队实践中形成数据分析和成果表达能力。",
    details: ["本科毕业论文：城乡视角下中国省域生态足迹时空特征分析。", "运用 Python、ArcGIS 与 GTWR 完成 30 个省份、5 年的区域生态分析。", "参与辽西地区土地利用分析与酸洗生物炭大学生创新项目。", "获两次国家励志奖学金，以及学习优秀奖学金（二等）、文体活动奖学金和校三好学生。"],
  },
];

function experience(item: Omit<ExperienceRecord, "description" | "meta" | "status">): ExperienceRecord {
  return { ...item, description: item.summary, meta: `${item.organization} · ${item.role} · ${item.period}`, status: "已确认" };
}

export const careerExperience: ExperienceRecord[] = [
  experience({
    slug: "hangzhou-tech-visit", code: "EXP-10", phase: "2025", type: "行业参访", title: "青松计划：宇树科技与强脑科技参访", organization: "学校“青松计划” · 宇树科技、强脑科技", role: "参访参与者", period: "2025.12", location: "浙江杭州",
    summary: "通过学校“青松计划”走进杭州科技企业，现场观看人形机器人与机械手展示，从具体产品认识智能技术与物理世界的连接。",
    responsibilities: ["参加宇树科技与强脑科技的企业参访，接触智能硬件的展示场景。", "观看人形机器人与机械手展示，用照片记录产品形态和参访现场。", "参访结束后走进浙江大学与杭州城市空间，把科技企业、校园和城市生活放在同一段行程中观察。"],
    outputs: ["这次参访让我把对算法的兴趣延伸到真实产品：模型如何与传感、执行和人的使用方式接在一起，是现场带给我的思考。", "我在铜电积研究中连接预测、优化与软件实现；走进其他技术场景，也促使我从产品与使用者的角度重新审视自己的工具。"],
  }),
  experience({
    slug: "masters-research", code: "EXP-01", phase: "CURRENT", type: "科研与工程", title: "国家重点研发计划：铜砷分离数字调控", organization: "同济大学环境科学与工程学院", role: "数据建模、智能优化与系统协同", period: "2024.09—至今", location: "上海",
    summary: "参与液相体系微观化学过程铜砷分离数字调控技术研发，承担铜电积净化单元的机器学习建模、模型解释与约束优化，并参与工业数据接入和系统联调。",
    responsibilities: ["针对不同运行配置建立预测模型，完成特征构建、模型比较与解释分析。", "构建代理环境与 PPO-Lagrangian 优化流程，连接工艺要求、目标偏好和候选参数。", "参与 PLC/DCS 过程数据、实验室化验数据与 MySQL 字段映射和链路核验。", "参与算法接口、MOM 系统与前端结果展示联调，衔接优化方案与人工审核。"],
    outputs: ["第一作者铜电积预测论文已发表。", "ESRL-CMO 研究处于 Journal of Cleaner Production 修回阶段。", "形成预测模型、优化方法、分析图表与研究软件。"],
  }),
  experience({
    slug: "jincheng-talent-internship", code: "EXP-02", phase: "2025", type: "实习实践", title: "晋城市委组织部人才工作科实习", organization: "晋城市委组织部 · 同济大学“同行计划”", role: "实习生", period: "2025.07—2025.08", location: "山西晋城",
    summary: "在真实政务场景中完成资料核验、校市合作调研与公文协作，把复杂信息整理成可以讨论和使用的报告。",
    responsibilities: ["核对纸质档案与电子目录，完成缺项补录、分类归档和材料流转登记。", "调研高校与地方政府战略合作，梳理合作事项并完成比较报告和项目清单。", "参与培训班开班讲话及改革进展报告的起草、核对与多轮修订。"],
    outputs: ["完成校市合作比较报告与配套清单。", "参与多类公文材料的协作撰写。", "形成个人实践总结，沉淀资料核验、结构化写作与跨角色沟通经验。"],
  }),
  experience({
    slug: "tongji-library", code: "EXP-03", phase: "2025—2026", type: "校园服务", title: "图书馆阅读推广与服务", organization: "同济大学图书馆读者推广服务办公室", role: "助管", period: "2025.02—2026.02", location: "上海",
    summary: "把数据整理与内容策划用于读者服务，参与主题书单、阅读推广与宣传表达，让书与读者更容易相遇。",
    responsibilities: ["整理读者咨询、馆藏与借阅数据，归纳反馈问题。", "参与主题书单筛选、阅读活动策划及宣传文案制作。", "配合阅读分享、图书交流与主题展示等活动组织。"],
    outputs: ["参与的相关活动累计覆盖 600 余人次。", "形成读者反馈整理、活动宣传和阅读推广材料。"],
  }),
  experience({
    slug: "tongji-class-communication", code: "EXP-04", phase: "CURRENT", type: "组织与传播", title: "班级宣传与城市美育实践", organization: "同济大学环境学院 2024 级硕士二班", role: "宣传委员", period: "2025.09—至今", location: "上海",
    summary: "负责班级宣传和活动报道，参与“五育班级建设”材料写作，将上海城市观察、博物馆参访与共同学习组织为班级实践。",
    responsibilities: ["完成团务宣传、活动报道及班级项目材料整理。", "围绕上海博物馆东馆参访，整理实践体验与组织经验。", "总结从自然生态观察转向人文场馆体验的活动调整，提出带着观察任务参访的组织思路。"],
    outputs: ["完成班级建设项目经验总结。", "将活动现场、专业观察与公共表达连接起来。"],
  }),
  experience({
    slug: "dongdaor-internship", code: "EXP-05", phase: "2023", type: "企业实践", title: "废酸资源化与混凝材料实验", organization: "大连东道尔膜有限公司", role: "实习生", period: "2023.06—2023.07", location: "大连",
    summary: "围绕企业废酸回收利用需求，参与聚合氯化铁制备方案的文献调研、条件设计与混凝检验，接触从工艺需求到实验方案的工作过程。",
    responsibilities: ["查阅文献与工艺资料，围绕废酸利用目标整理水热法制备方案。", "根据生产背景设置温度和浓度梯度，参与合成实验。", "将制备产物用于废水混凝过程，观察效果并整理实验方案。"],
    outputs: ["形成制备与混凝检验的实验经验。", "建立从企业问题、资料调研到方案设计的实践路径。"],
  }),
  experience({
    slug: "dut-student-affairs", code: "EXP-06", phase: "2022—2023", type: "内容与传播", title: "校园融媒体与大型活动协作", organization: "大连理工大学学生工作处教育科 · 纽扣网络思政工作室", role: "学生助理、编辑", period: "2022.06—2023.06", location: "大连",
    summary: "参与“DUT学生工作”公众号及视频平台运营，把人物采访、视频叙事和活动组织转化为面向校园的持续内容。",
    responsibilities: ["承担脚本设计、拍摄剪辑、推文编辑与审核，参与“辅导员说”“大工学子说”等系列。", "参与学校“标兵”系列评选、迎新晚会和辽宁省大学生网络文化节的宣传与筹备。", "配合工作室例会、内容排期与活动协调。"],
    outputs: ["参与制作的相关内容累计浏览量超过 50 万。", "积累从选题、采访、脚本到视频和推文发布的完整内容协作经验。"],
  }),
  experience({
    slug: "dut-sunshine-association", code: "EXP-07", phase: "2020—2023", type: "组织管理", title: "阳光心理健康协会：从干事到会长", organization: "大连理工大学环境学院阳光心理健康协会", role: "组织部干事 → 副部长 → 会长", period: "2020.09—2023.06", location: "大连",
    summary: "在三年的社团工作中从执行走向统筹，参与心理剧、剧本征集和微电影活动，协调策划、人员、宣传与活动落地。",
    responsibilities: ["统筹活动方案、工作分工、宣传节奏与现场协作。", "参与心理剧、剧本与微电影等校园活动。", "负责协会公众号内容策划、制作与审核，支持持续的校园传播。"],
    outputs: ["累计制作、修改或审核 70 余篇推送。", "参与组织的相关活动累计覆盖 2,000 余人次。", "形成面向不同参与者的组织协调与公共表达能力。"],
  }),
  experience({
    slug: "dut-international-media", code: "EXP-08", phase: "2020—2022", type: "内容与传播", title: "海外交流与双语校园传播", organization: "大连理工大学海外交流与传播团队", role: "技术部副部长 → 部长", period: "2020.09—2022.06", location: "大连",
    summary: "参与双语节气、地域美食和国际交流活动的内容制作，结合视频、摄影与推文，把校园与中国文化介绍给不同背景的读者。",
    responsibilities: ["参与“双语二十四节气”“地域美食”等系列策划与外文推送制作。", "配合国际会议的采访、摄影与视频宣传。", "撰写视频脚本，组织拍摄素材与团队协作。"],
    outputs: ["参与制作 40 余篇外文宣传推送与 20 多版视频脚本。", "积累摄影、剪辑、采访与跨文化表达经验。"],
  }),
  experience({
    slug: "nature-education", code: "EXP-09", phase: "2022—2023", type: "社会实践", title: "E-ONE 自然教育调研", organization: "E-ONE 自然教育团队", role: "调研与宣传成员", period: "2022.12—2023.03", location: "大连",
    summary: "围绕自然保护地与自然教育的结合开展调研，接触机构、保护区与参与者需求，把专业问题带到真实社会场景。",
    responsibilities: ["联系自然保护区与自然教育机构，参与访谈与信息整理。", "围绕志愿服务、家庭参与和课程设计梳理项目可行性。", "参与宣传海报与视频制作。"],
    outputs: ["形成机构沟通、访谈调研和自然教育宣传实践。", "扩展环境问题分析中的参与者视角。"],
  }),
];

const honor = (item: Pick<HonorRecord, "slug" | "code" | "category" | "title" | "level" | "date" | "description">): HonorRecord => ({
  ...item, issuer: "大连理工大学", scope: "本科阶段", role: "个人获奖", contribution: item.description, proofUrl: null, status: "已确认",
});
export const careerHonors: HonorRecord[] = [
  honor({ slug: "national-encouragement-2021", code: "H01", category: "奖学金", title: "国家励志奖学金", level: "国家级", date: "2021.11", description: "获 2020—2021 学年国家励志奖学金。" }),
  honor({ slug: "national-encouragement-2022", code: "H02", category: "奖学金", title: "国家励志奖学金", level: "国家级", date: "2022.11", description: "获 2021—2022 学年国家励志奖学金，连续两个学年获奖。" }),
  honor({ slug: "academic-excellence-2021", code: "H03", category: "学业荣誉", title: "学习优秀奖学金（二等）", level: "校级 · 二等", date: "2021.09", description: "获大连理工大学 2020—2021 学年学习优秀奖学金（二等）。" }),
  honor({ slug: "culture-sports-2021", code: "H04", category: "综合发展", title: "文体活动奖学金", level: "校级", date: "2021.09", description: "获大连理工大学 2020—2021 学年文体活动奖学金。" }),
  honor({ slug: "merit-student-2021", code: "H05", category: "综合发展", title: "校三好学生", level: "校级", date: "2021.12", description: "获大连理工大学 2020—2021 学年三好学生荣誉称号。" }),
];

export const careerSkills: SkillRecord[] = [
  { slug: "industrial-process-modeling", index: "A", title: "工业过程与表格数据建模", englishTitle: "PROCESS & TABULAR MODELING", summary: "从铜电积生产记录到污水处理能耗，完成特征整理、预测器构建、算法比较与结果分析。", principle: "把过程知识落实到变量、数据和评价任务。", layers: [{ title: "数据处理", description: "Python、Pandas、NumPy；历史记录清洗与特征构建。" }, { title: "预测建模", description: "scikit-learn、ExtraTrees、XGBoost、CatBoost、GBR、TabPFN。" }, { title: "模型评估", description: "比较 R²、RMSE、MAPE，结合样本缩减和输入扰动分析。" }, { title: "工程衔接", description: "MySQL 字段映射、数据链路核验与模型结果展示。" }], checks: ["统一目标与数据口径比较模型", "关注模型在不同工况和数据质量下的表现", "把预测输出组织为工艺讨论能够使用的信息"], relatedProjects: ["copper-electrowinning-surrogate", "wastewater-energy-tabpfn", "culab-agent-workbench"] },
  { slug: "multi-objective-optimization", index: "B", title: "多目标优化与方案选择", englishTitle: "MULTI-OBJECTIVE DECISION MAKING", summary: "将质量、能耗与经济目标组织为可计算问题，比较 Pareto 候选方案并检查工艺可行性。", principle: "把目标权衡转化为可以解释和选择的方案。", layers: [{ title: "问题定义", description: "目标函数、变量范围、工况与操作约束。" }, { title: "算法实现", description: "NSGA-II、代理模型优化与偏好条件策略。" }, { title: "结果比较", description: "非支配解集、间距、可行性及不同目标门槛。" }, { title: "交互与决策", description: "候选方案比较、解释与人工选择。" }], checks: ["明确基线和比较工况", "同时检查目标表现与约束满足", "保留目标偏好和方案选择依据"], relatedProjects: ["electrolyte-purification-optimization", "safe-reinforcement-learning", "culab-agent-workbench"] },
  { slug: "safe-reinforcement-learning", index: "C", title: "安全强化学习", englishTitle: "CONSTRAINED POLICY LEARNING", summary: "用 CMDP 和 PPO-Lagrangian 连接连续参数调整、多目标偏好与工艺约束。", principle: "将可行性与收益一起放入策略设计。", layers: [{ title: "过程建模", description: "状态、连续动作、奖励与约束成本。" }, { title: "代理环境", description: "分工况 ExtraTrees 预测器支持策略训练。" }, { title: "训练流程", description: "行为克隆预训练、Cost Critic 与拉格朗日更新。" }, { title: "策略分析", description: "Pareto 解集、基线比较和噪声条件分析。" }], checks: ["依据明确的工况比较策略", "分别呈现目标表现与约束结果", "说明代理环境下候选方案的使用方式"], relatedProjects: ["safe-reinforcement-learning", "electrolyte-purification-optimization"] },
  { slug: "explainable-causal-ml", index: "D", title: "可解释机器学习", englishTitle: "EXPLANATION & MODEL DIAGNOSTICS", summary: "将模型贡献和响应曲线转化为工程人员能够讨论的变量关系。", principle: "让模型结果可以被追问、比较与解释。", layers: [{ title: "贡献分析", description: "SHAP 全局与局部解释。" }, { title: "响应分析", description: "PDP、ICE 与不同目标之间的对照。" }, { title: "领域解释", description: "连接电流、时间、流量等变量与工艺语境。" }, { title: "研究延伸", description: "关注因果机器学习及干预效果的识别条件。" }], checks: ["先明确被解释的预测任务", "区分整体响应与样本差异", "模型关联与因果效应采用对应的证据"], relatedProjects: ["causal-explainable-industrial-ai", "copper-electrowinning-surrogate", "wastewater-energy-tabpfn"] },
  { slug: "agent-engineering", index: "E", title: "AI Agent 与研究软件工程", englishTitle: "AGENT & SOFTWARE ENGINEERING", summary: "将工具、后端 API 和前端交互组织为可追溯系统，在电商售后与研究软件中落实审批、执行和结果校验。", principle: "让智能体调用真正的工具，并让判断有可回溯的依据。", layers: [{ title: "服务与界面", description: "FastAPI、React、TypeScript、Vite；亦有 Flask 与 WebSocket 实践。" }, { title: "工具调用", description: "结构化参数、数值诊断与结果校验。" }, { title: "流程编排", description: "使用 MAF/A2A 工作流开展电商售后升级；研究 LangGraph、RAG 与层级式 Agent，在 CuLab 中实现运行诊断流程。" }, { title: "工程可观测性", description: "运行记录、证据编号、缓存、重试、token 与预算追踪。" }], checks: ["工具参数和结果进行结构化校验", "结论关联实际运行证据", "数据、模型版本与运行状态可以追溯"], relatedProjects: ["reliable-commerce-agents", "culab-agent-workbench"] },
  { slug: "spatial-environmental-analysis", index: "F", title: "空间分析与环境研究", englishTitle: "SPATIAL ENVIRONMENTAL ANALYSIS", summary: "从区域统计和遥感样本出发，完成生态核算、土地利用分类与时空异质性分析。", principle: "把环境压力放回具体的地区、年份与人群视角。", layers: [{ title: "核算与数据", description: "生态足迹账户、跨省份与跨年份数据整理。" }, { title: "空间统计", description: "ArcGIS、核密度、标准差椭圆与 GTWR。" }, { title: "遥感分析", description: "Google Earth Engine、随机森林与地物样本核验。" }, { title: "成果表达", description: "研究报告、空间图表、答辩与公众传播。" }], checks: ["比较一致的统计口径", "区分空间关联与因果判断", "将方法与地区差异连接起来"], relatedProjects: ["urban-rural-ecological-footprint", "land-use-gee", "biochar-arsenic-adsorption"] },
];
