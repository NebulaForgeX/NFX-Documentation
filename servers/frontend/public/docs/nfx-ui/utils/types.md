# createMap / 运行时映射工具

由只读数组生成 Record&lt;T, V&gt；可选 valueMapper 指定值。  
Create Record from readonly array; optional valueMapper for values.

---

## 引入 / Import

```ts
import { createMap } from "nfx-ui/utils";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| list | ReadonlyArray&lt;T&gt; | Yes | — | 键的数组（如字符串字面量联合）。Array of keys. |
| valueMapper | (item: T, index: number) => V | No | (x) => x | 值映射；不传则 key 即 value。Value mapper; default key as value. |

---

## 输入 Input / 输出 Output

- **Input**：list — 如 `["a", "b", "c"]`；valueMapper（可选）— 如 `(k) => k.toUpperCase()`.
- **Output**：Record&lt;T, V&gt; — 如 `{ a: "A", b: "B", c: "C" }`. Object mapping each key to value.

---

## 示例 / Example

```ts
createMap(["a", "b"]);                      // => { a: "a", b: "b" }
createMap(["a", "b"], (k) => k.toUpperCase()); // => { a: "A", b: "B" }
```
