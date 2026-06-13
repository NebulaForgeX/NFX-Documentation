# Header

Generic header: two-column layout only; all content passed via `leftContent` and `rightContent` props. No data fetching inside.

---

## Import

```tsx
import { Header } from "nfx-ui/layouts";
import type { HeaderProps } from "nfx-ui/layouts";
```

---

## Parameters (`HeaderProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| leftContent | ReactNode | No | — | Left slot (e.g. Logo, LayoutSwitcher). |
| rightContent | ReactNode | No | — | Right slot (e.g. language switcher, user menu). |

---

## Input / Output

- **Input:** `HeaderProps` — left and right slots.
- **Output:** Renders a two-column header bar.

Used internally by `MainWrapper`; pass `headerLeft` / `headerRight` on `MainWrapper` or `LayoutFrame` instead of using `Header` directly in most cases.

---

## Example

```tsx
<Header
  leftContent={<Logo />}
  rightContent={
    <>
      <LayoutSwitcher />
      <LanguageSwitcherRecipe />
    </>
  }
/>
```

---

---

# Header — 顶栏

通用顶栏：仅负责左右两栏布局；内容全部由 `leftContent` 与 `rightContent` 传入，内部不获取数据。

---

## 引入

```tsx
import { Header } from "nfx-ui/layouts";
import type { HeaderProps } from "nfx-ui/layouts";
```

---

## 参数（`HeaderProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| leftContent | ReactNode | 否 | — | 左侧插槽（如 Logo、LayoutSwitcher）。 |
| rightContent | ReactNode | 否 | — | 右侧插槽（如语言切换、用户菜单）。 |

---

## 输入 / 输出

- **输入：** `HeaderProps` — 左右插槽内容。
- **输出：** 渲染左右两栏顶栏。

由 `MainWrapper` 内部使用；多数场景通过 `MainWrapper` 或 `LayoutFrame` 的 `headerLeft` / `headerRight` 传入，而非直接使用 `Header`。

---

## 示例

```tsx
<Header
  leftContent={<Logo />}
  rightContent={
    <>
      <LayoutSwitcher />
      <LanguageSwitcherRecipe />
    </>
  }
/>
```
