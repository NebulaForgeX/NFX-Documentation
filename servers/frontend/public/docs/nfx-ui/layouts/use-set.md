# useSet / 布局更新

在 `LayoutProvider` 下使用，获取用于更新布局状态的 set 方法。  
Use inside LayoutProvider to get setter for layout state.

---

## 引入 / Import

```tsx
import { useSet } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

无参数。No parameters.

---

## 输入 Input / 输出 Output

- **Input**：无。None.
- **Output**：包含更新布局状态的方法（如 setLayout({ sidebarVisible })），具体见类型。Object with methods to update layout state; see type.

---

## 示例 / Example

```tsx
const setLayout = useSet();
setLayout({ sidebarVisible: false });
```
