# getApiError / getApiErrorMessage / API 错误解析

从异常中解析 API 错误体与文案。  
Parse API error body and message from an exception.

---

## 引入 / Import

```ts
import { getApiError, getApiErrorMessage } from "nfx-ui";
```

---

## getApiError

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| error | unknown | Yes | — | 捕获的异常（如 Axios error）。Caught exception (e.g. Axios error). |

- **Input**：任意 `error`（通常为请求失败抛出的对象）。Any error (e.g. from failed request).
- **Output**：`ApiErrorBody | null` — 若为 API 错误则返回 `{ status, errCode, message, details, traceId }`，否则 `null`.  
  Returns error body if API error, else null.

---

## getApiErrorMessage

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| error | unknown | Yes | — | 捕获的异常。Caught exception. |
| fallback | string | Yes | — | 无法解析时返回的默认文案。Default message when parse fails. |

- **Input**：`error`、`fallback`。error, fallback.
- **Output**：string — 错误消息或 fallback。Error message or fallback.

---

## 示例 / Example

```ts
try {
  await api.get("/user");
} catch (e) {
  const body = getApiError(e);
  // body => { status: 400, message: "Invalid id" } or null

  const msg = getApiErrorMessage(e, "请求失败 / Request failed");
  // msg => "Invalid id" or "请求失败"
}
```
