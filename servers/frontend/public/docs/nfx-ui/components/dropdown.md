# Dropdown / 下拉选择

下拉选择组件，支持选项列表、占位符、受控/非受控等。  
Dropdown select with options list, placeholder, controlled/uncontrolled.

---

## 引入 / Import

```tsx
import { Dropdown } from "nfx-ui";
import type { DropdownOption, DropdownProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| options | DropdownOption[] | Yes | — | 选项列表（含 value/label 等）。Options (value/label). |
| value | 与 option.value 同类型 | No | — | 当前选中值（受控）。Current value (controlled). |
| onChange | (value) => void | No | — | 选择变化回调。Change callback. |
| placeholder | string | No | — | 未选时的占位文案。Placeholder when none selected. |
| disabled | boolean | No | false | 是否禁用。Disabled. |

---

## 输入 Input / 输出 Output

- **Input**：options、value、onChange、placeholder 等。options, value, onChange, placeholder, etc.
- **Output**：用户选择后 `onChange(selectedValue)` 被调用；受控时 `value` 更新。On select, `onChange(selectedValue)` is called; in controlled mode `value` updates.

---

## 示例 / Example

```tsx
const options = [
  { value: "a", label: "选项 A / Option A" },
  { value: "b", label: "选项 B / Option B" },
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="请选择 / Select"
/>
```
