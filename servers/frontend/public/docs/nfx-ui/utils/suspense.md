# suspenseIfNull

If value is null/undefined, throw Promise to trigger Suspense; otherwise return value.

---

## Import

```ts
import { suspenseIfNull } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | T \| null \| undefined | Yes | — | Possibly null/undefined value. |
| delay | number | No | 100 | Delay in ms before throwing. |

---

## Input / Output

- **Input:** value, optional delay.
- **Output:** Returns value (T) if not null/undefined; otherwise throws Promise for Suspense.

---

## Example

```ts
const data = suspenseIfNull(cache.get(key));
```

---

---

# suspenseIfNull — Suspense 辅助

若 value 为 null/undefined，抛 Promise 触发 Suspense；否则返回 value。

---

## 引入

```ts
import { suspenseIfNull } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | T \| null \| undefined | 是 | — | 可能为空的值。 |
| delay | number | 否 | 100 | 延迟 ms（用于延迟抛出的 Promise）。 |

---

## 输入 / 输出

- **输入：** value、delay（可选）。
- **输出：** 若 value 非空则返回 value（T）；若为空则抛出 Promise，触发上层 Suspense。

---

## 示例

```ts
const data = suspenseIfNull(cache.get(key));
```
