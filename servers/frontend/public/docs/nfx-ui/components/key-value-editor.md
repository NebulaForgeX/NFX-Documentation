# KeyValueEditor

Dynamic key-value pair editor; add/remove rows; supports string or comma-separated array values.

---

## Import

```tsx
import { KeyValueEditor } from "nfx-ui/components";
import type { KeyValueEditorProps, KeyValuePair } from "nfx-ui/components";
```

---

## Types

### KeyValuePair

| Field | Type | Description |
|-------|------|-------------|
| key | string | Key. |
| value | string \| string[] | Value (string or string array). |

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | ReactNode | Yes | — | Field label. |
| pairs | KeyValuePair[] | Yes | — | Key-value pair list. |
| onChange | (pairs: KeyValuePair[]) => void | Yes | — | Change callback. |
| valueType | `"string"` \| `"array"` | No | `"string"` | Value type: string or array (comma-separated input). |
| keyPlaceholder | string | No | `"Key"` | Key input placeholder. |
| valuePlaceholder | string | No | `"Value"` | Value placeholder (string mode). |
| valueArrayPlaceholder | string | No | `"Value (comma-separated)"` | Value placeholder (array mode). |
| removeAriaLabel | string | No | `"Remove row"` | Remove button aria-label. |
| addLabel | ReactNode | No | `"Add"` | Add button label. |
| error | ReactNode | No | — | Error message. |

---

## Input / Output

- **Input:** label, pairs, onChange, valueType, placeholders, addLabel, error.
- **Output:** Renders rows of key/value inputs with remove buttons and an add button; on add/remove/edit calls `onChange(newPairs)`.

---

## Example

```tsx
const [pairs, setPairs] = useState<KeyValuePair[]>([{ key: "env", value: "prod" }]);

<KeyValueEditor label="Environment variables" pairs={pairs} onChange={setPairs} />

<KeyValueEditor
  label="Tags"
  pairs={pairs}
  onChange={setPairs}
  valueType="array"
  addLabel="Add tag"
/>
```

---

---

# KeyValueEditor — 键值对编辑

动态键值对编辑器，可增删行；支持 string 或逗号分隔的 array 值类型。

---

## 引入

```tsx
import { KeyValueEditor } from "nfx-ui/components";
import type { KeyValueEditorProps, KeyValuePair } from "nfx-ui/components";
```

---

## 类型

### KeyValuePair

| 字段 | 类型 | 说明 |
|------|------|------|
| key | string | 键。 |
| value | string \| string[] | 值（字符串或字符串数组）。 |

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| label | ReactNode | 是 | — | 表单项标签。 |
| pairs | KeyValuePair[] | 是 | — | 键值对列表。 |
| onChange | (pairs: KeyValuePair[]) => void | 是 | — | 列表变化回调。 |
| valueType | `"string"` \| `"array"` | 否 | `"string"` | 值类型：string 或 array（逗号分隔输入）。 |
| keyPlaceholder | string | 否 | `"Key"` | 键占位符。 |
| valuePlaceholder | string | 否 | `"Value"` | 值占位符（string 模式）。 |
| valueArrayPlaceholder | string | 否 | `"Value (comma-separated)"` | 值占位符（array 模式）。 |
| removeAriaLabel | string | 否 | `"Remove row"` | 删除按钮 aria-label。 |
| addLabel | ReactNode | 否 | `"Add"` | 新增按钮文案。 |
| error | ReactNode | 否 | — | 错误信息。 |

---

## 输入 / 输出

- **输入：** label、pairs、onChange、valueType、placeholders、addLabel、error。
- **输出：** 渲染多行 key/value 输入与删除按钮，以及新增按钮；增删改时调用 `onChange(newPairs)`。

---

## 示例

```tsx
const [pairs, setPairs] = useState<KeyValuePair[]>([{ key: "env", value: "prod" }]);

<KeyValueEditor label="环境变量" pairs={pairs} onChange={setPairs} />

<KeyValueEditor
  label="标签"
  pairs={pairs}
  onChange={setPairs}
  valueType="array"
  addLabel="添加标签"
/>
```
