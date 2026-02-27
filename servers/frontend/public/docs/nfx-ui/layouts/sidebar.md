# Sidebar / 侧边栏

侧边栏容器，常与 `react-pro-sidebar` 或自定义菜单配合。  
Sidebar container; often used with react-pro-sidebar or custom menu.

---

## 引入 / Import

```tsx
import { Sidebar } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | No | — | 菜单等内容。Menu content etc. |

---

## 输入 Input / 输出 Output

- **Input**：children（导航、菜单等）。children (nav, menu, etc.).
- **Output**：渲染侧栏；显隐由布局上下文控制。Renders sidebar; visibility from layout context.

---

## 示例 / Example

```tsx
<SideShowLayout>
  <Sidebar>
    <Menu>...</Menu>
  </Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```
