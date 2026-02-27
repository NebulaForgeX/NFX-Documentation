# makeCursorFetchFunction

将「offset/limit 列表 API」转为数字游标分页函数，供 makeUnifiedInfiniteQuery 使用。  
Converts offset/limit list API to number-cursor fetcher for infinite query.

## 引入

```ts
import { makeCursorFetchFunction } from "nfx-ui";
```

## 签名 / Signature

```ts
function makeCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: number, filter?: F) => Promise<ListDTOWithTotalNumber<T>>;
```

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fetchFunc | (params) => Promise&lt;{ items, total }&gt; | Yes | — | 列表 API，params 含 offset、limit. |
| pageSize | number | No | 20 | 每页条数。Page size. |
| postProcess | (data: T[]) => void | No | — | 可选。Optional. |

## 输入 Input / 输出 Output

- **Input**：fetchFunc、pageSize、postProcess。fetchFunc, pageSize, postProcess.
- **Output**：返回 `(pageParam: number, filter?) => Promise<ListDTOWithTotalNumber<T>>`；offset = pageParam * pageSize。Returns async function; offset = pageParam * pageSize.

## 示例 / Example

```ts
const fetchPage = makeCursorFetchFunction(fetchProductsAPI, 20);
const page0 = await fetchPage(0, { category: "x" });
const page1 = await fetchPage(page0.nextCursor!, { category: "x" });
```
