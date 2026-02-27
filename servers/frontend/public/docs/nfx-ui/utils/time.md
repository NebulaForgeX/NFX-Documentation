# 时间格式化 / Time formatting

日期时间格式化函数。  
Date/time formatting functions.

---

## 引入 / Import

```ts
import {
  formatDisplayDate,
  formatRelativeTime,
  formatTickDate,
  formatDateTime,
  formatMonthDayTime,
  formatDate,
  formatTime,
} from "nfx-ui";
```

---

## 参数与 Input/Output（通用）

| 参数 Parameter | 类型 Type | 说明 Description |
|----------------|-----------|------------------|
| dateString | string \| undefined \| null | 日期字符串（如 ISO）。Date string (e.g. ISO). |

- **Input**：日期字符串或 null/undefined。Date string or null/undefined.
- **Output**：string — 格式化后的展示字符串。Formatted display string.

---

## 函数说明 / Functions

| 函数 Function | 说明 Description |
|---------------|------------------|
| formatDisplayDate | 展示用日期。Display date. |
| formatRelativeTime | 相对时间（如「3 分钟前」）。Relative time (e.g. "3 min ago"). |
| formatTickDate | 刻度/图表用日期。Tick/chart date. |
| formatDateTime | 日期+时间。Date and time. |
| formatMonthDayTime | 月日+时间。Month/day and time. |
| formatDate | 日期。Date. |
| formatTime | 时间。Time. |

---

## 示例 / Example

```ts
formatDisplayDate("2025-02-27");           // => "2025-02-27" (或本地格式)
formatRelativeTime("2025-02-27T10:00:00Z"); // => "2 hours ago" (或中文)
formatDateTime("2025-02-27T14:30:00Z");     // => "2025-02-27 14:30"
```
