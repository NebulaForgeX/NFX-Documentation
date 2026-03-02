# Dropdown

Dropdown select with options list, placeholder, controlled/uncontrolled.

---

## Import

```tsx
import { Dropdown } from "nfx-ui/components";
import type { DropdownOption, DropdownProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| options | DropdownOption[] | Yes | — | Options (value/label). |
| value | same as option.value | No | — | Current value (controlled). |
| onChange | (value) => void | No | — | Change callback. |
| placeholder | string | No | — | Placeholder when none selected. |
| disabled | boolean | No | false | Disabled. |

---

## Input / Output

- **Input:** options, value, onChange, placeholder, etc.
- **Output:** On select, `onChange(selectedValue)` is called; in controlled mode `value` updates.

---

## Example

```tsx
const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select"
/>
```

---

---

# Dropdown — 下拉选择

下拉选择组件，支持选项列表、占位符、受控/非受控等。

---

## 引入

```tsx
import { Dropdown } from "nfx-ui/components";
import type { DropdownOption, DropdownProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| options | DropdownOption[] | 是 | — | 选项列表（含 value/label 等）。 |
| value | 与 option.value 同类型 | 否 | — | 当前选中值（受控）。 |
| onChange | (value) => void | 否 | — | 选择变化回调。 |
| placeholder | string | 否 | — | 未选时的占位文案。 |
| disabled | boolean | 否 | false | 是否禁用。 |

---

## 输入 / 输出

- **输入：** options、value、onChange、placeholder 等。
- **输出：** 用户选择后 `onChange(selectedValue)` 被调用；受控时 `value` 更新。

---

## 示例

```tsx
const options = [
  { value: "a", label: "选项 A" },
  { value: "b", label: "选项 B" },
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="请选择"
/>
```
