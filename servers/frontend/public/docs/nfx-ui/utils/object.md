# omit

Omit specified keys from object; returns new object.

---

## Import

```ts
import { omit } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| obj | object | Yes | — | Source object. |
| keys | Key \| Key[] | Yes | — | Keys to omit (one or more). |

---

## Input / Output

- **Input:** obj (e.g. `{ a: 1, b: 2, c: 3 }`); keys (e.g. `"b"` or `["a","c"]`).
- **Output:** New object without those keys.

---

## Example

```ts
omit({ a: 1, b: 2, c: 3 }, "b");
omit({ a: 1, b: 2, c: 3 }, ["a", "c"]);
```

---

---

# omit — 对象省略键

从对象中省略指定键，返回新对象。

---

## 引入

```ts
import { omit } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| obj | object | 是 | — | 原对象。 |
| keys | Key \| Key[] | 是 | — | 要省略的键（可多个）。 |

---

## 输入 / 输出

- **输入：** obj — 例如 `{ a: 1, b: 2, c: 3 }`；keys — 例如 `"b"` 或 `["a","c"]`。
- **输出：** 新对象，不包含指定键。

---

## 示例

```ts
omit({ a: 1, b: 2, c: 3 }, "b");
omit({ a: 1, b: 2, c: 3 }, ["a", "c"]);
```
