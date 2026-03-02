# createMap

Create Record from readonly array; optional valueMapper for values.

---

## Import

```ts
import { createMap } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| list | ReadonlyArray&lt;T&gt; | Yes | — | Array of keys. |
| valueMapper | (item: T, index: number) => V | No | (x) => x | Value mapper; default key as value. |

---

## Input / Output

- **Input:** list (e.g. `["a", "b", "c"]`); optional valueMapper (e.g. `(k) => k.toUpperCase()`).
- **Output:** Record&lt;T, V&gt; — object mapping each key to value.

---

## Example

```ts
createMap(["a", "b"]);
createMap(["a", "b"], (k) => k.toUpperCase());
```

---

---

# createMap — 运行时映射工具

由只读数组生成 Record&lt;T, V&gt;；可选 valueMapper 指定值。

---

## 引入

```ts
import { createMap } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| list | ReadonlyArray&lt;T&gt; | 是 | — | 键的数组。 |
| valueMapper | (item: T, index: number) => V | 否 | (x) => x | 值映射；不传则 key 即 value。 |

---

## 输入 / 输出

- **输入：** list — 如 `["a", "b", "c"]`；valueMapper（可选）。
- **输出：** Record&lt;T, V&gt; — 如 `{ a: "A", b: "B", c: "C" }`。

---

## 示例

```ts
createMap(["a", "b"]);
createMap(["a", "b"], (k) => k.toUpperCase());
```
