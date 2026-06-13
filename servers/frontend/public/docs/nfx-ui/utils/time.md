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

## Functions

| Function | Parameters | Output |
|----------|------------|--------|
| formatDisplayDate | (dateString?: string \| null) | `YYYY/MM/DD`; empty/invalid → `""`. |
| formatRelativeTime | (dateString?: string \| null) | Relative English string; empty → `"Unknown"`, invalid → `"Invalid date"`. |
| formatTickDate | (iso: string) | Locale short date+time for charts; parse fail → original iso. |
| formatDateTime | (dateString: string) | `YYYY/MM/DD HH:mm`; invalid → original string. |
| formatMonthDayTime | (dateString: string) | `MM/DD HH:mm`; invalid → original string. |
| formatDate | (dateString: string) | `YYYY/MM/DD`; invalid → original string. |
| formatTime | (dateString: string) | `HH:mm`; invalid → original string. |

---

## Example

```ts
formatDisplayDate("2025-02-27");           // "2025/02/27"
formatDisplayDate(null);                   // ""
formatRelativeTime("2025-02-27T10:00:00Z"); // e.g. "3 days ago"
formatDateTime("2025-02-27T14:30:00Z");    // "2025/02/27 14:30"
formatTickDate("2025-02-27T14:30:00Z");    // locale-dependent
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

## 函数说明

| 函数 | 参数 | 输出 |
|------|------|------|
| formatDisplayDate | (dateString?: string \| null) | `YYYY/MM/DD`；空/无效 → `""`。 |
| formatRelativeTime | (dateString?: string \| null) | 英文相对时间；空 → `"Unknown"`，无效 → `"Invalid date"`。 |
| formatTickDate | (iso: string) | 图表轴/提示用短格式；解析失败 → 原 iso。 |
| formatDateTime | (dateString: string) | `YYYY/MM/DD HH:mm`；无效 → 原字符串。 |
| formatMonthDayTime | (dateString: string) | `MM/DD HH:mm`；无效 → 原字符串。 |
| formatDate | (dateString: string) | `YYYY/MM/DD`；无效 → 原字符串。 |
| formatTime | (dateString: string) | `HH:mm`；无效 → 原字符串。 |

---

## 示例

```ts
formatDisplayDate("2025-02-27");           // "2025/02/27"
formatDisplayDate(null);                   // ""
formatRelativeTime("2025-02-27T10:00:00Z"); // 如 "3 days ago"
formatDateTime("2025-02-27T14:30:00Z");    // "2025/02/27 14:30"
formatTickDate("2025-02-27T14:30:00Z");    // 随 locale 变化
```
