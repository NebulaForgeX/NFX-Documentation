# Textarea

Multiline text input with label, error, required indicator, etc.

---

## Import

```tsx
import { Textarea } from "nfx-ui/components";
import type { TextareaProps } from "nfx-ui/components";
```

---

## Parameters

Extends textarea HTML attributes; common props similar to Input.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | string | No | — | Label text. |
| error | string | No | — | Error message. |
| helperText | string | No | — | Helper text. |
| required | boolean | No | — | Required (shows *). |
| rows | number | No | — | Number of rows. |
| placeholder | string | No | — | Placeholder. |

---

## Input / Output

- **Input:** value, onChange, label, error, rows, etc.
- **Output:** Renders `<textarea>` with label/error/helper.

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
```

---

---

# Textarea — 多行输入框

多行文本输入框，支持 label、错误信息、必填标记等。

---

## 引入

```tsx
import { Textarea } from "nfx-ui/components";
import type { TextareaProps } from "nfx-ui/components";
```

---

## 参数

继承 `TextareaHTMLAttributes`。常用与 Input 类似。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| label | string | 否 | — | 标签文案。 |
| error | string | 否 | — | 错误信息。 |
| helperText | string | 否 | — | 辅助说明。 |
| required | boolean | 否 | — | 是否必填（显示 *）。 |
| rows | number | 否 | — | 行数。 |
| placeholder | string | 否 | — | 占位符。 |

---

## 输入 / 输出

- **输入：** value、onChange、label、error、rows 等。
- **输出：** 渲染带 label/错误/辅助文案的 `<textarea>`。

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
```
