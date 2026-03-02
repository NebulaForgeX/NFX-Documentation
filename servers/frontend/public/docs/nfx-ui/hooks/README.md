# Hooks module

Unified query Hook factories (single-item, infinite list), cursor fetch, and type definitions. Exported from `nfx-ui/hooks` (external); types from `nfx-ui/types`. In repo: `@/hooks`.

---

## Entry

```ts
import type { FetchNumberListParams, InfiniteQueryOptions, SuspenseInfiniteQueryOptions } from "nfx-ui/types";
import type { ListDTOWithNextCursor, ListDTOWithTotalNumber } from "nfx-ui/types";
import { makeCursorFetchFunction, makeStringCursorFetchFunction, makeUnifiedInfiniteQuery, makeUnifiedQuery } from "nfx-ui/hooks";
```

---

## 1. makeUnifiedQuery

Creates a unified single-item query Hook factory (normal or suspense mode).

**Signature**

```ts
function makeUnifiedQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: F) => Promise<T>,
  mode?: "normal" | "suspense",
  postProcess?: (data: T) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>;
```

**Input**

| Parameter   | Type                        | Description                                      |
| ----------- | --------------------------- | ------------------------------------------------ |
| fetchRemote  | (params: F) => Promise&lt;T&gt; | Fetch function.                                  |
| mode        | "normal" \| "suspense"      | Default "normal". Returns UseSuspenseQueryResult when suspense. |
| postProcess | (data: T) => void           | Optional; called after data is returned.         |

**Output:** Returns a Hook; options are merged with queryKey, queryFn, retry, etc.

**Example**

```ts
const useProfile = makeUnifiedQuery(fetchProfile, "normal");
const { data } = useProfile(profileKey, { id }, { enabled: !!id });

const useProfileSuspense = makeUnifiedQuery(fetchProfile, "suspense");
const { data } = useProfileSuspense(profileKey, { id });
```

See [make-unified-query.md](./make-unified-query.md).

---

## 2. makeUnifiedInfiniteQuery

Creates a unified infinite-query Hook factory (normal or suspense), using number-cursor paging.

**Signature**

```ts
function makeUnifiedInfiniteQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  mode?: "normal" | "suspense",
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseInfiniteQueryResult<T[]> | UseSuspenseInfiniteQueryResult<T[]>;
```

**Input**

| Parameter   | Type                                                                       | Description                                                |
| ----------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| fetchRemote | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | Receives offset, limit and filter; returns { items, total }. |
| mode        | "normal" \| "suspense"                                                     | Default "normal".                                          |
| pageSize    | number                                                                     | Page size, default 20.                                     |
| postProcess | (data: T[]) => void                                                        | Optional.                                                   |

**Output:** Returns a Hook; data is flattened T[]; includes fetchNextPage, hasNextPage, etc.

**Example**

```ts
const useProductList = makeUnifiedInfiniteQuery(fetchProducts, "normal", 20);
const { data, fetchNextPage, hasNextPage, isLoading } = useProductList(["products"], { category: "x" }, { staleTime: 60000 });
```

See [make-unified-infinite-query.md](./make-unified-infinite-query.md).

---

## 3. makeCursorFetchFunction

Converts offset/limit list API to number-cursor fetcher for infinite query.

**Signature**

```ts
function makeCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: number, filter?: F) => Promise<ListDTOWithTotalNumber<T>>;
```

See [make-cursor-fetch-function.md](./make-cursor-fetch-function.md).

---

## 4. makeStringCursorFetchFunction

Converts string-cursor list API to (pageParam: string, filter?) => ListDTOWithNextCursor.

**Signature**

```ts
function makeStringCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchStringListParams<F>) => Promise<ListDTOWithNextCursor<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: string, filter?: F) => Promise<ListDTOWithNextCursor<T>>;
```

See [make-string-cursor-fetch-function.md](./make-string-cursor-fetch-function.md).

---

## Type reference

| Type | Description |
|------|-------------|
| FetchNumberListParams&lt;F&gt; | F & OffsetLimitNumber (nfx-ui/types). |
| FetchStringListParams&lt;F&gt; | F & OffsetLimitString (nfx-ui/types). |
| ListDTOWithTotalNumber&lt;T&gt; | { items: T[], total: number }. |
| ListDTOWithNextCursor&lt;T&gt; | { items: T[], nextCursor: string }. |
| InfiniteQueryOptions&lt;T&gt; / SuspenseInfiniteQueryOptions&lt;T&gt; | Infinite query options (no queryKey/queryFn/getNextPageParam/initialPageParam). |
| NormalUnifiedQueryOptions&lt;T&gt; / SuspenseUnifiedQueryOptions&lt;T&gt; | Single-item query options. |

---

---

# Hooks 模块文档

