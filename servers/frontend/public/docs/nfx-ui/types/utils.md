# Type Utils

Generic utility types: Nullable, Maybe, Defined, KeyOf, etc.

---

## Import

```ts
import type {
  Nullable,
  Maybe,
  Nilable,
  Emptyable,
  Zeroable,
  Stringable,
  Objectable,
  Arrayable,
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
| Array&lt;T&gt; | Array type, same as `T[]`. |
| Nullable&lt;T&gt; | `T \| null`. |
| Maybe&lt;T&gt; | `T \| undefined`. |
| Nilable&lt;T&gt; | `T \| null \| undefined`. |
| Emptyable&lt;T&gt; | `T \| null \| undefined \| ""`. |
| Zeroable&lt;T extends number&gt; | `T \| 0`. |
| Stringable&lt;T extends string&gt; | `T \| ""`. |
| Objectable&lt;T extends Record&lt;string, unknown&gt;&gt; | `T \| {}`. |
| Arrayable&lt;T&gt; | `T[] \| []`. |
| ExistenceResult&lt;T&gt; | `[T, true] \| [null, false]`. |
| ValueOf&lt;T&gt; | Union of object property value types. |
| KeyOf&lt;T&gt; | `keyof T`. |
| Defined&lt;T, Tag&gt; | Branded type for defineXxx/createXxx pairs. |
| isOK&lt;T&gt; | Same tuple shape as ExistenceResult present branch. |
| ArrayOrSingle&lt;T&gt; | `T[] \| T`. |

---

## Input–output usage

- **Input:** Generic params T, Tag, etc.
- **Output:** Types used for variables and function signatures.

---

## Example

```ts
const name: Nullable<string> = "Alice";
const empty: Nullable<string> = null;

let count: Maybe<number> = 42;
count = undefined;

let label: Emptyable<string> = "";
label = null;

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
  Emptyable,
  Zeroable,
  Stringable,
  Objectable,
  Arrayable,
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
| Array&lt;T&gt; | 数组类型，等价 `T[]`。 |
| Nullable&lt;T&gt; | `T \| null`。 |
| Maybe&lt;T&gt; | `T \| undefined`。 |
| Nilable&lt;T&gt; | `T \| null \| undefined`。 |
| Emptyable&lt;T&gt; | `T \| null \| undefined \| ""`。 |
| Zeroable&lt;T extends number&gt; | `T \| 0`。 |
| Stringable&lt;T extends string&gt; | `T \| ""`。 |
| Objectable&lt;T extends Record&lt;string, unknown&gt;&gt; | `T \| {}`。 |
| Arrayable&lt;T&gt; | `T[] \| []`。 |
| ExistenceResult&lt;T&gt; | `[T, true] \| [null, false]`。 |
| ValueOf&lt;T&gt; | 对象属性值联合类型。 |
| KeyOf&lt;T&gt; | `keyof T`。 |
| Defined&lt;T, Tag&gt; | defineXxx/createXxx 配对用的品牌类型。 |
| isOK&lt;T&gt; | 与 ExistenceResult 有值分支同形。 |
| ArrayOrSingle&lt;T&gt; | `T[] \| T`。 |

---

## 输入 / 输出用法

- **输入：** 泛型参数 T、Tag 等。
- **输出：** 类型用于变量、函数签名。

---

## 示例

```ts
const name: Nullable<string> = "Alice";
const empty: Nullable<string> = null;

let count: Maybe<number> = 42;
count = undefined;

let label: Emptyable<string> = "";
label = null;

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
