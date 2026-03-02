# Time formatting

Date/time formatting functions.

---

## Import

```ts
import {
  formatDisplayDate,
  formatRelativeTime,
  formatTickDate,
  formatDateTime,
  formatMonthDayTime,
  formatDate,
  formatTime,
} from "nfx-ui/utils";
```

---

## Parameters (common)

| Parameter | Type | Description |
|-----------|------|-------------|
| dateString | string \| undefined \| null | Date string (e.g. ISO). |

- **Input:** Date string or null/undefined.
- **Output:** string — formatted display string.

---

## Functions

| Function | Description |
|----------|-------------|
| formatDisplayDate | Display date. |
| formatRelativeTime | Relative time (e.g. "3 min ago"). |
| formatTickDate | Tick/chart date. |
| formatDateTime | Date and time. |
| formatMonthDayTime | Month/day and time. |
| formatDate | Date. |
| formatTime | Time. |

---

## Example

```ts
formatDisplayDate("2025-02-27");
formatRelativeTime("2025-02-27T10:00:00Z");
formatDateTime("2025-02-27T14:30:00Z");
```

---

---

# 时间格式化

日期时间格式化函数。

---

## 引入

```ts
import {
  formatDisplayDate,
  formatRelativeTime,
  formatTickDate,
  formatDateTime,
  formatMonthDayTime,
  formatDate,
  formatTime,
} from "nfx-ui/utils";
```

---

## 参数与 Input/Output（通用）

| 参数 | 类型 | 说明 |
|------|------|------|
| dateString | string \| undefined \| null | 日期字符串（如 ISO）。 |

- **输入：** 日期字符串或 null/undefined。
- **输出：** string — 格式化后的展示字符串。

---

## 函数说明

| 函数 | 说明 |
|------|------|
| formatDisplayDate | 展示用日期。 |
| formatRelativeTime | 相对时间（如「3 分钟前」）。 |
| formatTickDate | 刻度/图表用日期。 |
| formatDateTime | 日期+时间。 |
| formatMonthDayTime | 月日+时间。 |
| formatDate | 日期。 |
| formatTime | 时间。 |

---

## 示例

```ts
formatDisplayDate("2025-02-27");
formatRelativeTime("2025-02-27T10:00:00Z");
formatDateTime("2025-02-27T14:30:00Z");
```
