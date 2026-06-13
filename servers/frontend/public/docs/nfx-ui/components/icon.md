# Icon

Icon component rendering a registered Lucide icon by name.

---

## Import

```tsx
import { Icon } from "nfx-ui/components";
import type { IconName, IconProps } from "nfx-ui/components";
```

---

## Parameters

Extends `LucideProps` from `lucide-react`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| name | IconName | Yes | — | Icon name (registered lucide name). |
| size | number | No | — | Icon size (e.g. 16, 24). |
| className | string | No | — | Custom class. |
| color | string | No | — | Icon color. |
| strokeWidth | number | No | — | Stroke width. |

Other `LucideProps` (e.g. `absoluteStrokeWidth`, `onClick`) are forwarded to the underlying Lucide component.

---

## Input / Output

- **Input:** `name` plus any Lucide icon props.
- **Output:** Renders the matching Lucide icon; returns `null` and logs a warning if `name` is not found.

---

## Example

```tsx
<Icon name="Search" size={20} />
<Icon name="ChevronDown" size={16} className="text-gray-500" />
```

You can also use `lucide-react` components directly instead of Icon.

---

---

# Icon — 图标

基于 lucide-react 的图标组件，通过 `name` 渲染已注册的 Lucide 图标。

---

## 引入

```tsx
import { Icon } from "nfx-ui/components";
import type { IconName, IconProps } from "nfx-ui/components";
```

---

## 参数

继承 `lucide-react` 的 `LucideProps`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| name | IconName | 是 | — | 图标名（lucide 注册名）。 |
| size | number | 否 | — | 尺寸（如 16、24）。 |
| className | string | 否 | — | 自定义类名。 |
| color | string | 否 | — | 图标颜色。 |
| strokeWidth | number | 否 | — | 描边宽度。 |

其他 `LucideProps`（如 `absoluteStrokeWidth`、`onClick`）会透传给底层 Lucide 组件。

---

## 输入 / 输出

- **输入：** `name` 及任意 Lucide 图标 props。
- **输出：** 渲染对应 Lucide 图标；若 `name` 未找到则返回 `null` 并输出警告。

---

## 示例

```tsx
<Icon name="Search" size={20} />
<Icon name="ChevronDown" size={16} className="text-gray-500" />
```

若项目直接使用 `lucide-react`，也可不用 Icon 而直接使用 Lucide 组件。
