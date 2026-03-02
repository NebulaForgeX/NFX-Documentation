# useLayout

Use inside LayoutProvider to read layout state (e.g. sidebar visible).

---

## Import

```tsx
import { useLayout } from "nfx-ui/layouts";
```

---

## Parameters

No parameters.

---

## Input / Output

- **Input:** None (must be used inside LayoutProvider).
- **Output:** Layout state object; see type for fields.

---

## Example

```tsx
const layout = useLayout();
if (layout.sidebarVisible) { /* show sidebar layout */ }
```

---

---

# useLayout — 布局状态

在 `LayoutProvider` 下使用，读取当前布局状态（如侧栏是否可见等）。

---

## 引入

```tsx
import { useLayout } from "nfx-ui/layouts";
```

---

## 参数

无参数。

---

## 输入 / 输出

- **输入：** 无（需在 LayoutProvider 内调用）。
- **输出：** 布局状态对象（如 sidebarVisible、布局模式等），具体见类型。

---

## 示例

```tsx
const layout = useLayout();
if (layout.sidebarVisible) { /* 显示侧栏布局 */ }
```
