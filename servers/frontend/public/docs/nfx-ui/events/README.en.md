# Events Module Documentation

This module provides only the generic EventEmitter; domain emitters are implemented by the app.  
**Note:** Events are exported from **`nfx-ui/events`**; in consuming apps use `import ... from "nfx-ui/events"`. In repo you can use `@/events`.

---

## Entry

Exported from `@/events`.

```ts
import type { EventCallback, EventNamesOf } from "@/events";
import { defineEvents, EventEmitter } from "@/events";
```

---

See the main [README.md](./README.md) for EventEmitter API, examples, and type reference.
