# Price utils

Convert between stored and display price; abbreviate numbers.

---

## Import

```ts
import { toDatabasePrice, toDisplayPrice, toDisplayPriceNumber, formatNumberAbbreviated } from "nfx-ui/utils";
```

---

## Parameters and Input/Output

| Function | Parameters | Output |
|----------|------------|--------|
| toDatabasePrice | displayPrice: number | number — value for DB. |
| toDisplayPrice | databasePrice: number | string — display string. |
| toDisplayPriceNumber | databasePrice: number | number — display number. |
| formatNumberAbbreviated | num: number | string — e.g. "1k", "1M". |

---

## Example

```ts
toDatabasePrice(99.99);
toDisplayPrice(9999);
toDisplayPriceNumber(9999);
formatNumberAbbreviated(1500);
```

---

---

# 价格工具

价格在「存储值」与「展示值」之间的转换与数字缩写。

---

## 引入

```ts
import { toDatabasePrice, toDisplayPrice, toDisplayPriceNumber, formatNumberAbbreviated } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 | 参数 | 输出 |
|------|------|------|
| toDatabasePrice | displayPrice: number | number — 存储用数值。 |
| toDisplayPrice | databasePrice: number | string — 展示用字符串。 |
| toDisplayPriceNumber | databasePrice: number | number — 展示用数值。 |
| formatNumberAbbreviated | num: number | string — 如 "1k", "1M"。 |

---

## 示例

```ts
toDatabasePrice(99.99);
toDisplayPrice(9999);
toDisplayPriceNumber(9999);
formatNumberAbbreviated(1500);
```
