# MainWrapper / 主内容区

主内容区包裹容器，与 Sidebar 并列，内放 Header、主内容、Footer。  
Main content wrapper; sits next to Sidebar; holds Header, main, Footer.

---

## 引入 / Import

```tsx
import { MainWrapper } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 主内容（Header、main、Footer 等）。Main content. |

---

## 输入 Input / 输出 Output

- **Input**：children。Children.
- **Output**：渲染主内容区容器。Renders main content container.

---

## 示例 / Example

```tsx
<MainWrapper>
  <Header />
  <main>...</main>
  <Footer />
</MainWrapper>
```
