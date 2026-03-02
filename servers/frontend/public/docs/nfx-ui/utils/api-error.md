# getApiError / getApiErrorMessage

Parse API error body and message from an exception.

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

- **Input:** Any error (e.g. from failed request).
- **Output:** ApiErrorBody \| null — returns error body if API error, else null.

---

## getApiErrorMessage

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| error | unknown | Yes | — | Caught exception. |
| fallback | string | Yes | — | Default message when parse fails. |

- **Input:** error, fallback.
- **Output:** string — error message or fallback.

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

从异常中解析 API 错误体与文案。

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

- **输入：** 任意 error（通常为请求失败抛出的对象）。
- **输出：** ApiErrorBody \| null — 若为 API 错误则返回错误体，否则 null。

---

## getApiErrorMessage

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| error | unknown | 是 | — | 捕获的异常。 |
| fallback | string | 是 | — | 无法解析时返回的默认文案。 |

- **输入：** error、fallback。
- **输出：** string — 错误消息或 fallback。

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
