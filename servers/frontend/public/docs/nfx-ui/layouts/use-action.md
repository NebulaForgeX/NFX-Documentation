# useAction

Use inside LayoutProvider to get layout actions (e.g. toggle sidebar).

---

## Import

```tsx
import { useAction } from "nfx-ui/layouts";
```

---

## Parameters

No parameters.

---

## Input / Output

- **Input:** None.
- **Output:** Object with layout actions; see type.

---

## Example

```tsx
const { toggleSidebar } = useAction();
<button onClick={toggleSidebar}>Toggle sidebar</button>
```

---

---

# useAction — 布局操作

在 `LayoutProvider` 下使用，提供布局相关操作（如切换侧栏、切换布局模式等）。

---

## 引入

```tsx
import { useAction } from "nfx-ui/layouts";
```

---

## 参数

无参数。

---

## 输入 / 输出

- **输入：** 无。
- **输出：** 包含布局 action 的对象（如 toggleSidebar），具体见类型。

---

## 示例

```tsx
const { toggleSidebar } = useAction();
<button onClick={toggleSidebar}>切换侧栏</button>
```
