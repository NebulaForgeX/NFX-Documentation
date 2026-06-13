# SearchInput

Search input with search icon and clear button; labels passed from caller (e.g. i18n).

---

## Import

```tsx
import { SearchInput } from "nfx-ui/components";
import type { SearchInputProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | string | Yes | — | Current input value. |
| onChange | (value: string) => void | Yes | — | Change callback (receives string, not event). |
| placeholder | string | No | — | Placeholder; pass from caller. |
| clearButtonAriaLabel | string | No | `"Clear search"` | Clear button aria-label; pass from caller (e.g. i18n). |
| fullWidth | boolean | No | false | When true, fills parent width and removes 400px max-width (e.g. inside modals). |

---

## Input / Output

- **Input:** value, onChange, placeholder, clearButtonAriaLabel, fullWidth.
- **Output:** Renders search icon, text input, and clear button (shown when value is non-empty).

---

## Example

```tsx
const { t } = useTranslation("components");

<SearchInput
  value={keyword}
  onChange={setKeyword}
  placeholder={t("searchInput.placeholder")}
  clearButtonAriaLabel={t("searchInput.clearSearch")}
/>

<SearchInput value={keyword} onChange={setKeyword} fullWidth />
```

---

---

# SearchInput — 搜索输入框

带搜索图标与清除按钮的搜索输入框；文案由调用方传入（如 i18n）。

---

## 引入

```tsx
import { SearchInput } from "nfx-ui/components";
import type { SearchInputProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | string | 是 | — | 当前输入值。 |
| onChange | (value: string) => void | 是 | — | 值变化回调（接收字符串，非 event）。 |
| placeholder | string | 否 | — | 占位符；由调用方传入。 |
| clearButtonAriaLabel | string | 否 | `"Clear search"` | 清除按钮 aria-label；由调用方传入（如 i18n）。 |
| fullWidth | boolean | 否 | false | 为 true 时占满父级宽度并去掉 400px 上限（如模态内）。 |

---

## 输入 / 输出

- **输入：** value、onChange、placeholder、clearButtonAriaLabel、fullWidth。
- **输出：** 渲染搜索图标、文本输入框与清除按钮（value 非空时显示）。

---

## 示例

```tsx
const { t } = useTranslation("components");

<SearchInput
  value={keyword}
  onChange={setKeyword}
  placeholder={t("searchInput.placeholder")}
  clearButtonAriaLabel={t("searchInput.clearSearch")}
/>

<SearchInput value={keyword} onChange={setKeyword} fullWidth />
```
