# makeStringCursorFetchFunction

将「字符串游标列表 API」转为 (pageParam: string, filter?) => ListDTOWithNextCursor。  
Converts string-cursor list API to (pageParam: string, filter?) => ListDTOWithNextCursor.

## 引入

```ts
import { makeStringCursorFetchFunction } from "nfx-ui/hooks";
```

## 签名 / Signature

```ts
function makeStringCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchStringListParams<F>) => Promise<ListDTOWithNextCursor<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: string, filter?: F) => Promise<ListDTOWithNextCursor<T>>;
```

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fetchFunc | (params) => Promise&lt;ListDTOWithNextCursor&lt;T&gt;&gt; | Yes | — | params 含 offset (string)、limit. |
| pageSize | number | No | 20 | 每页条数。Page size. |
| postProcess | (data: T[]) => void | No | — | 可选。Optional. |

## 输入 Input / 输出 Output

- **Input**：fetchFunc、pageSize、postProcess。fetchFunc, pageSize, postProcess.
- **Output**：返回 `(pageParam: string, filter?) => Promise<ListDTOWithNextCursor<T>>`。Returns async function.

## 示例 / Example

```ts
const fetchByToken = makeStringCursorFetchFunction(fetchAPIByToken, 20);
const page = await fetchByToken("", { q: "x" });
if (page.nextCursor) await fetchByToken(page.nextCursor, { q: "x" });
```
