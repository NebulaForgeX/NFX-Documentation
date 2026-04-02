# Random utilities

Random helpers (numbers/booleans/selection). No color logic.

---

## Import

```ts
import {
  randomBetween,
  randomInt,
  randomBool,
  chance,
  randomSign,
  pickRandom,
  randomGaussian,
} from "nfx-ui/utils";
```

---

## Functions

| Function | Parameters | Output |
|----------|------------|--------|
| randomBetween | (min: number, max: number) | number — float in [min, max). |
| randomInt | (minInclusive: number, maxInclusive: number) | number — int in [minInclusive, maxInclusive]. |
| randomBool | (probability?: number) | boolean |
| chance | (probability?: number) | boolean — alias of `randomBool` |
| randomSign | () | number — either -1 or 1. |
| pickRandom | (pool: readonly T[]) | T — random element from pool. |
| randomGaussian | (mean?: number, stdDev?: number) | number — normally distributed value. |

---

## Example

```ts
const x = randomBetween(0, 10);
const y = randomInt(1, 6); // dice
const flip = chance(0.3);
const sign = randomSign(); // -1 or 1
const item = pickRandom(["a", "b", "c"]);
const z = randomGaussian(0, 1);
```

---

---

# 随机工具

纯随机工具（数字/布尔/随机选择），不包含颜色相关逻辑。

---

## 引入

```ts
import {
  randomBetween,
  randomInt,
  randomBool,
  chance,
  randomSign,
  pickRandom,
  randomGaussian,
} from "nfx-ui/utils";
```

---

## 函数说明

| 函数 | 参数 | 返回 |
|------|------|------|
| randomBetween | (min: number, max: number) | number — 浮点数，范围 [min, max)。 |
| randomInt | (minInclusive: number, maxInclusive: number) | number — 整数，范围 [minInclusive, maxInclusive]。 |
| randomBool | (probability?: number) | boolean |
| chance | (probability?: number) | boolean — `randomBool` 别名 |
| randomSign | () | number — 返回 -1 或 1。 |
| pickRandom | (pool: readonly T[]) | T — 从数组中随机取一个。 |
| randomGaussian | (mean?: number, stdDev?: number) | number — 高斯分布随机数。 |

---

## 示例

```ts
const x = randomBetween(0, 10);
const y = randomInt(1, 6); // 掷骰子
const flip = chance(0.3);
const sign = randomSign(); // -1 或 1
const item = pickRandom(["a", "b", "c"]);
const z = randomGaussian(0, 1);
```

