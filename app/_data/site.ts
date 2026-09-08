export const siteInfo = {
  name: "小闫",
  englishName: "XIAOYAN",
  role: "硕士研究生 · 工业智能系统探索者",
  statement: "理解复杂系统，构建可信决策。",
  description:
    "关注铜电积、电解液净化、代理模型、多目标优化、安全强化学习，以及可解释与因果机器学习。",
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
      { label: "联系与合作", href: "/contact", description: "查看合作主题与所需联系信息", code: "A2" },
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
      { label: "论文与报告", href: "/publications", description: "查看成果记录结构与所需资料", code: "O1" },
      { label: "项目成果", href: "/outputs/project-results", description: "查看项目成果状态、证据与公开边界", code: "O2" },
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
      { label: "竞赛与荣誉", href: "/honors", description: "经核实后公开的荣誉档案", code: "J3" },
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
    description: "吃喝、旅行、文娱与日常记录",
    children: [
      { label: "地方风味", href: "/life/local-flavors", description: "餐饮、味觉与具体体验", code: "L1" },
      { label: "咖啡与茶", href: "/life/coffee-tea", description: "饮品、空间与慢时刻", code: "L2" },
      { label: "旅行与散步", href: "/life/travel-walks", description: "路线、城市与具体体验", code: "L3" },
      { label: "文娱与好物", href: "/life/culture-objects", description: "作品、物品与长期体验", code: "L4" },
      { label: "动画与影评", href: "/life/animation", description: "动画片单、总表条目与个人影评", code: "L5" },
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
