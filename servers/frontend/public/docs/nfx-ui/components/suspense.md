# Suspense

Unified Suspense wrapper with `QueryErrorResetBoundary`, custom loading animations, and error UI.

---

## Import

```tsx
import { Suspense } from "nfx-ui/components";
import type { SuspenseProps } from "nfx-ui/components";
```

---

## Parameters

Extends React `SuspenseProps` (except `fallback`) and `QueryErrorResetBoundaryProps` (except `children`).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | No | — | Children (may suspend). |
| fallback | ReactNode | No | — | Custom fallback node (overrides built-in loading UI). |
| test | boolean | No | — | Test mode: always suspend. |
| loadingType | `"ecg"` \| `"truck"` \| `"bounce"` | No | `"ecg"` | Loading animation type. |
| loadingShape | `"square"` \| `"circle"` | No | `"square"` | Loading shape (for bounce). |
| loadingText | ReactNode | No | `"Loading..."` | Loading text; pass from caller (e.g. i18n). |
| loadingSize | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Loading animation size. |
| loadingContainerClassName | string | No | — | Loading container className. |
| loadingTextClassName | string | No | — | Loading text className. |
| loadingClassName | string | No | — | Loading animation className. |
| errorFallback | (args: { error: Error \| null; retry: () => void }) => ReactNode | No | — | Custom error UI render function. |
| errorTitle | ReactNode | No | `"Error"` | Error title; pass from caller. |
| errorDescription | ReactNode | No | `"Something went wrong. Please try again."` | Error description; pass from caller. |
| retryText | ReactNode | No | `"Retry"` | Retry button text; pass from caller. |
| errorDetailsText | ReactNode | No | `"Details"` | Error details summary text. |
| clearLocalDataText | ReactNode | No | `"Clear local data"` | Clear local data button text. |
| onClearLocalData | () => void | No | — | Called after clear local data (e.g. navigate to login); pass from caller. |
| errorContainerClassName | string | No | — | Error container className. |
| errorDetailsClassName | string | No | — | Error details className. |
| showErrorDetails | boolean | No | `import.meta.env.DEV` | Show error details collapsible. |

Also forwards remaining React Suspense and QueryErrorResetBoundary props.

---

## Input / Output

- **Input:** children, fallback or loading props, error props.
- **Output:** Wraps children in QueryErrorResetBoundary + error boundary + React Suspense; shows loading UI while suspending; shows built-in or custom error UI on error with retry and clear-local-data actions.

---

## Example

```tsx
<Suspense fallback={null}>
  <LazyPage />
</Suspense>

<Suspense loadingType="bounce" loadingShape="circle" loadingText={t("common.loading")}>
  <DataView />
</Suspense>

<Suspense
  errorTitle={t("error.title")}
  errorDescription={t("error.description")}
  retryText={t("error.retry")}
  onClearLocalData={() => navigate("/login")}
>
  <DataView />
</Suspense>
```

Works with components from makeUnifiedQuery / makeUnifiedInfiniteQuery.

---

---

# Suspense — 统一 Suspense 边界

统一的 Suspense 包装：`QueryErrorResetBoundary` + 自定义加载动画 + 错误 UI。

---

## 引入

```tsx
import { Suspense } from "nfx-ui/components";
import type { SuspenseProps } from "nfx-ui/components";
```

---

## 参数

继承 React `SuspenseProps`（除 `fallback`）与 `QueryErrorResetBoundaryProps`（除 `children`）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 否 | — | 子组件（可能 suspend）。 |
| fallback | ReactNode | 否 | — | 自定义 fallback（覆盖内置 loading UI）。 |
| test | boolean | 否 | — | 测试模式：始终挂起。 |
| loadingType | `"ecg"` \| `"truck"` \| `"bounce"` | 否 | `"ecg"` | 加载动画类型。 |
| loadingShape | `"square"` \| `"circle"` | 否 | `"square"` | 加载图形形状（bounce 用）。 |
| loadingText | ReactNode | 否 | `"Loading..."` | 加载中文案；由调用方传入（如 i18n）。 |
| loadingSize | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 加载动画尺寸。 |
| loadingContainerClassName | string | 否 | — | 加载容器 className。 |
| loadingTextClassName | string | 否 | — | 加载文案 className。 |
| loadingClassName | string | 否 | — | 加载动画 className。 |
| errorFallback | (args: { error: Error \| null; retry: () => void }) => ReactNode | 否 | — | 自定义错误 UI 渲染函数。 |
| errorTitle | ReactNode | 否 | `"Error"` | 错误标题；由调用方传入。 |
| errorDescription | ReactNode | 否 | `"Something went wrong. Please try again."` | 错误描述；由调用方传入。 |
| retryText | ReactNode | 否 | `"Retry"` | 重试按钮文案；由调用方传入。 |
| errorDetailsText | ReactNode | 否 | `"Details"` | 错误详情折叠文案。 |
| clearLocalDataText | ReactNode | 否 | `"Clear local data"` | 清除本地数据按钮文案。 |
| onClearLocalData | () => void | 否 | — | 点击「清除本地数据」后执行（如跳转登录页）；由调用方传入。 |
| errorContainerClassName | string | 否 | — | 错误容器 className。 |
| errorDetailsClassName | string | 否 | — | 错误详情 className。 |
| showErrorDetails | boolean | 否 | `import.meta.env.DEV` | 是否展示错误详情折叠区。 |

另透传其余 React Suspense 与 QueryErrorResetBoundary props。

---

## 输入 / 输出

- **输入：** children、fallback 或 loading 相关 props、error 相关 props。
- **输出：** 以 QueryErrorResetBoundary + 错误边界 + React Suspense 包裹子组件；suspend 时显示 loading UI；报错时显示内置或自定义错误 UI，含重试与清除本地数据操作。

---

## 示例

```tsx
<Suspense fallback={null}>
  <LazyPage />
</Suspense>

<Suspense loadingType="bounce" loadingShape="circle" loadingText={t("common.loading")}>
  <DataView />
</Suspense>

<Suspense
  errorTitle={t("error.title")}
  errorDescription={t("error.description")}
  retryText={t("error.retry")}
  onClearLocalData={() => navigate("/login")}
>
  <DataView />
</Suspense>
```

可与 makeUnifiedQuery、makeUnifiedInfiniteQuery 等返回的组件配合使用。
