# Icon / 图标

图标组件，对 Lucide 等图标的统一封装，支持名称或直接传入图标元素。  
Icon component wrapping Lucide etc.; supports name or passing an icon element.

---

## 引入 / Import

```tsx
import { Icon } from "nfx-ui";
import type { IconName, IconProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| name | IconName | No* | — | 图标名称（与 lucide 对应）。Icon name (lucide). *与 children 二选一。Or use children. |
| size | number | No | — | 尺寸（如 16、24）。Size (e.g. 16, 24). |
| className | string | No | — | 自定义类名。Custom class. |

---

## 输入 Input / 输出 Output

- **Input**：name 或 children（图标元素）。name or children (icon element).
- **Output**：渲染对应图标。Renders the icon.

---

## 示例 / Example

```tsx
<Icon name="Search" size={20} />
<Icon name="ChevronDown" size={16} className="text-gray-500" />
```

若项目直接使用 `lucide-react`，也可不用 Icon 而直接使用 Lucide 组件。  
You can also use `lucide-react` components directly instead of Icon.
