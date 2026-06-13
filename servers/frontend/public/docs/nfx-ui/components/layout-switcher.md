# LayoutSwitcher

Layout mode switcher (sidebar show/hide) built on `SlideDownSwitcher`; reads and updates layout via `useLayout`. Requires `LayoutProvider`.

---

## Import

```tsx
import { LayoutSwitcher } from "nfx-ui/components";
import type { LayoutSwitcherProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | `"primary"` \| `"default"` | No | `"primary"` | Visual status passed to `SlideDownSwitcher`. |
| showLabel | `string` | No | — | Fallback label for show mode when `getLayoutDisplayName` is omitted. |
| hideLabel | `string` | No | — | Fallback label for hide mode when `getLayoutDisplayName` is omitted. |
| getLayoutDisplayName | `(mode: LayoutModeEnum) => string` | No | showLabel / hideLabel | Display label for each layout mode. |
| handleChangeLayoutMode | `(mode: LayoutModeEnum) => void` | No | — | Called after layout mode changes. |

---

## Input / Output

- **Input:** `LayoutSwitcherProps` (all optional).
- **Output:** Renders `SlideDownSwitcher` with `LAYOUT_MODE_VALUES`; selection calls `setLayoutMode`.

---

## Example

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
import { LayoutSwitcher } from "nfx-ui/components";
import { useLayoutLabel } from "nfx-ui/languages";

function HeaderRight() {
  const getLayoutDisplayName = useLayoutLabel();
  return <LayoutSwitcher getLayoutDisplayName={getLayoutDisplayName} />;
}

export function App() {
  return (
    <LayoutProvider>
      <HeaderRight />
    </LayoutProvider>
  );
}
```

---

---

# LayoutSwitcher — 布局切换

基于 `SlideDownSwitcher` 的布局模式切换器（侧栏显/隐），通过 `useLayout` 读取并更新布局。依赖 `LayoutProvider`。

---

## 引入

```tsx
import { LayoutSwitcher } from "nfx-ui/components";
import type { LayoutSwitcherProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| status | `"primary"` \| `"default"` | 否 | `"primary"` | 传给 `SlideDownSwitcher` 的视觉状态。 |
| showLabel | `string` | 否 | — | 未传 `getLayoutDisplayName` 时「显示侧栏」文案。 |
| hideLabel | `string` | 否 | — | 未传 `getLayoutDisplayName` 时「隐藏侧栏」文案。 |
| getLayoutDisplayName | `(mode: LayoutModeEnum) => string` | 否 | showLabel / hideLabel | 各布局模式的展示名。 |
| handleChangeLayoutMode | `(mode: LayoutModeEnum) => void` | 否 | — | 布局模式变更后的回调。 |

---

## 输入 / 输出

- **输入：** `LayoutSwitcherProps`（均可选）。
- **输出：** 渲染 `SlideDownSwitcher`，选项为 `LAYOUT_MODE_VALUES`；选择后调用 `setLayoutMode`。

---

## 示例

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
import { LayoutSwitcher } from "nfx-ui/components";
import { useLayoutLabel } from "nfx-ui/languages";

function HeaderRight() {
  const getLayoutDisplayName = useLayoutLabel();
  return <LayoutSwitcher getLayoutDisplayName={getLayoutDisplayName} />;
}

export function App() {
  return (
    <LayoutProvider>
      <HeaderRight />
    </LayoutProvider>
  );
}
```
