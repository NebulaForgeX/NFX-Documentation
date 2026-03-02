# VirtualWindowList

Virtual list that scrolls inside a given container; for table body, side list, etc.

---

## Import

```tsx
import { VirtualWindowList } from "nfx-ui/components";
import type { VirtualWindowListProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| items | T[] | Yes | — | Data list. |
| parentRef | RefObject | Yes | — | Ref to scroll container. |
| renderItem | (props) => ReactNode | Yes | — | Render single item. |
| getItemHeight | (index) => number | No | — | Height per item. |

See `VirtualWindowListProps` for full shape.

---

## Input / Output

- **Input:** items, parentRef, renderItem, getItemHeight, etc.
- **Output:** Renders virtual list inside parentRef container.

---

## Example

```tsx
<div ref={scrollRef} style={{ height: 400, overflow: "auto" }}>
  <VirtualWindowList
    items={rows}
    parentRef={scrollRef}
    renderItem={({ item }) => <tr>...</tr>}
  />
</div>
```

Requires `@tanstack/react-virtual`.

---

---

# VirtualWindowList — 窗口内虚拟列表

在指定容器窗口内滚动的虚拟列表，适合表格 body、侧边列表等。

---

## 引入

```tsx
import { VirtualWindowList } from "nfx-ui/components";
import type { VirtualWindowListProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| items | T[] | 是 | — | 数据列表。 |
| parentRef | RefObject | 是 | — | 可滚动容器的 ref。 |
| renderItem | (props) => ReactNode | 是 | — | 渲染单项。 |
| getItemHeight | (index) => number | 否 | — | 每项高度。 |

详见 `VirtualWindowListProps`。

---

## 输入 / 输出

- **输入：** items、parentRef、renderItem、getItemHeight 等。
- **输出：** 在 parentRef 容器内渲染虚拟列表。

---

## 示例

```tsx
<div ref={scrollRef} style={{ height: 400, overflow: "auto" }}>
  <VirtualWindowList
    items={rows}
    parentRef={scrollRef}
    renderItem={({ item }) => <tr>...</tr>}
  />
</div>
```

依赖 `@tanstack/react-virtual`。
