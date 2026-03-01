# VirtualList / 虚拟列表

虚拟列表，只渲染可见区域项，适合长列表性能优化。  
Virtual list; only renders visible items for long-list performance.

---

## 引入 / Import

```tsx
import { VirtualList } from "nfx-ui/components";
import type { VirtualListProps } from "nfx-ui/components";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| items | T[] | Yes | — | 数据列表。Data list. |
| getItemHeight | (index: number) => number | No | — | 每项高度（或固定值）。Height per item. |
| renderItem | (props: { item, index }) => ReactNode | Yes | — | 渲染单项。Render single item. |
| overscan | number | No | — | 视口外预渲染条数。Items to render outside viewport. |

详见 `VirtualListProps`。See `VirtualListProps` for full shape.

---

## 输入 Input / 输出 Output

- **Input**：items、getItemHeight、renderItem、overscan 等。items, getItemHeight, renderItem, overscan, etc.
- **Output**：渲染可滚动虚拟列表，仅可见项挂载。Renders scrollable virtual list with only visible items mounted.

---

## 示例 / Example

```tsx
<VirtualList
  items={dataList}
  getItemHeight={() => 48}
  renderItem={({ item, index }) => <Row key={item.id} data={item} />}
/>
```

依赖 `@tanstack/react-virtual`。Requires `@tanstack/react-virtual`.
