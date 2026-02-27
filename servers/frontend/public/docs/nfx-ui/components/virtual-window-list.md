# VirtualWindowList / 窗口内虚拟列表

在指定容器窗口内滚动的虚拟列表，适合表格 body、侧边列表等。  
Virtual list that scrolls inside a given container; for table body, side list, etc.

---

## 引入 / Import

```tsx
import { VirtualWindowList } from "nfx-ui";
import type { VirtualWindowListProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| items | T[] | Yes | — | 数据列表。Data list. |
| parentRef | RefObject | Yes | — | 可滚动容器的 ref。Ref to scroll container. |
| renderItem | (props) => ReactNode | Yes | — | 渲染单项。Render single item. |
| getItemHeight | (index) => number | No | — | 每项高度。Height per item. |

详见 `VirtualWindowListProps`。See `VirtualWindowListProps` for full shape.

---

## 输入 Input / 输出 Output

- **Input**：items、parentRef、renderItem、getItemHeight 等。items, parentRef, renderItem, getItemHeight, etc.
- **Output**：在 parentRef 容器内渲染虚拟列表。Renders virtual list inside parentRef container.

---

## 示例 / Example

```tsx
<div ref={scrollRef} style={{ height: 400, overflow: "auto" }}>
  <VirtualWindowList
    items={rows}
    parentRef={scrollRef}
    renderItem={({ item }) => <tr>...</tr>}
  />
</div>
```

依赖 `@tanstack/react-virtual`。Requires `@tanstack/react-virtual`.
