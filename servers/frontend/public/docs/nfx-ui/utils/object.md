# omit

Omit specified keys from object; returns new object (does not mutate source). Supports array of keys or rest args.

---

## Import

```ts
import { omit } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| obj | Obj | Yes | — | Source object. |
| keys | Key \| Key[] | Yes | — | Key(s) to omit. |
| ...restKeys | Key | No | — | Additional keys when first arg is single Key. |

---

## Input / Output

- **Input:** obj; keys as array or single key + rest keys.
- **Output:** Omit&lt;Obj, Key&gt; — new object without those keys.

---

## Example

```ts
omit({ a: 1, b: 2, c: 3 }, "b");           // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ["a", "c"]);    // { b: 2 }
omit({ a: 1, b: 2, c: 3 }, "a", "b");      // { c: 3 }
```

---

---

# omit — 对象省略键

从对象中剔除指定键，返回新对象（不修改原对象）。支持键数组或 rest 参数。

---

## 引入

```ts
import { omit } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| obj | Obj | 是 | — | 源对象。 |
| keys | Key \| Key[] | 是 | — | 要剔除的键。 |
| ...restKeys | Key | 否 | — | 第一个参数为单个 Key 时可再接多个键。 |

---

## 输入 / 输出

- **输入：** obj；keys 为数组或单键 + rest。
- **输出：** Omit&lt;Obj, Key&gt; — 不含指定键的新对象。

---

## 示例

```ts
omit({ a: 1, b: 2, c: 3 }, "b");           // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ["a", "c"]);    // { b: 2 }
omit({ a: 1, b: 2, c: 3 }, "a", "b");      // { c: 3 }
```
