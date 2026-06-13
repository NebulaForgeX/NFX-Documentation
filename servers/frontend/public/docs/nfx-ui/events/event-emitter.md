# EventEmitter

Generic event emitter: subscribe, unsubscribe, and emit by event name. Constructor accepts only the return value of `defineEvents(...)`.

Without a `PayloadMap` generic, defaults to `Record<E, unknown>` — each event may have no args or one `(unknown)` arg. With `PayloadMap`, args are strict: `void` (no args), single type `T` (one arg), or tuple `[A, B, ...]` (multi args).

---

## Import

```ts
import { EventEmitter } from "nfx-ui/events";
import type { EventNamesOf } from "nfx-ui/events";
```

---

## Constructor

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| events | DefinedEvents&lt;Record&lt;string, E&gt;&gt; | Yes | — | Return value of `defineEvents({ ... })`. Event name key-value object. |

**Generic:** `EventEmitter<E extends string, PayloadMap extends Record<E, unknown> = Record<E, unknown>>`

---

## Methods: on / off / emit

| Method | Parameter | Type | Required | Default | Description |
|--------|-----------|------|----------|---------|-------------|
| on | event | E | Yes | — | Event name. |
| on | callback | EventCallback | Yes | — | Listener; called when event is emitted. |
| off | event | E | Yes | — | Event name. |
| off | callback | EventCallback | Yes | — | Same reference as passed to `on`. |
| emit | event | E | Yes | — | Event name. |
| emit | ...args | ToArgs&lt;PayloadMap[K]&gt; | No | — | Args match PayloadMap[K]: void → none, T → one, [A,B] → spread. |

---

## Input / Output

- **on(event, callback):** Input: event name, callback. Output: void — register listener.
- **off(event, callback):** Input: event name, same callback reference as `on`. Output: void — remove listener.
- **emit(event, ...args):** Input: event name, optional args per PayloadMap. Output: void — synchronously invoke all callbacks for that event.

---

## Example

```ts
import type { EventNamesOf } from "nfx-ui/events";
import { defineEvents, EventEmitter } from "nfx-ui/events";

const events = defineEvents({ FOO: "MY:FOO", BAR: "MY:BAR" });
type MyEvent = EventNamesOf<typeof events>;

class MyEmitter extends EventEmitter<MyEvent> {
  constructor() {
    super(events);
  }
}

const emitter = new MyEmitter();
const callback = (msg: unknown) => console.log(msg);
emitter.on(events.FOO, callback);
emitter.emit(events.FOO, "hello");
emitter.off(events.FOO, callback);
```

**With PayloadMap:**

```ts
type PayloadMap = { FOO: string; LOG: [string, number] };
class StrictEmitter extends EventEmitter<MyEvent, PayloadMap> {
  constructor() { super(events); }
}
const em = new StrictEmitter();
em.on(events.FOO, (x) => console.log(x));
em.emit(events.FOO, "hi");
em.on(events.LOG, (msg, level) => {});
em.emit(events.LOG, "ok", 1);
```

---

---

# EventEmitter

泛型事件发射器：按事件名注册、注销、触发。构造函数仅接受 `defineEvents(...)` 的返回值。

不传 `PayloadMap` 时默认为 `Record<E, unknown>`，每个事件可无参或单参 `(unknown)`。传 `PayloadMap` 时可精确到：`void`（无参）、单类型 `T`（单参）、元组 `[A, B, ...]`（多参）。

---

## 引入

```ts
import { EventEmitter } from "nfx-ui/events";
import type { EventNamesOf } from "nfx-ui/events";
```

---

## 构造函数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| events | DefinedEvents&lt;Record&lt;string, E&gt;&gt; | 是 | — | `defineEvents({ ... })` 的返回值。事件名 key-value 对象。 |

**泛型：** `EventEmitter<E extends string, PayloadMap extends Record<E, unknown> = Record<E, unknown>>`

---

## 方法：on / off / emit

| 方法 | 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|------|
| on | event | E | 是 | — | 事件名。 |
| on | callback | EventCallback | 是 | — | 监听器；事件触发时调用。 |
| off | event | E | 是 | — | 事件名。 |
| off | callback | EventCallback | 是 | — | 与传入 `on` 时同一引用。 |
| emit | event | E | 是 | — | 事件名。 |
| emit | ...args | ToArgs&lt;PayloadMap[K]&gt; | 否 | — | 与 PayloadMap[K] 一致：void 无参，T 单参，[A,B] 展开。 |

---

## 输入 / 输出

- **on(event, callback)：** 输入：事件名、回调。输出：void — 注册监听。
- **off(event, callback)：** 输入：事件名、与 on 同一引用的回调。输出：void — 移除监听。
- **emit(event, ...args)：** 输入：事件名、按 PayloadMap 的可选参数。输出：void — 同步触发该事件所有回调。

---

## 示例

```ts
import type { EventNamesOf } from "nfx-ui/events";
import { defineEvents, EventEmitter } from "nfx-ui/events";

const events = defineEvents({ FOO: "MY:FOO", BAR: "MY:BAR" });
type MyEvent = EventNamesOf<typeof events>;

class MyEmitter extends EventEmitter<MyEvent> {
  constructor() {
    super(events);
  }
}

const emitter = new MyEmitter();
const callback = (msg: unknown) => console.log(msg);
emitter.on(events.FOO, callback);
emitter.emit(events.FOO, "hello");
emitter.off(events.FOO, callback);
```

**带 PayloadMap：**

```ts
type PayloadMap = { FOO: string; LOG: [string, number] };
class StrictEmitter extends EventEmitter<MyEvent, PayloadMap> {
  constructor() { super(events); }
}
const em = new StrictEmitter();
em.on(events.FOO, (x) => console.log(x));
em.emit(events.FOO, "hi");
em.on(events.LOG, (msg, level) => {});
em.emit(events.LOG, "ok", 1);
```
