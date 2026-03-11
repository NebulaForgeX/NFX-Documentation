# Safe utils

Normalize `null`/`undefined` to `undefined` (or a default), so you can write `safe(product.price)` instead of `product.price ?? undefined`.

---

## Import

```ts
import { safe, safeOr, safeDef, safeNum } from "nfx-ui/utils";
```

---

## Parameters and Input/Output

| Function | Parameters | Output |
|----------|------------|--------|
| safe | value: T \| null \| undefined | T \| undefined — same as `value ?? undefined`. |
| safeOr | value: T \| null \| undefined, defaultValue: D | T \| D — same as `value ?? defaultValue`. |
| safeDef | value: string \| null \| undefined | string \| undefined — also treats `""` as empty. |
| safeNum | value: number \| null \| undefined | number \| undefined — NaN becomes undefined. |

---

## Example

```ts
safe(product.price);           // instead of product.price ?? undefined
safeOr(product.stock, 0);
safeOr(product.name, "");
safeDef(product.remark);       // "" → undefined
safeNum(product.price);
```

---

## Vue example

```vue
<script setup lang="ts">
import { computed } from "vue";
import { safe, safeOr, safeDef, safeNum } from "nfx-ui/utils";

const props = defineProps<{
  price?: number | null;
  stock?: number | null;
  name?: string | null;
  remark?: string | null;
}>();

// Use in template or computed — avoid writing props.price ?? undefined
const displayPrice = computed(() => safe(props.price));
const displayStock = computed(() => safeOr(props.stock, 0));
const displayName = computed(() => safeOr(props.name, ""));
const displayRemark = computed(() => safeDef(props.remark));
const validPrice = computed(() => safeNum(props.price));
</script>

<template>
  <div>
    <span>{{ displayPrice }}</span>
    <span>{{ displayStock }}</span>
    <span>{{ displayName }}</span>
    <span>{{ displayRemark ?? '-' }}</span>
  </div>
</template>
```

---

---

# Safe 工具

将 `null`/`undefined` 规范为 `undefined`（或默认值），可写 `safe(product.price)` 代替 `product.price ?? undefined`。

---

## 引入

```ts
import { safe, safeOr, safeDef, safeNum } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 | 参数 | 输出 |
|------|------|------|
| safe | value: T \| null \| undefined | T \| undefined — 等同 `value ?? undefined`。 |
| safeOr | value, defaultValue | T \| D — 等同 `value ?? defaultValue`。 |
| safeDef | value: string \| null \| undefined | string \| undefined — 空串 `""` 也视为无值。 |
| safeNum | value: number \| null \| undefined | number \| undefined — NaN 转为 undefined。 |

---

## 示例

```ts
safe(product.price);           // 代替 product.price ?? undefined
safeOr(product.stock, 0);
safeOr(product.name, "");
safeDef(product.remark);       // "" → undefined
safeNum(product.price);
```

---

## Vue 示例

```vue
<script setup lang="ts">
import { computed } from "vue";
import { safe, safeOr, safeDef, safeNum } from "nfx-ui/utils";

const props = defineProps<{
  price?: number | null;
  stock?: number | null;
  name?: string | null;
  remark?: string | null;
}>();

// 用 safe 系列替代 props.xxx ?? undefined
const displayPrice = computed(() => safe(props.price));
const displayStock = computed(() => safeOr(props.stock, 0));
const displayName = computed(() => safeOr(props.name, ""));
const displayRemark = computed(() => safeDef(props.remark));
const validPrice = computed(() => safeNum(props.price));
</script>

<template>
  <div>
    <span>{{ displayPrice }}</span>
    <span>{{ displayStock }}</span>
    <span>{{ displayName }}</span>
    <span>{{ displayRemark ?? '-' }}</span>
  </div>
</template>
```