统一 Query Hook 工厂（单条查询、无限列表）、游标分页与类型定义。从 `nfx-ui/hooks` 导出（外部使用）；类型从 `nfx-ui/types`。本仓库内可从 `@/hooks` 引用。

---

## 入口

```ts
import type { FetchNumberListParams, InfiniteQueryOptions, SuspenseInfiniteQueryOptions } from "nfx-ui/types";
import type { ListDTOWithNextCursor, ListDTOWithTotalNumber } from "nfx-ui/types";
import { makeCursorFetchFunction, makeStringCursorFetchFunction, makeUnifiedInfiniteQuery, makeUnifiedQuery } from "nfx-ui/hooks";
```

---

## 1. makeUnifiedQuery

创建统一的单条查询 Hook 工厂（normal 或 suspense 模式）。

**签名**

```ts
function makeUnifiedQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: F) => Promise<T>,
  mode?: "normal" | "suspense",
  postProcess?: (data: T) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>;
```

**输入**

| 参数          | 类型                        | 说明                                                      |
| ------------- | --------------------------- | --------------------------------------------------------- |
| fetchRemote   | (params: F) => Promise&lt;T&gt; | 拉取函数。                                                |
| mode          | "normal" \| "suspense"      | 默认 "normal"。suspense 时返回 UseSuspenseQueryResult。   |
| postProcess   | (data: T) => void           | 可选，数据返回后调用。                                    |

**输出：** 返回一个 Hook；options 会合并 queryKey、queryFn、retry 等。

**示例**

```ts
const useProfile = makeUnifiedQuery(fetchProfile, "normal");
const { data } = useProfile(profileKey, { id }, { enabled: !!id });

const useProfileSuspense = makeUnifiedQuery(fetchProfile, "suspense");
const { data } = useProfileSuspense(profileKey, { id });
```

详见 [make-unified-query.md](./make-unified-query.md)。

---

## 2. makeUnifiedInfiniteQuery

创建统一的无限列表查询 Hook 工厂（normal 或 suspense），内部使用数字游标分页。

**签名**

```ts
function makeUnifiedInfiniteQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  mode?: "normal" | "suspense",
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseInfiniteQueryResult<T[]> | UseSuspenseInfiniteQueryResult<T[]>;
```

**输入**

| 参数          | 类型                                                                       | 说明                                                  |
| ------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| fetchRemote   | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | 接收 offset、limit 与 filter，返回 { items, total }。 |
| mode          | "normal" \| "suspense"                                                     | 默认 "normal"。                                       |
| pageSize      | number                                                                     | 每页条数，默认 20。                                   |
| postProcess   | (data: T[]) => void                                                        | 可选。                                                |

**输出：** 返回一个 Hook，调用后得到扁平化的 data: T[]、fetchNextPage、hasNextPage 等。

**示例**

```ts
const useProductList = makeUnifiedInfiniteQuery(fetchProducts, "normal", 20);
const { data, fetchNextPage, hasNextPage, isLoading } = useProductList(["products"], { category: "x" }, { staleTime: 60000 });
```

详见 [make-unified-infinite-query.md](./make-unified-infinite-query.md)。

---

## 3. makeCursorFetchFunction

将「offset/limit 列表 API」转为数字游标分页函数，供 makeUnifiedInfiniteQuery 使用。

**签名**

```ts
function makeCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: number, filter?: F) => Promise<ListDTOWithTotalNumber<T>>;
```

详见 [make-cursor-fetch-function.md](./make-cursor-fetch-function.md)。

---

## 4. makeStringCursorFetchFunction

将「字符串游标列表 API」转为 (pageParam: string, filter?) => ListDTOWithNextCursor。

**签名**

```ts
function makeStringCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchStringListParams<F>) => Promise<ListDTOWithNextCursor<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: string, filter?: F) => Promise<ListDTOWithNextCursor<T>>;
```

详见 [make-string-cursor-fetch-function.md](./make-string-cursor-fetch-function.md)。

---

## 类型速查

| 类型 | 说明 |
|------|------|
| FetchNumberListParams&lt;F&gt; | F & OffsetLimitNumber（nfx-ui/types）。 |
| FetchStringListParams&lt;F&gt; | F & OffsetLimitString（nfx-ui/types）。 |
| ListDTOWithTotalNumber&lt;T&gt; | { items: T[], total: number }。 |
| ListDTOWithNextCursor&lt;T&gt; | { items: T[], nextCursor: string }。 |
| InfiniteQueryOptions&lt;T&gt; / SuspenseInfiniteQueryOptions&lt;T&gt; | 无限查询 options（不含 queryKey/queryFn/getNextPageParam/initialPageParam）。 |
| NormalUnifiedQueryOptions&lt;T&gt; / SuspenseUnifiedQueryOptions&lt;T&gt; | 单条查询 options。 |
