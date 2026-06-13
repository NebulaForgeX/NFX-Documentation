# Sidebar

Sidebar container built on `react-pro-sidebar`; renders menu items from `items` or custom `children`. Used internally by `SideHideLayout` / `SideShowLayout`.

---

## Import

```tsx
import { Sidebar } from "nfx-ui/layouts";
import type { SidebarProps, SidebarMenuItem } from "nfx-ui/layouts";
```

---

## Parameters (`SidebarProps`)

Extends `react-pro-sidebar` `SidebarProps` with layout-specific fields.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | No | — | Custom menu content; used when `items` is empty. |
| collapsed | boolean | No | `false` | Collapsed state (show layout). |
| toggled | boolean | No | `false` | Overlay open state (hide layout). |
| onBackdropClick | `() => void` | No | — | Backdrop click handler. |
| className | string | No | — | Extra CSS class. |
| items | SidebarMenuItem[] | No | `[]` | Menu items; rendered when no `children`. |
| currentPathname | string | No | `""` | Current pathname for active state; pass `useLocation().pathname`. |
| onNavigate | `(path: string) => void` | No | — | Called when a menu item is clicked. |
| logoutLabel | string | No | `"Logout"` | Logout button label. |
| handleLogout | `() => void` | No | — | Logout handler; renders default button when set. |
| bottomLogoutButton | ReactNode | No | — | Custom bottom logout button. |
| headerHeight | number | No | `0` | Header height offset (show layout). |
| footerHeight | number | No | `0` | Footer height offset (show layout). |
| breakPoint | ProSidebar breakPoint | No | `"all"` | Responsive breakpoint (from react-pro-sidebar). |

---

## Input / Output

- **Input:** `SidebarProps` — menu items or children, navigation callbacks, dimensions.
- **Output:** Renders sidebar with theme CSS variables; active item highlighting based on `currentPathname`.

---

## Example

```tsx
<Sidebar
  items={[
    { label: "Dashboard", path: "/", icon: <HomeIcon /> },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ]}
  currentPathname={pathname}
  onNavigate={(path) => navigate(path)}
  logoutLabel="Sign out"
  handleLogout={() => signOut()}
  headerHeight={64}
  footerHeight={48}
/>
```

---

---

# Sidebar — 侧边栏

基于 `react-pro-sidebar` 的侧栏容器；从 `items` 渲染菜单或使用自定义 `children`。由 `SideHideLayout` / `SideShowLayout` 内部使用。

---

## 引入

```tsx
import { Sidebar } from "nfx-ui/layouts";
import type { SidebarProps, SidebarMenuItem } from "nfx-ui/layouts";
```

---

## 参数（`SidebarProps`）

扩展 `react-pro-sidebar` 的 `SidebarProps`，并增加布局相关字段。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 否 | — | 自定义菜单内容；`items` 为空时使用。 |
| collapsed | boolean | 否 | `false` | 折叠状态（show 布局）。 |
| toggled | boolean | 否 | `false` | 遮罩展开状态（hide 布局）。 |
| onBackdropClick | `() => void` | 否 | — | 点击遮罩回调。 |
| className | string | 否 | — | 额外 CSS 类名。 |
| items | SidebarMenuItem[] | 否 | `[]` | 菜单项；无 `children` 时渲染。 |
| currentPathname | string | 否 | `""` | 当前路径，用于高亮；传 `useLocation().pathname`。 |
| onNavigate | `(path: string) => void` | 否 | — | 点击菜单项时调用。 |
| logoutLabel | string | 否 | `"Logout"` | 登出按钮文案。 |
| handleLogout | `() => void` | 否 | — | 登出回调；设置后渲染默认登出按钮。 |
| bottomLogoutButton | ReactNode | 否 | — | 自定义底部登出按钮。 |
| headerHeight | number | 否 | `0` | 顶栏高度偏移（show 布局）。 |
| footerHeight | number | 否 | `0` | 底栏高度偏移（show 布局）。 |
| breakPoint | ProSidebar breakPoint | 否 | `"all"` | 响应式断点（来自 react-pro-sidebar）。 |

---

## 输入 / 输出

- **输入：** `SidebarProps` — 菜单项或 children、导航回调、尺寸偏移。
- **输出：** 渲染侧栏，使用主题 CSS 变量；根据 `currentPathname` 高亮当前项。

---

## 示例

```tsx
<Sidebar
  items={[
    { label: "仪表盘", path: "/", icon: <HomeIcon /> },
    { label: "设置", path: "/settings", icon: <SettingsIcon /> },
  ]}
  currentPathname={pathname}
  onNavigate={(path) => navigate(path)}
  logoutLabel="退出登录"
  handleLogout={() => signOut()}
  headerHeight={64}
  footerHeight={48}
/>
```
