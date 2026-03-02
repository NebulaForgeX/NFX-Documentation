# onceAsync / onceAsyncByKey

Execute fn only once at a time, reuse result; or once per key.

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
- **Output:** Promise&lt;T&gt; — multiple concurrent calls run fn once, others get same result.

---

## onceAsyncByKey

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fn | (...args: Args) => Promise&lt;T&gt; | Yes | Original async function. |
| keyExtractor | (...args: Args) => string | Yes | Extract key from args. |

- **Input:** Same; same key reuses result.
- **Output:** Promise&lt;T&gt;.

---

## Example

```ts
const loadOnce = onceAsync(() => fetchConfig());
await loadOnce(); await loadOnce();

const loadByUser = onceAsyncByKey(fetchUser, (id) => id);
await loadByUser("1"); await loadByUser("1");
```

---

---

# onceAsync / onceAsyncByKey — Promise 单次执行

同一时刻只执行一次 fn，结果复用；或按 key 分别只执行一次。

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
- **输出：** Promise&lt;T&gt; — 同一时刻多次调用只执行一次 fn，其余复用同一结果。

---

## onceAsyncByKey

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fn | (...args: Args) => Promise&lt;T&gt; | 是 | 原始异步函数。 |
| keyExtractor | (...args: Args) => string | 是 | 从参数提取 key。 |

- **输入：** 同上；key 相同则复用结果。
- **输出：** Promise&lt;T&gt;。

---

## 示例

```ts
const loadOnce = onceAsync(() => fetchConfig());
await loadOnce(); await loadOnce();

const loadByUser = onceAsyncByKey(fetchUser, (id) => id);
await loadByUser("1"); await loadByUser("1");
```
