# Constants module

Usage guide for shared constants and React Query key factories. Exported from **`nfx-ui/constants`** (external). In repo: `@/constants`. Parameters and Input/Output for each function are in the tables and examples below.

---

## Entry

```ts
import { CACHE_ITEM, CACHE_LIST, createItemKey, createKey, createListKey, createQueryKeys, defineEnum, enumPickMap } from "nfx-ui/constants";
```

---

## 1. Caches

Fixed segments used in query keys to denote "list" vs "item".

| Name        | Type   | Value    | Description           |
| ----------- | ------ | -------- | --------------------- |
| CACHE_LIST  | string | "list"   | List key segment.     |
| CACHE_ITEM  | string | "item"   | Item key segment.     |

**Example**

```ts
import { CACHE_ITEM, CACHE_LIST } from "nfx-ui/constants";
const customKey = ["catalog", CACHE_LIST, "category"];
```

---

## 2. createKey

Creates a query key from arbitrary segments.

**Signature**

```ts
function createKey(...segments: unknown[]): QueryKey;
```

**Example**

```ts
import { createKey } from "nfx-ui/constants";
const key = createKey("catalog", "stats", "category", "count");
useQuery({ queryKey: createKey("auth", "me"), queryFn: fetchCurrentUser });
```

---

## 3. createListKey

Creates a list query key with chainable `.withPrefix()`.

**Signature**

```ts
function createListKey(domain: string, subDomain: string): ListKeyChainable;
```

Default key shape: `[domain, CACHE_LIST, subDomain]`.

**Example**

```ts
import { createListKey } from "nfx-ui/constants";
const listKey = createListKey("catalog", "category");
const versioned = createListKey("catalog", "category").withPrefix("api").withPrefix("v1");
```

---

## 4. createItemKey

Creates an item query key factory (one or more ids) with chainable `.withPrefix()`.

**Signature**

```ts
function createItemKey(domain: string, subDomain: string): ItemKeyChainable;
```

Key shape: `[domain, CACHE_ITEM, subDomain, ...ids]`.

**Example**

```ts
import { createItemKey } from "nfx-ui/constants";
const itemKey = createItemKey("catalog", "category");
itemKey("abc");
itemKey("cat-1", "sub-2");
```

---

## 5. createQueryKeys

Returns a bundle of list key and item key factory with chainable `.withPrefix()`.

**Signature**

```ts
function createQueryKeys(domain: string, subDomain: string): QueryKeysBundle;
```

**Example**

```ts
import { createQueryKeys } from "nfx-ui/constants";
const { list, item } = createQueryKeys("catalog", "category");
useQuery({ queryKey: list, queryFn: fetchCategories });
useQuery({ queryKey: item(id), queryFn: () => fetchCategory(id) });
```

---

## 6. defineEnum

Defines a type-safe enum from a metadata map.

**Signature**

```ts
function defineEnum<const M extends EnumMetaMap>(metaMap: M): DefinedEnum<M>;
```

**Example**

```ts
import { defineEnum } from "nfx-ui/constants";
const Status = defineEnum({
  Draft: { label: "Draft", value: 0 },
  Published: { label: "Published", value: 1 },
});
Status.Values;
Status.get("Draft");
Status.pickMap("label");
```

---

## 7. enumPickMap

Picks a map of one property from each enum entry.

**Example**

```ts
import { defineEnum, enumPickMap } from "nfx-ui/constants";
const Status = defineEnum({ Draft: { label: "Draft", value: 0 }, Published: { label: "Published", value: 1 } });
enumPickMap(Status, "label");
```

---

## Prefix order

The last `.withPrefix(...)` call appears at the front of the key array. E.g. `.withPrefix("api").withPrefix("v1")` → key starts with `["v1", "api", ...]`.

---

---

# Constants 模块文档

公用常量与 React Query key 工厂的用法说明。从 **`nfx-ui/constants`** 子路径导出（外部使用）。本仓库内可从 `@/constants` 引用。各函数参数与 Input/Output 见下表及示例。

