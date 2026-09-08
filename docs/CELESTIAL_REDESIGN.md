# Celestial Atlas / 个人星图

本次设计在 `codex/celestial-redesign` 分支上进行，基于 `14e6121`。页面与公开数据的变动均留在该分支，原始资料继续由现有忽略与上传检查规则保护。

## 视觉与交互

- 首页：深墨蓝星海、暗行星与青蓝弧光；大字、开放研究台账和浅色生活编辑区建立完整阅读节奏。
- 动画：原创黄昏海岸、真实作品海报、漂浮分镜与柔和光粒；保留全部年度推荐、影评、总表和时间线入口。
- 生活：纸白、深绿、自然光影与摄影缓慢推进；分类入口保持真实，未提供的亲身经历不补写。
- 其他栏目：沿用真实内容和路径，统一排版、阅读宽度、分层导航与各主题的几何动效。
- 持续动效可在页头暂停，设置在本地保存；系统减少动态效果优先，滚出视口与页面后台时停止 Canvas 循环。
- 图片均使用本地 WebP；天体、海岸和窗边静物明确标注 AI 场景图，作品海报与 GitHub 头像保留真实来源。

实现入口：`app/universe-system.css`，按共享、模块和响应式拆分。动效逻辑在 `ambient-scene.tsx` 与 `motion-settings.tsx`；公开资料由 `app/_data/profiles.ts` 集中维护。

## 公开资料来源

核验日期：2026-09-08。

| 来源 | 本次选取内容 | 边界 |
| --- | --- | --- |
| [GitHub 个人主页](https://github.com/s1encisi) / [公开 API](https://api.github.com/users/s1encisi) | Zhezhen Yan、Tongji University、上海与公开头像 | 不展示精确街道地址，不读取或展示私密仓库 |
| [Bilibili 个人空间](https://space.bilibili.com/103442064) | 水无灯里Aquamarine、同济大学资料与动画专栏链接 | 仅选取本人公开专栏，不将收藏、点赞或他人视频误记为本人作品 |
| [Bangumi 时光机](https://bgm.tv/user/s1encisi) | 水无灯里（遥かなる苍）；动画看过 2502、在看 20、想看 176 | 日期明确的静态快照；不与站内 2276 条番剧主表相加 |
| [LangChain issue #37713](https://github.com/langchain-ai/langchain/issues/37713) | 2026-05-27 的公开问题反馈与代码定位 | 不将反馈表述为已合并补丁或正式科研成果 |

Bilibili 专栏： [2025 年回看](https://www.bilibili.com/read/cv44645807)、[2022 动画推荐](https://www.bilibili.com/read/cv20716673)、[京吹](https://www.bilibili.com/read/cv9912879)、[Re:Stage](https://www.bilibili.com/read/cv6770928)。

公开网页最初直连失败；通过未登录的隔离浏览器完成页面核验。完整抓取中不适合个人研究官网的内容、好友列表与其他无关资料不进入网站数据。

## 外部评审依据

采用 MIT 开源项目 [Agency Agents](https://github.com/msitarzewski/agency-agents) 的已有角色，而非自行伪造“监督智能体”：

1. 主评审：[Reality Checker](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-reality-checker.md)，下载时 blob SHA 为 `e534cfbd20d3115d5265387f19db7d3b25649421`。
2. 取证方法：[Evidence Collector](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-evidence-collector.md)，blob SHA `187a2d010abb3439d91ea59aa75de8c5ee860560`。
3. 视觉检查：[UI Designer](https://github.com/msitarzewski/agency-agents/blob/main/design/design-ui-designer.md)，blob SHA `ca8886161000d62dd4429d1462b3fd473c031312`。

保留其证据优先、完整用户路径、跨设备检查、真实性能和默认审慎原则。仅做三项必要适配：把 Laravel/Linux 示例换成实际 Vinext/Windows 路径；附加用户要求的 0–100 总分；将“第一轮总有若干问题”等经验说法视为审查倾向，禁止为凑数量而捏造问题。

评审必须独立读取代码、实际截图、交互与性能结果，不能只复述开发者报告。首次评审给出明确分项与扣分依据，复评沿用相同口径；不得因为期望完成而提高分数。原始评审与修订证据保存在本地可视化目录，不进入公开页面。

## 验证方式

内置浏览器在创建页面时超时并重置；改用微软 Playwright 的隔离浏览器。源码测试覆盖完整路由、链接、内容边界和公开来源；浏览器检查覆盖桌面、平板、手机、窄屏、键盘导航、暂停动态与系统减少动态效果。运行环境与性能数字以实际证据文件为准，不能用构建通过替代视觉验收。
