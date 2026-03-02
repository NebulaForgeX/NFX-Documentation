# defineEvents

Creates a typed events object (one-level key-value, string values only). Return value is the only type accepted by `EventEmitter` constructor.

---

## Import

```ts
import { defineEvents } from "nfx-ui/events";
import type { DefinedEvents, EventNamesOf } from "nfx-ui/events";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| events | Record&lt;string, string&gt; | Yes | — | Event name key-value object, e.g. `{ FOO: "DOMAIN:FOO", BAR: "DOMAIN:BAR" }`. One-level only; no nested objects. |

---

## Input / Output

- **Input:** events — plain object mapping logical names to event name strings.
- **Output:** DefinedEvents&lt;E&gt; — typed events object; pass to `new EventEmitter(events)`.

---

## Related types

| Type | Description |
|------|-------------|
| DefinedEvents&lt;T&gt; | Return type of defineEvents; only type accepted by EventEmitter constructor. |
| EventNamesOf&lt;T&gt; | Derive event name union from events object (e.g. `"MY:FOO" \| "MY:BAR"`). |
| EventCallback | `(...args: unknown[]) => void`; used for `on` / `off` callbacks. |

---

## Example

```ts
const events = defineEvents({ FOO: "MY:FOO", BAR: "MY:BAR" });
type MyEvent = EventNamesOf<typeof events>;
// Use events in EventEmitter constructor: new EventEmitter(events)
```

---

---

# defineEvents

规范创建「一级 key-value」事件名对象（仅字符串值）。返回值是唯一可传入 `EventEmitter` 构造函数的类型。

---

## 引入

```ts
import { defineEvents } from "nfx-ui/events";
import type { DefinedEvents, EventNamesOf } from "nfx-ui/events";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| events | Record&lt;string, string&gt; | 是 | — | 事件名 key-value 对象，如 `{ FOO: "DOMAIN:FOO", BAR: "DOMAIN:BAR" }`。仅一级，禁止嵌套。 |

---

## 输入 / 输出

- **输入：** events — 逻辑名到事件名字符串的映射对象。
- **输出：** DefinedEvents&lt;E&gt; — 类型化事件对象；传入 `new EventEmitter(events)`。

---

## 相关类型

| 类型 | 说明 |
|------|------|
| DefinedEvents&lt;T&gt; | defineEvents 的返回类型；EventEmitter 构造函数仅接受此类型。 |
| EventNamesOf&lt;T&gt; | 从 events 对象推导事件名联合类型（如 `"MY:FOO" \| "MY:BAR"`）。 |
| EventCallback | `(...args: unknown[]) => void`；用于 `on` / `off` 的回调。 |

---

## 示例

```ts
const events = defineEvents({ FOO: "MY:FOO", BAR: "MY:BAR" });
type MyEvent = EventNamesOf<typeof events>;
// 将 events 传入 EventEmitter 构造函数：new EventEmitter(events)
```
