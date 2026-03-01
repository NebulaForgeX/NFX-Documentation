# SideHideLayout / 侧栏隐藏布局

侧栏隐藏时的布局容器，主内容占满可用宽度。  
Layout when sidebar is hidden; main content takes full width.

---

## 引入 / Import

```tsx
import { SideHideLayout } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 通常为 Sidebar + MainWrapper。Usually Sidebar + MainWrapper. |

---

## 输入 Input / 输出 Output

- **Input**：children。Children.
- **Output**：渲染侧栏隐藏时的布局（主内容全宽）。Renders layout with sidebar hidden.

---

## 示例 / Example

```tsx
<SideHideLayout>
  <Sidebar>...</Sidebar>
  <MainWrapper>...</MainWrapper>
</SideHideLayout>
```

与 SideShowLayout 二选一，由布局状态决定。 Use with SideShowLayout based on layout state.
