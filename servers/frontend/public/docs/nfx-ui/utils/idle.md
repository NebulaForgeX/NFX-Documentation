# idle — browser idle scheduling

## `scheduleBrowserIdleTask`

Run a task during the browser's idle time slice via `requestIdleCallback` to avoid competing with animations/layout on the main thread. Falls back to `setTimeout(0)` when idle APIs are unavailable.

```ts
import { scheduleBrowserIdleTask } from "nfx-ui/utils";

const handle = scheduleBrowserIdleTask(() => {
  // do work in idle time
});

// cancel if needed
handle.cancel();
```

### Options

- `timeout?: number` — `requestIdleCallback` timeout in ms. Default: `2000`
- `minRemainingMs?: number` — only run when `deadline.timeRemaining()` ≥ this value. Default: `1`
- `allowTimeoutRun?: boolean` — allow running when `deadline.didTimeout` is true. Default: `true`
- `maxRetries?: number` — max reschedules when idle slice is insufficient. Default: `Infinity`
- `fallbackDelayMs?: number | null` — after reaching `maxRetries`, optionally run with `setTimeout(fallbackDelayMs)`. Default: `null` (drop)

---

# idle — 浏览器空闲调度

## `scheduleBrowserIdleTask`

在浏览器帧间空闲时段通过 `requestIdleCallback` 执行任务，避免与动画/布局等主线程工作抢同一时刻。若环境无 idle API，则自动退化为 `setTimeout(0)`。

```ts
import { scheduleBrowserIdleTask } from "nfx-ui/utils";

const handle = scheduleBrowserIdleTask(() => {
  // 在空闲 slice 执行
});

handle.cancel();
```

### 参数（options）

- `timeout?: number`：`requestIdleCallback` 超时兜底（ms），默认 `2000`
- `minRemainingMs?: number`：仅当 `deadline.timeRemaining()` ≥ 此阈值才执行（ms），默认 `1`
- `allowTimeoutRun?: boolean`：是否允许 `deadline.didTimeout` 时执行，默认 `true`
- `maxRetries?: number`：空闲不足时最多重试次数，默认 `Infinity`
- `fallbackDelayMs?: number | null`：达到 `maxRetries` 后是否用 `setTimeout(fallbackDelayMs)` 兜底执行；默认 `null`（不兜底，放弃）

