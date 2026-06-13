# useLayout

Consumer hook inside `LayoutProvider` to read and update layout state.

---

## Import

```tsx
import { useLayout } from "nfx-ui/layouts";
import type { LayoutContextType } from "nfx-ui/layouts";
```

---

## Parameters

No parameters. Must be called inside `LayoutProvider`.

---

## Return value (`LayoutContextType`)

| Field | Type | Description |
|-------|------|-------------|
| sidebarOpen | boolean | Whether sidebar overlay is open (hide mode) or collapsed (show mode). |
| layoutMode | LayoutModeEnum | Current layout mode: `SHOW` or `HIDE`. |
| setSidebarOpen | `(open: boolean) => void` | Set sidebar open state. |
| toggleSidebar | `() => void` | Toggle sidebar open state. |
| closeSidebar | `() => void` | Close sidebar. |
| setLayoutMode | `(mode: LayoutModeEnum) => void` | Switch between show/hide layout modes. |

---

## Example

```tsx
import { useLayout, LayoutModeEnum } from "nfx-ui/layouts";

function SidebarToggle() {
  const { sidebarOpen, toggleSidebar, layoutMode, setLayoutMode } = useLayout();

  return (
    <>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? "Close" : "Open"} sidebar
      </button>
      <button onClick={() => setLayoutMode(LayoutModeEnum.HIDE)}>
        Hide sidebar layout
      </button>
      <span>Mode: {layoutMode}</span>
    </>
  );
}
```

---

---

# useLayout — 布局状态

在 `LayoutProvider` 内使用的业务侧 Hook，读取与更新布局状态。

---

## 引入

```tsx
import { useLayout } from "nfx-ui/layouts";
import type { LayoutContextType } from "nfx-ui/layouts";
```

---

## 参数

无参数。必须在 `LayoutProvider` 内调用。

---

## 返回值（`LayoutContextType`）

| 字段 | 类型 | 说明 |
|------|------|------|
| sidebarOpen | boolean | 侧栏是否展开（hide 模式为 overlay；show 模式为折叠态）。 |
| layoutMode | LayoutModeEnum | 当前布局模式：`SHOW` 或 `HIDE`。 |
| setSidebarOpen | `(open: boolean) => void` | 设置侧栏开关。 |
| toggleSidebar | `() => void` | 切换侧栏开关。 |
| closeSidebar | `() => void` | 关闭侧栏。 |
| setLayoutMode | `(mode: LayoutModeEnum) => void` | 切换侧栏显示/隐藏布局模式。 |

---

## 示例

```tsx
import { useLayout, LayoutModeEnum } from "nfx-ui/layouts";

function SidebarToggle() {
  const { sidebarOpen, toggleSidebar, layoutMode, setLayoutMode } = useLayout();

  return (
    <>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? "关闭" : "打开"}侧栏
      </button>
      <button onClick={() => setLayoutMode(LayoutModeEnum.HIDE)}>
        隐藏侧栏布局
      </button>
      <span>模式：{layoutMode}</span>
    </>
  );
}
```