---

## 入口

```ts
import { CACHE_ITEM, CACHE_LIST, createItemKey, createKey, createListKey, createQueryKeys, defineEnum, enumPickMap } from "nfx-ui/constants";
```

---

## 1. Caches（缓存片段）

用于组成 query key 的固定片段，标识「列表」与「单条」。

| 名称        | 类型   | 值      | 说明                 |
| ----------- | ------ | ------- | -------------------- |
| CACHE_LIST  | string | "list"  | 列表 key 片段。      |
| CACHE_ITEM  | string | "item"  | 单条 key 片段。      |

**示例**

```ts
import { CACHE_ITEM, CACHE_LIST } from "nfx-ui/constants";
const customKey = ["catalog", CACHE_LIST, "category"];
```

---

## 2. createKey

创建由任意片段组成的 query key（用于 stats、自定义维度等）。

**签名**

```ts
function createKey(...segments: unknown[]): QueryKey;
```

**示例**

```ts
import { createKey } from "nfx-ui/constants";
const key = createKey("catalog", "stats", "category", "count");
useQuery({ queryKey: createKey("auth", "me"), queryFn: fetchCurrentUser });
```

---

## 3. createListKey

创建「列表」query key，并支持链式 `.withPrefix()` 加前缀。

**签名**

```ts
function createListKey(domain: string, subDomain: string): ListKeyChainable;
```

默认 key 形状：`[domain, CACHE_LIST, subDomain]`。

**示例**

```ts
import { createListKey } from "nfx-ui/constants";
const listKey = createListKey("catalog", "category");
const versioned = createListKey("catalog", "category").withPrefix("api").withPrefix("v1");
```

---

## 4. createItemKey

创建「单条」query key 工厂，支持一个或多个 id，并支持链式 `.withPrefix()`。

**签名**

```ts
function createItemKey(domain: string, subDomain: string): ItemKeyChainable;
```

调用后的 key 形状：`[domain, CACHE_ITEM, subDomain, ...ids]`。

**示例**

```ts
import { createItemKey } from "nfx-ui/constants";
const itemKey = createItemKey("catalog", "category");
itemKey("abc");
itemKey("cat-1", "sub-2");
```

---

## 5. createQueryKeys

根据同一 domain + subDomain 一次性生成 list key 与 item key 工厂，并支持对整包做 `.withPrefix()`。

**签名**

```ts
function createQueryKeys(domain: string, subDomain: string): QueryKeysBundle;
```

**示例**

```ts
import { createQueryKeys } from "nfx-ui/constants";
const { list, item } = createQueryKeys("catalog", "category");
useQuery({ queryKey: list, queryFn: fetchCategories });
useQuery({ queryKey: item(id), queryFn: () => fetchCategory(id) });
```

---

## 6. defineEnum（枚举定义）

根据元数据对象定义类型安全的枚举，提供 Values、pickMap、get。

**签名**

```ts
function defineEnum<const M extends EnumMetaMap>(metaMap: M): DefinedEnum<M>;
```

**示例**

```ts
import { defineEnum } from "nfx-ui/constants";
const Status = defineEnum({
  Draft: { label: "草稿", value: 0 },
  Published: { label: "已发布", value: 1 },
});
Status.Values;
Status.get("Draft");
Status.pickMap("label");
```

---

## 7. enumPickMap

从已定义的枚举上按属性抽取 map（等价于 e.pickMap(prop)）。

**示例**

```ts
import { defineEnum, enumPickMap } from "nfx-ui/constants";
const Status = defineEnum({ Draft: { label: "草稿", value: 0 }, Published: { label: "已发布", value: 1 } });
enumPickMap(Status, "label");
```

---

## 前缀顺序说明

最后调用的 `.withPrefix(...)` 会出现在 key 数组的最前面。例如：`.withPrefix("api").withPrefix("v1")` → key 以 `["v1", "api", ...]` 开头。
