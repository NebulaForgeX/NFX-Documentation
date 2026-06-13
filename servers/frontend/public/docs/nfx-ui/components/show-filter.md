# ShowFilter

Show/hide filter control: toggle filter on/off, then choose All / Show / Hide; labels passed from caller (e.g. i18n).

---

## Import

```tsx
import { ShowFilter } from "nfx-ui/components";
import type { ShowFilterProps, ShowFilterValue } from "nfx-ui/components";
```

---

## Types

### ShowFilterValue

| Field | Type | Description |
|-------|------|-------------|
| enabled | boolean | Whether filter is enabled. |
| value | boolean \| null | Show/hide: `null` = all, `true` = show, `false` = hide. |

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | ShowFilterValue | Yes | — | Current filter state. |
| onChange | (value: ShowFilterValue) => void | Yes | — | Change callback. |
| filterEnabled | ReactNode | No | `"Filter on"` | Button label when filter is enabled. |
| filterDisabled | ReactNode | No | `"Filter"` | Button label when filter is disabled. |
| enableFilterAriaLabel | string | No | `"Enable filter"` | Aria-label for enable filter button. |
| disableFilterAriaLabel | string | No | `"Disable filter"` | Aria-label for disable filter button. |
| all | ReactNode | No | `"All"` | Label for "all" option. |
| show | ReactNode | No | `"Show"` | Label for "show" option. |
| hide | ReactNode | No | `"Hide"` | Label for "hide" option. |

---

## Input / Output

- **Input:** value, onChange, optional label props.
- **Output:** Renders filter toggle button; when enabled, shows All / Show / Hide option buttons; calls `onChange` on toggle or selection.

---

## Example

```tsx
const [filter, setFilter] = useState<ShowFilterValue>({ enabled: false, value: null });

<ShowFilter value={filter} onChange={setFilter} />

<ShowFilter
  value={filter}
  onChange={setFilter}
  all={t("showFilter.all")}
  show={t("showFilter.show")}
  hide={t("showFilter.hide")}
/>
```

---

---

# ShowFilter — 显示筛选

显示/隐藏筛选控件：开关筛选，再选择全部/显示/隐藏；文案由调用方传入（如 i18n）。

---

## 引入

```tsx
import { ShowFilter } from "nfx-ui/components";
import type { ShowFilterProps, ShowFilterValue } from "nfx-ui/components";
```

---

## 类型

### ShowFilterValue

| 字段 | 类型 | 说明 |
|------|------|------|
| enabled | boolean | 筛选是否启用。 |
| value | boolean \| null | 显示/隐藏：`null` = 全部，`true` = 显示，`false` = 隐藏。 |

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | ShowFilterValue | 是 | — | 当前筛选状态。 |
| onChange | (value: ShowFilterValue) => void | 是 | — | 状态变化回调。 |
| filterEnabled | ReactNode | 否 | `"Filter on"` | 筛选开启时的按钮文案。 |
| filterDisabled | ReactNode | 否 | `"Filter"` | 筛选关闭时的按钮文案。 |
| enableFilterAriaLabel | string | 否 | `"Enable filter"` | 开启筛选按钮 aria-label。 |
| disableFilterAriaLabel | string | 否 | `"Disable filter"` | 关闭筛选按钮 aria-label。 |
| all | ReactNode | 否 | `"All"` | 「全部」选项文案。 |
| show | ReactNode | 否 | `"Show"` | 「显示」选项文案。 |
| hide | ReactNode | 否 | `"Hide"` | 「隐藏」选项文案。 |

---

## 输入 / 输出

- **输入：** value、onChange 及可选文案 props。
- **输出：** 渲染筛选开关按钮；启用后显示全部/显示/隐藏选项；切换或选择时调用 `onChange`。

---

## 示例

```tsx
const [filter, setFilter] = useState<ShowFilterValue>({ enabled: false, value: null });

<ShowFilter value={filter} onChange={setFilter} />

<ShowFilter
  value={filter}
  onChange={setFilter}
  all={t("showFilter.all")}
  show={t("showFilter.show")}
  hide={t("showFilter.hide")}
/>
```
