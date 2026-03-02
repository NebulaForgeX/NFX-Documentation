# Type Utils

Generic utility types: Nullable, Maybe, Defined, KeyOf, etc.

---

## Import

```ts
import type {
  Nullable,
  Maybe,
  Nilable,
  ExistenceResult,
  ValueOf,
  Defined,
  KeyOf,
  isOK,
  Array,
  ArrayOrSingle,
} from "nfx-ui/types";
```

---

## Types and description

| Type | Description |
|------|-------------|
| Nullable&lt;T&gt; | T \| null. |
| Maybe&lt;T&gt; | T \| undefined. |
| Nilable&lt;T&gt; | T \| null \| undefined. |
| ValueOf&lt;T&gt; | Union of object values. |
| Defined&lt;T, K&gt; | Branded type. |
| KeyOf&lt;R&gt; | Union of object keys. |
| isOK | Type guard etc. |
| Array&lt;T&gt; | Array type, same as T[]. |
| ArrayOrSingle&lt;T&gt; | T[] \| T, array or single element. |

---

## Input–output usage

- **Input:** Generic params T, R, etc.
- **Output:** Types used for variables and function signatures.

---

## Example

```ts
const name: Nullable<string> = "Alice";
const empty: Nullable<string> = null;

let count: Maybe<number> = 42;
count = undefined;

let value: Nilable<boolean> = true;
value = null;
value = undefined;

type Config = { theme: "light" | "dark"; size: number };
type ConfigValue = ValueOf<Config>;

type RouteMap = { HOME: "/"; LOGIN: "/login" };
type RouteKey = KeyOf<RouteMap>;

const ids: Array<string> = ["a", "b"];
function acceptOneOrMany(value: ArrayOrSingle<string>) {
  const arr = Array.isArray(value) ? value : [value];
  return arr.length;
}
acceptOneOrMany("single");
acceptOneOrMany(["a", "b"]);
```

See `src/types/utils.ts` for full definitions.

---

---

# 类型工具（types/utils）

通用工具类型：Nullable、Maybe、Defined、KeyOf 等。

---

## 引入

```ts
import type {
  Nullable,
  Maybe,
  Nilable,
  ExistenceResult,
  ValueOf,
  Defined,
  KeyOf,
  isOK,
  Array,
  ArrayOrSingle,
} from "nfx-ui/types";
```

---

## 类型与说明

| 类型 | 说明 |
|------|------|
| Nullable&lt;T&gt; | T \| null。 |
| Maybe&lt;T&gt; | T \| undefined。 |
| Nilable&lt;T&gt; | T \| null \| undefined。 |
| ValueOf&lt;T&gt; | 对象值的联合类型。 |
| Defined&lt;T, K&gt; | 带品牌类型。 |
| KeyOf&lt;R&gt; | 对象键的联合类型。 |
| isOK | 类型守卫等。 |
| Array&lt;T&gt; | 数组类型，等价 T[]。 |
| ArrayOrSingle&lt;T&gt; | T[] \| T，数组或单元素。 |

---

## 输入 / 输出用法

- **输入：** 泛型参数 T、R 等。
- **输出：** 类型用于变量、函数签名。

---

## 示例

```ts
const name: Nullable<string> = "Alice";
const empty: Nullable<string> = null;

let count: Maybe<number> = 42;
count = undefined;

let value: Nilable<boolean> = true;
value = null;
value = undefined;

type Config = { theme: "light" | "dark"; size: number };
type ConfigValue = ValueOf<Config>;

type RouteMap = { HOME: "/"; LOGIN: "/login" };
type RouteKey = KeyOf<RouteMap>;

const ids: Array<string> = ["a", "b"];
function acceptOneOrMany(value: ArrayOrSingle<string>) {
  const arr = Array.isArray(value) ? value : [value];
  return arr.length;
}
acceptOneOrMany("single");
acceptOneOrMany(["a", "b"]);
```

详见源码 `src/types/utils.ts`。
