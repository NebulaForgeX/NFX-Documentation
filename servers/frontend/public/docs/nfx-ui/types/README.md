# Types — type definitions

Shared TypeScript types exported from **`nfx-ui/types`**.

Hook-specific types (`FetchNumberListParams`, `InfiniteQueryOptions`, etc.) are exported from **`nfx-ui/hooks`**, not here.

`Result`, `ok`, `err` are exported from **`nfx-ui/utils`** — see [utils/result.md](../utils/result.md).

---

## Entry

```ts
import type {
  ApiErrorBody,
  BaseResponse,
  DataResponse,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
  PaginatedResponse,
  Nullable,
  Maybe,
} from "nfx-ui/types";
```

## Import example

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe } from "nfx-ui/types";

const errorBody: ApiErrorBody = { status: 400, message: "Bad request" };
const list: ListDTOWithTotalNumber<{ id: string }> = { items: [], total: 0 };
const name: Nullable<string> = "Alice";
```

## Docs

| File | Description |
|------|-------------|
| [api.md](./api.md) | API types: ApiErrorBody, ListDTOWithTotalNumber, OffsetLimit, etc. |
| [utils.md](./utils.md) | Type utils: Nullable, Maybe, Defined, KeyOf, etc. |

---

---

# 类型定义

从 **`nfx-ui/types`** 子路径导出的共享 TypeScript 类型。

Hooks 专用类型（`FetchNumberListParams`、`InfiniteQueryOptions` 等）从 **`nfx-ui/hooks`** 导出，不在此模块。

`Result`、`ok`、`err` 从 **`nfx-ui/utils`** 导出 — 见 [utils/result.md](../utils/result.md)。

---

## 入口

```ts
import type {
  ApiErrorBody,
  BaseResponse,
  DataResponse,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
  PaginatedResponse,
  Nullable,
  Maybe,
} from "nfx-ui/types";
```

## 引入示例

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe } from "nfx-ui/types";

const errorBody: ApiErrorBody = { status: 400, message: "Bad request" };
const list: ListDTOWithTotalNumber<{ id: string }> = { items: [], total: 0 };
const name: Nullable<string> = "Alice";
```

## 文档

| 文件 | 说明 |
|------|------|
| [api.md](./api.md) | API 类型：ApiErrorBody、ListDTOWithTotalNumber、OffsetLimit 等 |
| [utils.md](./utils.md) | 工具类型：Nullable、Maybe、Defined、KeyOf 等 |
