# Events module

This module provides the generic EventEmitter and defineEvents; domain emitters are implemented by the app. Events are exported from **`nfx-ui/events`**; use `import { EventEmitter, defineEvents } from "nfx-ui/events"` in your app.

---

## Entry

**From nfx-ui/events (consuming app):**

```ts
import type { EventCallback, EventNamesOf, DefinedEvents } from "nfx-ui/events";
import { defineEvents, EventEmitter } from "nfx-ui/events";
```

**In this repo:**

```ts
import type { EventCallback, EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";
```

## Docs

| File | Description |
|------|-------------|
| [define-events.md](./define-events.md) | defineEvents(), DefinedEvents, EventNamesOf, EventCallback |
| [event-emitter.md](./event-emitter.md) | EventEmitter class: constructor, on, off, emit |

---

## Convention for extending EventEmitter (in your app)

1. Use `defineEvents({ ... })` to define and export event names (one-level key-value, value is string).
2. Export type: `type MyEvent = EventNamesOf<typeof myEvents>`.
3. Subclass: `class MyEventEmitter extends EventEmitter<MyEvent> { constructor() { super(myEvents); } }`.
4. For singleton, use `singleton(MyEventEmitter)` then export after `new`.

---

---

# Events 模块

本模块提供通用 EventEmitter、defineEvents；各域发射器由应用自行基于 EventEmitter 实现。Events 从 **`nfx-ui/events`** 子路径导出，业务项目使用 `import ... from "nfx-ui/events"`。

---

## 入口

**从 nfx-ui/events 引用（业务项目）：**

```ts
import type { EventCallback, EventNamesOf, DefinedEvents } from "nfx-ui/events";
import { defineEvents, EventEmitter } from "nfx-ui/events";
```

**本仓库内：**

```ts
import type { EventCallback, EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";
```

## 文档

| 文件 | 说明 |
|------|------|
| [define-events.md](./define-events.md) | defineEvents()、DefinedEvents、EventNamesOf、EventCallback |
| [event-emitter.md](./event-emitter.md) | EventEmitter 类：构造函数、on、off、emit |

---

## 扩展 EventEmitter 的约定（应用内自建各域发射器时）

1. 用 `defineEvents({ ... })` 定义并导出事件名对象（仅一级 key-value，value 为字符串）。
2. 导出类型：`type MyEvent = EventNamesOf<typeof myEvents>`。
3. 子类：`class MyEventEmitter extends EventEmitter<MyEvent> { constructor() { super(myEvents); } }`。
4. 若需单例，使用 `singleton(MyEventEmitter)` 再 `new` 导出。
