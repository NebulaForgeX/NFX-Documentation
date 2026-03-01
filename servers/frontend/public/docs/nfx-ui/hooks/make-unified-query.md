# makeUnifiedQuery

创建统一的单条查询 Hook 工厂（normal 或 suspense 模式）。  
Creates a unified single-item query Hook factory (normal or suspense mode).

## 引入 / Import

```ts
import { makeUnifiedQuery } from "nfx-ui/hooks";
```

## 签名 / Signature

```ts
function makeUnifiedQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: F) => Promise<T>,
  mode?: "normal" | "suspense",
  postProcess?: (data: T) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>;
```

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fetchRemote | (params: F) => Promise&lt;T&gt; | Yes | — | 拉取函数。Fetch function. |
| mode | `"normal"` \| `"suspense"` | No | `"normal"` | suspense 时返回 UseSuspenseQueryResult. |
| postProcess | (data: T) => void | No | — | 数据返回后调用。Optional. |

## 输入 Input / 输出 Output

- **Input**：fetchRemote、mode（可选）、postProcess（可选）。fetchRemote, optional mode, optional postProcess.
- **Output**：返回一个 Hook `(queryKey, filter?, options?) => UseQueryResult<T> \| UseSuspenseQueryResult<T>`；options 会合并 queryKey、queryFn、retry 等。Returns a Hook; options merge with queryKey, queryFn, retry, etc.

## 示例 / Example

```ts
const useProfile = makeUnifiedQuery(fetchProfile, "normal");
const { data } = useProfile(profileKey, { id }, { enabled: !!id });

const useProfileSuspense = makeUnifiedQuery(fetchProfile, "suspense");
const { data } = useProfileSuspense(profileKey, { id });
```

可与 `Suspense`、`QueryErrorResetBoundary` 一起使用，实现统一加载与错误 UI。
