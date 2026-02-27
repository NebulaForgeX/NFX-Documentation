# Suspense / 统一 Suspense 边界

统一的 Suspense 边界与错误态展示，可配合 React Query 等做加载与错误 UI。  
Unified Suspense boundary and error UI; works with React Query etc.

---

## 引入 / Import

```tsx
import { Suspense } from "nfx-ui";
import type { SuspenseProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| fallback | ReactNode | No | — | 加载中显示的 UI。UI shown while loading. |
| errorFallback | ReactNode \| (error, retry) => ReactNode | No | — | 错误时显示的 UI 或渲染函数。Error UI or render function (error, retry). |
| children | ReactNode | No | — | 子组件（可能 suspend）。Children (may suspend). |

---

## 输入 Input / 输出 Output

- **Input**：fallback、errorFallback、children。fallback, errorFallback, children.
- **Output**：子组件加载中显示 fallback；报错时显示 errorFallback（若支持 retry 可传入重试回调）。Shows fallback while loading; shows errorFallback on error (retry if supported).

---

## 示例 / Example

```tsx
<Suspense
  fallback={<ECGLoading />}
  errorFallback={<ErrorView onRetry={refetch} />}
>
  <DataView />
</Suspense>
```

可与 makeUnifiedQuery、makeUnifiedInfiniteQuery 等返回的组件配合使用。 Works with components from makeUnifiedQuery / makeUnifiedInfiniteQuery.
