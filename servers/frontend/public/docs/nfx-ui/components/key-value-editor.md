# KeyValueEditor / 键值对编辑

键值对列表编辑，可增删改多行 key-value。  
Editor for a list of key-value pairs; add, remove, edit rows.

---

## 引入 / Import

```tsx
import { KeyValueEditor } from "nfx-ui/components";
import type { KeyValueEditorProps, KeyValuePair } from "nfx-ui/components";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| value | KeyValuePair[] | Yes | — | 当前键值对列表。Current list of { key, value }. |
| onChange | (list: KeyValuePair[]) => void | Yes | — | 列表变化回调。Change callback. |
| keyPlaceholder | string | No | — | key 输入框占位。Placeholder for key input. |
| valuePlaceholder | string | No | — | value 输入框占位。Placeholder for value input. |

---

## 输入 Input / 输出 Output

- **Input**：value（数组）、onChange、placeholders。value (array), onChange, placeholders.
- **Output**：用户增删改后 `onChange(newList)` 被调用。On add/remove/edit, `onChange(newList)` is called.

---

## 示例 / Example

```tsx
<KeyValueEditor
  value={headers}
  onChange={setHeaders}
  keyPlaceholder="Header name"
  valuePlaceholder="Value"
/>
```
