# SideHideLayout

Layout when sidebar is hidden (overlay mode): sidebar toggles as overlay; main content spans full width below Header/Footer.

---

## Import

```tsx
import { SideHideLayout } from "nfx-ui/layouts";
import type { SideHideLayoutProps } from "nfx-ui/layouts";
```

---

## Parameters (`SideHideLayoutProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Main page content. |
| headerHeight | number | Yes | — | Measured header height from `MainWrapper`. |
| footerHeight | number | Yes | — | Measured footer height from `MainWrapper`. |
| sidebarItems | SidebarMenuItem[] | No | — | Sidebar menu items. |
| sidebarCurrentPathname | string | No | — | Current pathname for active highlight. |
| onSidebarNavigate | `(path: string) => void` | No | — | Sidebar navigation handler. |
| sidebarLogoutLabel | string | No | — | Logout button label. |
| onSidebarLogout | `() => void` | No | — | Logout handler. |
| bottomLogoutButton | ReactNode | No | — | Custom bottom logout button. |

---

## Input / Output

- **Input:** `SideHideLayoutProps` — dimensions and optional sidebar config.
- **Output:** Overlay sidebar (`toggled={sidebarOpen}` from `useLayout`); main area offset by header/footer heights.

Requires `LayoutProvider`. Selected when `layoutMode === LayoutModeEnum.HIDE`.

---

## Example

```tsx
const { layoutMode } = useLayout();

{layoutMode === LayoutModeEnum.HIDE && (
  <SideHideLayout
    headerHeight={headerHeight}
    footerHeight={footerHeight}
    sidebarItems={items}
    sidebarCurrentPathname={pathname}
    onSidebarNavigate={navigate}
  >
    <Dashboard />
  </SideHideLayout>
)}
```

Typically used via `LayoutFrame` rather than directly.

---

---

# SideHideLayout — 侧栏隐藏布局

侧栏隐藏（遮罩覆盖）模式：侧栏以 overlay 形式展开；主内容在 Header/Footer 之间占满宽度。

---

## 引入

```tsx
import { SideHideLayout } from "nfx-ui/layouts";
import type { SideHideLayoutProps } from "nfx-ui/layouts";
```

---

## 参数（`SideHideLayoutProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 主页面内容。 |
| headerHeight | number | 是 | — | 来自 `MainWrapper` 的顶栏高度。 |
| footerHeight | number | 是 | — | 来自 `MainWrapper` 的底栏高度。 |
| sidebarItems | SidebarMenuItem[] | 否 | — | 侧栏菜单项。 |
| sidebarCurrentPathname | string | 否 | — | 当前路径，用于高亮。 |
| onSidebarNavigate | `(path: string) => void` | 否 | — | 侧栏导航回调。 |
| sidebarLogoutLabel | string | 否 | — | 登出按钮文案。 |
| onSidebarLogout | `() => void` | 否 | — | 登出回调。 |
| bottomLogoutButton | ReactNode | 否 | — | 自定义底部登出按钮。 |

---

## 输入 / 输出

- **输入：** `SideHideLayoutProps` — 尺寸与可选侧栏配置。
- **输出：** 遮罩式侧栏（`toggled={sidebarOpen}`，来自 `useLayout`）；主区域按顶栏/底栏高度偏移。

需在 `LayoutProvider` 内使用。当 `layoutMode === LayoutModeEnum.HIDE` 时选用。

---

## 示例

```tsx
const { layoutMode } = useLayout();

{layoutMode === LayoutModeEnum.HIDE && (
  <SideHideLayout
    headerHeight={headerHeight}
    footerHeight={footerHeight}
    sidebarItems={items}
    sidebarCurrentPathname={pathname}
    onSidebarNavigate={navigate}
  >
    <Dashboard />
  </SideHideLayout>
)}
```

通常通过 `LayoutFrame` 使用，而非直接拼装。
