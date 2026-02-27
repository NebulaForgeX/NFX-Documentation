# omit / 对象省略键

从对象中省略指定键，返回新对象。  
Omit specified keys from object; returns new object.

---

## 引入 / Import

```ts
import { omit } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| obj | object | Yes | — | 原对象。Source object. |
| keys | Key \| Key[] | Yes | — | 要省略的键（可多个）。Keys to omit (one or more). |

---

## 输入 Input / 输出 Output

- **Input**：obj — 例如 `{ a: 1, b: 2, c: 3 }`；keys — 例如 `"b"` 或 `["a","c"]`。
- **Output**：新对象，不包含指定键。New object without those keys. 例：`omit({ a:1, b:2, c:3 }, "b")` => `{ a:1, c:3 }`.

---

## 示例 / Example

```ts
omit({ a: 1, b: 2, c: 3 }, "b");        // => { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ["a", "c"]); // => { b: 2 }
```
