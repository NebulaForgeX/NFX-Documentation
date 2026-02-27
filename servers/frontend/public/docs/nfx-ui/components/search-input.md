# SearchInput / 搜索输入框

带搜索图标的输入框，常用于搜索栏。  
Input with search icon for search bars.

---

## 引入 / Import

```tsx
import { SearchInput } from "nfx-ui";
import type { SearchInputProps } from "nfx-ui";
```

---

## 参数 / Parameters

与 Input 类似，通常包含：Similar to Input, typically includes:

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| value | string | No | — | 当前值。Current value. |
| onChange | (e) => void | No | — | 输入变化。Change handler. |
| placeholder | string | No | — | 占位符。Placeholder. |
| onSearch | (value?) => void | No | — | 搜索触发（如回车或按钮）。Search trigger (e.g. enter or button). |

---

## 输入 Input / 输出 Output

- **Input**：value、onChange、onSearch、placeholder 等。value, onChange, onSearch, placeholder, etc.
- **Output**：渲染带搜索图标的输入框；onSearch 在搜索动作时触发。Renders input with search icon; onSearch fires on search action.

---

## 示例 / Example

```tsx
<SearchInput
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  placeholder="搜索... / Search..."
  onSearch={handleSearch}
/>
```
