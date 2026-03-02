# pollUntil

Poll fetcher until isOK(data) is true or retry limit reached.

---

## Import

```ts
import { pollUntil } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetcher | () => Promise&lt;T&gt; | Yes | — | Fetch function. |
| isOK | (data: T) => boolean | Yes | — | Returns true when condition met. |
| opts | WithRetryOptions | No | — | Retry options. |

---

## Input / Output

- **Input:** fetcher, isOK, optional opts.
- **Output:** Promise&lt;Result&lt;T&gt;&gt; — success [data, null]; failure [null, Error].

---

## Example

```ts
const [data, err] = await pollUntil(
  () => fetchStatus(),
  (d) => d.ready === true,
  { retries: 10 }
);
if (err) console.error(err);
else console.log(data);
```

---

---

# pollUntil — 轮询直到条件满足

反复调用 fetcher，直到 isOK(data) 为 true 或达到重试上限。

---

## 引入

```ts
import { pollUntil } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetcher | () => Promise&lt;T&gt; | 是 | — | 拉取函数。 |
| isOK | (data: T) => boolean | 是 | — | 条件满足时返回 true。 |
| opts | WithRetryOptions | 否 | — | 重试选项（次数、间隔等）。 |

---

## 输入 / 输出

- **输入：** fetcher、isOK、opts（可选）。
- **输出：** Promise&lt;Result&lt;T&gt;&gt; — 成功为 [data, null]，失败为 [null, Error]。

---

## 示例

```ts
const [data, err] = await pollUntil(
  () => fetchStatus(),
  (d) => d.ready === true,
  { retries: 10 }
);
if (err) console.error(err);
else console.log(data);
```
