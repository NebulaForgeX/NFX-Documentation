# SlideDownSwitcher

Dropdown value switcher with generic `T extends string` (e.g. enum); used by ThemeSwitcher and LayoutSwitcher.

---

## Import

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import type { SlideDownSwitcherProps } from "nfx-ui/components";
```

---

## Parameters

Generic component: `SlideDownSwitcher<T extends string>`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | T | Yes | — | Current selected value. |
| options | readonly T[] | Yes | — | Option list (e.g. `Object.values(SomeEnum)`). |
| getDisplayName | (value: T) => string | Yes | — | Display label for each option. |
| onChange | (value: T) => void | Yes | — | Selection callback. |
| status | `"primary"` \| `"default"` | No | `"primary"` | Visual status. |

---

## Input / Output

- **Input:** value, options, getDisplayName, onChange, status.
- **Output:** Renders dropdown button showing current label; opens panel with options; calls `onChange` on select and closes panel.

---

## Example

```tsx
type Status = "all" | "active" | "archived";

const [filter, setFilter] = useState<Status>("all");

<SlideDownSwitcher<Status>
  value={filter}
  options={["all", "active", "archived"]}
  getDisplayName={(v) => ({ all: "All", active: "Active", archived: "Archived" }[v])}
  onChange={setFilter}
  status="default"
/>
```

---

---

# SlideDownSwitcher — 下拉切换器

泛型 `T extends string` 的下拉取值切换器（如 enum）；ThemeSwitcher、LayoutSwitcher 基于此组件。

---

## 引入

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import type { SlideDownSwitcherProps } from "nfx-ui/components";
```

---

## 参数

泛型组件：`SlideDownSwitcher<T extends string>`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | T | 是 | — | 当前选中值。 |
| options | readonly T[] | 是 | — | 可选项列表（如 `Object.values(SomeEnum)`）。 |
| getDisplayName | (value: T) => string | 是 | — | 各选项展示文案。 |
| onChange | (value: T) => void | 是 | — | 选中回调。 |
| status | `"primary"` \| `"default"` | 否 | `"primary"` | 视觉状态。 |

---

## 输入 / 输出

- **输入：** value、options、getDisplayName、onChange、status。
- **输出：** 渲染显示当前文案的下拉按钮；展开选项面板；选择后调用 `onChange` 并关闭面板。

---

## 示例

```tsx
type Status = "all" | "active" | "archived";

const [filter, setFilter] = useState<Status>("all");

<SlideDownSwitcher<Status>
  value={filter}
  options={["all", "active", "archived"]}
  getDisplayName={(v) => ({ all: "全部", active: "启用", archived: "归档" }[v])}
  onChange={setFilter}
  status="default"
/>
```
