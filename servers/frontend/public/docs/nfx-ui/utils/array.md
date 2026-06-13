# mergeById / pruneArray

Merge items into array by id; remove items whose id is in a set. Returns original array reference when nothing changed (pruneArray).

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
| place | `"prepend"` \| `"append"` | Yes | — | Where to insert new ids. |
| mode | `"insert"` \| `"upsert"` | Yes | — | insert: skip existing ids; upsert: overwrite same id. |

- **Input:** arr, items, idOf, place, mode.
- **Output:** T[] — new merged array (returns arr unchanged if items empty).

---

## pruneArray

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| arr | T[] | Yes | — | Original array. |
| ids | ReadonlySet&lt;string&gt; | Yes | — | Ids to remove. |
| idOf | (x: T) => string | Yes | — | Function to get id. |

- **Input:** arr, ids, idOf.
- **Output:** T[] — new array if any removed; otherwise same arr reference.

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

按 id 合并项进数组；按 id 集合移除项。无变化时 pruneArray 返回原数组引用。

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
| place | `"prepend"` \| `"append"` | 是 | — | 新 id 插入位置。 |
| mode | `"insert"` \| `"upsert"` | 是 | — | insert 不覆盖已有 id；upsert 覆盖同 id。 |

- **输入：** arr、items、idOf、place、mode。
- **输出：** T[] — 合并后的新数组（items 为空时返回 arr）。

---

## pruneArray

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| arr | T[] | 是 | — | 原数组。 |
| ids | ReadonlySet&lt;string&gt; | 是 | — | 要移除的 id 集合。 |
| idOf | (x: T) => string | 是 | — | 取 id 的函数。 |

- **输入：** arr、ids、idOf。
- **输出：** T[] — 有移除则新数组，否则原 arr 引用。

---

## 示例

```ts
const list = [{ id: "1", name: "A" }, { id: "2", name: "B" }];
const added = [{ id: "2", name: "B2" }, { id: "3", name: "C" }];
const merged = mergeById(list, added, (x) => x.id, "append", "upsert");

const pruned = pruneArray(list, new Set(["1"]), (x) => x.id);
```
