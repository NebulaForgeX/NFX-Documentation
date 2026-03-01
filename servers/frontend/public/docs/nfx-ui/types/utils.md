# 类型工具（types/utils）/ Type Utils

通用工具类型：Nullable、Maybe、Defined、KeyOf 等。  
Generic utility types: Nullable, Maybe, Defined, KeyOf, etc.

---

## 引入 / Import

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

## 类型与说明 / Types and description

| 类型 Type | 说明 Description |
|-----------|------------------|
| Nullable&lt;T&gt; | T \| null. |
| Maybe&lt;T&gt; | T \| undefined. |
| Nilable&lt;T&gt; | T \| null \| undefined. |
| ValueOf&lt;T&gt; | 对象值的联合类型。Union of object values. |
| Defined&lt;T, K&gt; | 带品牌类型。Branded type. |
| KeyOf&lt;R&gt; | 对象键的联合类型。Union of object keys. |
| isOK | 类型守卫等。Type guard etc. |
| Array&lt;T&gt; | 数组类型，等价 T[]。Array type, same as T[]. |
| ArrayOrSingle&lt;T&gt; | T[] \| T，数组或单元素。Array or single element. |

---

## 输入 Output 用法 / Input–output usage

- **Input**：泛型参数 T、R 等。Generic params T, R, etc.
- **Output**：类型用于变量、函数签名。Types used for variables and function signatures.

---

## 示例 / Example

```ts
// Nullable<T> — 可为 null
const name: Nullable<string> = "Alice";
const empty: Nullable<string> = null;

// Maybe<T> — 可为 undefined
let count: Maybe<number> = 42;
count = undefined;

// Nilable<T> — 可为 null 或 undefined
let value: Nilable<boolean> = true;
value = null;
value = undefined;

// ValueOf<T> — 对象值的联合类型
type Config = { theme: "light" | "dark"; size: number };
type ConfigValue = ValueOf<Config>; // => "light" | "dark" | number

// KeyOf<T> — 对象键的联合类型
type RouteMap = { HOME: "/"; LOGIN: "/login" };
type RouteKey = KeyOf<RouteMap>; // => "HOME" | "LOGIN"

// Array<T> / ArrayOrSingle<T>
const ids: Array<string> = ["a", "b"];
function acceptOneOrMany(value: ArrayOrSingle<string>) {
  const arr = Array.isArray(value) ? value : [value];
  return arr.length;
}
acceptOneOrMany("single");  // 1
acceptOneOrMany(["a", "b"]); // 2

// Defined<T, Tag> — 与 defineRouter / createRouter 配合，仅 defineRouter 返回值可传入 createRouter
// 见 navigations/navigation.md 示例
```

详见源码 `src/types/utils.ts`. See `src/types/utils.ts` for full definitions.
