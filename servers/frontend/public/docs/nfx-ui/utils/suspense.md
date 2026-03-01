# suspenseIfNull / Suspense 辅助

若 value 为 null/undefined，抛 Promise 触发 Suspense；否则返回 value。  
If value is null/undefined, throw Promise to trigger Suspense; otherwise return value.

---

## 引入 / Import

```ts
import { suspenseIfNull } from "nfx-ui/utils";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| value | T \| null \| undefined | Yes | — | 可能为空的值。Possibly null/undefined value. |
| delay | number | No | 100 | 延迟 ms（用于延迟抛出的 Promise）。Delay in ms before throwing. |

---

## 输入 Input / 输出 Output

- **Input**：value、delay（可选）。value, optional delay.
- **Output**：若 value 非空则返回 value（T）；若为空则抛出 Promise，触发上层 Suspense。Returns value (T) if not null/undefined; otherwise throws Promise for Suspense.

---

## 示例 / Example

```ts
// 在组件内 / In component
const data = suspenseIfNull(cache.get(key));
// 若 cache 无数据会 suspend，有数据则渲染 / If no data, suspends; else render
```
