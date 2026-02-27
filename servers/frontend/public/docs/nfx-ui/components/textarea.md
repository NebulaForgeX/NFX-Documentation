# Textarea / 多行输入框

多行文本输入框，支持 label、错误信息、必填标记等。  
Multiline text input with label, error, required indicator, etc.

---

## 引入 / Import

```tsx
import { Textarea } from "nfx-ui";
import type { TextareaProps } from "nfx-ui";
```

---

## 参数 / Parameters

继承 `TextareaHTMLAttributes`。常用与 Input 类似。Extends textarea HTML attributes; common props similar to Input.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| label | string | No | — | 标签文案。Label text. |
| error | string | No | — | 错误信息。Error message. |
| helperText | string | No | — | 辅助说明。Helper text. |
| required | boolean | No | — | 是否必填（显示 *）。Required (shows *). |
| rows | number | No | — | 行数。Number of rows. |
| placeholder | string | No | — | 占位符。Placeholder. |

---

## 输入 Input / 输出 Output

- **Input**：value、onChange、label、error、rows 等。value, onChange, label, error, rows, etc.
- **Output**：渲染带 label/错误/辅助文案的 `<textarea>`。Renders `<textarea>` with label/error/helper.

---

## 示例 / Example

```tsx
<Textarea
  label="备注 / Notes"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  rows={4}
  placeholder="选填 / Optional"
/>
```
