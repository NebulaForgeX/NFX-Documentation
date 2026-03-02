# EventEmitter

Generic event emitter: subscribe, unsubscribe, and emit by event name. Constructor accepts only the return value of `defineEvents(...)`.

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

---

## Methods: on / off / emit

| Method | Parameter | Type | Required | Default | Description |
|--------|-----------|------|----------|---------|-------------|
| on | event | E | Yes | — | Event name. |
| on | callback | EventCallback | Yes | — | Listener; called when event is emitted. |
| off | event | E | Yes | — | Event name. |
| off | callback | EventCallback | Yes | — | Same reference as passed to `on`. |
| emit | event | E | Yes | — | Event name. |
| emit | ...args | unknown[] | No | — | Arguments passed to all listeners. |

---

## Input / Output

- **on(event, callback):** Input: event name, callback. Output: void — register listener.
- **off(event, callback):** Input: event name, same callback reference as `on`. Output: void — remove listener.
- **emit(event, ...args):** Input: event name, optional args. Output: void — synchronously invoke all callbacks for that event.

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

---

---

# EventEmitter

泛型事件发射器：按事件名注册、注销、触发。构造函数仅接受 `defineEvents(...)` 的返回值。

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

---

## 方法：on / off / emit

| 方法 | 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|------|
| on | event | E | 是 | — | 事件名。 |
| on | callback | EventCallback | 是 | — | 监听器；事件触发时调用。 |
| off | event | E | 是 | — | 事件名。 |
| off | callback | EventCallback | 是 | — | 与传入 `on` 时同一引用。 |
| emit | event | E | 是 | — | 事件名。 |
| emit | ...args | unknown[] | 否 | — | 传给所有监听器的参数。 |

---

## 输入 / 输出

- **on(event, callback)：** 输入：事件名、回调。输出：void — 注册监听。
- **off(event, callback)：** 输入：事件名、与 on 同一引用的回调。输出：void — 移除监听。
- **emit(event, ...args)：** 输入：事件名、可选参数。输出：void — 同步触发该事件所有回调。

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
