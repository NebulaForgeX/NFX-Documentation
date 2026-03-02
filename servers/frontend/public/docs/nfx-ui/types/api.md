# API Types

Request/list DTOs, pagination params, error body; used with hooks and constants.

---

## Import

```ts
import type {
  ApiErrorBody,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
} from "nfx-ui/types";
```

---

## Types and description

| Type | Description |
|------|-------------|
| ApiErrorBody | Error response body: status, errCode, message, details, traceId. |
| ListDTOWithTotalNumber&lt;T&gt; | List with total: `{ items: T[], total: number }`. |
| ListDTOWithNextCursor&lt;T&gt; | List with cursor: `{ items: T[], nextCursor: string }`. |
| OffsetLimitNumber | Number-based pagination: offset, limit. |
| OffsetLimitString | String cursor pagination. |

---

## Input–output usage

- **Input:** Request/response shapes match these types.
- **Output:** Types constrain function params and return values.

---

## Example

```ts
const errorBody: ApiErrorBody = {
  status: 400,
  errCode: "INVALID_ID",
  message: "Invalid user id",
  details: { field: "id" },
  traceId: "abc-123",
};

const listResponse: ListDTOWithTotalNumber<{ id: string; name: string }> = {
  items: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }],
  total: 100,
};

const cursorResponse: ListDTOWithNextCursor<{ id: string }> = {
  items: [{ id: "1" }, { id: "2" }],
  nextCursor: "eyJpZCI6Ml19",
};

const pageParams: OffsetLimitNumber = { offset: 0, limit: 20 };
const cursorParams: OffsetLimitString = { offset: "eyJpZCI6MH19", limit: 20 };

async function fetchList(
  params: OffsetLimitNumber
): Promise<ListDTOWithTotalNumber<{ id: string; name: string }>> {
  const res = await api.get("/users", { params });
  return res.data;
}
```

See `src/types/api.ts` for full definitions.

---

---

# API 相关类型

请求与列表 DTO、分页参数、错误体等。与 hooks、constants 配合使用。

---

## 引入

```ts
import type {
  ApiErrorBody,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
} from "nfx-ui/types";
```

---

## 类型与说明

| 类型 | 说明 |
|------|------|
| ApiErrorBody | 错误响应体：status、errCode、message、details、traceId。 |
| ListDTOWithTotalNumber&lt;T&gt; | 列表+总数：`{ items: T[], total: number }`。 |
| ListDTOWithNextCursor&lt;T&gt; | 列表+游标：`{ items: T[], nextCursor: string }`。 |
| OffsetLimitNumber | 数字分页：offset、limit。 |
| OffsetLimitString | 字符串游标分页。 |

---

## 输入 / 输出用法

- **输入：** 请求参数或响应体符合上述类型。
- **输出：** 类型用于约束函数参数与返回值。

---

## 示例

```ts
const errorBody: ApiErrorBody = {
  status: 400,
  errCode: "INVALID_ID",
  message: "Invalid user id",
  details: { field: "id" },
  traceId: "abc-123",
};

const listResponse: ListDTOWithTotalNumber<{ id: string; name: string }> = {
  items: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }],
  total: 100,
};

const cursorResponse: ListDTOWithNextCursor<{ id: string }> = {
  items: [{ id: "1" }, { id: "2" }],
  nextCursor: "eyJpZCI6Ml19",
};

const pageParams: OffsetLimitNumber = { offset: 0, limit: 20 };
const cursorParams: OffsetLimitString = { offset: "eyJpZCI6MH19", limit: 20 };

async function fetchList(
  params: OffsetLimitNumber
): Promise<ListDTOWithTotalNumber<{ id: string; name: string }>> {
  const res = await api.get("/users", { params });
  return res.data;
}
```

详见源码 `src/types/api.ts`。
