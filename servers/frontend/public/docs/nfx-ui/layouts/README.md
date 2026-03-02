# Layouts

Layout components and hooks for page frame, sidebar, header, footer and background. Parameters, Input/Output and examples are in each sub-doc.

---

## Components and docs

| Name | Description | Doc |
|------|-------------|-----|
| LayoutProvider | Layout context | [layout-provider.md](./layout-provider.md) |
| LayoutSwitcher | Layout toggle (e.g. sidebar show/hide) | [layout-switcher.md](./layout-switcher.md) |
| Sidebar | Sidebar | [sidebar.md](./sidebar.md) |
| MainWrapper | Main content wrapper | [main-wrapper.md](./main-wrapper.md) |
| SideHideLayout | Sidebar hidden layout | [side-hide-layout.md](./side-hide-layout.md) |
| SideShowLayout | Sidebar visible layout | [side-show-layout.md](./side-show-layout.md) |
| Header | Header | [header.md](./header.md) |
| Footer | Footer | [footer.md](./footer.md) |
| Background | Dashboard background | [background.md](./background.md) |
| LayoutFrame | Layout frame container (used by SideHideLayout / SideShowLayout) | — |

## Hooks

| Hook | Description | Doc |
|------|-------------|-----|
| useLayout | Read current layout state | [use-layout.md](./use-layout.md) |
| useSet | Set layout | [use-set.md](./use-set.md) |
| useAction | Layout actions | [use-action.md](./use-action.md) |

---

## Import example

```tsx
import {
  LayoutProvider,
  Sidebar,
  MainWrapper,
  SideHideLayout,
  SideShowLayout,
  Header,
  Footer,
  Background,
} from "nfx-ui/layouts";
```

---

---

# 布局

布局相关组件与 Hooks，用于整页框架、侧栏、顶栏、底栏与背景。各组件/Hook 的参数、Input/Output 与示例见子文档。

---

## 组件与文档

| 名称 | 说明 | 文档 |
|------|------|------|
| LayoutProvider | 布局上下文 | [layout-provider.md](./layout-provider.md) |
| LayoutSwitcher | 布局切换（如侧栏显隐） | [layout-switcher.md](./layout-switcher.md) |
| Sidebar | 侧边栏 | [sidebar.md](./sidebar.md) |
| MainWrapper | 主内容区包裹 | [main-wrapper.md](./main-wrapper.md) |
| SideHideLayout | 侧栏隐藏布局 | [side-hide-layout.md](./side-hide-layout.md) |
| SideShowLayout | 侧栏展示布局 | [side-show-layout.md](./side-show-layout.md) |
| Header | 顶栏 | [header.md](./header.md) |
| Footer | 底栏 | [footer.md](./footer.md) |
| Background | 仪表盘背景 | [background.md](./background.md) |
| LayoutFrame | 布局骨架容器（供 SideHideLayout / SideShowLayout 内部使用） | — |

## Hooks

| Hook | 说明 | 文档 |
|------|------|------|
| useLayout | 读取当前布局状态 | [use-layout.md](./use-layout.md) |
| useSet | 布局 set 方法 | [use-set.md](./use-set.md) |
| useAction | 布局相关操作 | [use-action.md](./use-action.md) |

---

## 引入示例

```tsx
import {
  LayoutProvider,
  Sidebar,
  MainWrapper,
  SideHideLayout,
  SideShowLayout,
  Header,
  Footer,
  Background,
} from "nfx-ui/layouts";
```
