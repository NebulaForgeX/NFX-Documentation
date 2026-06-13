# Layouts

Layout components and hooks for page frame, sidebar, header, footer and background. Parameters, Input/Output and examples are in each sub-doc.

---

## Components and docs

| Name | Description | Doc |
|------|-------------|-----|
| LayoutProvider | Layout context | [layout-provider.md](./layout-provider.md) |
| LayoutFrame | Full layout shell (Header + Sidebar + main + Footer) | [layout-frame.md](./layout-frame.md) |
| Sidebar | Sidebar | [sidebar.md](./sidebar.md) |
| MainWrapper | Main content wrapper | [main-wrapper.md](./main-wrapper.md) |
| SideHideLayout | Sidebar hidden layout | [side-hide-layout.md](./side-hide-layout.md) |
| SideShowLayout | Sidebar visible layout | [side-show-layout.md](./side-show-layout.md) |
| Header | Header | [header.md](./header.md) |
| Footer | Footer | [footer.md](./footer.md) |
| Background | Dashboard background | [background.md](./background.md) |
| LayoutSwitcher | Layout toggle (sidebar show/hide) | [../components/layout-switcher.md](../components/layout-switcher.md) |

## Hooks

| Hook | Description | Doc |
|------|-------------|-----|
| useLayout | Read and update layout state (consumer hook) | [use-layout.md](./use-layout.md) |
| useSet | Layout mode + persistence (used by LayoutProvider) | [use-set.md](./use-set.md) |
| useAction | Sidebar open state (used by LayoutProvider) | [use-action.md](./use-action.md) |

## Storage utils

Persisted under `layout-storage` (JSON: `{ state: { sidebarOpen, layoutMode } }`).

| Function | Signature | Description |
|----------|-----------|-------------|
| `getLayoutStorage` | `() => Nilable<string>` | Read raw JSON string from localStorage. |
| `setLayoutStorage` | `(value: string) => void` | Write raw JSON string. |
| `removeLayoutStorage` | `() => void` | Remove persisted layout state. |

```tsx
import { getLayoutStorage, setLayoutStorage, removeLayoutStorage } from "nfx-ui/layouts";
```

---

## Import example

```tsx
import {
  LayoutProvider,
  LayoutFrame,
  Sidebar,
  MainWrapper,
  SideHideLayout,
  SideShowLayout,
  Header,
  Footer,
  Background,
  LayoutModeEnum,
  useLayout,
  getLayoutStorage,
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
| LayoutFrame | 完整布局骨架（Header + Sidebar + 主区 + Footer） | [layout-frame.md](./layout-frame.md) |
| Sidebar | 侧边栏 | [sidebar.md](./sidebar.md) |
| MainWrapper | 主内容区包裹 | [main-wrapper.md](./main-wrapper.md) |
| SideHideLayout | 侧栏隐藏布局 | [side-hide-layout.md](./side-hide-layout.md) |
| SideShowLayout | 侧栏展示布局 | [side-show-layout.md](./side-show-layout.md) |
| Header | 顶栏 | [header.md](./header.md) |
| Footer | 底栏 | [footer.md](./footer.md) |
| Background | 仪表盘背景 | [background.md](./background.md) |
| LayoutSwitcher | 布局切换（侧栏显隐） | [../components/layout-switcher.md](../components/layout-switcher.md) |

## Hooks

| Hook | 说明 | 文档 |
|------|------|------|
| useLayout | 读取与更新布局状态（业务侧主入口） | [use-layout.md](./use-layout.md) |
| useSet | 布局模式与持久化（LayoutProvider 内部） | [use-set.md](./use-set.md) |
| useAction | 侧栏开关状态（LayoutProvider 内部） | [use-action.md](./use-action.md) |

## 存储工具

持久化键为 `layout-storage`（JSON：`{ state: { sidebarOpen, layoutMode } }`）。

| 函数 | 签名 | 说明 |
|------|------|------|
| `getLayoutStorage` | `() => Nilable<string>` | 从 localStorage 读取原始 JSON 字符串。 |
| `setLayoutStorage` | `(value: string) => void` | 写入原始 JSON 字符串。 |
| `removeLayoutStorage` | `() => void` | 清除已保存的布局状态。 |

```tsx
import { getLayoutStorage, setLayoutStorage, removeLayoutStorage } from "nfx-ui/layouts";
```

---

## 引入示例

```tsx
import {
  LayoutProvider,
  LayoutFrame,
  Sidebar,
  MainWrapper,
  SideHideLayout,
  SideShowLayout,
  Header,
  Footer,
  Background,
  LayoutModeEnum,
  useLayout,
  getLayoutStorage,
} from "nfx-ui/layouts";
```
