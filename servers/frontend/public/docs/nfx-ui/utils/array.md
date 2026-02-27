# mergeById / pruneArray / 数组合并与裁剪

按 id 合并两个数组；按 id 集合从数组中移除项。  
Merge two arrays by id; remove items from array by id set.

---

## 引入 / Import

```ts
import { mergeById, pruneArray } from "nfx-ui";
```

---

## mergeById

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| arr | T[] | Yes | — | 原数组。Original array. |
| items | T[] | Yes | — | 要合并的项。Items to merge. |
| idOf | (x: T) => string | Yes | — | 取 id 的函数。Function to get id. |
| place | `"prepend"` \| `"append"` | Yes | — | 插入位置。Insert position. |
| mode | `"insert"` \| `"upsert"` | Yes | — | 插入或 upsert。Insert or upsert. |

- **Input**：arr、items、idOf、place、mode。
- **Output**：T[] — 合并后的新数组。New merged array.

---

## pruneArray

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| arr | T[] | Yes | — | 原数组。Original array. |
| ids | ReadonlySet&lt;string&gt; | Yes | — | 要移除的 id 集合。Ids to remove. |
| idOf | (x: T) => string | Yes | — | 取 id 的函数。Function to get id. |

- **Input**：arr、ids、idOf。
- **Output**：T[] — 移除指定 id 后的新数组。New array with those ids removed.

---

## 示例 / Example

```ts
const list = [{ id: "1", name: "A" }, { id: "2", name: "B" }];
const added = [{ id: "2", name: "B2" }, { id: "3", name: "C" }];
const merged = mergeById(list, added, (x) => x.id, "append", "upsert");
// 输出：按 id upsert 并 append 的新数组 / Output: new array with upserted/append items

const pruned = pruneArray(list, new Set(["1"]), (x) => x.id);
// 输出：仅保留 id 不在 Set 中的项 / Output: items whose id not in Set
```
