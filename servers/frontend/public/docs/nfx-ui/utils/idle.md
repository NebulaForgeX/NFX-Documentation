# idle — browser idle scheduling

Run tasks during browser idle slices via `requestIdleCallback`; falls back to `setTimeout` when idle APIs are unavailable.

---

## Import

```ts
import { scheduleBrowserIdleTask } from "nfx-ui/utils";
import type { IdleTaskHandle, ScheduleBrowserIdleTaskOptions } from "nfx-ui/utils";
```

---

## scheduleBrowserIdleTask

```ts
function scheduleBrowserIdleTask(
  task: () => void,
  options?: ScheduleBrowserIdleTaskOptions,
): IdleTaskHandle;
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| timeout | number | 2000 | `requestIdleCallback` timeout (ms). |
| minRemainingMs | number | 1 | Run only when `deadline.timeRemaining()` ≥ this. |
| allowTimeoutRun | boolean | true | Allow run when `deadline.didTimeout`. |
| maxRetries | number | Infinity | Max reschedules when idle slice insufficient. |
| fallbackDelayMs | number \| null | null | After maxRetries, optional `setTimeout` fallback; null = drop. |

**Returns:** `{ cancel: () => void }` — cancel idle callback and fallback timer.

---

## Example

```ts
const handle = scheduleBrowserIdleTask(() => {
  // work in idle time
}, { timeout: 2000, minRemainingMs: 1 });

handle.cancel();
```

---

---

# idle — 浏览器空闲调度

在浏览器帧间空闲时段通过 `requestIdleCallback` 执行任务；无 idle API 时退化为 `setTimeout`。

---

## 引入

```ts
import { scheduleBrowserIdleTask } from "nfx-ui/utils";
import type { IdleTaskHandle, ScheduleBrowserIdleTaskOptions } from "nfx-ui/utils";
```

---

## scheduleBrowserIdleTask

```ts
function scheduleBrowserIdleTask(
  task: () => void,
  options?: ScheduleBrowserIdleTaskOptions,
): IdleTaskHandle;
```

| 选项 | 类型 | 默认 | 说明 |
|------|------|------|------|
| timeout | number | 2000 | `requestIdleCallback` 超时兜底（ms）。 |
| minRemainingMs | number | 1 | 仅当 `deadline.timeRemaining()` ≥ 此值才执行。 |
| allowTimeoutRun | boolean | true | 是否允许 `deadline.didTimeout` 时执行。 |
| maxRetries | number | Infinity | 空闲不足时最多重试次数。 |
| fallbackDelayMs | number \| null | null | 达到 maxRetries 后 `setTimeout` 兜底；null 表示放弃。 |

**返回：** `{ cancel: () => void }` — 取消 idle 回调与 fallback 定时器。

---

## 示例

```ts
const handle = scheduleBrowserIdleTask(() => {
  // 在空闲 slice 执行
}, { timeout: 2000, minRemainingMs: 1 });

handle.cancel();
```
