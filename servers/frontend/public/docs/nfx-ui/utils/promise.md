# onceAsync / onceAsyncByKey

Wrap async functions so concurrent calls share one in-flight Promise. After settle, the lock clears and the next call runs again (`onceAsync`) or per-key lock clears (`onceAsyncByKey`).

---

## Import

```ts
import { onceAsync, onceAsyncByKey } from "nfx-ui/utils";
```

---

## onceAsync

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fn | (...args: Args) => Promise&lt;T&gt; | Yes | Original async function. |

- **Input:** Arguments passed to the returned wrapper.
- **Output:** Promise&lt;T&gt; — concurrent calls share one in-flight promise; after settle, next call runs fn again.

---

## onceAsyncByKey

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fn | (...args: Args) => Promise&lt;T&gt; | Yes | Original async function. |
| keyExtractor | (...args: Args) => string | Yes | Extract key from args. |

- **Input:** Same; same key shares in-flight promise until settle.
- **Output:** Promise&lt;T&gt;.

---

## Example

```ts
const loadOnce = onceAsync(() => fetchConfig());
await loadOnce(); await loadOnce(); // concurrent: one request

const loadByUser = onceAsyncByKey(fetchUser, (id) => id);
await loadByUser("1"); await loadByUser("1"); // same id concurrent: one request
```

---

---

# onceAsync / onceAsyncByKey — Promise 并发去重

包装异步函数：并发调用共享同一 in-flight Promise；完成后锁释放，下次调用可再次执行（`onceAsync`）；按 key 分别去重（`onceAsyncByKey`）。

---

## 引入

```ts
import { onceAsync, onceAsyncByKey } from "nfx-ui/utils";
```

---

## onceAsync

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fn | (...args: Args) => Promise&lt;T&gt; | 是 | 原始异步函数。 |

- **输入：** 调用返回的包装函数时传入的参数。
- **输出：** Promise&lt;T&gt; — 并发共享同一 promise；完成后下次调用会重新执行 fn。

---

## onceAsyncByKey

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fn | (...args: Args) => Promise&lt;T&gt; | 是 | 原始异步函数。 |
| keyExtractor | (...args: Args) => string | 是 | 从参数提取 key。 |

- **输入：** 同上；相同 key 并发共享 promise，完成后该 key 可再次请求。
- **输出：** Promise&lt;T&gt;。

---

## 示例

```ts
const loadOnce = onceAsync(() => fetchConfig());
await loadOnce(); await loadOnce(); // 并发：只发一次

const loadByUser = onceAsyncByKey(fetchUser, (id) => id);
await loadByUser("1"); await loadByUser("1"); // 同 id 并发：只发一次
```
