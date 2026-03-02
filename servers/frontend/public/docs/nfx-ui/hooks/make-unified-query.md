# makeUnifiedQuery

Creates a unified single-item query Hook factory (normal or suspense mode).

---

## Import

```ts
import { makeUnifiedQuery } from "nfx-ui/hooks";
```

---

## Signature

```ts
function makeUnifiedQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: F) => Promise<T>,
  mode?: "normal" | "suspense",
  postProcess?: (data: T) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>;
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fetchRemote | (params: F) => Promise&lt;T&gt; | Yes | — | Fetch function. |
| mode | `"normal"` \| `"suspense"` | No | `"normal"` | When suspense, returns UseSuspenseQueryResult. |
| postProcess | (data: T) => void | No | — | Optional; called after data is returned. |

---

## Input / Output

- **Input:** fetchRemote, optional mode, optional postProcess.
- **Output:** Returns a Hook `(queryKey, filter?, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>`; options are merged with queryKey, queryFn, retry, etc.

---

## Example

```ts
const useProfile = makeUnifiedQuery(fetchProfile, "normal");
const { data } = useProfile(profileKey, { id }, { enabled: !!id });

const useProfileSuspense = makeUnifiedQuery(fetchProfile, "suspense");
const { data } = useProfileSuspense(profileKey, { id });
```

Use with `Suspense` and `QueryErrorResetBoundary` for unified loading and error UI.

---

---

# makeUnifiedQuery — 统一单条查询 Hook 工厂

创建统一的单条查询 Hook 工厂（normal 或 suspense 模式）。

---

## 引入

```ts
import { makeUnifiedQuery } from "nfx-ui/hooks";
```

---

## 签名

```ts
function makeUnifiedQuery<T, F extends object = Record<string, unknown>>(
  fetchRemote: (params: F) => Promise<T>,
  mode?: "normal" | "suspense",
  postProcess?: (data: T) => void,
): (queryKey: QueryKey, filter?: F, options?) => UseQueryResult<T> | UseSuspenseQueryResult<T>;
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fetchRemote | (params: F) => Promise&lt;T&gt; | 是 | — | 拉取函数。 |
| mode | `"normal"` \| `"suspense"` | 否 | `"normal"` | suspense 时返回 UseSuspenseQueryResult。 |
| postProcess | (data: T) => void | 否 | — | 数据返回后调用，可选。 |

---

## 输入 / 输出

- **输入：** fetchRemote、mode（可选）、postProcess（可选）。
- **输出：** 返回一个 Hook；options 会合并 queryKey、queryFn、retry 等。

---

## 示例

```ts
const useProfile = makeUnifiedQuery(fetchProfile, "normal");
const { data } = useProfile(profileKey, { id }, { enabled: !!id });

const useProfileSuspense = makeUnifiedQuery(fetchProfile, "suspense");
const { data } = useProfileSuspense(profileKey, { id });
```

可与 `Suspense`、`QueryErrorResetBoundary` 一起使用，实现统一加载与错误 UI。
