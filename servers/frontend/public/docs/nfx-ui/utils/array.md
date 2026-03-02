# mergeById / pruneArray

Merge two arrays by id; remove items from array by id set.

---

## Import

```ts
import { mergeById, pruneArray } from "nfx-ui/utils";
```

---

## mergeById

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| arr | T[] | Yes | — | Original array. |
| items | T[] | Yes | — | Items to merge. |
| idOf | (x: T) => string | Yes | — | Function to get id. |
| place | `"prepend"` \| `"append"` | Yes | — | Insert position. |
| mode | `"insert"` \| `"upsert"` | Yes | — | Insert or upsert. |

- **Input:** arr, items, idOf, place, mode.
- **Output:** T[] — new merged array.

---

## pruneArray

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| arr | T[] | Yes | — | Original array. |
| ids | ReadonlySet&lt;string&gt; | Yes | — | Ids to remove. |
| idOf | (x: T) => string | Yes | — | Function to get id. |

- **Input:** arr, ids, idOf.
- **Output:** T[] — new array with those ids removed.

---

## Example

```ts
const list = [{ id: "1", name: "A" }, { id: "2", name: "B" }];
const added = [{ id: "2", name: "B2" }, { id: "3", name: "C" }];
const merged = mergeById(list, added, (x) => x.id, "append", "upsert");

const pruned = pruneArray(list, new Set(["1"]), (x) => x.id);
```

---

---

# mergeById / pruneArray — 数组合并与裁剪

按 id 合并两个数组；按 id 集合从数组中移除项。

---

## 引入

```ts
import { mergeById, pruneArray } from "nfx-ui/utils";
```

---

## mergeById

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| arr | T[] | 是 | — | 原数组。 |
| items | T[] | 是 | — | 要合并的项。 |
| idOf | (x: T) => string | 是 | — | 取 id 的函数。 |
| place | `"prepend"` \| `"append"` | 是 | — | 插入位置。 |
| mode | `"insert"` \| `"upsert"` | 是 | — | 插入或 upsert。 |

- **输入：** arr、items、idOf、place、mode。
- **输出：** T[] — 合并后的新数组。

---

## pruneArray

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| arr | T[] | 是 | — | 原数组。 |
| ids | ReadonlySet&lt;string&gt; | 是 | — | 要移除的 id 集合。 |
| idOf | (x: T) => string | 是 | — | 取 id 的函数。 |

- **输入：** arr、ids、idOf。
- **输出：** T[] — 移除指定 id 后的新数组。

---

## 示例

```ts
const list = [{ id: "1", name: "A" }, { id: "2", name: "B" }];
const added = [{ id: "2", name: "B2" }, { id: "3", name: "C" }];
const merged = mergeById(list, added, (x) => x.id, "append", "upsert");

const pruned = pruneArray(list, new Set(["1"]), (x) => x.id);
```
