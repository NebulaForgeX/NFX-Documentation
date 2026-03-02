# Suspense

Unified Suspense boundary and error UI; works with React Query etc.

---

## Import

```tsx
import { Suspense } from "nfx-ui/components";
import type { SuspenseProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| fallback | ReactNode | No | — | UI shown while loading. |
| errorFallback | ReactNode \| (error, retry) => ReactNode | No | — | Error UI or render function (error, retry). |
| children | ReactNode | No | — | Children (may suspend). |

---

## Input / Output

- **Input:** fallback, errorFallback, children.
- **Output:** Shows fallback while loading; shows errorFallback on error (retry if supported).

---

## Example

```tsx
<Suspense
  fallback={<ECGLoading />}
  errorFallback={<ErrorView onRetry={refetch} />}
>
  <DataView />
</Suspense>
```

Works with components from makeUnifiedQuery / makeUnifiedInfiniteQuery.

---

---

# Suspense — 统一 Suspense 边界

统一的 Suspense 边界与错误态展示，可配合 React Query 等做加载与错误 UI。

---

## 引入

```tsx
import { Suspense } from "nfx-ui/components";
import type { SuspenseProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| fallback | ReactNode | 否 | — | 加载中显示的 UI。 |
| errorFallback | ReactNode \| (error, retry) => ReactNode | 否 | — | 错误时显示的 UI 或渲染函数。 |
| children | ReactNode | 否 | — | 子组件（可能 suspend）。 |

---

## 输入 / 输出

- **输入：** fallback、errorFallback、children。
- **输出：** 子组件加载中显示 fallback；报错时显示 errorFallback（若支持 retry 可传入重试回调）。

---

## 示例

```tsx
<Suspense
  fallback={<ECGLoading />}
  errorFallback={<ErrorView onRetry={refetch} />}
>
  <DataView />
</Suspense>
```

可与 makeUnifiedQuery、makeUnifiedInfiniteQuery 等返回的组件配合使用。
