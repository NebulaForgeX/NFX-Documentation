# makeStringCursorFetchFunction

Converts string-cursor list API to (pageParam: string, filter?) => ListDTOWithNextCursor.

---

## Import

```ts
import { makeStringCursorFetchFunction } from "nfx-ui/hooks";
```

---

## Signature

```ts
function makeStringCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchStringListParams<F>) => Promise<ListDTOWithNextCursor<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: string, filter?: F) => Promise<ListDTOWithNextCursor<T>>;
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetchFunc | (params) => Promise&lt;ListDTOWithNextCursor&lt;T&gt;&gt; | Yes | — | params include offset (string), limit. |
| pageSize | number | No | 20 | Page size. |
| postProcess | (data: T[]) => void | No | — | Optional. |

---

## Input / Output

- **Input:** fetchFunc, pageSize, postProcess.
- **Output:** Returns async function `(pageParam: string, filter?) => Promise<ListDTOWithNextCursor<T>>`.

---

## Example

```ts
const fetchByToken = makeStringCursorFetchFunction(fetchAPIByToken, 20);
const page = await fetchByToken("", { q: "x" });
if (page.nextCursor) await fetchByToken(page.nextCursor, { q: "x" });
```

---

---

# makeStringCursorFetchFunction — 字符串游标分页函数

将「字符串游标列表 API」转为 (pageParam: string, filter?) => ListDTOWithNextCursor。

---

## 引入

```ts
import { makeStringCursorFetchFunction } from "nfx-ui/hooks";
```

---

## 签名

```ts
function makeStringCursorFetchFunction<T, F extends object = Record<string, unknown>>(
  fetchFunc: (params: FetchStringListParams<F>) => Promise<ListDTOWithNextCursor<T>>,
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (pageParam: string, filter?: F) => Promise<ListDTOWithNextCursor<T>>;
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetchFunc | (params) => Promise&lt;ListDTOWithNextCursor&lt;T&gt;&gt; | 是 | — | params 含 offset (string)、limit。 |
| pageSize | number | 否 | 20 | 每页条数。 |
| postProcess | (data: T[]) => void | 否 | — | 可选。 |

---

## 输入 / 输出

- **输入：** fetchFunc、pageSize、postProcess。
- **输出：** 返回 `(pageParam: string, filter?) => Promise<ListDTOWithNextCursor<T>>`。

---

## 示例

```ts
const fetchByToken = makeStringCursorFetchFunction(fetchAPIByToken, 20);
const page = await fetchByToken("", { q: "x" });
if (page.nextCursor) await fetchByToken(page.nextCursor, { q: "x" });
```
