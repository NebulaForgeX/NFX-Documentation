# VirtualList

Virtual list; only renders visible items for long-list performance.

---

## Import

```tsx
import { VirtualList } from "nfx-ui/components";
import type { VirtualListProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| items | T[] | Yes | — | Data list. |
| getItemHeight | (index: number) => number | No | — | Height per item. |
| renderItem | (props: { item, index }) => ReactNode | Yes | — | Render single item. |
| overscan | number | No | — | Items to render outside viewport. |

See `VirtualListProps` for full shape.

---

## Input / Output

- **Input:** items, getItemHeight, renderItem, overscan, etc.
- **Output:** Renders scrollable virtual list with only visible items mounted.

---

## Example

```tsx
<VirtualList
  items={dataList}
  getItemHeight={() => 48}
  renderItem={({ item, index }) => <Row key={item.id} data={item} />}
/>
```

Requires `@tanstack/react-virtual`.

---

---

# VirtualList — 虚拟列表

虚拟列表，只渲染可见区域项，适合长列表性能优化。

---

## 引入

```tsx
import { VirtualList } from "nfx-ui/components";
import type { VirtualListProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| items | T[] | 是 | — | 数据列表。 |
| getItemHeight | (index: number) => number | 否 | — | 每项高度（或固定值）。 |
| renderItem | (props: { item, index }) => ReactNode | 是 | — | 渲染单项。 |
| overscan | number | 否 | — | 视口外预渲染条数。 |

详见 `VirtualListProps`。

---

## 输入 / 输出

- **输入：** items、getItemHeight、renderItem、overscan 等。
- **输出：** 渲染可滚动虚拟列表，仅可见项挂载。

---

## 示例

```tsx
<VirtualList
  items={dataList}
  getItemHeight={() => 48}
  renderItem={({ item, index }) => <Row key={item.id} data={item} />}
/>
```

依赖 `@tanstack/react-virtual`。
