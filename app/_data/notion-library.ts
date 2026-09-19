export type NotionChapter = { slug: string; code: string; title: string; summary: string; points: string[]; articles: { title: string; href: string }[] };

export const notionLibraryUpdatedAt = "2026-09-17";
export const notionChapters: NotionChapter[] = [
  {
    "slug": "computer-foundations",
    "code": "CS",
    "title": "计算机基础",
    "summary": "从数据如何组织，到程序如何执行，再到服务如何通信。四科手册以概念、算例与工程问题相互连接。",
    "points": [
      "数据结构与复杂度：容器、图算法、索引与缓存",
      "系统与硬件：进程、内存、I/O、指令与GPU",
      "网络与服务：协议、流式传输、超时和故障定位"
    ],
    "articles": [
      {
        "title": "计算机基础阅读导航",
        "href": "https://app.notion.com/p/3de7c4f2254881f8b4bfe5ff31adcaf0"
      },
      {
        "title": "数据结构系统学习手册",
        "href": "https://app.notion.com/p/3de7c4f2254881b98180fbd06181c87e"
      },
      {
        "title": "计算机网络系统学习手册",
        "href": "https://app.notion.com/p/3de7c4f22548818ca3a4f3602f120cc5"
      },
      {
        "title": "操作系统原理与应用手册",
        "href": "https://app.notion.com/p/3de7c4f22548812d94b9d91ee4a8ee91"
      },
      {
        "title": "计算机组成原理系统学习手册",
        "href": "https://app.notion.com/p/3de7c4f225488121828fe844cb929a6b"
      },
      {
        "title": "计算机基础配套练习",
        "href": "https://app.notion.com/p/3de7c4f22548815e9ffdcc982fcf45f9"
      }
    ]
  },
  {
    "slug": "machine-learning",
    "code": "ML",
    "title": "机器学习与算法",
    "summary": "把算法放回任务与数据：理解模型假设、训练过程、评价方式，以及从经典机器学习到深度学习的方法谱系。",
    "points": [
      "监督、无监督与表示学习的任务边界",
      "损失函数、优化方法、模型选择与泛化",
      "从方法图谱进入具体论文和实现"
    ],
    "articles": [
      {
        "title": "AI 算法全景指南 2026：深度扩展学习版 v1",
        "href": "https://app.notion.com/p/3ab7c4f22548811d841ee91ad54d94f7"
      },
      {
        "title": "机器学习与深度学习全景方向指南",
        "href": "https://app.notion.com/p/3ab7c4f22548818f9f04e4cbe8c0fd15"
      }
    ]
  },
  {
    "slug": "agent-engineering",
    "code": "ENG",
    "title": "智能体与软件工程",
    "summary": "围绕一个系统怎样完成任务，串起检索、工具、上下文、流程编排和评测。课程、项目指南与问答可以交叉阅读。",
    "points": [
      "任务拆解、工具调用与检索增强",
      "状态、幂等、重试、预算与工程可靠性",
      "质量、延迟、成本和失败案例的共同评价"
    ],
    "articles": [
      {
        "title": "Agent 产品与开发 · 课程总览",
        "href": "https://app.notion.com/p/3de7c4f225488182be38d138a9d0de71"
      },
      {
        "title": "Agent 产品与开发 · 模块详案",
        "href": "https://app.notion.com/p/3de7c4f2254881048828c0639f552f4d"
      },
      {
        "title": "Agent 产品与开发 · 项目实战指南",
        "href": "https://app.notion.com/p/3de7c4f22548810f8153fac851264f7f"
      },
      {
        "title": "Agent 产品与开发 · 代码示例与工程实践",
        "href": "https://app.notion.com/p/3de7c4f225488141b5a8e9e6b5597ceb"
      },
      {
        "title": "Agent 产品与开发 · 评估指标与面试回答模板",
        "href": "https://app.notion.com/p/3de7c4f2254881deba12fdefe5083ab5"
      },
      {
        "title": "Agent 产品与开发 · 冲刺清单与模拟面试",
        "href": "https://app.notion.com/p/3de7c4f22548818eaec1ca1a70d56834"
      },
      {
        "title": "Agent 与大模型面试 · Agent与大模型八股面经资料包",
        "href": "https://app.notion.com/p/3de7c4f22548814b94bbe1b3cc9c0de3"
      },
      {
        "title": "企业级多智能体工作流大项目构建手册（Markdown 核心版）",
        "href": "https://app.notion.com/p/3ab7c4f22548814eb24fe140a558ec08"
      }
    ]
  },
  {
    "slug": "industrial-optimization",
    "code": "OPT",
    "title": "工业建模与优化",
    "summary": "从预测器走向决策支持：用代理模型连接过程数据与优化方法，讨论目标冲突、约束、解释和工程落地。",
    "points": [
      "代理模型与优化器之间的输入输出约定",
      "Pareto权衡、约束满足和评价基线",
      "工业系统的工具组织、诊断与结果追溯"
    ],
    "articles": [
      {
        "title": "机器学习建模后多目标优化的全面解析",
        "href": "https://app.notion.com/p/3ab7c4f22548812da81fd68510f50822"
      },
      {
        "title": "工业智能优化项目 面试八股完整版",
        "href": "https://app.notion.com/p/3ab7c4f2254881dfaf83d208824ce858"
      },
      {
        "title": "工业多智能体系统前沿技术全景",
        "href": "https://app.notion.com/p/3ab7c4f2254881729be0e4e66c7652d7"
      },
      {
        "title": "多智能体系统与大模型工程落地全流程研究报告",
        "href": "https://app.notion.com/p/3ab7c4f225488151b1f2d3d37d37b628"
      },
      {
        "title": "Multi-Agent项目 知识点与GitHub推荐",
        "href": "https://app.notion.com/p/3ab7c4f22548817fba0ef47cbe1f47e8"
      }
    ]
  },
  {
    "slug": "environmental-research",
    "code": "RES",
    "title": "环境研究与科研方法",
    "summary": "围绕环境科学的问题尺度、可用数据与研究目标，理解机器学习、语言模型和科研方法之间的连接。",
    "points": [
      "环境问题如何转化为可检验的研究任务",
      "文献、模型和实验如何形成证据链",
      "从研究路线梳理到论文中的方法与评价"
    ],
    "articles": [
      {
        "title": "人工智能前沿技术在环境科学与环境工程中的综合应用 完整综述",
        "href": "https://app.notion.com/p/3ab7c4f2254881a49059d2689e506034"
      },
      {
        "title": "LLM、NLP 与 Agent 环境科学研究路线图",
        "href": "https://app.notion.com/p/3ab7c4f225488190957be4a937e7442b"
      }
    ]
  },
  {
    "slug": "career-learning",
    "code": "CAREER",
    "title": "职业认知与面试准备",
    "summary": "从岗位职责理解能力要求，再把项目经历组织成可以解释、演示和追问的材料。岗位信息保留来源日期。",
    "points": [
      "不同技术与产品岗位的职责和交付",
      "项目深挖、系统设计与口述结构",
      "区分官方岗位资料、公开面经和个人准备"
    ],
    "articles": [
      {
        "title": "计算机与互联网公司岗位体系与技能要求报告 2026-09-15",
        "href": "https://app.notion.com/p/3de7c4f2254881d9b5dedd546d750e9f"
      },
      {
        "title": "游戏公司岗位职责与技能报告 2026-09-15",
        "href": "https://app.notion.com/p/3de7c4f2254881ee9efdcbdad8d6082b"
      },
      {
        "title": "大厂面试",
        "href": "https://app.notion.com/p/3ab7c4f225488128bbe7d84270db7378"
      }
    ]
  },
  {
    "slug": "languages-exams",
    "code": "STUDY",
    "title": "语言学习与考试",
    "summary": "将考试结构、知识点和阶段任务放在同一条学习路径中，结合练习、复盘与资料查阅持续调整。",
    "points": [
      "雅思听说读写的任务结构与训练安排",
      "日语语法、词汇、阅读和听力的联动",
      "考试资料中的计划、练习与时效信息"
    ],
    "articles": [
      {
        "title": "雅思综合介绍与备考方案 2026版",
        "href": "https://app.notion.com/p/3de7c4f22548817c90fee9e3c71de6ba"
      },
      {
        "title": "JLPT N1完整备考手册 2026版",
        "href": "https://app.notion.com/p/3de7c4f2254881d199e3d6d652596455"
      },
      {
        "title": "考公与选调综合介绍及备考行动手册 2027周期",
        "href": "https://app.notion.com/p/3de7c4f225488172afa8d08d9b4733a6"
      }
    ]
  },
  {
    "slug": "travel-living",
    "code": "LIFE",
    "title": "旅行与生活知识",
    "summary": "在真正出发之前，先理解城市、路线和体验之间的关系。目的地资料与茶文化阅读也组成了日常好奇的一部分。",
    "points": [
      "行程顺序、交通衔接和停留节奏",
      "自然、人文、饮食与城市观察",
      "资料规划与亲身经历分别记录"
    ],
    "articles": [
      {
        "title": "中国境内与近邻境外旅游目的地详尽清单",
        "href": "https://app.notion.com/p/3de7c4f22548815c906afcc425954c71"
      },
      {
        "title": "北京五天四晚双人旅行综合攻略报告",
        "href": "https://app.notion.com/p/3de7c4f2254881be8ca7c1fd16db456e"
      },
      {
        "title": "四川成都五天双人旅行计划与综合攻略报告",
        "href": "https://app.notion.com/p/3de7c4f22548817eaed8fe209bf917c4"
      },
      {
        "title": "2026年下半年香港澳门五天四晚双人自由行深度规划报告",
        "href": "https://app.notion.com/p/3de7c4f22548810abaf3fd0a508e1415"
      },
      {
        "title": "2026年下半年济州岛五天四晚双人自由行综合攻略报告",
        "href": "https://app.notion.com/p/3de7c4f2254881edb05adc10ed895b8a"
      },
      {
        "title": "茶叶全面解析报告：六大茶类与主要品种的详细分析",
        "href": "https://app.notion.com/p/3ab7c4f2254881bf8527d701be00df2f"
      }
    ]
  }
];
