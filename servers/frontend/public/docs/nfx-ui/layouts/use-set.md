# useSet

Internal hook used by `LayoutProvider` to manage `layoutMode` and persist state to `layout-storage`. Not intended for direct use in app code — prefer `useLayout().setLayoutMode`.

---

## Import

```tsx
import useSet from "nfx-ui/layouts/hooks/useSet"; // internal; prefer useLayout
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| defaultLayoutMode | LayoutModeEnum | Yes | — | Fallback when storage is empty or invalid. |
| sidebarOpen | boolean | Yes | — | Current sidebar open state (synced to storage). |

---

## Return value

| Field | Type | Description |
|-------|------|-------------|
| layoutMode | LayoutModeEnum | Current layout mode (`SHOW` / `HIDE`). |
| setLayoutMode | `(mode: LayoutModeEnum) => void` | Update layout mode. |

---

## Behavior

- On mount: reads `getLayoutStorage()`, parses `{ state: { layoutMode, sidebarOpen } }` (legacy `layoutMode` / `sidebarOpen` at root also supported).
- On change: writes `{ state: { sidebarOpen, layoutMode } }` to `layout-storage` via `setLayoutStorage`.

---

## Example (internal usage in LayoutProvider)

```tsx
const { sidebarOpen } = useAction();
const { layoutMode, setLayoutMode } = useSet({ defaultLayoutMode, sidebarOpen });
```

---

---

# useSet — 布局模式持久化

`LayoutProvider` 内部使用的 Hook，管理 `layoutMode` 并持久化到 `layout-storage`。业务代码请使用 `useLayout().setLayoutMode`，勿直接调用。

---

## 引入

```tsx
import useSet from "nfx-ui/layouts/hooks/useSet"; // 内部实现；请优先 useLayout
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| defaultLayoutMode | LayoutModeEnum | 是 | — | 存储为空或无效时的回退值。 |
| sidebarOpen | boolean | 是 | — | 当前侧栏开关状态（一并写入存储）。 |

---

## 返回值

| 字段 | 类型 | 说明 |
|------|------|------|
| layoutMode | LayoutModeEnum | 当前布局模式（`SHOW` / `HIDE`）。 |
| setLayoutMode | `(mode: LayoutModeEnum) => void` | 更新布局模式。 |

---

## 行为

- 挂载时：读取 `getLayoutStorage()`，解析 `{ state: { layoutMode, sidebarOpen } }`（也兼容根级 `layoutMode` / `sidebarOpen`）。
- 变更时：通过 `setLayoutStorage` 写入 `{ state: { sidebarOpen, layoutMode } }` 到 `layout-storage`。

---

## 示例（LayoutProvider 内部用法）

```tsx
const { sidebarOpen } = useAction();
const { layoutMode, setLayoutMode } = useSet({ defaultLayoutMode, sidebarOpen });
```
