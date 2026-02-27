# ShowFilter / 显示筛选

用于“显示/筛选”的控件，如表格列显示切换、筛选条件展示与编辑。  
Control for visibility/filter (e.g. table column toggle, filter display and edit).

---

## 引入 / Import

```tsx
import { ShowFilter } from "nfx-ui";
import type { ShowFilterProps, ShowFilterValue } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| value | ShowFilterValue | No | — | 当前筛选/显示配置。Current filter/visibility config. |
| onChange | (value) => void | No | — | 配置变化回调。Change callback. |
| options | 见类型 | No | — | 可选项或列定义。Options or column definitions. |

---

## 输入 Input / 输出 Output

- **Input**：value、onChange、options。value, onChange, options.
- **Output**：用户修改筛选/显示后 `onChange(newValue)` 被调用。On change, `onChange(newValue)` is called.

---

## 示例 / Example

```tsx
<ShowFilter
  value={filterValue}
  onChange={setFilterValue}
  options={columnOptions}
/>
```

具体字段以 `ShowFilterProps` 与业务约定为准。 See `ShowFilterProps` and project contract for exact fields.
