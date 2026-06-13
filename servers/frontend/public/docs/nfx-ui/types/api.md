# API Types

Request/list DTOs, pagination params, error body; used with hooks and constants.

---

## Import

```ts
import type {
  ApiErrorBody,
  BaseResponse,
  DataResponse,
  ListMeta,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
  PaginatedResponse,
} from "nfx-ui/types";
```

---

## Types and description

| Type | Description |
|------|-------------|
| BaseResponse | Base response: optional `status`, `errCode`, `message`. |
| DataResponse&lt;T, M&gt; | Extends BaseResponse with required `data` and optional `meta`. |
| ListMeta | List meta: optional `total`. |
| ApiErrorBody | Error body: `status`, `errCode`, `message`, `details`, `traceId`. |
| ListDTOWithTotalNumber&lt;T&gt; | List with total: `{ items: T[], total: number }`. |
| ListDTOWithNextCursor&lt;T&gt; | List with cursor: `{ items: T[], nextCursor: string }`. |
| OffsetLimitNumber | Number pagination: `{ offset: number, limit: number }`. |
| OffsetLimitString | String cursor pagination: `{ offset: string, limit: number }`. |
| PaginatedResponse&lt;T&gt; | Page response: `{ data, total, page, pageSize }`. |

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

const paginated: PaginatedResponse<{ id: string }> = {
  data: [{ id: "1" }],
  total: 100,
  page: 1,
  pageSize: 20,
};
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
  BaseResponse,
  DataResponse,
  ListMeta,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
  PaginatedResponse,
} from "nfx-ui/types";
```

---

## 类型与说明

| 类型 | 说明 |
|------|------|
| BaseResponse | 基础响应：可选 `status`、`errCode`、`message`。 |
| DataResponse&lt;T, M&gt; | 继承 BaseResponse，含必填 `data` 与可选 `meta`。 |
| ListMeta | 列表元信息：可选 `total`。 |
| ApiErrorBody | 错误体：`status`、`errCode`、`message`、`details`、`traceId`。 |
| ListDTOWithTotalNumber&lt;T&gt; | 列表+总数：`{ items: T[], total: number }`。 |
| ListDTOWithNextCursor&lt;T&gt; | 列表+游标：`{ items: T[], nextCursor: string }`。 |
| OffsetLimitNumber | 数字分页：`{ offset, limit }`。 |
| OffsetLimitString | 字符串游标分页：`{ offset: string, limit }`。 |
| PaginatedResponse&lt;T&gt; | 分页响应：`{ data, total, page, pageSize }`。 |

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

const paginated: PaginatedResponse<{ id: string }> = {
  data: [{ id: "1" }],
  total: 100,
  page: 1,
  pageSize: 20,
};
```

详见源码 `src/types/api.ts`。
