# AI 定位与 Motion / React Bits 全站升级

更新：2026-09-18。沿用现有个人网站，在 `codex/notion-content-motion-20260917` 工作区实现；网站已于 2026-09-18 发布为第 24 版，详见 [上线记录](RELEASE_20260918.md)。GitHub 工作区尚未提交或推送，main 未合并。

## 内容主线

首页和研究、项目、技能、关于、联系入口改为机器学习、强化学习与智能体工程。铜电积、污水处理和电商售后保留为具体应用场景。个人说明补充用户确认的 Coze、Codex、Claude Code、OpenCode、Hermes 使用经验，以及预训练、后训练、微调、RLHF 的学习与理解；未将知识学习写成已经完成的大模型训练实验。

网站新增 `/projects/reliable-commerce-agents`，当前共 111 个页面地址。

## WSL 电商项目依据

只通过 `wsl.exe -d Ubuntu-22.04 -- bash` 读取 `/home/aria/Code/Demo`；没有使用 Windows 的 WSL 文件共享路径。查阅 README、AGENTS/CLAUDE、售后服务代码、架构、验证记录和评估 JSON。通过 WSL 命令导出可公开说明与合成演示截图，原项目未修改、未启动、未重置，Git 状态保持原来的未跟踪 `tutorials/Demo.code-workspace`。

核实的源提交为 `9cdfedb0fb61b8397ffd25293e6fae9ad4da718e`。项目基于 [nitin27may/e-commerce-agents](https://github.com/nitin27may/e-commerce-agents)，个人仓库为 [Reliable Commerce Agents](https://github.com/s1encisi/reliable-commerce-agents)。上游提供六智能体、A2A、商城和基础编排；新增工作集中在 Python 售后规则、审批绑定、持久回执、提交结果核实、故障恢复与评估。

页面的 22 类场景 × 3 次、B0 37/66、B1 51/66、B2 66/66，以及 Python 906 / 前端 179 项通过，均来自项目的 **2026-09-16 已有记录**。本轮未重跑 Demo 测试，不将这些数据称为新一次运行、模型准确率、生产容量或真实支付效果。真实软件截图保持原样，仅转为 WebP；原始尺寸 1280×720。

## 16 项效果及用途

| 效果 | 页面位置与实际用途 | 实现来源 |
| --- | --- | --- |
| Bend Gallery | 日常图文入口，照片随原生页面滚动折转，保留故事链接 | 用户确认的独立 Motion 实现，未使用 Pro 源码 |
| Particle Text | 星空开场中的姓名粒子聚合 | React Bits |
| Masked Heading | 首页主标题的影像遮罩与进入效果 | React Bits |
| Glow Cursor | 首页桌面细指针的光迹反馈 | React Bits |
| Scroll Expand | 首页强化学习意象随滚动展开 | React Bits |
| Pixel Swap | 首页及电商详情的审批／回执截图切换 | React Bits |
| Click Spark | 上述切换按钮的点击反馈 | React Bits |
| Strands | 技术类页面标题区的流线背景 | React Bits |
| Star Border | 首页主要项目入口 | 沿用本项目已有 React Bits 适配版 |
| Logo Loop | 首页展示已确认使用的开发工具 | React Bits |
| Depth Carousel | 动画首页作品轮播，键盘切换并进入对应影评 | React Bits |
| Drift Wall | 生活页真实照片墙，连接原图文 | React Bits |
| Option Wheel | 知识库主题选择，改变对应章节入口 | React Bits |
| Line Sidebar | 项目等详情页的章节导航 | React Bits，保留原生锚点 |
| Magic Bento | 首页六个能力与学习方向，各自连接真实内容 | React Bits，替换示例数据 |
| Galaxy | 首页星云背景上的低密度星场 | React Bits |

公开组件源码固定于 [React Bits c49d697](https://github.com/DavidHDev/react-bits/tree/c49d6978d2496660f0f0c5a3b3ca77a059566a93/src/ts-default)，许可证位于 `app/_components/react-bits-v2/LICENSE.md`。未把自研 Bend Gallery 声称为购买或获得了 React Bits Pro 源码。

适配包括：服务器静态回退；按视口与页面可见性挂载；暂停与系统减少动态；提交后的 ref 配置更新；原生链接、键盘选择和可访问名称；资源与监听器清理；Click Spark 仅在点击时唤醒动画。保持原生滚动，不让整站被一个画廊接管。

## Motion 与素材

Motion 已有运行依赖保持 `13.2.0`；为官方组件增加 `ogl@1.0.11`、`gsap@3.15.0` 并更新锁文件。另下载 Motion 官方源码参考副本，提交 `16c61222c4166bbef5ff6ab0051192faa79fa8c8`，位于被忽略的 `work/ai-motion-20260917/motion-source`，包含核心包。没有修改或发布该源码仓库。

实现依据：[Motion 的过渡配置](https://motion.dev/docs/react-transitions)、[滚动动画](https://motion.dev/docs/react-scroll-animations)、[可访问性与减少动态](https://motion.dev/docs/react-accessibility)。Motion 用于开场编排、页面进入、可见性判断和独立弯曲画廊；React Bits 内部按组件保留其相应渲染方式。

使用内置 GPT 图像生成工具创建四张独立主题图：

- `public/images/ai/cosmos-1672.webp`：首页与开场星云。
- `public/images/ai/learning-1672.webp`：机器学习意象。
- `public/images/ai/decisions-1672.webp`：强化学习与决策空间意象。
- `public/images/ai/agents-1672.webp`：智能体协作意象。

原生图片均为 **1672×941**，不是原生 4K；另输出 768 / 1200 宽度版本，12 张 WebP 合计约 1.7 MB。完整最终提示词与来源记录保存在 [design-assets.json](design-assets.json)。它们是概念艺术，不替代个人照片、真实软件截图、科研结果图或识别作品所需的原海报。访客页面不添加制作过程标签。

## 验证记录

- 生产构建与 31 项页面回归通过；新项目纳入路由、链接、图片和元数据检查。
- Lint、TypeScript 检查通过。上游组件的具体适配保留在代码中，没有整目录关闭检查。
- 1440×1000、390×844 首屏及七类效果页面检查：页面正常、无横向溢出、无未捕获页面错误。
- 17 项浏览器交互通过：开场跳过与重播、粒子文字、Galaxy/Glow、Star Border 暂停、暂停持久化、Bento、工具循环、展开图、截图切换、主题轮、作品轮播、照片墙、弯曲画廊、侧栏、系统减少动态、触屏视口和无 JavaScript 阅读。
- IAB 在前文多次导航超时，本轮可复现 QA 使用独立 Playwright Chromium；WebGL 检查使用软件渲染，不能代表真实设备 GPU 性能。未新增真机、Safari、生产部署或网络性能评分。

预览：[首页](http://localhost:3000/) · [电商智能体案例](http://localhost:3000/projects/reliable-commerce-agents) · [知识库](http://localhost:3000/notes) · [生活](http://localhost:3000/life) · [动画](http://localhost:3000/life/animation)。
