# Result / ok / err / 结果类型

Result 类型表示成功或失败；ok/err 为构造函数。  
Result type for success or failure; ok/err are constructors.

---

## 引入 / Import

```ts
import { ok, err } from "nfx-ui";
import type { Result } from "nfx-ui";
```

---

## 类型 / Type

- **Result&lt;T&gt;** = `[T, null] | [null, Error]` — 成功为 [data, null]，失败为 [null, Error].  
  Success: [data, null]; failure: [null, Error].

---

## 参数 / Parameters

| 函数 Function | 参数 Parameter | 类型 Type | 说明 Description |
|---------------|----------------|-----------|------------------|
| ok | v | T | 成功值。Success value. |
| err | e | unknown | 错误（会转为 Error）。Error (converted to Error). |

---

## 输入 Input / 输出 Output

- **ok(v)**  
  - Input：成功值 v。Success value v.  
  - Output：Result&lt;T&gt;，即 [v, null]. [v, null].

- **err(e)**  
  - Input：任意异常 e。Any exception e.  
  - Output：Result&lt;never&gt;，即 [null, Error]. [null, Error].

---

## 示例 / Example

```ts
const success = ok(42);       // => [42, null]
const failure = err(new Error("x")); // => [null, Error]

const [data, error] = await fetchData().then(ok).catch(err);
if (error) console.error(error);
else console.log(data);
```
