# Types — type definitions

Shared TypeScript and API-related types exported from **`nfx-ui/types`**.

---

## Entry

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, ListDTOWithNextCursor, Nullable, Maybe } from "nfx-ui/types";
```

## Import example

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe } from "nfx-ui/types";

const errorBody: ApiErrorBody = { status: 400, message: "Bad request" };
const list: ListDTOWithTotalNumber<{ id: string }> = { items: [], total: 0 };
const name: Nullable<string> = "Alice";
```

For Result type and ok/err constructors, import from **`nfx-ui/utils`**; see [utils/result.md](../utils/result.md).

## Docs

| File | Description |
|------|-------------|
| [api.md](./api.md) | API types: ApiErrorBody, ListDTO, OffsetLimit, etc. |
| [utils.md](./utils.md) | Type utils: Nullable, Maybe, Defined, KeyOf, etc. |

---

---

# 类型定义

从 **`nfx-ui/types`** 子路径导出的共享 TypeScript 类型与 API 相关类型。

---

## 入口

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, ListDTOWithNextCursor, Nullable, Maybe } from "nfx-ui/types";
```

## 引入示例

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe } from "nfx-ui/types";

const errorBody: ApiErrorBody = { status: 400, message: "Bad request" };
const list: ListDTOWithTotalNumber<{ id: string }> = { items: [], total: 0 };
const name: Nullable<string> = "Alice";
```

**Result 类型与 ok/err 构造** 从 **`nfx-ui/utils`** 引入，见 [utils/result.md](../utils/result.md)。

## 文档

| 文件 | 说明 |
|------|------|
| [api.md](./api.md) | API 相关：ApiErrorBody、ListDTO、OffsetLimit 等 |
| [utils.md](./utils.md) | 类型工具：Nullable、Maybe、Defined、KeyOf 等 |
