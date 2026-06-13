# Random utilities

Random helpers (numbers/booleans/selection). No color logic — see `utils/colors.ts` for `pickColor`.

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
| randomInt | (minInclusive: number, maxInclusive: number) | number — int in [minInclusive, maxInclusive]; throws if max &lt; min. |
| randomBool | (probability?: number) | boolean — default probability 0.5; throws if not in [0, 1]. |
| chance | (probability?: number) | boolean — alias of `randomBool`. |
| randomSign | () | number — either -1 or 1. |
| pickRandom | (pool: readonly T[]) | T — random element; throws if pool empty. |
| randomGaussian | (mean?: number, stdDev?: number) | number — Box-Muller normal; stdDev must be &gt; 0. |

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

纯随机工具（数字/布尔/随机选择），不包含颜色相关逻辑（颜色见 `utils/colors.ts` 的 `pickColor`）。

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
| randomInt | (minInclusive: number, maxInclusive: number) | number — 整数 [minInclusive, maxInclusive]；max &lt; min 时 throw。 |
| randomBool | (probability?: number) | boolean — 默认 0.5；probability 不在 [0,1] 时 throw。 |
| chance | (probability?: number) | boolean — `randomBool` 别名。 |
| randomSign | () | number — 返回 -1 或 1。 |
| pickRandom | (pool: readonly T[]) | T — 随机取一；空 pool 时 throw。 |
| randomGaussian | (mean?: number, stdDev?: number) | number — Box-Muller 正态分布；stdDev 须 &gt; 0。 |

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
