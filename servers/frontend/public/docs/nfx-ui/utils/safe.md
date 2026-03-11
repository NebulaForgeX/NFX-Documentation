# Safe utils

Normalize `Nilable` / `Emptyable` / array to `Nullable`, `Maybe`, `Zeroable`, `Stringable`, `Array`. Use `safeMaybe(product.price)` instead of `product.price ?? undefined`, `safeZeroable(product.stock)` instead of `product.stock ?? 0`, etc. Return types align with `nfx-ui/types` (Nullable, Maybe, Nilable, Zeroable, Stringable, Array).

---

## Import

```ts
import {
  safeNullable,
  safeMaybe,
  safeNilable,
  safeArray,
  safeZeroable,
  safeStringable,
  safeOr,
  safeNum,
} from "nfx-ui/utils";
```

---

## Parameters and Input/Output

| Function | Parameters | Output |
|----------|------------|--------|
| safeNullable | value: Nilable\<T\> | Nullable\<T\> — undefined → null. |
| safeMaybe | value: Nilable\<T\> | Maybe\<T\> — null → undefined; same as `value ?? undefined`. |
| safeNilable | value: Emptyable\<T\> (T extends string) | Nilable\<T\> — "" → undefined. |
| safeArray | value: Nilable\<Array\<T\>\>, defaultValue?: Array\<T\> | Array\<T\> — null/undefined → [] or defaultValue. |
| safeZeroable | value: Nilable\<number\> | Zeroable\<number\> — null/undefined → 0. |
| safeStringable | value: Emptyable\<T\> (T extends string) | Stringable\<T\> — null/undefined/"" → "". |
| safeOr | value: Nilable\<T\>, defaultValue: D | T \| D — same as `value ?? defaultValue`. |
| safeNum | value: number \| null \| undefined | Maybe\<number\> — null/undefined/NaN → undefined. |

---

## Example

```ts
safeNullable(apiResponse.data);   // undefined → null
safeMaybe(product.price);         // instead of product.price ?? undefined
safeNilable(product.remark);       // "" → undefined
safeArray(product.tags);          // product.tags ?? []
safeArray(product.tags, ["default"]);
safeZeroable(product.stock);      // instead of product.stock ?? 0
safeStringable(product.name);     // instead of product.name ?? ""
safeOr(product.stock, 0);
safeOr(product.name, "");
safeNum(product.price);          // strict: only number or undefined
```

---

## Vue example

```vue
<script setup lang="ts">
import { computed } from "vue";
import {
  safeMaybe,
  safeZeroable,
  safeStringable,
  safeNilable,
  safeArray,
  safeNum,
} from "nfx-ui/utils";

const props = defineProps<{
  price?: number | null;
  stock?: number | null;
  name?: string | null;
  remark?: string | null;
  tags?: string[] | null;
}>();

const displayPrice = computed(() => safeMaybe(props.price));
const displayStock = computed(() => safeZeroable(props.stock));
const displayName = computed(() => safeStringable(props.name));
const displayRemark = computed(() => safeNilable(props.remark));
const displayTags = computed(() => safeArray(props.tags));
const validPrice = computed(() => safeNum(props.price));
</script>

<template>
  <div>
    <span>{{ displayPrice }}</span>
    <span>{{ displayStock }}</span>
    <span>{{ displayName }}</span>
    <span>{{ displayRemark ?? "-" }}</span>
    <span>{{ displayTags.join(", ") }}</span>
  </div>
</template>
```

---

---

# Safe 工具

将 `Nilable` / `Emptyable` / 数组等规范为 `Nullable`、`Maybe`、`Zeroable`、`Stringable`、`Array`。用 `safeMaybe(product.price)` 代替 `product.price ?? undefined`，用 `safeZeroable(product.stock)` 代替 `product.stock ?? 0` 等。返回类型与 `nfx-ui/types` 一致（Nullable、Maybe、Nilable、Zeroable、Stringable、Array）。

---

## 引入

```ts
import {
  safeNullable,
  safeMaybe,
  safeNilable,
  safeArray,
  safeZeroable,
  safeStringable,
  safeOr,
  safeNum,
} from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 | 参数 | 输出 |
|------|------|------|
| safeNullable | value: Nilable\<T\> | Nullable\<T\> — undefined 转为 null。 |
| safeMaybe | value: Nilable\<T\> | Maybe\<T\> — null 转为 undefined；等同 `value ?? undefined`。 |
| safeNilable | value: Emptyable\<T\>（T extends string） | Nilable\<T\> — 空串 "" 转为 undefined。 |
| safeArray | value: Nilable\<Array\<T\>\>，defaultValue?: Array\<T\> | Array\<T\> — null/undefined 转为 [] 或 defaultValue。 |
| safeZeroable | value: Nilable\<number\> | Zeroable\<number\> — null/undefined 转为 0。 |
| safeStringable | value: Emptyable\<T\>（T extends string） | Stringable\<T\> — null/undefined/"" 转为 ""。 |
| safeOr | value: Nilable\<T\>，defaultValue: D | T \| D — 等同 `value ?? defaultValue`。 |
| safeNum | value: number \| null \| undefined | Maybe\<number\> — null/undefined/NaN 转为 undefined。 |

---

## 示例

```ts
safeNullable(apiResponse.data);   // undefined → null
safeMaybe(product.price);         // 代替 product.price ?? undefined
safeNilable(product.remark);      // "" → undefined
safeArray(product.tags);         // product.tags ?? []
safeArray(product.tags, ["default"]);
safeZeroable(product.stock);     // 代替 product.stock ?? 0
safeStringable(product.name);    // 代替 product.name ?? ""
safeOr(product.stock, 0);
safeOr(product.name, "");
safeNum(product.price);         // 严格：仅 number 或 undefined
```

---

## Vue 示例

```vue
<script setup lang="ts">
import { computed } from "vue";
import {
  safeMaybe,
  safeZeroable,
  safeStringable,
  safeNilable,
  safeArray,
  safeNum,
} from "nfx-ui/utils";

const props = defineProps<{
  price?: number | null;
  stock?: number | null;
  name?: string | null;
  remark?: string | null;
  tags?: string[] | null;
}>();

const displayPrice = computed(() => safeMaybe(props.price));
const displayStock = computed(() => safeZeroable(props.stock));
const displayName = computed(() => safeStringable(props.name));
const displayRemark = computed(() => safeNilable(props.remark));
const displayTags = computed(() => safeArray(props.tags));
const validPrice = computed(() => safeNum(props.price));
</script>

<template>
  <div>
    <span>{{ displayPrice }}</span>
    <span>{{ displayStock }}</span>
    <span>{{ displayName }}</span>
    <span>{{ displayRemark ?? "-" }}</span>
    <span>{{ displayTags.join(", ") }}</span>
  </div>
</template>
```
