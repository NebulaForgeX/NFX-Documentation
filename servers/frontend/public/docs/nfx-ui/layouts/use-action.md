# useAction

Internal hook used by `LayoutProvider` to manage sidebar open state and restore it from `layout-storage`. Not intended for direct use in app code — prefer `useLayout()`.

---

## Import

```tsx
import useAction from "nfx-ui/layouts/hooks/useAction"; // internal; prefer useLayout
```

---

## Parameters

No parameters.

---

## Return value

| Field | Type | Description |
|-------|------|-------------|
| sidebarOpen | boolean | Whether sidebar is open. |
| setSidebarOpen | `(open: boolean) => void` | Set sidebar open state. |
| toggleSidebar | `() => void` | Toggle sidebar open state. |
| closeSidebar | `() => void` | Set sidebar to closed. |

---

## Behavior

- On mount: reads `getLayoutStorage()`, parses `state.sidebarOpen` (legacy root `sidebarOpen` also supported); defaults to `false`.
- State is persisted by `useSet` when combined in `LayoutProvider`.

---

## Example (internal usage in LayoutProvider)

```tsx
const { sidebarOpen, setSidebarOpen, toggleSidebar, closeSidebar } = useAction();
```

Consumer equivalent:

```tsx
const { sidebarOpen, toggleSidebar, closeSidebar } = useLayout();
```

---

---

# useAction — 侧栏开关状态

`LayoutProvider` 内部使用的 Hook，管理侧栏开关并从 `layout-storage` 恢复。业务代码请使用 `useLayout()`，勿直接调用。

---

## 引入

```tsx
import useAction from "nfx-ui/layouts/hooks/useAction"; // 内部实现；请优先 useLayout
```

---

## 参数

无参数。

---

## 返回值

| 字段 | 类型 | 说明 |
|------|------|------|
| sidebarOpen | boolean | 侧栏是否展开。 |
| setSidebarOpen | `(open: boolean) => void` | 设置侧栏开关。 |
| toggleSidebar | `() => void` | 切换侧栏开关。 |
| closeSidebar | `() => void` | 关闭侧栏。 |

---

## 行为

- 挂载时：读取 `getLayoutStorage()`，解析 `state.sidebarOpen`（也兼容根级 `sidebarOpen`）；默认 `false`。
- 持久化由 `LayoutProvider` 内与 `useSet` 配合完成。

---

## 示例（LayoutProvider 内部用法）

```tsx
const { sidebarOpen, setSidebarOpen, toggleSidebar, closeSidebar } = useAction();
```

业务侧等价写法：

```tsx
const { sidebarOpen, toggleSidebar, closeSidebar } = useLayout();
```
