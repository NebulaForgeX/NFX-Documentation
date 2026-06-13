# getApiError / getApiErrorMessage

Parse API error body and display message from an exception. Expects backend error shape `{ status, err_code, message, details?, trace_id? }` (axios camelCase: `errCode`, `traceId`).

Display priority: i18n `errors:{errCode}` → `api.message` → fallback.

---

## Import

```ts
import { getApiError, getApiErrorMessage } from "nfx-ui/utils";
```

---

## getApiError

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| error | unknown | Yes | — | Caught exception (e.g. Axios error). |

- **Input:** Any error (typically Axios with `response.data`).
- **Output:** ApiErrorBody \| null — parsed body when `response.data` exists, else null.

---

## getApiErrorMessage

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| error | unknown | Yes | — | Caught exception. |
| fallback | string | Yes | — | Default message when parse fails. |

- **Input:** error, fallback.
- **Output:** string — i18n by errCode, then api.message, then fallback.

---

## Example

```ts
try {
  await api.get("/user");
} catch (e) {
  const body = getApiError(e);
  const msg = getApiErrorMessage(e, "Request failed");
}
```

---

---

# getApiError / getApiErrorMessage — API 错误解析

从异常中解析 API 错误体与展示文案。约定后端错误体 `{ status, err_code, message, details?, trace_id? }`（axios 转 camelCase：`errCode`、`traceId`）。

展示优先级：i18n `errors:{errCode}` → `api.message` → fallback。

---

## 引入

```ts
import { getApiError, getApiErrorMessage } from "nfx-ui/utils";
```

---

## getApiError

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| error | unknown | 是 | — | 捕获的异常（如 Axios error）。 |

- **输入：** 任意 error（通常含 `response.data`）。
- **输出：** ApiErrorBody \| null — 有 `response.data` 时解析为错误体，否则 null。

---

## getApiErrorMessage

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| error | unknown | 是 | — | 捕获的异常。 |
| fallback | string | 是 | — | 无法解析时返回的默认文案。 |

- **输入：** error、fallback。
- **输出：** string — 先按 errCode 查 i18n，再 api.message，最后 fallback。

---

## 示例

```ts
try {
  await api.get("/user");
} catch (e) {
  const body = getApiError(e);
  const msg = getApiErrorMessage(e, "请求失败");
}
```
