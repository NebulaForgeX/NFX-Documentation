# SideShowLayout

Layout when sidebar is visible; sidebar and main content side by side.

---

## Import

```tsx
import { SideShowLayout } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Usually Sidebar + MainWrapper. |

---

## Input / Output

- **Input:** children.
- **Output:** Renders layout with sidebar visible.

---

## Example

```tsx
<SideShowLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```

---

---

# SideShowLayout — 侧栏展示布局

侧栏展示时的布局容器，侧栏与主内容并排。

---

## 引入

```tsx
import { SideShowLayout } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 通常为 Sidebar + MainWrapper。 |

---

## 输入 / 输出

- **输入：** children。
- **输出：** 渲染侧栏展示时的布局。

---

## 示例

```tsx
<SideShowLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```
