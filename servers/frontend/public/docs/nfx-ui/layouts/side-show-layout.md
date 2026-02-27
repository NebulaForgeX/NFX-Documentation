# SideShowLayout / 侧栏展示布局

侧栏展示时的布局容器，侧栏与主内容并排。  
Layout when sidebar is visible; sidebar and main content side by side.

---

## 引入 / Import

```tsx
import { SideShowLayout } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 通常为 Sidebar + MainWrapper。Usually Sidebar + MainWrapper. |

---

## 输入 Input / 输出 Output

- **Input**：children。Children.
- **Output**：渲染侧栏展示时的布局。Renders layout with sidebar visible.

---

## 示例 / Example

```tsx
<SideShowLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideShowLayout>
```
