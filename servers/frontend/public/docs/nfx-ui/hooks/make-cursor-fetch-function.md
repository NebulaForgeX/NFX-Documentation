# makeCursorFetchFunction

Converts offset/limit list API to number-cursor fetcher for infinite query.

---

## Import

```ts
import { makeCursorFetchFunction } from "nfx-ui/hooks";
```

---

## Signature

```ts
function makeCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: number, filter?: F) => Promise<ListDTOWithTotalNumber<T>>;
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetchFunc | (params) => Promise&lt;{ items, total }&gt; | Yes | — | List API; params include offset, limit. |
| pageSize | number | No | 20 | Page size. |
| postProcess | (data: T[]) => void | No | — | Optional. |

---

## Input / Output

- **Input:** fetchFunc, pageSize, postProcess.
- **Output:** Returns `(pageParam: number, filter?) => Promise<ListDTOWithTotalNumber<T>>`; offset = pageParam * pageSize.

---

## Example

```ts
const fetchPage = makeCursorFetchFunction(fetchProductsAPI, 20);
const page0 = await fetchPage(0, { category: "x" });
const page1 = await fetchPage(page0.nextCursor!, { category: "x" });
```

---

---

# makeCursorFetchFunction — 数字游标分页函数

将「offset/limit 列表 API」转为数字游标分页函数，供 makeUnifiedInfiniteQuery 使用。

---

## 引入

```ts
import { makeCursorFetchFunction } from "nfx-ui/hooks";
```

---

## 签名

```ts
function makeCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: number, filter?: F) => Promise<ListDTOWithTotalNumber<T>>;
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetchFunc | (params) => Promise&lt;{ items, total }&gt; | 是 | — | 列表 API，params 含 offset、limit。 |
| pageSize | number | 否 | 20 | 每页条数。 |
| postProcess | (data: T[]) => void | 否 | — | 可选。 |

---

## 输入 / 输出

- **输入：** fetchFunc、pageSize、postProcess。
- **输出：** 返回 `(pageParam: number, filter?) => Promise<ListDTOWithTotalNumber<T>>`；offset = pageParam * pageSize。

---

## 示例

```ts
const fetchPage = makeCursorFetchFunction(fetchProductsAPI, 20);
const page0 = await fetchPage(0, { category: "x" });
const page1 = await fetchPage(page0.nextCursor!, { category: "x" });
```
