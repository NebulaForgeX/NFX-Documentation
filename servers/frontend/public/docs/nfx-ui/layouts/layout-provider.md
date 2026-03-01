# LayoutProvider / 布局上下文

提供布局上下文（侧栏显隐、布局模式等），子组件可通过 `useLayout`、`useSet`、`useAction` 使用。  
Provides layout context (sidebar visibility, layout mode, etc.); children use `useLayout`, `useSet`, `useAction`.

---

## 引入 / Import

```tsx
import { LayoutProvider } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 子节点（整块布局 UI）。Children (layout UI). |

---

## 输入 Input / 输出 Output

- **Input**：children — 包含 Sidebar、MainWrapper、Header、Footer 等的整块 UI。  
  children: layout UI with Sidebar, MainWrapper, Header, Footer, etc.
- **Output**：提供布局上下文；子组件内 `useLayout()` 读状态，`useSet()` / `useAction()` 更新。  
  Provides context; children read state via useLayout(), update via useSet()/useAction().

---

## 示例 / Example

```tsx
<LayoutProvider>
  <SideShowLayout>  {/* 或 SideHideLayout / or SideHideLayout */}
    <Sidebar>...</Sidebar>
    <MainWrapper>
      <Header />
      <main>...</main>
      <Footer />
    </MainWrapper>
  </SideShowLayout>
</LayoutProvider>
```
