# VirtualList

Virtual list based on `@tanstack/react-virtual`; supports infinite scroll via `fetchNextPage`.

---

## Import

```tsx
import { VirtualList } from "nfx-ui/components";
import type { VirtualListProps } from "nfx-ui/components";
```

---

## Parameters

Generic component: `VirtualList<T>`.

Also accepts additional `@tanstack/react-virtual` `VirtualizerOptions` (e.g. `overscan`, `horizontal`) except `count`, `getScrollElement`, `observeElementRect`, `observeElementOffset`, `scrollToFn`, `getItemKey`, `estimateSize`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| data | T[] | Yes | — | Data array. |
| renderItem | (item: T, index: number) => ReactNode | Yes | — | Render single item. |
| getItemKey | (item: T, index: number) => string \| number | Yes | — | Item key. |
| estimateSize | number \| ((index: number) => number) | No | 200 | Estimated item height. |
| height | string \| number | No | `"600px"` | List container height. |
| hasNextPage | boolean | No | — | Has next page (infinite scroll). |
| isFetchingNextPage | boolean | No | — | Is fetching next page. |
| fetchNextPage | () => void | No | — | Fetch next page callback. |
| emptyState | ReactNode | No | — | Custom empty state node. |
| loadingIndicator | ReactNode | No | — | Custom loading-more indicator. |
| endOfListIndicator | ReactNode | No | — | Custom end-of-list indicator. |
| emptyText | ReactNode | No | `"No data"` | Empty text when `emptyState` not provided. |
| loadingMoreText | ReactNode | No | `"Loading more..."` | Loading-more text when `loadingIndicator` not provided. |
| endOfListText | ReactNode | No | `"No more items"` | End-of-list text when `endOfListIndicator` not provided. |
| flexClass | string | No | — | List items container className. |
| outerClass | string | No | — | Outer container className. |
| innerClass | string | No | — | Inner container className. |
| overscan | number | No | 5 | Items to render outside viewport. |

---

## Input / Output

- **Input:** data, renderItem, getItemKey, height, infinite-scroll props, indicator props.
- **Output:** Renders scrollable virtual list inside a fixed-height container; auto-fetches next page when scrolling near bottom; shows empty/loading/end indicators.

---

## Example

```tsx
<VirtualList
  data={items}
  getItemKey={(item) => item.id}
  renderItem={(item) => <Row item={item} />}
  hasNextPage={hasNextPage}
  isFetchingNextPage={isFetchingNextPage}
  fetchNextPage={fetchNextPage}
  height={480}
  estimateSize={56}
/>
```

Requires `@tanstack/react-virtual`.

---

---

# VirtualList — 虚拟列表

基于 `@tanstack/react-virtual` 的虚拟列表；支持通过 `fetchNextPage` 无限滚动。

---

## 引入

```tsx
import { VirtualList } from "nfx-ui/components";
import type { VirtualListProps } from "nfx-ui/components";
```

---

## 参数

泛型组件：`VirtualList<T>`。

另接受 `@tanstack/react-virtual` 的 `VirtualizerOptions`（如 `overscan`、`horizontal`），不含 `count`、`getScrollElement`、`observeElementRect`、`observeElementOffset`、`scrollToFn`、`getItemKey`、`estimateSize`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| data | T[] | 是 | — | 数据列表。 |
| renderItem | (item: T, index: number) => ReactNode | 是 | — | 渲染单项。 |
| getItemKey | (item: T, index: number) => string \| number | 是 | — | 单项 key。 |
| estimateSize | number \| ((index: number) => number) | 否 | 200 | 单项高度估计。 |
| height | string \| number | 否 | `"600px"` | 列表容器高度。 |
| hasNextPage | boolean | 否 | — | 是否有下一页（无限滚动）。 |
| isFetchingNextPage | boolean | 否 | — | 是否正在拉取下一页。 |
| fetchNextPage | () => void | 否 | — | 拉取下一页回调。 |
| emptyState | ReactNode | 否 | — | 自定义空状态节点。 |
| loadingIndicator | ReactNode | 否 | — | 自定义加载更多指示器。 |
| endOfListIndicator | ReactNode | 否 | — | 自定义列表底指示器。 |
| emptyText | ReactNode | 否 | `"No data"` | 未提供 `emptyState` 时的空状态文案。 |
| loadingMoreText | ReactNode | 否 | `"Loading more..."` | 未提供 `loadingIndicator` 时的加载文案。 |
| endOfListText | ReactNode | 否 | `"No more items"` | 未提供 `endOfListIndicator` 时的列表底文案。 |
| flexClass | string | 否 | — | 列表项容器 className。 |
| outerClass | string | 否 | — | 外层容器 className。 |
| innerClass | string | 否 | — | 内层容器 className。 |
| overscan | number | 否 | 5 | 视口外预渲染条数。 |

---

## 输入 / 输出

- **输入：** data、renderItem、getItemKey、height、无限滚动相关 props、指示器相关 props。
- **输出：** 在固定高度容器内渲染可滚动虚拟列表；滚动接近底部时自动拉取下一页；展示空状态/加载中/列表底指示器。

---

## 示例

```tsx
<VirtualList
  data={items}
  getItemKey={(item) => item.id}
  renderItem={(item) => <Row item={item} />}
  hasNextPage={hasNextPage}
  isFetchingNextPage={isFetchingNextPage}
  fetchNextPage={fetchNextPage}
  height={480}
  estimateSize={56}
/>
```

依赖 `@tanstack/react-virtual`。
