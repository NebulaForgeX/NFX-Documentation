# SideHideLayout

Layout when sidebar is hidden; main content takes full width.

---

## Import

```tsx
import { SideHideLayout } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Usually Sidebar + MainWrapper. |

---

## Input / Output

- **Input:** children.
- **Output:** Renders layout with sidebar hidden.

---

## Example

```tsx
<SideHideLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideHideLayout>
```

Use with SideShowLayout based on layout state.

---

---

# SideHideLayout — 侧栏隐藏布局

侧栏隐藏时的布局容器，主内容占满可用宽度。

---

## 引入

```tsx
import { SideHideLayout } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 通常为 Sidebar + MainWrapper。 |

---

## 输入 / 输出

- **输入：** children。
- **输出：** 渲染侧栏隐藏时的布局（主内容全宽）。

---

## 示例

```tsx
<SideHideLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideHideLayout>
```

与 SideShowLayout 二选一，由布局状态决定。
