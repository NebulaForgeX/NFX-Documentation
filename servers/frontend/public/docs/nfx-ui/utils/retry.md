# withRetryResult / 带重试的异步执行

执行 fn，失败时按 opts 重试，返回 Result。  
Execute fn, retry on failure per opts, return Result.

---

## 引入 / Import

```ts
import { withRetryResult } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fn | (bail, attempt) => Promise&lt;T&gt; | Yes | — | 执行函数；bail(e) 可中止重试。Function; bail(e) aborts retry. |
| opts | WithRetryOptions | No | — | retries、minTimeout、factor 等（async-retry 选项）。Retry options. |

---

## 输入 Input / 输出 Output

- **Input**：fn、opts（可选）。fn, optional opts.
- **Output**：Promise&lt;Result&lt;T&gt;&gt; — 成功 [data, null]，失败 [null, Error]. Success [data, null]; failure [null, Error].

---

## 示例 / Example

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
