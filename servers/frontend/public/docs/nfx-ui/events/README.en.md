# Events Module Documentation

This module provides only the generic EventEmitter; domain emitters are implemented by the app.  
**Note:** Events are not exported from the main `nfx-ui` package; use `@/events` only inside this repo or monorepo.

---

## Entry

Exported from `@/events`.

```ts
import type { EventCallback, EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";
```

---

See the main [README.md](./README.md) for EventEmitter API, examples, and type reference.
