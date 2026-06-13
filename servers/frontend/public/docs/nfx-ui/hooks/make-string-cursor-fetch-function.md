# makeStringCursorFetchFunction

Converts string-cursor list API to `(pageParam: string, filter?) => ListDTOWithNextCursor`. `offset` param receives the cursor string.

---

## Import

```ts
import { makeStringCursorFetchFunction } from "nfx-ui/hooks";
import type { FetchStringListParams } from "nfx-ui/hooks";
import type { ListDTOWithNextCursor } from "nfx-ui/types";
```

Exported from `src/hooks/makeCursorFetchFunction.tsx` alongside `makeCursorFetchFunction`.

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
| fetchFunc | (params: FetchStringListParams&lt;F&gt;) => Promise&lt;ListDTOWithNextCursor&lt;T&gt;&gt; | Yes | — | params include offset (string cursor), limit. |
| pageSize | number | No | 20 | Page size. |
| postProcess | (data: T[]) => void | No | — | Optional; called when items.length &gt; 0. |

---

## Input / Output

- **Input:** fetchFunc, pageSize, postProcess.
- **Output:** `(pageParam: string = "", filter?) => Promise<ListDTOWithNextCursor<T>>` — returns `{ items, nextCursor }`.

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

将「字符串游标列表 API」转为 `(pageParam: string, filter?) => ListDTOWithNextCursor`。请求参数 `offset` 为游标字符串。

---

## 引入

```ts
import { makeStringCursorFetchFunction } from "nfx-ui/hooks";
import type { FetchStringListParams } from "nfx-ui/hooks";
import type { ListDTOWithNextCursor } from "nfx-ui/types";
```

与 `makeCursorFetchFunction` 同文件导出：`src/hooks/makeCursorFetchFunction.tsx`。

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
| fetchFunc | (params: FetchStringListParams&lt;F&gt;) => Promise&lt;ListDTOWithNextCursor&lt;T&gt;&gt; | 是 | — | params 含 offset（字符串游标）、limit。 |
| pageSize | number | 否 | 20 | 每页条数。 |
| postProcess | (data: T[]) => void | 否 | — | 可选；items.length &gt; 0 时调用。 |

---

## 输入 / 输出

- **输入：** fetchFunc、pageSize、postProcess。
- **输出：** `(pageParam: string = "", filter?) => Promise<ListDTOWithNextCursor<T>>` — 返回 `{ items, nextCursor }`。

---

## 示例

```ts
const fetchByToken = makeStringCursorFetchFunction(fetchAPIByToken, 20);
const page = await fetchByToken("", { q: "x" });
if (page.nextCursor) await fetchByToken(page.nextCursor, { q: "x" });
```
