# Textarea

Multiline text input with label, error, helper text, left/right icons, size and variant.

---

## Import

```tsx
import { Textarea } from "nfx-ui/components";
import type { TextareaProps } from "nfx-ui/components";
```

---

## Parameters

Extends textarea HTML attributes (except `size`).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | ReactNode | No | — | Label text. |
| error | ReactNode | No | — | Error message. |
| helperText | ReactNode | No | — | Helper text (when no error). |
| leftIcon | ReactNode | No | — | Left icon. |
| rightIcon | ReactNode | No | — | Right icon. |
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Size. |
| variant | `"default"` \| `"filled"` | No | `"default"` | Variant. |
| fullWidth | boolean | No | false | Full width. |

Also accepts native textarea props such as `rows`, `placeholder`, `required`, `value`, `onChange`.

---

## Input / Output

- **Input:** Props above plus value, onChange, rows, placeholder, etc.
- **Output:** Renders `<textarea>` with label/error/helper; shows required `*` when `required` is set.

---

## Example

```tsx
<Textarea
  label="Notes"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  rows={4}
  placeholder="Optional"
/>

<Textarea error={errors.note} helperText="Optional" />
<Textarea size="small" variant="filled" fullWidth />
```

---

---

# Textarea — 多行输入框

多行文本输入框，支持 label、错误信息、辅助文案、左右图标、尺寸与变体。

---

## 引入

```tsx
import { Textarea } from "nfx-ui/components";
import type { TextareaProps } from "nfx-ui/components";
```

---

## 参数

继承 `TextareaHTMLAttributes`（除 `size` 被覆盖）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| label | ReactNode | 否 | — | 标签文案。 |
| error | ReactNode | 否 | — | 错误信息。 |
| helperText | ReactNode | 否 | — | 辅助说明（无 error 时显示）。 |
| leftIcon | ReactNode | 否 | — | 左侧图标。 |
| rightIcon | ReactNode | 否 | — | 右侧图标。 |
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 尺寸。 |
| variant | `"default"` \| `"filled"` | 否 | `"default"` | 视觉变体。 |
| fullWidth | boolean | 否 | false | 是否占满宽度。 |

另支持 `rows`、`placeholder`、`required`、`value`、`onChange` 等原生 textarea 属性。

---

## 输入 / 输出

- **输入：** 上述 props + value、onChange、rows、placeholder 等。
- **输出：** 渲染带 label/错误/辅助文案的 `<textarea>`；`required` 时显示 `*`。

---

## 示例

```tsx
<Textarea
  label="备注"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  rows={4}
  placeholder="选填"
/>

<Textarea error={errors.note} helperText="选填" />
<Textarea size="small" variant="filled" fullWidth />
```
