# 类型工具（types/utils）/ Type Utils

通用工具类型：Nullable、Maybe、Defined、KeyOf 等。  
Generic utility types: Nullable, Maybe, Defined, KeyOf, etc.

---

## 引入 / Import

```ts
import type { Nullable, Maybe, Nilable, ExistenceResult, ValueOf, Defined, KeyOf, isOK } from "nfx-ui";
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

---

## 输入 Output 用法 / Input–output usage

- **Input**：泛型参数 T、R 等。Generic params T, R, etc.
- **Output**：类型用于变量、函数签名。Types used for variables and function signatures.

详见源码 `src/types/utils.ts`. See `src/types/utils.ts` for full definitions.
