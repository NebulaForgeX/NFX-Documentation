# Price utils

Convert between display price (yuan) and database price (cents); format abbreviated numbers.

---

## Import

```ts
import { toDatabasePrice, toDisplayPrice, toDisplayPriceNumber, formatNumberAbbreviated } from "nfx-ui/utils";
```

---

## Parameters and Input/Output

| Function | Parameters | Output |
|----------|------------|--------|
| toDatabasePrice | (displayPrice: number) | number — cents for DB (Math.round(display * 100)). |
| toDisplayPrice | (databasePrice: number) | string — e.g. `"12.34"` (2 decimal places). |
| toDisplayPriceNumber | (databasePrice: number) | number — yuan as number. |
| formatNumberAbbreviated | (num: number) | string — e.g. `"1500"`, `"1.5k+"`, `"3.5M+"`, `"1.1B+"`. |

---

## Example

```ts
toDatabasePrice(99.99);   // 9999
toDisplayPrice(9999);     // "99.99"
toDisplayPriceNumber(9999); // 99.99
formatNumberAbbreviated(1500); // "1.5k+"
formatNumberAbbreviated(999);  // "999"
```

---

---

# 价格工具

展示价（元）与存储价（分）互转，以及数字缩写。

---

## 引入

```ts
import { toDatabasePrice, toDisplayPrice, toDisplayPriceNumber, formatNumberAbbreviated } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 | 参数 | 输出 |
|------|------|------|
| toDatabasePrice | (displayPrice: number) | number — 数据库存分（Math.round(元 * 100)）。 |
| toDisplayPrice | (databasePrice: number) | string — 如 `"12.34"`（两位小数）。 |
| toDisplayPriceNumber | (databasePrice: number) | number — 元为数字。 |
| formatNumberAbbreviated | (num: number) | string — 如 `"1500"`、`"1.5k+"`、`"3.5M+"`、`"1.1B+"`。 |

---

## 示例

```ts
toDatabasePrice(99.99);   // 9999
toDisplayPrice(9999);     // "99.99"
toDisplayPriceNumber(9999); // 99.99
formatNumberAbbreviated(1500); // "1.5k+"
formatNumberAbbreviated(999);  // "999"
```
