export const siteInfo = {
  name: "闫哲祯",
  englishName: "ZHEZHEN YAN",
  role: "同济大学硕士 · 机器学习、强化学习与智能体工程",
  statement: "让模型学会理解，让智能走向行动。",
  description:
    "关注机器学习、强化学习与智能体工程，在真实应用中连接模型、工具与可靠执行。",
};

export type NavigationChild = {
  label: string;
  href: string;
  description: string;
  code: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  code: string;
  description: string;
  children: NavigationChild[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "关于",
    href: "/about",
    code: "01",
    description: "个人背景、研究准则与合作方向",
    children: [
      { label: "个人介绍", href: "/about/profile", description: "认识我的研究背景与关注问题", code: "A1" },
      { label: "联系与合作", href: "/contact", description: "研究交流、职业机会与博士申请", code: "A2" },
    ],
  },
  {
    label: "研究",
    href: "/research",
    code: "02",
    description: "研究专题、问题框架与技术方法",
    children: [
      { label: "研究专题", href: "/projects", description: "进入研究议程与方法详情", code: "R1" },
      { label: "技术能力", href: "/skills", description: "查看建模、优化、安全与解释能力", code: "R2" },
    ],
  },
  {
    label: "成果",
    href: "/outputs",
    code: "03",
    description: "论文、报告与可公开研究产出",
    children: [
      { label: "论文与报告", href: "/publications", description: "发表论文、研究稿件与学术展示", code: "O1" },
      { label: "项目成果", href: "/outputs/project-results", description: "预测模型、优化方法与工程系统", code: "O2" },
    ],
  },
  {
    label: "履历",
    href: "/journey",
    code: "04",
    description: "教育、实践、竞赛与荣誉时间线",
    children: [
      { label: "教育经历", href: "/education", description: "学位、专业和研究阶段", code: "J1" },
      { label: "科研与实践", href: "/experience", description: "研究、实习与服务经历", code: "J2" },
      { label: "奖学金与荣誉", href: "/honors", description: "奖学金、校园荣誉与综合发展", code: "J3" },
    ],
  },
  {
    label: "知识",
    href: "/insights",
    code: "05",
    description: "知识库、随想与持续整理的内容",
    children: [
      { label: "知识库", href: "/notes", description: "研究方法与技术笔记", code: "I1" },
      { label: "随想", href: "/thoughts", description: "研究和生活中的个人思考", code: "I2" },
    ],
  },
  {
    label: "生活",
    href: "/life",
    code: "06",
    description: "长跑、科幻、影像、动画与城市观察",
    children: [
      { label: "长跑与户外", href: "/life/running-outdoors", description: "跑步、定向与运动中的观察", code: "L1" },
      { label: "阅读与科幻", href: "/life/reading-notes", description: "读书分享与作品里的追问", code: "L2" },
      { label: "城市观察与散步", href: "/life/travel-walks", description: "博物馆、自然教育与城市体验", code: "L3" },
      { label: "影像与文化表达", href: "/life/culture-objects", description: "摄影、视频、双语内容与长期观看", code: "L4" },
      { label: "动画与影评", href: "/life/animation", description: "动画片单、总表条目与个人影评", code: "L5" },
      { label: "游戏足迹", href: "/life/gaming", description: "竞技对局、游戏世界与个人档案", code: "L6" },
    ],
  },
];

export const primaryNav = navigationGroups.map(({ label, href }) => ({ label, href }));

export const focusAreas = [
  "工业过程建模",
  "多目标优化",
  "安全强化学习",
  "可解释与因果机器学习",
];
