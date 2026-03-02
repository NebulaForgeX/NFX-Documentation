# KeyValueEditor

Editor for a list of key-value pairs; add, remove, edit rows.

---

## Import

```tsx
import { KeyValueEditor } from "nfx-ui/components";
import type { KeyValueEditorProps, KeyValuePair } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | KeyValuePair[] | Yes | — | Current list of { key, value }. |
| onChange | (list: KeyValuePair[]) => void | Yes | — | Change callback. |
| keyPlaceholder | string | No | — | Placeholder for key input. |
| valuePlaceholder | string | No | — | Placeholder for value input. |

---

## Input / Output

- **Input:** value (array), onChange, placeholders.
- **Output:** On add/remove/edit, `onChange(newList)` is called.

---

## Example

```tsx
<KeyValueEditor
  value={headers}
  onChange={setHeaders}
  keyPlaceholder="Header name"
  valuePlaceholder="Value"
/>
```

---

---

# KeyValueEditor — 键值对编辑

键值对列表编辑，可增删改多行 key-value。

---

## 引入

```tsx
import { KeyValueEditor } from "nfx-ui/components";
import type { KeyValueEditorProps, KeyValuePair } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | KeyValuePair[] | 是 | — | 当前键值对列表。 |
| onChange | (list: KeyValuePair[]) => void | 是 | — | 列表变化回调。 |
| keyPlaceholder | string | 否 | — | key 输入框占位。 |
| valuePlaceholder | string | 否 | — | value 输入框占位。 |

---

## 输入 / 输出

- **输入：** value（数组）、onChange、placeholders。
- **输出：** 用户增删改后 `onChange(newList)` 被调用。

---

## 示例

```tsx
<KeyValueEditor
  value={headers}
  onChange={setHeaders}
  keyPlaceholder="Header name"
  valuePlaceholder="Value"
/>
```
