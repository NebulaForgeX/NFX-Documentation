# IconButton / 图标按钮

仅图标的按钮，常用于工具栏、表格操作等。  
Button that shows only an icon; common for toolbars and table actions.

---

## 引入 / Import

```tsx
import { IconButton } from "nfx-ui";
import type { IconButtonProps } from "nfx-ui";
```

---

## 参数 / Parameters

继承按钮类 HTML 属性。Extends button-like HTML attributes.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| size | 见类型 | No | — | 尺寸。Size. |
| variant | 见类型 | No | — | 变体。Variant. |
| disabled | boolean | No | false | 是否禁用。Disabled. |
| aria-label | string | 建议 | — | 无障碍标签（建议必填）。Accessibility label (recommended). |

---

## 输入 Input / 输出 Output

- **Input**：children（图标）+ onClick、aria-label 等。children (icon) + onClick, aria-label, etc.
- **Output**：渲染为可点击的图标按钮。Renders a clickable icon button.

---

## 示例 / Example

```tsx
<IconButton aria-label="关闭 / Close" onClick={onClose}>
  <X size={18} />
</IconButton>
```
