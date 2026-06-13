# LayoutProvider

Provides layout context (sidebar open state, layout mode show/hide); children use `useLayout()` to read and update state.

---

## Import

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
import type { LayoutProviderProps } from "nfx-ui/layouts";
```

---

## Parameters (`LayoutProviderProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children (layout UI). |
| defaultLayoutMode | LayoutModeEnum | No | `LayoutModeEnum.SHOW` | Default layout mode (sidebar show/hide). |

---

## Input / Output

- **Input:** children; optional `defaultLayoutMode`.
- **Output:** Provides `LayoutContext` with `sidebarOpen`, `layoutMode`, `setSidebarOpen`, `toggleSidebar`, `closeSidebar`, `setLayoutMode`. State is persisted to `layout-storage` via internal `useSet` / `useAction`.

---

## Example

```tsx
import { LayoutProvider, LayoutFrame, LayoutModeEnum } from "nfx-ui/layouts";

<LayoutProvider defaultLayoutMode={LayoutModeEnum.SHOW}>
  <LayoutFrame sidebarItems={items} onSidebarNavigate={navigate}>
    <Dashboard />
  </LayoutFrame>
</LayoutProvider>
```

---

---

# LayoutProvider — 布局上下文

提供布局上下文（侧栏开关、布局模式 show/hide）；子组件通过 `useLayout()` 读取与更新状态。

---

## 引入

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
import type { LayoutProviderProps } from "nfx-ui/layouts";
```

---

## 参数（`LayoutProviderProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点（布局 UI）。 |
| defaultLayoutMode | LayoutModeEnum | 否 | `LayoutModeEnum.SHOW` | 默认布局模式（侧栏显示/隐藏）。 |

---

## 输入 / 输出

- **输入：** children；可选 `defaultLayoutMode`。
- **输出：** 提供 `LayoutContext`：`sidebarOpen`、`layoutMode`、`setSidebarOpen`、`toggleSidebar`、`closeSidebar`、`setLayoutMode`。状态由内部 `useSet` / `useAction` 持久化到 `layout-storage`。

---

## 示例

```tsx
import { LayoutProvider, LayoutFrame, LayoutModeEnum } from "nfx-ui/layouts";

<LayoutProvider defaultLayoutMode={LayoutModeEnum.SHOW}>
  <LayoutFrame sidebarItems={items} onSidebarNavigate={navigate}>
    <Dashboard />
  </LayoutFrame>
</LayoutProvider>
```
