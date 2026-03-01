# useLayout / 布局状态

在 `LayoutProvider` 下使用，读取当前布局状态（如侧栏是否可见等）。  
Use inside LayoutProvider to read layout state (e.g. sidebar visible).

---

## 引入 / Import

```tsx
import { useLayout } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

无参数。No parameters.

---

## 输入 Input / 输出 Output

- **Input**：无（需在 LayoutProvider 内调用）。None (must be used inside LayoutProvider).
- **Output**：布局状态对象（如 sidebarVisible、布局模式等），具体见类型。Layout state object; see type for fields.

---

## 示例 / Example

```tsx
const layout = useLayout();
if (layout.sidebarVisible) { /* 显示侧栏布局 */ }
```
