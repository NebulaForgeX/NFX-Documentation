# MainWrapper

Main content wrapper; sits next to Sidebar; holds Header, main, Footer.

---

## Import

```tsx
import { MainWrapper } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Main content. |

---

## Input / Output

- **Input:** children.
- **Output:** Renders main content container.

---

## Example

```tsx
<MainWrapper>
  <Header />
  <main>...</main>
  <Footer />
</MainWrapper>
```

---

---

# MainWrapper — 主内容区

主内容区包裹容器，与 Sidebar 并列，内放 Header、主内容、Footer。

---

## 引入

```tsx
import { MainWrapper } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 主内容（Header、main、Footer 等）。 |

---

## 输入 / 输出

- **输入：** children。
- **输出：** 渲染主内容区容器。

---

## 示例

```tsx
<MainWrapper>
  <Header />
  <main>...</main>
  <Footer />
</MainWrapper>
```
