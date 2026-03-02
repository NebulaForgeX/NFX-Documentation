# Result / ok / err

Result type for success or failure; ok/err are constructors.

---

## Import

```ts
import { ok, err } from "nfx-ui/utils";
import type { Result } from "nfx-ui/utils";
```

---

## Type

- **Result&lt;T&gt;** = `[T, null] | [null, Error]` — success: [data, null]; failure: [null, Error].

---

## Parameters

| Function | Parameter | Type | Description |
|----------|------------|------|-------------|
| ok | v | T | Success value. |
| err | e | unknown | Error (converted to Error). |

---

## Input / Output

- **ok(v)** — Input: success value v. Output: Result&lt;T&gt;, i.e. [v, null].
- **err(e)** — Input: any exception e. Output: Result&lt;never&gt;, i.e. [null, Error].

---

## Example

```ts
const success = ok(42);
const failure = err(new Error("x"));

const [data, error] = await fetchData().then(ok).catch(err);
if (error) console.error(error);
else console.log(data);
```

---

---

# Result / ok / err — 结果类型

Result 类型表示成功或失败；ok/err 为构造函数。

---

## 引入

```ts
import { ok, err } from "nfx-ui/utils";
import type { Result } from "nfx-ui/utils";
```

---

## 类型

- **Result&lt;T&gt;** = `[T, null] | [null, Error]` — 成功为 [data, null]，失败为 [null, Error]。

---

## 参数

| 函数 | 参数 | 类型 | 说明 |
|------|------|------|------|
| ok | v | T | 成功值。 |
| err | e | unknown | 错误（会转为 Error）。 |

---

## 输入 / 输出

- **ok(v)** — 输入：成功值 v。输出：Result&lt;T&gt;，即 [v, null]。
- **err(e)** — 输入：任意异常 e。输出：Result&lt;never&gt;，即 [null, Error]。

---

## 示例

```ts
const success = ok(42);
const failure = err(new Error("x"));

const [data, error] = await fetchData().then(ok).catch(err);
if (error) console.error(error);
else console.log(data);
```
