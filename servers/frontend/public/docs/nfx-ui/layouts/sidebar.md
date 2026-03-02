# Sidebar

Sidebar container; often used with react-pro-sidebar or custom menu.

---

## Import

```tsx
import { Sidebar } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | No | — | Menu content etc. |

---

## Input / Output

- **Input:** children (nav, menu, etc.).
- **Output:** Renders sidebar; visibility from layout context.

---

## Example

```tsx
<SideShowLayout>
  <Sidebar>
    <Menu>...</Menu>
  </Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```

---

---

# Sidebar — 侧边栏

侧边栏容器，常与 `react-pro-sidebar` 或自定义菜单配合。

---

## 引入

```tsx
import { Sidebar } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 否 | — | 菜单等内容。 |

---

## 输入 / 输出

- **输入：** children（导航、菜单等）。
- **输出：** 渲染侧栏；显隐由布局上下文控制。

---

## 示例

```tsx
<SideShowLayout>
  <Sidebar>
    <Menu>...</Menu>
  </Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```
