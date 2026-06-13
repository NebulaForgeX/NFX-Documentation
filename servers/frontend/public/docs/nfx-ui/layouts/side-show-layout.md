# SideShowLayout

Layout when sidebar is visible: persistent sidebar beside main content; main area width adjusts to sidebar width.

---

## Import

```tsx
import { SideShowLayout } from "nfx-ui/layouts";
import type { SideShowLayoutProps } from "nfx-ui/layouts";
```

---

## Parameters (`SideShowLayoutProps`)

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

- **Input:** `SideShowLayoutProps` — dimensions and optional sidebar config.
- **Output:** Persistent sidebar with `marginLeft` based on measured sidebar width; main content offset by header/footer heights.

Requires `LayoutProvider`. Selected when `layoutMode === LayoutModeEnum.SHOW`.

---

## Example

```tsx
const { layoutMode } = useLayout();

{layoutMode === LayoutModeEnum.SHOW && (
  <SideShowLayout
    headerHeight={headerHeight}
    footerHeight={footerHeight}
    sidebarItems={items}
    sidebarCurrentPathname={pathname}
    onSidebarNavigate={navigate}
  >
    <Dashboard />
  </SideShowLayout>
)}
```

Typically used via `LayoutFrame` rather than directly.

---

---

# SideShowLayout — 侧栏展示布局

侧栏常驻展示模式：侧栏与主内容并排；主区域宽度随侧栏宽度自适应。

---

## 引入

```tsx
import { SideShowLayout } from "nfx-ui/layouts";
import type { SideShowLayoutProps } from "nfx-ui/layouts";
```

---

## 参数（`SideShowLayoutProps`）

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

- **输入：** `SideShowLayoutProps` — 尺寸与可选侧栏配置。
- **输出：** 常驻侧栏，主区域 `marginLeft` 随侧栏宽度变化；并按顶栏/底栏高度偏移。

需在 `LayoutProvider` 内使用。当 `layoutMode === LayoutModeEnum.SHOW` 时选用。

---

## 示例

```tsx
const { layoutMode } = useLayout();

{layoutMode === LayoutModeEnum.SHOW && (
  <SideShowLayout
    headerHeight={headerHeight}
    footerHeight={footerHeight}
    sidebarItems={items}
    sidebarCurrentPathname={pathname}
    onSidebarNavigate={navigate}
  >
    <Dashboard />
  </SideShowLayout>
)}
```

通常通过 `LayoutFrame` 使用，而非直接拼装。
