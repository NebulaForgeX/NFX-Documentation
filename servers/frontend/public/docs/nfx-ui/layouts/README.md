# Layouts 布局

布局相关组件与 Hooks，用于整页框架、侧栏、顶栏、底栏与背景。各组件/Hook 的参数、Input/Output 与示例见子文档。  
Layout components and hooks for page frame, sidebar, header, footer and background. Parameters, Input/Output and examples are in each sub-doc.

---

## 组件与文档 / Components and docs

| 名称 Name | 说明 Description | 文档 Doc |
|-----------|------------------|----------|
| LayoutProvider | 布局上下文 Layout context | [layout-provider.md](./layout-provider.md) |
| LayoutSwitcher | 布局切换（如侧栏显隐）Layout toggle | [layout-switcher.md](./layout-switcher.md) |
| Sidebar | 侧边栏 Sidebar | [sidebar.md](./sidebar.md) |
| MainWrapper | 主内容区包裹 Main wrapper | [main-wrapper.md](./main-wrapper.md) |
| SideHideLayout | 侧栏隐藏布局 Sidebar hidden layout | [side-hide-layout.md](./side-hide-layout.md) |
| SideShowLayout | 侧栏展示布局 Sidebar visible layout | [side-show-layout.md](./side-show-layout.md) |
| Header | 顶栏 Header | [header.md](./header.md) |
| Footer | 底栏 Footer | [footer.md](./footer.md) |
| Background | 仪表盘背景 Dashboard background | [background.md](./background.md) |

## Hooks

| Hook | 说明 Description | 文档 Doc |
|------|-------------------|----------|
| useLayout | 读取当前布局状态 Read layout state | [use-layout.md](./use-layout.md) |
| useSet | 布局 set 方法 Set layout | [use-set.md](./use-set.md) |
| useAction | 布局相关操作 Layout actions | [use-action.md](./use-action.md) |

---

## 引入示例 / Import example

```tsx
import {
  LayoutProvider,
  LayoutSwitcher,
  Sidebar,
  MainWrapper,
  SideHideLayout,
  SideShowLayout,
  Header,
  Footer,
  Background,
} from "nfx-ui";
```
