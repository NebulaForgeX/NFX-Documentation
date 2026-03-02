# SearchInput

Input with search icon for search bars.

---

## Import

```tsx
import { SearchInput } from "nfx-ui/components";
import type { SearchInputProps } from "nfx-ui/components";
```

---

## Parameters

Similar to Input, typically includes:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | string | No | — | Current value. |
| onChange | (e) => void | No | — | Change handler. |
| placeholder | string | No | — | Placeholder. |
| onSearch | (value?) => void | No | — | Search trigger (e.g. enter or button). |

---

## Input / Output

- **Input:** value, onChange, onSearch, placeholder, etc.
- **Output:** Renders input with search icon; onSearch fires on search action.

---

## Example

```tsx
<SearchInput
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  placeholder="Search..."
  onSearch={handleSearch}
/>
```

---

---

# SearchInput — 搜索输入框

带搜索图标的输入框，常用于搜索栏。

---

## 引入

```tsx
import { SearchInput } from "nfx-ui/components";
import type { SearchInputProps } from "nfx-ui/components";
```

---

## 参数

与 Input 类似，通常包含：

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | string | 否 | — | 当前值。 |
| onChange | (e) => void | 否 | — | 输入变化。 |
| placeholder | string | 否 | — | 占位符。 |
| onSearch | (value?) => void | 否 | — | 搜索触发（如回车或按钮）。 |

---

## 输入 / 输出

- **输入：** value、onChange、onSearch、placeholder 等。
- **输出：** 渲染带搜索图标的输入框；onSearch 在搜索动作时触发。

---

## 示例

```tsx
<SearchInput
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  placeholder="搜索..."
  onSearch={handleSearch}
/>
```
