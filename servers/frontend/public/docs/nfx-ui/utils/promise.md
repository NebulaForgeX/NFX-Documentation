# onceAsync / onceAsyncByKey / Promise 单次执行

同一时刻只执行一次 fn，结果复用；或按 key 分别只执行一次。  
Execute fn only once at a time, reuse result; or once per key.

---

## 引入 / Import

```ts
import { onceAsync, onceAsyncByKey } from "nfx-ui";
```

---

## onceAsync

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| fn | (...args: Args) => Promise&lt;T&gt; | Yes | 原始异步函数。Original async function. |

- **Input**：调用返回的包装函数时传入的参数。Arguments passed to the returned wrapper.
- **Output**：Promise&lt;T&gt; — 同一时刻多次调用只执行一次 fn，其余复用同一结果。Multiple concurrent calls run fn once, others get same result.

---

## onceAsyncByKey

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| fn | (...args: Args) => Promise&lt;T&gt; | Yes | 原始异步函数。Original async function. |
| keyExtractor | (...args: Args) => string | Yes | 从参数提取 key。Extract key from args. |

- **Input**：同上；key 相同则复用结果。Same; same key reuses result.
- **Output**：Promise&lt;T&gt;。Promise of T.

---

## 示例 / Example

```ts
const loadOnce = onceAsync(() => fetchConfig());
await loadOnce(); await loadOnce(); // 只请求一次 / only one request

const loadByUser = onceAsyncByKey(fetchUser, (id) => id);
await loadByUser("1"); await loadByUser("1"); // "1" 只请求一次 / "1" only once
```
