# useAction / 布局操作

在 `LayoutProvider` 下使用，提供布局相关操作（如切换侧栏、切换布局模式等）。  
Use inside LayoutProvider to get layout actions (e.g. toggle sidebar).

---

## 引入 / Import

```tsx
import { useAction } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

无参数。No parameters.

---

## 输入 Input / 输出 Output

- **Input**：无。None.
- **Output**：包含布局 action 的对象（如 toggleSidebar），具体见类型。Object with layout actions; see type.

---

## 示例 / Example

```tsx
const { toggleSidebar } = useAction();
<button onClick={toggleSidebar}>切换侧栏 / Toggle sidebar</button>
```
