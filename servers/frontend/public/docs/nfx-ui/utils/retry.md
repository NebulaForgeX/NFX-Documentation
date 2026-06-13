# withRetryResult

Execute async fn with async-retry; returns Result. Supports `isNonRetryable` to bail immediately.

---

## Import

```ts
import { withRetryResult } from "nfx-ui/utils";
import type { WithRetryOptions } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fn | (bail, attempt) => Promise&lt;T&gt; | Yes | — | Async function; `bail(e)` aborts retry. |
| opts | WithRetryOptions | No | — | async-retry options + `isNonRetryable?: (e: Error) => boolean`. |

---

## Input / Output

- **Input:** fn, optional opts (retries, minTimeout, factor, isNonRetryable, …).
- **Output:** Promise&lt;Result&lt;T&gt;&gt; — success [data, null]; failure [null, Error].

---

## Example

```ts
const [data, err] = await withRetryResult(
  async (bail, attempt) => {
    const res = await fetch("/api");
    if (res.status === 400) bail(new Error("Bad request"));
    return res.json();
  },
  { retries: 3, isNonRetryable: (e) => e.message === "Bad request" }
);
```

---

---

# withRetryResult — 带重试的异步执行

执行 fn，失败时按 opts 重试（async-retry），返回 Result。支持 `isNonRetryable` 立即 bail。

---

## 引入

```ts
import { withRetryResult } from "nfx-ui/utils";
import type { WithRetryOptions } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fn | (bail, attempt) => Promise&lt;T&gt; | 是 | — | 异步函数；`bail(e)` 可中止重试。 |
| opts | WithRetryOptions | 否 | — | async-retry 选项 + `isNonRetryable?: (e: Error) => boolean`。 |

---

## 输入 / 输出

- **输入：** fn、opts（可选，含 retries、minTimeout、factor、isNonRetryable 等）。
- **输出：** Promise&lt;Result&lt;T&gt;&gt; — 成功 [data, null]，失败 [null, Error]。

---

## 示例

```ts
const [data, err] = await withRetryResult(
  async (bail, attempt) => {
    const res = await fetch("/api");
    if (res.status === 400) bail(new Error("Bad request"));
    return res.json();
  },
  { retries: 3, isNonRetryable: (e) => e.message === "Bad request" }
);
```
