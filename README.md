# 小闫的个人研究网站

一个基于 Vinext、React 19、TypeScript 与 Cloudflare Sites 的多页面个人展示网站。

## 项目目录

- `app/`：页面、复用组件、设计系统与权威内容数据
- `public/`：网站公开使用的图片、海报和社交分享资源
- `docs/`：产品规范、设计规范、内容缺口与质量检查记录
- `tests/`：页面、链接、元数据与内容口径回归测试
- `db/`、`drizzle/`、`worker/`：Sites 模板保留的服务端能力与部署入口
- `local/`：本地参考图和外部审阅意见，不进入版本库或公开部署
- `work/`、`output/`：生成脚本、来源中间文件、测试截图和部署包，不进入版本库

## 页面结构

- `/`：个人与研究概览
- `/about`：个人介绍与研究准则
- `/projects`、`/projects/[slug]`：研究主题与案例详情
- `/publications`：经核实的论文与成果档案
- `/skills`、`/skills/[slug]`：技术能力地图与方向详情
- `/experience`：教育与经历时间轴
- `/honors`：竞赛与荣誉档案
- `/notes`、`/notes/[slug]`：知识库与主题索引
- `/thoughts`：个人随想
- `/life`：生活记录总览
- `/life/animation`：深色“动画观测站”分站首页
- `/life/animation/recommendations`、`/life/animation/recommendations/[year]`：2017—2025 年度推荐、片单与已保存原稿
- `/life/animation/reviews`、`/life/animation/[slug]`：影评档案与独立长文
- `/life/animation/archive`、`/life/animation/archive/[year]`：2,276 条番剧主表的年份索引与完整清单
- `/life/animation/timeline`：按真实年份编排的观看时间线

## 本地运行

```bash
npm install
npm run dev
npm test
```

## 内容维护

权威静态内容集中在 `app/_data/`。动画原文数据独立位于 `app/_data/animation/`，海报素材与来源清单分别位于 `public/images/animation/` 和 `docs/animation/poster-sources.json`。学校、论文、奖项、项目结果、联系方式与个人照片等未完整信息会直接列出所需字段；资料齐备后再更新对应记录。

动画页面使用 `app/_data/animation/public-content.json`。包含未公开补充记录的 `source-content.json` 仅留在本地，不进入 GitHub。公开快照保留页面已经展示的推荐、影评和总表，以及补充记录的数量；新克隆的项目无需原始文件即可运行。需要从本地原稿更新公开快照时，运行 `node scripts/export-public-animation.mjs`，再审阅生成内容。

产品与设计约束从 [`docs/README.md`](docs/README.md) 进入。个人参考资料统一保存在本地 `local/` 目录，避免把外部模型审阅稿或过程截图误发到公开版本。

GitHub 同步范围、历史保留方式和上传检查见 [`docs/GITHUB_SYNC.md`](docs/GITHUB_SYNC.md)。
