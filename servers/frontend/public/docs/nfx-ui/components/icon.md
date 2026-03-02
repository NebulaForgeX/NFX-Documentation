# Icon

Icon component wrapping Lucide etc.; supports name or passing an icon element.

---

## Import

```tsx
import { Icon } from "nfx-ui/components";
import type { IconName, IconProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| name | IconName | No* | — | Icon name (lucide). *Use name or children. |
| size | number | No | — | Size (e.g. 16, 24). |
| className | string | No | — | Custom class. |

---

## Input / Output

- **Input:** name or children (icon element).
- **Output:** Renders the icon.

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

图标组件，对 Lucide 等图标的统一封装，支持名称或直接传入图标元素。

---

## 引入

```tsx
import { Icon } from "nfx-ui/components";
import type { IconName, IconProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| name | IconName | 否* | — | 图标名称（与 lucide 对应）。*与 children 二选一。 |
| size | number | 否 | — | 尺寸（如 16、24）。 |
| className | string | 否 | — | 自定义类名。 |

---

## 输入 / 输出

- **输入：** name 或 children（图标元素）。
- **输出：** 渲染对应图标。

---

## 示例

```tsx
<Icon name="Search" size={20} />
<Icon name="ChevronDown" size={16} className="text-gray-500" />
```

若项目直接使用 `lucide-react`，也可不用 Icon 而直接使用 Lucide 组件。
