# GitHub 同步记录

更新日期：2026-09-16。

- 仓库：`s1encisi/xiaoyan-personal-hub`。
- 当前同步分支：`codex/portfolio-release`，用于展示已上线网站的源码和新版个人介绍 README。
- `main` 保留在原提交 `d2f4fb4b89eccbef764e04f2a9eda7d6aa657d15`，本轮不合并、不强推或重写其历史。
- GitHub 仓库首页提供个人介绍、精选照片及现有网站链接；About 指向同一个网站。
- 网站继续使用既有 Sites 地址，GitHub 同步不触发网站重新部署。

## 同步内容

当前线上网站的页面、组件、内容与图片，以及依赖、构建配置、测试和项目文档。README 与补充文档用于仓库展示，不改变线上页面。

原有忽略规则继续生效：本地原稿、缓存、依赖安装目录和构建临时文件不作为网站源码提交。网站已经展示的个人资料与照片保留。

## 后续维护

```powershell
git switch codex/portfolio-release
git pull --ff-only
```

修改后审阅差异，运行 `npm test`、`npm run lint` 和类型检查，再提交并正常推送当前分支。新克隆可用以下命令启用已有的推送检查：

```powershell
git config core.hooksPath .githooks
node scripts/check-github-upload.mjs HEAD
```

本地旧历史备份仅用于恢复；不使用 `git push --all` 或 `git push --mirror`。网站部署与源码同步分别进行。
