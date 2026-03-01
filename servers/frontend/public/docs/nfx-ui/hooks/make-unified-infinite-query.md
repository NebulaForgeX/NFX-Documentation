# makeUnifiedInfiniteQuery

创建统一的无限列表查询 Hook 工厂（normal 或 suspense），内部使用数字游标分页。  
Creates a unified infinite-query Hook factory (normal or suspense), using number-cursor paging.

## 引入

```ts
import { makeUnifiedInfiniteQuery } from "nfx-ui/hooks";
```

## 签名 / Signature

```ts
function makeUnifiedInfiniteQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: FetchNumberListParams<F>) => Promise<ListDTOWithTotalNumber<T>>,
  mode?: "normal" | "suspense",
  pageSize?: number,
  postProcess?: (data: T[]) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseInfiniteQueryResult<T[]> | UseSuspenseInfiniteQueryResult<T[]>;
```

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fetchRemote | (params) => Promise&lt;ListDTOWithTotalNumber&lt;T&gt;&gt; | Yes | — | 接收 offset、limit、filter，返回 { items, total }. |
| mode | `"normal"` \| `"suspense"` | No | `"normal"` | 模式。Mode. |
| pageSize | number | No | 20 | 每页条数。Page size. |
| postProcess | (data: T[]) => void | No | — | 可选。Optional. |

## 输入 Input / 输出 Output

- **Input**：fetchRemote、mode、pageSize、postProcess。fetchRemote, mode, pageSize, postProcess.
- **Output**：返回 Hook；调用后得到扁平化 `data: T[]`、`fetchNextPage`、`hasNextPage` 等。Returns Hook; use returns flattened data, fetchNextPage, hasNextPage, etc.

## 示例 / Example

```ts
const useProductList = makeUnifiedInfiniteQuery(fetchProducts, "normal", 20);
const { data, fetchNextPage, hasNextPage, isLoading } = useProductList(
  ["products"],
  { category: "x" },
  { staleTime: 60000 }
);
```

与 VirtualList 或「加载更多」按钮配合使用。
