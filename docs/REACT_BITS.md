# React Bits

通过官方支持的 shadcn CLI 按需安装组件源码，注册表在根目录 `components.json` 中配置：`@react-bits` → `https://reactbits.dev/r/{name}.json`。

本项目采用 TypeScript + CSS 版本，组件放在 `app/_components/react-bits/`。

## 已安装

- **BlurText**：文字从模糊到清晰的入场效果，使用现有 Motion 13.2.0。
- **StarBorder**：可作为按钮、链接或容器的流光边框。

```tsx
import BlurText from "@/app/_components/react-bits/BlurText";
import StarBorder from "@/app/_components/react-bits/StarBorder";

<BlurText text="从复杂过程，到可信决策。" animateBy="letters" />
<StarBorder as="a" href="/research">探索研究</StarBorder>
```

组件已声明客户端边界。BlurText 复用网站的动效偏好，关闭动效、服务端渲染或缺少 IntersectionObserver 时显示普通文字。StarBorder 采用本站颜色变量、限定作用域的样式和减少动态效果规则，默认按钮类型为 `button`。`lib/utils.ts` 提供 shadcn 标准类名合并工具。网站页面可按需导入这些组件。

## 添加其他组件

在项目目录执行官方命名空间命令，例如：

```powershell
npx shadcn@latest add @react-bits/组件名-TS-CSS
```

使用组件页面给出的准确名称；安装后检查客户端边界、动效偏好及依赖变更，保留项目现有的 Motion 版本。

## 来源与许可

- [React Bits 官方仓库与安装说明](https://github.com/DavidHDev/react-bits)
- [BlurText](https://reactbits.dev/text-animations/blur-text)
- [StarBorder](https://reactbits.dev/animations/star-border)
- 上游许可原文保存在 `app/_components/react-bits/LICENSE.md`。

本地适配包括客户端声明、动效偏好、颜色变量、样式作用域、默认按钮行为与 TypeScript 类型收紧。尚未将这些组件挂到线上页面。
