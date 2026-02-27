# pollUntil / 轮询直到条件满足

反复调用 fetcher，直到 isOK(data) 为 true 或达到重试上限。  
Poll fetcher until isOK(data) is true or retry limit reached.

---

## 引入 / Import

```ts
import { pollUntil } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fetcher | () => Promise&lt;T&gt; | Yes | — | 拉取函数。Fetch function. |
| isOK | (data: T) => boolean | Yes | — | 条件满足时返回 true。Returns true when condition met. |
| opts | WithRetryOptions | No | — | 重试选项（次数、间隔等）。Retry options. |

---

## 输入 Input / 输出 Output

- **Input**：fetcher、isOK、opts（可选）。fetcher, isOK, optional opts.
- **Output**：Promise&lt;Result&lt;T&gt;&gt; — 成功为 [data, null]，失败为 [null, Error]. Success: [data, null]; failure: [null, Error].

---

## 示例 / Example

```ts
const [data, err] = await pollUntil(
  () => fetchStatus(),
  (d) => d.ready === true,
  { retries: 10 }
);
if (err) console.error(err);
else console.log(data);
```
