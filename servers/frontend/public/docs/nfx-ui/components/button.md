# Button

Button with variants, sizes, top/right/bottom/left icons, icon-only mode, loading, full width.

---

## Import

```tsx
import { Button } from "nfx-ui/components";
import type { ButtonProps } from "nfx-ui/components";
```

---

## Parameters

Extends button HTML attributes (except `size`).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| variant | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"danger"` | No | `"primary"` | Visual variant. |
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Size. |
| fullWidth | boolean | No | false | Full width. |
| leftIcon | ReactNode | No | — | Left icon. |
| rightIcon | ReactNode | No | — | Right icon. |
| topIcon | ReactNode | No | — | Top icon. |
| bottomIcon | ReactNode | No | — | Bottom icon. |
| iconOnly | boolean | No | false | Icon only, no text. |
| iconSize | number | No | — | Override icon size. |
| loading | boolean | No | false | Loading state (spinner, disabled). |

---

## Input / Output

- **Input:** Props above plus `children`.
- **Output:** Renders `<button>`; when loading shows spinner and is disabled; when iconOnly renders square icon button.

---

## Example

```tsx
<Button onClick={handleSave}>Save</Button>

<Button
  leftIcon={<Save size={16} />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>

<Button
  variant="outline"
  iconOnly
  leftIcon={<X size={18} />}
  aria-label="Close"
  onClick={onClose}
/>

<Button variant="outline" size="small">Cancel</Button>
<Button variant="danger" size="large">Delete</Button>
<Button fullWidth>Full width</Button>
```

---

---

# Button — 按钮

按钮组件：变体、尺寸、四向图标、仅图标（iconOnly）、loading、fullWidth。

---

## 引入

```tsx
import { Button } from "nfx-ui/components";
import type { ButtonProps } from "nfx-ui/components";
```

---

## 参数

继承 `ButtonHTMLAttributes`（除 `size` 被覆盖）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| variant | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"danger"` | 否 | `"primary"` | 视觉变体。 |
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 尺寸。 |
| fullWidth | boolean | 否 | false | 是否占满宽度。 |
| leftIcon | ReactNode | 否 | — | 左侧图标。 |
| rightIcon | ReactNode | 否 | — | 右侧图标。 |
| topIcon | ReactNode | 否 | — | 上方图标。 |
| bottomIcon | ReactNode | 否 | — | 下方图标。 |
| iconOnly | boolean | 否 | false | 仅图标无文案（方形按钮）。 |
| iconSize | number | 否 | — | 图标尺寸覆盖。 |
| loading | boolean | 否 | false | 加载中（显示 spinner，禁用点击）。 |

---

## 输入 / 输出

- **输入：** 上述 props + 子节点 `children`。
- **输出：** 渲染为 `<button>`；loading 时显示 spinner、禁用点击；iconOnly 时为方形图标按钮。

---

## 示例

```tsx
<Button onClick={handleSave}>保存</Button>

<Button
  leftIcon={<Save size={16} />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  提交
</Button>

<Button
  variant="outline"
  iconOnly
  leftIcon={<X size={18} />}
  aria-label="关闭"
  onClick={onClose}
/>

<Button variant="outline" size="small">取消</Button>
<Button variant="danger" size="large">删除</Button>
<Button fullWidth>占满一行</Button>
```
