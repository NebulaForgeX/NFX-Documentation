# withRetryResult

Execute fn, retry on failure per opts, return Result.

---

## Import

```ts
import { withRetryResult } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fn | (bail, attempt) => Promise&lt;T&gt; | Yes | — | Function; bail(e) aborts retry. |
| opts | WithRetryOptions | No | — | Retry options (retries, minTimeout, factor, etc.). |

---

## Input / Output

- **Input:** fn, optional opts.
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
  { retries: 3 }
);
```

---

---

# withRetryResult — 带重试的异步执行

执行 fn，失败时按 opts 重试，返回 Result。

---

## 引入

```ts
import { withRetryResult } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fn | (bail, attempt) => Promise&lt;T&gt; | 是 | — | 执行函数；bail(e) 可中止重试。 |
| opts | WithRetryOptions | 否 | — | retries、minTimeout、factor 等。 |

---

## 输入 / 输出

- **输入：** fn、opts（可选）。
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
  { retries: 3 }
);
```
