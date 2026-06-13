# makeCursorFetchFunction

Converts offset/limit list API to number-cursor fetcher for infinite query. `offset = pageParam * pageSize`.

---

## Import

```ts
import { makeCursorFetchFunction } from "nfx-ui/hooks";
import type { FetchNumberListParams } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";
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

Also exports `makeStringCursorFetchFunction` from the same module — see [make-string-cursor-fetch-function.md](./make-string-cursor-fetch-function.md).

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetchFunc | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | Yes | — | List API; params include offset, limit. |
| pageSize | number | No | 20 | Page size. |
| postProcess | (data: T[]) => void | No | — | Optional; called when items.length &gt; 0. |

---

## Input / Output

- **Input:** fetchFunc, pageSize, postProcess.
- **Output:** `(pageParam: number = 0, filter?) => Promise<ListDTOWithTotalNumber<T>>` — returns `{ items, total }`; offset = pageParam × pageSize.

---

## Example

```ts
const fetchPage = makeCursorFetchFunction(fetchProductsAPI, 20);
const page0 = await fetchPage(0, { category: "x" });
// => { items, total }
const page1 = await fetchPage(1, { category: "x" });
// next page: pageParam 1 → offset 20 when pageSize=20
```

---

---

# makeCursorFetchFunction — 数字游标分页函数

将「offset/limit 列表 API」转为数字游标分页函数，供 makeUnifiedInfiniteQuery 使用。`offset = pageParam * pageSize`。

---

## 引入

```ts
import { makeCursorFetchFunction } from "nfx-ui/hooks";
import type { FetchNumberListParams } from "nfx-ui/hooks";
import type { ListDTOWithTotalNumber } from "nfx-ui/types";
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

同模块还导出 `makeStringCursorFetchFunction` — 见 [make-string-cursor-fetch-function.md](./make-string-cursor-fetch-function.md)。

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetchFunc | (params: FetchNumberListParams&lt;F&gt;) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | 是 | — | 列表 API，params 含 offset、limit。 |
| pageSize | number | 否 | 20 | 每页条数。 |
| postProcess | (data: T[]) => void | 否 | — | 可选；items.length &gt; 0 时调用。 |

---

## 输入 / 输出

- **输入：** fetchFunc、pageSize、postProcess。
- **输出：** `(pageParam: number = 0, filter?) => Promise<ListDTOWithTotalNumber<T>>` — 返回 `{ items, total }`；offset = pageParam × pageSize。

---

## 示例

```ts
const fetchPage = makeCursorFetchFunction(fetchProductsAPI, 20);
const page0 = await fetchPage(0, { category: "x" });
// => { items, total }
const page1 = await fetchPage(1, { category: "x" });
// 下一页：pageParam 1 → offset 20（pageSize=20 时）
```
