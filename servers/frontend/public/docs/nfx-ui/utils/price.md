# 价格工具 / Price utils

价格在「存储值」与「展示值」之间的转换与数字缩写。  
Convert between stored and display price; abbreviate numbers.

---

## 引入 / Import

```ts
import { toDatabasePrice, toDisplayPrice, toDisplayPriceNumber, formatNumberAbbreviated } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 Function | 参数 Parameters | 输出 Output |
|---------------|-----------------|-------------|
| toDatabasePrice | displayPrice: number | number — 存储用数值（如乘精度）。Value for DB. |
| toDisplayPrice | databasePrice: number | string — 展示用字符串。Display string. |
| toDisplayPriceNumber | databasePrice: number | number — 展示用数值。Display number. |
| formatNumberAbbreviated | num: number | string — 如 "1k", "1M". Abbreviated string. |

---

## 示例 / Example

```ts
toDatabasePrice(99.99);           // => 9999 (若精度 2 位 / e.g. 2 decimals)
toDisplayPrice(9999);             // => "99.99"
toDisplayPriceNumber(9999);       // => 99.99
formatNumberAbbreviated(1500);    // => "1.5k"
```
