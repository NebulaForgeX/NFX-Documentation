# Constants 模块文档 / Constants Module Documentation

公用常量与 React Query key 工厂的用法说明。各函数参数与 Input/Output 见下表及示例。  
Usage guide for shared constants and React Query key factories. Parameters and Input/Output for each function are in the tables and examples below.

---

## 入口 / Entry

从 `nfx-ui` 统一导出（外部使用）。本仓库内可从 `@/constants` 引用。  
Exported from `nfx-ui` (external). In repo: `@/constants`.

```ts
import { CACHE_ITEM, CACHE_LIST, createItemKey, createKey, createListKey, createQueryKeys, defineEnum, enumPickMap } from "nfx-ui";
```

---

## 1. Caches（缓存片段）

用于组成 query key 的固定片段，标识「列表」与「单条」。  
Fixed segments used in query keys to denote "list" vs "item".

| 名称 Name    | 类型 Type | 值 Value | 说明 Description                 |
| ------------ | --------- | -------- | -------------------------------- |
| `CACHE_LIST` | `string`  | `"list"` | 列表 key 片段。List key segment. |
| `CACHE_ITEM` | `string`  | `"item"` | 单条 key 片段。Item key segment. |

**Example**

```ts
import { CACHE_ITEM, CACHE_LIST } from "nfx-ui";

const customKey = ["catalog", CACHE_LIST, "category"];
// => ["catalog", "list", "category"]
```

---

## 2. createKey

创建由任意片段组成的 query key（用于 stats、自定义维度等）。  
Creates a query key from arbitrary segments.

**签名 / Signature**

```ts
function createKey(...segments: unknown[]): QueryKey;
```

**Example**

```ts
import { createKey } from "nfx-ui";

const key = createKey("catalog", "stats", "category", "count");
useQuery({ queryKey: createKey("auth", "me"), queryFn: fetchCurrentUser });
```

---

## 3. createListKey

创建「列表」query key，并支持链式 `.withPrefix()` 加前缀。  
Creates a list query key with chainable `.withPrefix()`.

**签名 / Signature**

```ts
function createListKey(domain: string, subDomain: string): ListKeyChainable;
```

默认 key 形状：`[domain, CACHE_LIST, subDomain]`。

**Example**

```ts
import { createListKey } from "nfx-ui";

const listKey = createListKey("catalog", "category");
// listKey => ["catalog", "list", "category"]

const versioned = createListKey("catalog", "category").withPrefix("api").withPrefix("v1");
// versioned => ["v1", "api", "catalog", "list", "category"]
```

---

## 4. createItemKey

创建「单条」query key 工厂，支持一个或多个 id，并支持链式 `.withPrefix()`。  
Creates an item query key factory (one or more ids) with chainable `.withPrefix()`.

**签名 / Signature**

```ts
function createItemKey(domain: string, subDomain: string): ItemKeyChainable;
```

调用后的 key 形状：`[domain, CACHE_ITEM, subDomain, ...ids]`。

**Example**

```ts
import { createItemKey } from "nfx-ui";

const itemKey = createItemKey("catalog", "category");
itemKey("abc"); // => ["catalog", "item", "category", "abc"]
itemKey("cat-1", "sub-2"); // => ["catalog", "item", "category", "cat-1", "sub-2"]
```

---

## 5. createQueryKeys

根据同一 `domain` + `subDomain` 一次性生成 list key 与 item key 工厂，并支持对整包做 `.withPrefix()`。  
Returns a bundle of list key and item key factory with chainable `.withPrefix()`.

**签名 / Signature**

```ts
function createQueryKeys(domain: string, subDomain: string): QueryKeysBundle;
```

**Example**

```ts
import { createQueryKeys } from "nfx-ui";

const { list, item } = createQueryKeys("catalog", "category");
useQuery({ queryKey: list, queryFn: fetchCategories });
useQuery({ queryKey: item(id), queryFn: () => fetchCategory(id) });

const withApi = createQueryKeys("catalog", "category").withPrefix("api");
```

---

## 6. defineEnum（枚举定义）

根据元数据对象定义类型安全的枚举，提供 `Values`、`pickMap`、`get`。  
Defines a type-safe enum from a metadata map.

**签名 / Signature**

```ts
function defineEnum<const M extends EnumMetaMap>(metaMap: M): DefinedEnum<M>;
```

**Example**

```ts
import { defineEnum } from "nfx-ui";

const Status = defineEnum({
  Draft: { label: "草稿", value: 0 },
  Published: { label: "已发布", value: 1 },
});

Status.Values; // => ["Draft", "Published"]
Status.get("Draft"); // => { label: "草稿", value: 0 }
Status.pickMap("label"); // => { Draft: "草稿", Published: "已发布" }
```

---

## 7. enumPickMap

从已定义的枚举上按属性抽取 map（等价于 `e.pickMap(prop)`）。  
Picks a map of one property from each enum entry.

**Example**

```ts
import { defineEnum, enumPickMap } from "nfx-ui";

const Status = defineEnum({
  Draft: { label: "草稿", value: 0 },
  Published: { label: "已发布", value: 1 },
});
enumPickMap(Status, "label"); // => { Draft: "草稿", Published: "已发布" }
```

---

## 前缀顺序说明 / Prefix Order

**最后调用的 `.withPrefix(...)` 会出现在 key 数组的最前面。**  
例如：`.withPrefix("api").withPrefix("v1")` → key 以 `["v1", "api", ...]` 开头。
