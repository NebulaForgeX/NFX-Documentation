# Header / 顶栏

顶栏组件，用于 Logo、LayoutSwitcher、导航、用户区等。  
Header for Logo, LayoutSwitcher, nav, user area, etc.

---

## 引入 / Import

```tsx
import { Header } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | No | — | 顶栏内容。Header content. |

---

## 输入 Input / 输出 Output

- **Input**：children。Children.
- **Output**：渲染顶栏。Renders header.

---

## 示例 / Example

```tsx
<Header>
  <LayoutSwitcher />
  <nav>...</nav>
  <UserMenu />
</Header>
```
