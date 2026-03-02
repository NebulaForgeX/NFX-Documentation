# ShowFilter

Control for visibility/filter (e.g. table column toggle, filter display and edit).

---

## Import

```tsx
import { ShowFilter } from "nfx-ui/components";
import type { ShowFilterProps, ShowFilterValue } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | ShowFilterValue | No | — | Current filter/visibility config. |
| onChange | (value) => void | No | — | Change callback. |
| options | see type | No | — | Options or column definitions. |

---

## Input / Output

- **Input:** value, onChange, options.
- **Output:** On change, `onChange(newValue)` is called.

---

## Example

```tsx
<ShowFilter
  value={filterValue}
  onChange={setFilterValue}
  options={columnOptions}
/>
```

See `ShowFilterProps` and project contract for exact fields.

---

---

# ShowFilter — 显示筛选

用于“显示/筛选”的控件，如表格列显示切换、筛选条件展示与编辑。

---

## 引入

```tsx
import { ShowFilter } from "nfx-ui/components";
import type { ShowFilterProps, ShowFilterValue } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | ShowFilterValue | 否 | — | 当前筛选/显示配置。 |
| onChange | (value) => void | 否 | — | 配置变化回调。 |
| options | 见类型 | 否 | — | 可选项或列定义。 |

---

## 输入 / 输出

- **输入：** value、onChange、options。
- **输出：** 用户修改筛选/显示后 `onChange(newValue)` 被调用。

---

## 示例

```tsx
<ShowFilter
  value={filterValue}
  onChange={setFilterValue}
  options={columnOptions}
/>
```

具体字段以 `ShowFilterProps` 与业务约定为准。
