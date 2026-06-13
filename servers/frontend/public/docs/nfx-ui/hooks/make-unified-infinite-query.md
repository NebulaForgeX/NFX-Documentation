# makeUnifiedInfiniteQuery

Creates a unified infinite-query Hook factory (normal or suspense), using number-cursor paging via `makeCursorFetchFunction`.

---

## Import

```ts
import { makeUnifiedInfiniteQuery } from "nfx-ui/hooks";
import type { FetchNumberListParams, InfiniteQueryOptions, SuspenseInfiniteQueryOptions, QueryMode } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";
import type { QueryKey } from "@tanstack/react-query";
```

---

## Signature

```ts
function makeUnifiedInfiniteQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  mode?: "normal" | "suspense",
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseInfiniteQueryResult<T[]> | UseSuspenseInfiniteQueryResult<T[]>;
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetchRemote | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | Yes | — | Receives offset, limit, filter; returns { items, total }. |
| mode | QueryMode | No | `"normal"` | Mode. |
| pageSize | number | No | 20 | Page size. |
| postProcess | (data: T[]) => void | No | — | Optional; called per page items. |

---

## Input / Output

- **Input:** fetchRemote, mode, pageSize, postProcess.
- **Output:** Returns Hook; `data` is flattened `T[]`; includes fetchNextPage, hasNextPage, etc.

---

## Example

```ts
import { makeUnifiedInfiniteQuery } from "nfx-ui/hooks";
import type { FetchNumberListParams } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";

const useProductList = makeUnifiedInfiniteQuery(fetchProducts, "normal", 20);
const { data, fetchNextPage, hasNextPage, isLoading } = useProductList(
  ["products"],
  { category: "x" },
  { staleTime: 60000 }
);
```

Use with VirtualList or a "Load more" button.

---

---

# makeUnifiedInfiniteQuery — 统一无限列表查询 Hook 工厂

创建统一的无限列表查询 Hook 工厂（normal 或 suspense），内部通过 `makeCursorFetchFunction` 使用数字游标分页。

---

## 引入

```ts
import { makeUnifiedInfiniteQuery } from "nfx-ui/hooks";
import type { FetchNumberListParams, InfiniteQueryOptions, SuspenseInfiniteQueryOptions, QueryMode } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";
import type { QueryKey } from "@tanstack/react-query";
```

---

## 签名

```ts
function makeUnifiedInfiniteQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  mode?: "normal" | "suspense",
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseInfiniteQueryResult<T[]> | UseSuspenseInfiniteQueryResult<T[]>;
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetchRemote | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | 是 | — | 接收 offset、limit、filter，返回 { items, total }。 |
| mode | QueryMode | 否 | `"normal"` | 模式。 |
| pageSize | number | 否 | 20 | 每页条数。 |
| postProcess | (data: T[]) => void | 否 | — | 可选；每页 items 返回后调用。 |

---

## 输入 / 输出

- **输入：** fetchRemote、mode、pageSize、postProcess。
- **输出：** 返回 Hook；`data` 为扁平化 `T[]`；含 fetchNextPage、hasNextPage 等。

---

## 示例

```ts
import { makeUnifiedInfiniteQuery } from "nfx-ui/hooks";
import type { FetchNumberListParams } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";

const useProductList = makeUnifiedInfiniteQuery(fetchProducts, "normal", 20);
const { data, fetchNextPage, hasNextPage, isLoading } = useProductList(
  ["products"],
  { category: "x" },
  { staleTime: 60000 }
);
```

与 VirtualList 或「加载更多」按钮配合使用。
