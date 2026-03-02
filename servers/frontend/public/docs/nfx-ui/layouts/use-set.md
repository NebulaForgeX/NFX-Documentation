# useSet

Use inside LayoutProvider to get setter for layout state.

---

## Import

```tsx
import { useSet } from "nfx-ui/layouts";
```

---

## Parameters

No parameters.

---

## Input / Output

- **Input:** None.
- **Output:** Object with methods to update layout state; see type.

---

## Example

```tsx
const setLayout = useSet();
setLayout({ sidebarVisible: false });
```

---

---

# useSet — 布局更新

在 `LayoutProvider` 下使用，获取用于更新布局状态的 set 方法。

---

## 引入

```tsx
import { useSet } from "nfx-ui/layouts";
```

---

## 参数

无参数。

---

## 输入 / 输出

- **输入：** 无。
- **输出：** 包含更新布局状态的方法（如 setLayout({ sidebarVisible })），具体见类型。

---

## 示例

```tsx
const setLayout = useSet();
setLayout({ sidebarVisible: false });
```
