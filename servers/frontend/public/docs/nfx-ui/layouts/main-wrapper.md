# MainWrapper

Page shell: fixed Header and Footer with measured heights; passes `headerHeight` and `footerHeight` to children via render prop.

---

## Import

```tsx
import { MainWrapper } from "nfx-ui/layouts";
import type { MainWrapperProps } from "nfx-ui/layouts";
```

---

## Parameters (`MainWrapperProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | `(headerHeight: number, footerHeight: number) => ReactNode` | Yes | — | Render prop receiving measured header/footer heights. |
| headerLeft | ReactNode | No | — | Passed to `Header` as `leftContent`. |
| headerRight | ReactNode | No | — | Passed to `Header` as `rightContent`. |
| footerContent | ReactNode | No | — | Passed to `Footer` as children. |

---

## Input / Output

- **Input:** header/footer slots and a render-prop `children`.
- **Output:** Renders Header + Footer; `children(headerHeight, footerHeight)` renders the middle area (e.g. `SideShowLayout` / `SideHideLayout`).

---

## Example

```tsx
<MainWrapper
  headerLeft={<Logo />}
  headerRight={<LayoutSwitcher />}
  footerContent={<span>© 2026</span>}
>
  {(headerHeight, footerHeight) => (
    <SideShowLayout headerHeight={headerHeight} footerHeight={footerHeight}>
      <PageContent />
    </SideShowLayout>
  )}
</MainWrapper>
```

---

---

# MainWrapper — 主内容区包裹

页面外壳：固定 Header 与 Footer，并通过 ResizeObserver 测量高度；以 render prop 将 `headerHeight`、`footerHeight` 传给子内容。

---

## 引入

```tsx
import { MainWrapper } from "nfx-ui/layouts";
import type { MainWrapperProps } from "nfx-ui/layouts";
```

---

## 参数（`MainWrapperProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | `(headerHeight: number, footerHeight: number) => ReactNode` | 是 | — | 接收测量后的顶栏/底栏高度的 render prop。 |
| headerLeft | ReactNode | 否 | — | 传给 `Header` 的 `leftContent`。 |
| headerRight | ReactNode | 否 | — | 传给 `Header` 的 `rightContent`。 |
| footerContent | ReactNode | 否 | — | 传给 `Footer` 的 children。 |

---

## 输入 / 输出

- **输入：** 顶栏/底栏插槽与 render prop 形式的 `children`。
- **输出：** 渲染 Header + Footer；`children(headerHeight, footerHeight)` 渲染中间区域（如 `SideShowLayout` / `SideHideLayout`）。

---

## 示例

```tsx
<MainWrapper
  headerLeft={<Logo />}
  headerRight={<LayoutSwitcher />}
  footerContent={<span>© 2026</span>}
>
  {(headerHeight, footerHeight) => (
    <SideShowLayout headerHeight={headerHeight} footerHeight={footerHeight}>
      <PageContent />
    </SideShowLayout>
  )}
</MainWrapper>
```
