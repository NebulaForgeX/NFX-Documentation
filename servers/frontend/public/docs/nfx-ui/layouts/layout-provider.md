# LayoutProvider

Provides layout context (sidebar visibility, layout mode, etc.); children use `useLayout`, `useSet`, `useAction`.

---

## Import

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children (layout UI). |

---

## Input / Output

- **Input:** children — layout UI with Sidebar, MainWrapper, Header, Footer, etc.
- **Output:** Provides context; children read state via useLayout(), update via useSet()/useAction().

---

## Example

```tsx
<LayoutProvider>
  <SideShowLayout>
    <Sidebar>...</Sidebar>
    <MainWrapper>
      <Header />
      <main>...</main>
      <Footer />
    </MainWrapper>
  </SideShowLayout>
</LayoutProvider>
```

---

---

# LayoutProvider — 布局上下文

提供布局上下文（侧栏显隐、布局模式等），子组件可通过 `useLayout`、`useSet`、`useAction` 使用。

---

## 引入

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点（整块布局 UI）。 |

---

## 输入 / 输出

- **输入：** children — 包含 Sidebar、MainWrapper、Header、Footer 等的整块 UI。
- **输出：** 提供布局上下文；子组件内 `useLayout()` 读状态，`useSet()` / `useAction()` 更新。

---

## 示例

```tsx
<LayoutProvider>
  <SideShowLayout>
    <Sidebar>...</Sidebar>
    <MainWrapper>
      <Header />
      <main>...</main>
      <Footer />
    </MainWrapper>
  </SideShowLayout>
</LayoutProvider>
```
