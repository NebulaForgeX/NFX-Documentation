# VirtualWindowList

Window virtual list based on `useWindowVirtualizer`; scrolls relative to the viewport.

---

## Import

```tsx
import { VirtualWindowList } from "nfx-ui/components";
import type { VirtualWindowListProps } from "nfx-ui/components";
```

---

## Parameters

Generic component: `VirtualWindowList<T>`.

Also accepts additional `@tanstack/react-virtual` `VirtualizerOptions` (e.g. `overscan`, `horizontal`) except `count`, `getScrollElement`, `observeElementRect`, `observeElementOffset`, `scrollToFn`, `estimateSize`, `getItemKey`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| data | T[] | Yes | — | Data array. |
| renderItem | (item: T, index: number) => ReactNode | Yes | — | Render single item. |
| getItemKey | (item: T, index: number) => string \| number | Yes | — | Item key. |
| estimateSize | number \| ((index: number) => number) | No | 200 | Estimated item height. |
| height | string \| number | No | — | Empty-state container height (optional). |
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

- **Input:** data, renderItem, getItemKey, infinite-scroll props, indicator props.
- **Output:** Renders virtual list using window scroll; auto-fetches next page when scrolling near bottom; shows empty/loading/end indicators.

---

## Example

```tsx
<VirtualWindowList
  data={items}
  getItemKey={(item) => item.id}
  renderItem={(item) => <Row item={item} />}
  hasNextPage={hasNextPage}
  isFetchingNextPage={isFetchingNextPage}
  fetchNextPage={fetchNextPage}
  estimateSize={72}
/>
```

Requires `@tanstack/react-virtual`.

---

---

# VirtualWindowList — 窗口虚拟列表

基于 `useWindowVirtualizer` 的窗口虚拟列表；滚动相对视口。

---

## 引入

```tsx
import { VirtualWindowList } from "nfx-ui/components";
import type { VirtualWindowListProps } from "nfx-ui/components";
```

---

## 参数

泛型组件：`VirtualWindowList<T>`。

另接受 `@tanstack/react-virtual` 的 `VirtualizerOptions`（如 `overscan`、`horizontal`），不含 `count`、`getScrollElement`、`observeElementRect`、`observeElementOffset`、`scrollToFn`、`estimateSize`、`getItemKey`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| data | T[] | 是 | — | 数据列表。 |
| renderItem | (item: T, index: number) => ReactNode | 是 | — | 渲染单项。 |
| getItemKey | (item: T, index: number) => string \| number | 是 | — | 单项 key。 |
| estimateSize | number \| ((index: number) => number) | 否 | 200 | 单项高度估计。 |
| height | string \| number | 否 | — | 空状态容器高度（可选）。 |
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

- **输入：** data、renderItem、getItemKey、无限滚动相关 props、指示器相关 props。
- **输出：** 使用窗口滚动渲染虚拟列表；滚动接近底部时自动拉取下一页；展示空状态/加载中/列表底指示器。

---

## 示例

```tsx
<VirtualWindowList
  data={items}
  getItemKey={(item) => item.id}
  renderItem={(item) => <Row item={item} />}
  hasNextPage={hasNextPage}
  isFetchingNextPage={isFetchingNextPage}
  fetchNextPage={fetchNextPage}
  estimateSize={72}
/>
```

依赖 `@tanstack/react-virtual`。
