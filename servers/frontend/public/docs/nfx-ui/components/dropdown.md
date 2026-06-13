# Dropdown

Controlled dropdown select with `{ value, label }` options.

---

## Import

```tsx
import { Dropdown } from "nfx-ui/components";
import type { DropdownOption, DropdownProps } from "nfx-ui/components";
```

---

## Types

### DropdownOption

| Field | Type | Description |
|-------|------|-------------|
| value | string | Option value. |
| label | string | Option display label. |

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| options | DropdownOption[] | Yes | — | Options list. |
| value | string | Yes | — | Current selected value. |
| onChange | (value: string) => void | Yes | — | Change callback. |
| placeholder | string | No | `"Select an option"` | Placeholder when none selected. |
| disabled | boolean | No | false | Disabled. |
| error | boolean | No | false | Error state styling. |
| className | string | No | — | Container className. |

---

## Input / Output

- **Input:** options, value, onChange, placeholder, disabled, error, className.
- **Output:** Renders dropdown button and menu; on select calls `onChange(selectedValue)` and closes menu.

---

## Example

```tsx
const [selected, setSelected] = useState("");

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select"
  error={!!errors.category}
/>
```

---

---

# Dropdown — 下拉选择

受控下拉选择组件，`options` 为 `{ value, label }` 列表。

---

## 引入

```tsx
import { Dropdown } from "nfx-ui/components";
import type { DropdownOption, DropdownProps } from "nfx-ui/components";
```

---

## 类型

### DropdownOption

| 字段 | 类型 | 说明 |
|------|------|------|
| value | string | 选项值。 |
| label | string | 选项展示文案。 |

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| options | DropdownOption[] | 是 | — | 选项列表。 |
| value | string | 是 | — | 当前选中值。 |
| onChange | (value: string) => void | 是 | — | 选择变化回调。 |
| placeholder | string | 否 | `"Select an option"` | 未选时的占位文案。 |
| disabled | boolean | 否 | false | 是否禁用。 |
| error | boolean | 否 | false | 错误态样式。 |
| className | string | 否 | — | 容器 className。 |

---

## 输入 / 输出

- **输入：** options、value、onChange、placeholder、disabled、error、className。
- **输出：** 渲染下拉按钮与菜单；选择后调用 `onChange(selectedValue)` 并关闭菜单。

---

## 示例

```tsx
const [selected, setSelected] = useState("");

const options = [
  { value: "a", label: "选项 A" },
  { value: "b", label: "选项 B" },
];

<Dropdown
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="请选择"
  error={!!errors.category}
/>
```
