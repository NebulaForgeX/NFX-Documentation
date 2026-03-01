# Events 模块文档 / Events Module Documentation

本模块提供通用 EventEmitter、defineEvents；各域发射器由应用自行基于 EventEmitter 实现。  
This module provides the generic EventEmitter and defineEvents; domain emitters are implemented by the app.

**说明**：Events **从 nfx-ui 主包导出**，业务项目可直接从 `nfx-ui` 引用。  
Note: Events **are exported from the main `nfx-ui` package**; use `import { EventEmitter, defineEvents } from "nfx-ui"` in your app.

---

## 入口 / Entry

**从 nfx-ui 引用（业务项目）/ From nfx-ui (consuming app):**

```ts
import type { EventCallback, EventNamesOf, DefinedEvents } from "nfx-ui";
import { defineEvents, EventEmitter } from "nfx-ui";
```

**本仓库内 / In this repo:**

```ts
import type { EventCallback, EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";
```

---

## 1. EventEmitter（通用事件发射器）

泛型类：接受事件名字面量联合类型 `E`，提供 `on` / `off` / `emit`。  
Generic class: accepts a string union of event names `E`, provides `on` / `off` / `emit`.

### 构造函数 / Constructor

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| events | Record&lt;string, E&gt; | Yes | 事件名 key-value 对象，如 `{ FOO: "DOMAIN:FOO", BAR: "DOMAIN:BAR" }`. Event name key-value object. |

**Input**：events 对象。**Output**：无；构造后可调用 on/off/emit.

### on / off / emit

| 方法 Method | 参数 Parameters | 输入 Input | 输出 Output |
|-------------|-----------------|------------|-------------|
| on | event: E, callback: EventCallback | 事件名、回调。Event name, callback. | void — 注册监听。Register listener. |
| off | event: E, callback: EventCallback | 事件名、与 on 同一引用的回调。Same reference as on. | void — 移除监听。Remove listener. |
| emit | event: E, ...args: unknown[] | 事件名、参数。Event name, args. | void — 同步触发该事件所有回调。Sync invoke all callbacks. |

### Example（自定义 EventEmitter）

```ts
import type { EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";

const events = defineEvents({ FOO: "MY:FOO", BAR: "MY:BAR" });
type MyEvent = EventNamesOf<typeof events>;

class MyEmitter extends EventEmitter<MyEvent> {
  constructor() {
    super(events);
  }
}

const emitter = new MyEmitter();
emitter.on(events.FOO, (msg: unknown) => console.log(msg));
emitter.emit(events.FOO, "hello");
emitter.off(events.FOO, callback);
```

---

## 2. EventCallback 类型

```ts
type EventCallback = (...args: unknown[]) => void;
```

用于 `EventEmitter#on` / `off` 的回调类型。

---

## 类型速查 / Type Reference

| 类型               | 说明                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `EventCallback`    | `(...args: unknown[]) => void`，用于 `on` / `off`。                  |
| `EventEmitter<E>`  | 泛型事件发射器，`E` 为事件名字面量联合类型。                          |
| `DefinedEvents<T>` | 由 defineEvents 返回的类型。                                        |
| `EventNamesOf<T>`  | 从 events 对象推导事件名联合类型。                                   |
| `defineEvents(events)` | 规范创建事件名对象并返回 DefinedEvents<T>；仅一级 key-value。   |

---

## 扩展 EventEmitter 的约定（应用内自建各域发射器时）

1. 用 `defineEvents({ ... })` 定义并导出事件名对象（仅一级 key-value，value 为字符串）。
2. 导出类型：`type MyEvent = EventNamesOf<typeof myEvents>`。
3. 子类：`class MyEventEmitter extends EventEmitter<MyEvent> { constructor() { super(myEvents); } }`。
4. 若需单例，使用 `singleton(MyEventEmitter)` 再 `new` 导出。
