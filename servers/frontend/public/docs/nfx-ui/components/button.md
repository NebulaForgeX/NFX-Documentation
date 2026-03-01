# Button / 按钮

按钮组件：变体、尺寸、四向图标、仅图标（iconOnly）、loading、fullWidth。  
Button with variants, sizes, top/right/bottom/left icons, icon-only mode, loading, full width.

---

## 引入 / Import

```tsx
import { Button } from "nfx-ui";
import type { ButtonProps } from "nfx-ui";
```

---

## 参数 / Parameters

继承 `ButtonHTMLAttributes`（除 `size` 被覆盖）。Extends button HTML attributes (except `size`).

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| variant | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"danger"` | No | `"primary"` | 视觉变体。Visual variant. |
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | 尺寸。Size. |
| fullWidth | boolean | No | false | 是否占满宽度。Full width. |
| leftIcon | ReactNode | No | — | 左侧图标。Left icon. |
| rightIcon | ReactNode | No | — | 右侧图标。Right icon. |
| topIcon | ReactNode | No | — | 上方图标。Top icon. |
| bottomIcon | ReactNode | No | — | 下方图标。Bottom icon. |
| iconOnly | boolean | No | false | 仅图标无文案（方形按钮）。Icon only, no text. |
| iconSize | number | No | — | 图标尺寸覆盖。Override icon size. |
| loading | boolean | No | false | 加载中（显示 spinner，禁用点击）。Loading state. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props + 子节点 `children`。Props above plus `children`.
- **Output**：渲染为 `<button>`；loading 时显示 spinner、禁用点击；iconOnly 时为方形图标按钮。Renders `<button>`; when loading shows spinner and is disabled; when iconOnly renders square icon button.

---

## 示例 / Example

```tsx
// 基础 / Basic
<Button onClick={handleSave}>保存 / Save</Button>

// 带图标与 loading / With icon and loading
<Button
  leftIcon={<Save size={16} />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  提交 / Submit
</Button>

// 仅图标（原 IconButton 用法）/ Icon only
<Button
  variant="outline"
  iconOnly
  leftIcon={<X size={18} />}
  aria-label="关闭 / Close"
  onClick={onClose}
/>

// 不同变体与尺寸 / Variants and sizes
<Button variant="outline" size="small">取消 / Cancel</Button>
<Button variant="danger" size="large">删除 / Delete</Button>
<Button fullWidth>占满一行 / Full width</Button>
```
