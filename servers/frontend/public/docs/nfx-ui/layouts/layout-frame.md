# LayoutFrame

High-level layout shell: wraps `MainWrapper` and switches between `SideHideLayout` / `SideShowLayout` based on `layoutMode` from `useLayout()`. Requires `LayoutProvider`.

---

## Import

```tsx
import { LayoutFrame } from "nfx-ui/layouts";
import type { LayoutFrameProps } from "nfx-ui/layouts";
```

---

## Parameters (`LayoutFrameProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Main page content. |
| headerLeft | ReactNode | No | — | Header left slot (e.g. Logo, LayoutSwitcher). |
| headerRight | ReactNode | No | — | Header right slot (e.g. language switcher, user menu). |
| footerContent | ReactNode | No | — | Footer content passed to `Footer`. |
| sidebarItems | SidebarMenuItem[] | No | — | Sidebar menu items. |
| sidebarCurrentPathname | string | No | — | Current pathname for active highlight; pass `useLocation().pathname`. |
| onSidebarNavigate | `(path: string) => void` | No | — | Called when a sidebar item is clicked. |
| sidebarLogoutLabel | string | No | — | Logout button label in sidebar footer. |
| onSidebarLogout | `() => void` | No | — | Logout handler. |
| bottomLogoutButton | ReactNode | No | — | Custom bottom logout button (replaces default). |

### `SidebarMenuItem`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | Yes | Menu label. |
| path | string | Yes | Route path. |
| icon | ReactNode | Yes | Menu icon. |
| children | SidebarMenuItem[] | No | Sub-menu items. |

---

## Input / Output

- **Input:** `LayoutFrameProps` — header/footer slots, sidebar config, and main content.
- **Output:** Renders fixed Header/Footer, sidebar (show or hide mode), and `children` in the main area.

---

## Example

```tsx
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutProvider, LayoutFrame } from "nfx-ui/layouts";
import { LayoutSwitcher } from "nfx-ui/components";

function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <LayoutProvider>
      <LayoutFrame
        headerLeft={<LayoutSwitcher />}
        headerRight={<UserMenu />}
        footerContent={<span>© 2026 NFX</span>}
        sidebarItems={navItems}
        sidebarCurrentPathname={pathname}
        onSidebarNavigate={(path) => navigate(path)}
        sidebarLogoutLabel="Logout"
        onSidebarLogout={() => signOut()}
      >
        {children}
      </LayoutFrame>
    </LayoutProvider>
  );
}
```

---

---

# LayoutFrame — 布局骨架

高层布局容器：内部使用 `MainWrapper`，并根据 `useLayout()` 的 `layoutMode` 在 `SideHideLayout` / `SideShowLayout` 之间切换。需在 `LayoutProvider` 内使用。

---

## 引入

```tsx
import { LayoutFrame } from "nfx-ui/layouts";
import type { LayoutFrameProps } from "nfx-ui/layouts";
```

---

## 参数（`LayoutFrameProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 主页面内容。 |
| headerLeft | ReactNode | 否 | — | Header 左侧插槽（如 Logo、LayoutSwitcher）。 |
| headerRight | ReactNode | 否 | — | Header 右侧插槽（如语言切换、用户菜单）。 |
| footerContent | ReactNode | 否 | — | 传给 `Footer` 的底栏内容。 |
| sidebarItems | SidebarMenuItem[] | 否 | — | 侧栏菜单项。 |
| sidebarCurrentPathname | string | 否 | — | 当前路径，用于高亮；传 `useLocation().pathname`。 |
| onSidebarNavigate | `(path: string) => void` | 否 | — | 点击侧栏菜单项时调用。 |
| sidebarLogoutLabel | string | 否 | — | 侧栏底部登出按钮文案。 |
| onSidebarLogout | `() => void` | 否 | — | 登出回调。 |
| bottomLogoutButton | ReactNode | 否 | — | 自定义底部登出按钮（替代默认按钮）。 |

### `SidebarMenuItem`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| label | string | 是 | 菜单文案。 |
| path | string | 是 | 路由路径。 |
| icon | ReactNode | 是 | 菜单图标。 |
| children | SidebarMenuItem[] | 否 | 子菜单项。 |

---

## 输入 / 输出

- **输入：** `LayoutFrameProps` — 顶栏/底栏插槽、侧栏配置与主内容。
- **输出：** 渲染固定 Header/Footer、侧栏（显隐模式）及主区域内的 `children`。

---

## 示例

```tsx
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutProvider, LayoutFrame } from "nfx-ui/layouts";
import { LayoutSwitcher } from "nfx-ui/components";

function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <LayoutProvider>
      <LayoutFrame
        headerLeft={<LayoutSwitcher />}
        headerRight={<UserMenu />}
        footerContent={<span>© 2026 NFX</span>}
        sidebarItems={navItems}
        sidebarCurrentPathname={pathname}
        onSidebarNavigate={(path) => navigate(path)}
        sidebarLogoutLabel="退出"
        onSidebarLogout={() => signOut()}
      >
        {children}
      </LayoutFrame>
    </LayoutProvider>
  );
}
```
